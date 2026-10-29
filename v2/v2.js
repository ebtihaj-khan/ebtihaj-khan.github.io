// v2 only: pause looping exhibits when they leave the screen or when motion is paused.
(() => {
  const root = document.documentElement;
  const gmap = document.querySelector('.gmap');
  if (gmap) new IntersectionObserver(([e]) => gmap.classList.toggle('is-off', !e.isIntersecting)).observe(gmap);

  const gps = document.querySelector('.viz--gps svg');
  if (!gps || !gps.pauseAnimations) return;
  let visible = false;
  const sync = () => (visible && !root.classList.contains('is-still')) ? gps.unpauseAnimations() : gps.pauseAnimations();
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }).observe(gps);
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['class'] });
  sync();
})();
