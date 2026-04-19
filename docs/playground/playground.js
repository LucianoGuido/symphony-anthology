const copyButtons = document.querySelectorAll('[data-copy-target]');

for (const button of copyButtons) {
  const originalLabel = button.textContent;

  button.addEventListener('click', async () => {
    const targetId = button.getAttribute('data-copy-target');
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const markup = target.textContent ?? '';

    try {
      await navigator.clipboard.writeText(markup);
      button.textContent = 'Copied';
      button.setAttribute('data-copy-state', 'done');

      window.setTimeout(() => {
        button.textContent = originalLabel;
        button.removeAttribute('data-copy-state');
      }, 1600);
    } catch {
      button.textContent = 'Copy failed';

      window.setTimeout(() => {
        button.textContent = originalLabel;
      }, 1600);
    }
  });
}
