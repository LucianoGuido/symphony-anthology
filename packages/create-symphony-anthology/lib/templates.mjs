export const templates = {
  html: {
    label: 'Static HTML',
    directory: 'html',
    assetCopies: [
      {
        source: 'dist/symphony.core.css',
        destination: 'styles/symphony.core.css',
      },
    ],
    nextSteps: [
      'Open index.html directly or serve the folder with a static server.',
      'Start editing index.html and styles/site.css.',
    ],
  },
  astro: {
    label: 'Astro',
    directory: 'astro',
    assetCopies: [
      {
        source: 'dist/symphony.core.css',
        destination: 'src/styles/symphony.core.css',
      },
    ],
    nextSteps: [
      'Run npm install.',
      'Run npm run dev.',
    ],
  },
  next: {
    label: 'Next.js',
    directory: 'next',
    assetCopies: [
      {
        source: 'dist/symphony.core.css',
        destination: 'app/symphony.core.css',
      },
    ],
    nextSteps: [
      'Run npm install.',
      'Run npm run dev.',
    ],
  },
};

export function getTemplate(name) {
  return templates[name] ?? null;
}

export function listTemplateNames() {
  return Object.keys(templates);
}
