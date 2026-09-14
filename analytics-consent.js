(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-3CT444VHQ4';
  var CONSENT_KEY = 'smia_analytics_consent_v1';
  var tagLoaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  function loadTag() {
    if (tagLoaded) return;
    tagLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(script);
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID, {
      send_page_view: true,
      anonymize_ip: true
    });
  }

  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
    if (value === 'granted') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      loadTag();
    } else {
      gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    removeBanner();
  }

  function removeBanner() {
    var banner = document.getElementById('smia-cookie-banner');
    if (banner) banner.remove();
  }

  function showBanner() {
    if (document.getElementById('smia-cookie-banner')) return;
    var wrap = document.createElement('div');
    wrap.id = 'smia-cookie-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Preferencias de analítica');
    wrap.style.cssText = 'position:fixed;z-index:2147483647;left:16px;right:16px;bottom:16px;max-width:760px;margin:auto;background:#0b1020;color:#fff;border:1px solid #334155;border-radius:18px;padding:16px;box-shadow:0 18px 60px rgba(0,0,0,.45);font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif';
    wrap.innerHTML = '<div style="font-weight:800;margin-bottom:6px">Analítica y cookies</div>' +
      '<div style="font-size:14px;line-height:1.5;color:#cbd5e1">Usamos Google Analytics 4 solo si aceptas, para medir visitas y mejorar Sistema Maestro IA. Puedes rechazar sin afectar al funcionamiento esencial. <a href="/cookies-policy.html" style="color:#67e8f9">Política de cookies</a>.</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">' +
      '<button id="smia-cookie-reject" type="button" style="padding:10px 14px;border-radius:12px;border:1px solid #475569;background:#111827;color:#fff;cursor:pointer">Rechazar</button>' +
      '<button id="smia-cookie-accept" type="button" style="padding:10px 14px;border-radius:12px;border:0;background:#22d3ee;color:#06202a;font-weight:800;cursor:pointer">Aceptar analítica</button>' +
      '</div>';
    document.body.appendChild(wrap);
    document.getElementById('smia-cookie-reject').addEventListener('click', function(){ setConsent('denied'); });
    document.getElementById('smia-cookie-accept').addEventListener('click', function(){ setConsent('granted'); });
  }

  window.smiaTrack = function (eventName, params) {
    if (localStorage.getItem(CONSENT_KEY) !== 'granted') return;
    loadTag();
    gtag('event', eventName, params || {});
  };

  window.SMIAAnalytics = {
    measurementId: MEASUREMENT_ID,
    getConsent: function(){ return localStorage.getItem(CONSENT_KEY); },
    grant: function(){ setConsent('granted'); },
    deny: function(){ setConsent('denied'); },
    reset: function(){ localStorage.removeItem(CONSENT_KEY); showBanner(); }
  };

  var saved = localStorage.getItem(CONSENT_KEY);
  if (saved === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    loadTag();
  } else if (!saved) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showBanner);
    else showBanner();
  }
})();
