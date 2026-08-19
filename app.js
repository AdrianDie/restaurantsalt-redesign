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

(function () {
  var STORAGE_KEY = 'saltCookieConsent';
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) {}
  if (saved) return;

  var overlay = document.createElement('div');
  overlay.className = 'cookie-overlay';
  overlay.innerHTML =
    '<div class="cookie-banner" role="dialog" aria-modal="true" aria-label="Informasjonskapsler">' +
      '<h2>Vi respekterer personvernet ditt</h2>' +
      '<p>Vi bruker informasjonskapsler for å forbedre nettleseropplevelsen din, vise personlig tilpassede annonser eller innhold, og analysere trafikken vår. Ved å klikke på «Godta alle», samtykker du til vår bruk av informasjonskapsler.</p>' +
      '<div class="cookie-settings" id="cookieSettings">' +
        '<div class="cookie-setting-row">' +
          '<div><div class="cookie-setting-name">Nødvendige</div><div class="cookie-setting-desc">Kreves for at siden skal fungere. Kan ikke skrus av.</div></div>' +
          '<span class="cookie-toggle"><input type="checkbox" checked disabled><span class="cookie-toggle-track"></span></span>' +
        '</div>' +
        '<div class="cookie-setting-row">' +
          '<div><div class="cookie-setting-name">Statistikk</div><div class="cookie-setting-desc">Hjelper oss forstå hvordan siden brukes.</div></div>' +
          '<span class="cookie-toggle"><input type="checkbox" id="cookieStatsToggle"><span class="cookie-toggle-track"></span></span>' +
        '</div>' +
      '</div>' +
      '<div class="cookie-banner-actions">' +
        '<button type="button" class="btn cookie-btn-outline" id="cookieCustomize">Tilpass</button>' +
        '<button type="button" class="btn cookie-btn-outline" id="cookieReject">Avvis</button>' +
        '<button type="button" class="btn cookie-btn-accept" id="cookieAccept">Aksepter alt</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  var save = function (consent) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)); } catch (e) {}
    overlay.remove();
  };

  document.getElementById('cookieAccept').addEventListener('click', function () {
    save({ necessary: true, statistics: true });
  });
  document.getElementById('cookieReject').addEventListener('click', function () {
    save({ necessary: true, statistics: false });
  });
  document.getElementById('cookieCustomize').addEventListener('click', function () {
    var panel = document.getElementById('cookieSettings');
    var opened = panel.classList.toggle('open');
    if (!opened) return;
    this.remove();
    var saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'btn cookie-btn-accept cookie-save-btn';
    saveBtn.textContent = 'Lagre valg';
    saveBtn.addEventListener('click', function () {
      save({ necessary: true, statistics: document.getElementById('cookieStatsToggle').checked });
    });
    panel.appendChild(saveBtn);
  });
})();
