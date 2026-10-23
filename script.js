// Lightweight enhancements: mobile navigation, project filtering, and footer year.
// The core site works without JavaScript and needs no server or API keys.

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

function closeNavigation() {
  if (!menuToggle || !nav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('is-open');
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeNavigation();
  });

  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) closeNavigation();
  });
}

const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project-card[data-category]');
const announcement = document.getElementById('filter-announcement');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });

    projects.forEach(project => {
      const shouldShow = filter === 'all' || project.dataset.category === filter;
      project.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    if (announcement) {
      announcement.textContent = `${visibleCount} project${visibleCount === 1 ? '' : 's'} displayed.`;
    }
  });
});

const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) copyrightYear.textContent = String(new Date().getFullYear());
