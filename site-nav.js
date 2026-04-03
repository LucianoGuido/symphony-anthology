const responsiveNavs = document.querySelectorAll('nav[data-mobile="collapse"]');

for (const nav of responsiveNavs) {
  const toggle = nav.querySelector('[data-role="nav-toggle"]');
  const menu = Array.from(nav.children).find((element) => element.tagName === 'UL' || element.tagName === 'OL');

  if (!toggle || !menu) {
    continue;
  }

  const mobileMedia = window.matchMedia('(max-width: 48rem)');

  const closeMenu = () => {
    nav.removeAttribute('data-expanded');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  };

  const openMenu = () => {
    nav.setAttribute('data-expanded', 'true');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
  };

  const toggleMenu = () => {
    if (nav.hasAttribute('data-expanded')) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const syncForViewport = () => {
    if (!mobileMedia.matches) {
      closeMenu();
    }
  };

  closeMenu();
  toggle.addEventListener('click', toggleMenu);

  menu.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMedia.matches) {
        closeMenu();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!mobileMedia.matches) {
      return;
    }

    if (!nav.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  if (typeof mobileMedia.addEventListener === 'function') {
    mobileMedia.addEventListener('change', syncForViewport);
  } else if (typeof mobileMedia.addListener === 'function') {
    mobileMedia.addListener(syncForViewport);
  }
}
