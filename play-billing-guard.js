(function () {
  function isAndroidAppContext() {
    var ua = navigator.userAgent || "";
    var params = new URLSearchParams(window.location.search || "");
    var ref = document.referrer || "";

    return (
      params.get("app") === "android" ||
      params.get("source") === "google_play" ||
      params.get("billing") === "google_play" ||
      ref.indexOf("android-app://") === 0 ||
      (/Android/i.test(ua) && /; wv\)/i.test(ua)) ||
      (/Android/i.test(ua) && /Version\/\d+\.\d+/i.test(ua) && /Chrome\//i.test(ua))
    );
  }

  function disableStripeCheckoutForGooglePlay() {
    if (!isAndroidAppContext()) return;

    document.documentElement.classList.add("google-play-app-context");

    var links = document.querySelectorAll('a[href*="buy.stripe.com"]');
    links.forEach(function (link) {
      link.dataset.originalHref = link.getAttribute("href") || "";
      link.removeAttribute("href");
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("role", "button");
      link.setAttribute("aria-disabled", "true");
      link.style.cursor = "not-allowed";
      link.style.opacity = "0.82";
      link.textContent = "Plan Pro próximamente en la app";

      if (!link.nextElementSibling || !link.nextElementSibling.classList || !link.nextElementSibling.classList.contains("google-play-billing-note")) {
        var note = document.createElement("p");
        note.className = "google-play-billing-note";
        note.textContent = "En la app Android publicada en Google Play no se ofrece compra directa por Stripe. Puedes usar la demo gratuita; el Plan Pro se habilitará en la app cuando exista un método compatible con Google Play.";
        note.style.margin = "10px 0 0";
        note.style.fontSize = "13px";
        note.style.lineHeight = "1.45";
        note.style.color = "#b8c2d8";
        link.insertAdjacentElement("afterend", note);
      }
    });

    var proCopyNodes = document.querySelectorAll("[data-google-play-copy]");
    proCopyNodes.forEach(function (node) {
      node.textContent = node.getAttribute("data-google-play-copy");
    });
  }

  window.applyGooglePlayBillingGuard = disableStripeCheckoutForGooglePlay;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", disableStripeCheckoutForGooglePlay);
  } else {
    disableStripeCheckoutForGooglePlay();
  }

  var observer = new MutationObserver(function () {
    disableStripeCheckoutForGooglePlay();
  });

  if (document.documentElement) {
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
