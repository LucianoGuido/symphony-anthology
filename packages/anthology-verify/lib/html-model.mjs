const tagPattern = /<!--[\s\S]*?-->|<!DOCTYPE[\s\S]*?>|<\/?([A-Za-z][\w:-]*)([^>]*)>/g;
const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

function parseAttributes(raw) {
  const attributes = {};
  const attributePattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;

  while ((match = attributePattern.exec(raw)) !== null) {
    const [, rawName, doubleQuoted, singleQuoted, unquoted] = match;
    const name = rawName.toLowerCase();
    const value = doubleQuoted ?? singleQuoted ?? unquoted ?? '';
    attributes[name] = value;
  }

  return attributes;
}

export function parseHtmlDocument(source) {
  const nodes = [];
  const stack = [];
  let match;

  while ((match = tagPattern.exec(source)) !== null) {
    const [rawTag, rawName = '', rawAttributes = ''] = match;

    if (!rawName) {
      continue;
    }

    const tagName = rawName.toLowerCase();
    const isClosing = rawTag.startsWith('</');

    if (isClosing) {
      const matchingIndex = stack.map((node) => node.tagName).lastIndexOf(tagName);

      if (matchingIndex >= 0) {
        const openNode = stack[matchingIndex];
        openNode.closeStart = match.index;
        openNode.end = match.index + rawTag.length;
        stack.splice(matchingIndex);
      }

      continue;
    }

    const attributes = parseAttributes(rawAttributes);
    const selfClosing = rawTag.endsWith('/>') || voidElements.has(tagName);
    const parent = stack.at(-1) ?? null;
    const node = {
      id: nodes.length,
      tagName,
      attributes,
      start: match.index,
      openEnd: match.index + rawTag.length,
      closeStart: selfClosing ? match.index + rawTag.length : null,
      end: selfClosing ? match.index + rawTag.length : null,
      parentId: parent?.id ?? null,
      childIds: [],
    };

    nodes.push(node);

    if (parent) {
      parent.childIds.push(node.id);
    }

    if (!selfClosing) {
      stack.push(node);
    }
  }

  for (const node of stack) {
    node.closeStart = source.length;
    node.end = source.length;
  }

  return { source, nodes };
}

export function getAttribute(node, name) {
  return node.attributes[name.toLowerCase()];
}

export function hasAttribute(node, name) {
  return Object.hasOwn(node.attributes, name.toLowerCase());
}

export function getClassList(node) {
  return (getAttribute(node, 'class') ?? '').split(/\s+/).filter(Boolean);
}

export function getAncestors(node, model) {
  const ancestors = [];
  let current = node.parentId === null ? null : model.nodes[node.parentId];

  while (current) {
    ancestors.push(current);
    current = current.parentId === null ? null : model.nodes[current.parentId];
  }

  return ancestors;
}

export function getDescendants(node, model) {
  const descendants = [];
  const queue = [...node.childIds];

  while (queue.length > 0) {
    const childId = queue.shift();
    const child = model.nodes[childId];
    descendants.push(child);
    queue.unshift(...child.childIds);
  }

  return descendants;
}

export function hasDescendantTag(node, model, tagNames) {
  const wanted = new Set(tagNames.map((tagName) => tagName.toLowerCase()));
  return getDescendants(node, model).some((descendant) => wanted.has(descendant.tagName));
}

export function positionForIndex(source, index) {
  const prefix = source.slice(0, index);
  const lines = prefix.split('\n');
  return {
    line: lines.length,
    column: lines.at(-1).length + 1,
  };
}
