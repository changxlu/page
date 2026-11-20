const filters = document.querySelector('.filters');
const filterButtons = [...filters.querySelectorAll('button')];
const cards = [...document.querySelectorAll('.card[data-category]')];
const filterResult = document.querySelector('#filter-result');

filters.hidden = false;
filters.addEventListener('click', event => {
  const selected = event.target.closest('button[data-filter]');
  if (!selected) return;

  const category = selected.dataset.filter;
  for (const button of filterButtons) {
    button.setAttribute('aria-pressed', button === selected);
  }

  let count = 0;
  for (const card of cards) {
    card.hidden = category !== 'all' && !card.dataset.category.split(' ').includes(category);
    if (!card.hidden) count++;
  }
  filterResult.textContent = `Showing ${count} of ${cards.length} experiences.`;
});

if ('IntersectionObserver' in window && 'animate' in Element.prototype) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const reveal = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!reducedMotion.matches) {
        entry.target.animate(
          [
            { opacity: 0.72, transform: 'translateY(9px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 360, easing: 'ease-out' }
        );
      }
      reveal.unobserve(entry.target);
    }
  });
  for (const card of cards) reveal.observe(card);
}
