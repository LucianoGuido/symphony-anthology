import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getFixGuide, supportedFindingCodes } from './fix-guides.mjs';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(packageDir, 'dist');
const recipesDir = path.join(packageDir, 'recipes');
const projectRoot = path.resolve(process.cwd());

const staticResourceDefinitions = [
  {
    uri: 'anthology://tokens',
    name: 'Anthology tokens',
    description: 'Machine-readable design tokens for Anthology.',
    mimeType: 'application/json',
    filePath: path.join(distDir, 'tokens.json'),
  },
  {
    uri: 'anthology://schema',
    name: 'Anthology schema',
    description: 'Component schema for Anthology generators and audits.',
    mimeType: 'application/json',
    filePath: path.join(distDir, 'schema.json'),
  },
  {
    uri: 'anthology://schema-presets',
    name: 'Anthology schema presets',
    description: 'Schema.org mapping presets for Anthology patterns.',
    mimeType: 'application/json',
    filePath: path.join(distDir, 'schema-presets.json'),
  },
];

let verifyModulePromise;

function getPropertyByPath(value, pathExpression) {
  if (!pathExpression) {
    return value;
  }

  const segments = String(pathExpression)
    .split('.')
    .map((segment) => segment.trim())
    .filter(Boolean);

  let current = value;

  for (const segment of segments) {
    if (current === null || typeof current !== 'object' || !(segment in current)) {
      return undefined;
    }

    current = current[segment];
  }

  return current;
}

function extractTitle(markdown, fallback) {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

function extractSummary(markdown) {
  const lines = markdown.split(/\r?\n/);
  let afterTitle = false;
  const summaryLines = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!afterTitle) {
      if (trimmed.startsWith('# ')) {
        afterTitle = true;
      }

      continue;
    }

    if (!trimmed) {
      if (summaryLines.length > 0) {
        break;
      }

      continue;
    }

    if (trimmed.startsWith('## ')) {
      break;
    }

    summaryLines.push(trimmed);
  }

  return summaryLines.join(' ');
}

async function readJsonArtifact(filename) {
  const filePath = path.join(distDir, filename);
  const text = await fs.readFile(filePath, 'utf8');
  return {
    text,
    data: JSON.parse(text),
  };
}

async function listRecipeEntries() {
  const entries = await fs.readdir(recipesDir, { withFileTypes: true });
  const recipes = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) {
      continue;
    }

    const filePath = path.join(recipesDir, entry.name);
    const markdown = await fs.readFile(filePath, 'utf8');
    const slug = entry.name.slice(0, -'.md'.length);

    recipes.push({
      slug,
      uri: `anthology://recipes/${slug}`,
      title: extractTitle(markdown, slug),
      summary: extractSummary(markdown),
      markdown,
      searchText: `${slug}\n${markdown}`.toLowerCase(),
    });
  }

  return recipes.sort((left, right) => left.slug.localeCompare(right.slug));
}

async function getRecipeBySlug(slug) {
  const recipes = await listRecipeEntries();
  return recipes.find((recipe) => recipe.slug === slug) ?? null;
}

async function loadVerifyModule() {
  if (!verifyModulePromise) {
    verifyModulePromise = import('@symphonyui/anthology-verify/lib/verify-path.mjs').catch(async () =>
      import('../../anthology-verify/lib/verify-path.mjs'),
    );
  }

  return verifyModulePromise;
}

function resolveProjectPath(inputPath) {
  const candidate = path.resolve(projectRoot, String(inputPath));
  const relative = path.relative(projectRoot, candidate);

  if (relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))) {
    return candidate;
  }

  throw new Error('anthology_verify_path only supports files inside the current project.');
}

export async function listResources() {
  const recipes = await listRecipeEntries();

  return [
    ...staticResourceDefinitions.map(({ filePath, ...resource }) => resource),
    {
      uri: 'anthology://recipes',
      name: 'Anthology recipe index',
      description: 'Launch-ready Anthology recipes with titles and summaries.',
      mimeType: 'application/json',
    },
    ...recipes.map((recipe) => ({
      uri: recipe.uri,
      name: recipe.title,
      description: recipe.summary,
      mimeType: 'text/markdown',
    })),
    {
      uri: 'anthology://verify/checks',
      name: 'Anthology verify checks',
      description: 'Supported verify finding codes and the recommended Anthology response.',
      mimeType: 'application/json',
    },
  ];
}

export async function readResource(uri) {
  const staticDefinition = staticResourceDefinitions.find((resource) => resource.uri === uri);

  if (staticDefinition) {
    const text = await fs.readFile(staticDefinition.filePath, 'utf8');
    return {
      contents: [
        {
          uri,
          mimeType: staticDefinition.mimeType,
          text,
        },
      ],
    };
  }

  if (uri === 'anthology://recipes') {
    const recipes = await listRecipeEntries();
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: `${JSON.stringify(
            recipes.map(({ searchText, markdown, ...recipe }) => recipe),
            null,
            2,
          )}\n`,
        },
      ],
    };
  }

  if (uri.startsWith('anthology://recipes/')) {
    const slug = uri.slice('anthology://recipes/'.length);
    const recipe = await getRecipeBySlug(slug);

    if (!recipe) {
      throw new Error(`Unknown Anthology recipe: ${slug}`);
    }

    return {
      contents: [
        {
          uri,
          mimeType: 'text/markdown',
          text: recipe.markdown,
        },
      ],
    };
  }

  if (uri === 'anthology://verify/checks') {
    const checks = supportedFindingCodes.map((findingCode) => ({
      findingCode,
      ...getFixGuide(findingCode),
    }));

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: `${JSON.stringify({ checks }, null, 2)}\n`,
        },
      ],
    };
  }

  throw new Error(`Unknown Anthology resource: ${uri}`);
}

export function listTools() {
  return [
    {
      name: 'anthology_get_tokens',
      description: 'Read Anthology design tokens or a specific nested path inside tokens.json.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Optional dot path such as tokens.typography.roles or tokens.color.',
          },
        },
        additionalProperties: false,
      },
    },
    {
      name: 'anthology_get_schema',
      description: 'Read Anthology schema or schema presets, optionally narrowed to a nested path.',
      inputSchema: {
        type: 'object',
        properties: {
          kind: {
            type: 'string',
            enum: ['schema', 'schema-presets'],
            description: 'Which Anthology contract file to read.',
          },
          path: {
            type: 'string',
            description: 'Optional dot path such as components.button or schemaPresets.hero-section.',
          },
        },
        additionalProperties: false,
      },
    },
    {
      name: 'anthology_list_recipes',
      description: 'List Anthology recipes, optionally filtered by a text query.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Optional case-insensitive search across recipe slug, title, and body.',
          },
        },
        additionalProperties: false,
      },
    },
    {
      name: 'anthology_get_recipe',
      description: 'Read one Anthology recipe by slug.',
      inputSchema: {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            description: 'Recipe slug such as hero-cta or contact-form.',
          },
        },
        required: ['slug'],
        additionalProperties: false,
      },
    },
    {
      name: 'anthology_verify_path',
      description: 'Run Anthology verification checks on an HTML, HTM, or Astro path.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Relative or absolute path to a file or directory.',
          },
          strict: {
            type: 'boolean',
            description: 'When true, warnings would also fail CI.',
          },
        },
        required: ['path'],
        additionalProperties: false,
      },
    },
    {
      name: 'anthology_suggest_fix',
      description: 'Map an Anthology verify finding code to concrete repair guidance and related recipes.',
      inputSchema: {
        type: 'object',
        properties: {
          findingCode: {
            type: 'string',
            description: 'Finding code such as section-heading-missing or action-group-no-primary.',
          },
        },
        required: ['findingCode'],
        additionalProperties: false,
      },
    },
  ];
}

function createToolResult(text, structuredContent) {
  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
    structuredContent,
  };
}

export async function callTool(name, args = {}) {
  if (name === 'anthology_get_tokens') {
    const artifact = await readJsonArtifact('tokens.json');
    const selected = getPropertyByPath(artifact.data, args.path);

    if (selected === undefined) {
      throw new Error(`Unknown tokens path: ${args.path}`);
    }

    return createToolResult(
      args.path
        ? `Returned Anthology tokens at path "${args.path}".`
        : 'Returned the full Anthology tokens contract.',
      {
        path: args.path ?? null,
        data: selected,
        availableTopLevelPaths: Object.keys(artifact.data),
      },
    );
  }

  if (name === 'anthology_get_schema') {
    const kind = args.kind === 'schema-presets' ? 'schema-presets' : 'schema';
    const filename = kind === 'schema-presets' ? 'schema-presets.json' : 'schema.json';
    const artifact = await readJsonArtifact(filename);
    const selected = getPropertyByPath(artifact.data, args.path);

    if (selected === undefined) {
      throw new Error(`Unknown ${kind} path: ${args.path}`);
    }

    return createToolResult(
      args.path
        ? `Returned Anthology ${kind} at path "${args.path}".`
        : `Returned the full Anthology ${kind}.`,
      {
        kind,
        path: args.path ?? null,
        data: selected,
        availableTopLevelPaths: Object.keys(artifact.data),
      },
    );
  }

  if (name === 'anthology_list_recipes') {
    const recipes = await listRecipeEntries();
    const query = String(args.query ?? '').trim().toLowerCase();
    const filtered = query ? recipes.filter((recipe) => recipe.searchText.includes(query)) : recipes;
    const payload = filtered.map(({ searchText, markdown, ...recipe }) => recipe);

    return createToolResult(
      filtered.length === 0
        ? 'No Anthology recipes matched that query.'
        : `Found ${filtered.length} Anthology recipe(s).`,
      {
        query: args.query ?? null,
        total: filtered.length,
        recipes: payload,
      },
    );
  }

  if (name === 'anthology_get_recipe') {
    const recipe = await getRecipeBySlug(String(args.slug));

    if (!recipe) {
      throw new Error(`Unknown Anthology recipe: ${args.slug}`);
    }

    return createToolResult(`Returned the Anthology recipe "${recipe.title}".`, {
      slug: recipe.slug,
      title: recipe.title,
      summary: recipe.summary,
      uri: recipe.uri,
      markdown: recipe.markdown,
    });
  }

  if (name === 'anthology_verify_path') {
    const { verifyPath } = await loadVerifyModule();
    const targetPath = resolveProjectPath(args.path);
    const result = await verifyPath(targetPath);
    const counts = {
      errors: result.findings.filter((finding) => finding.severity === 'error').length,
      warnings: result.findings.filter((finding) => finding.severity === 'warning').length,
    };
    const wouldFail = counts.errors > 0 || (Boolean(args.strict) && counts.warnings > 0);

    return createToolResult(
      `Verified ${result.files.length} file(s): ${counts.errors} error(s), ${counts.warnings} warning(s).`,
      {
        ...result,
        path: targetPath,
        counts,
        strict: Boolean(args.strict),
        wouldFail,
      },
    );
  }

  if (name === 'anthology_suggest_fix') {
    const findingCode = String(args.findingCode);
    const guide = getFixGuide(findingCode);
    const relevantRecipes = [];

    for (const slug of guide.relevantRecipes) {
      const recipe = await getRecipeBySlug(slug);

      if (recipe) {
        relevantRecipes.push({
          slug: recipe.slug,
          title: recipe.title,
          summary: recipe.summary,
          uri: recipe.uri,
        });
      }
    }

    return createToolResult(`Returned Anthology guidance for finding "${findingCode}".`, {
      findingCode,
      ...guide,
      relevantRecipes,
    });
  }

  throw new Error(`Unknown Anthology tool: ${name}`);
}
