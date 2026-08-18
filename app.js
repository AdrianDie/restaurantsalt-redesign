(function () {
  var header = document.getElementById('siteHeader');
  var toggleHeader = function () {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  toggleHeader();
  window.addEventListener('scroll', toggleHeader, { passive: true });

  var hamburger = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');
  var scrim = document.getElementById('mobileMenuScrim');

  var openMenu = function () {
    mobileMenu.classList.add('open');
    scrim.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  var closeMenu = function () {
    mobileMenu.classList.remove('open');
    scrim.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openMenu);
  mobileMenuClose.addEventListener('click', closeMenu);
  scrim.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var seasonBanner = document.getElementById('seasonBanner');
  if (seasonBanner) {
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var inSeason = (month === 4 && day >= 20) || (month === 5 && day <= 20);
    if (inSeason) seasonBanner.hidden = false;
  }
})();
