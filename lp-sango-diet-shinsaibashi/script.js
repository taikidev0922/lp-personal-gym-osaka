document.addEventListener('DOMContentLoaded', function () {

  /* ---- 固定CTAボタン: スクロール300px で出現 ---- */
  var fixedCta = document.getElementById('fixedCta');
  if (fixedCta) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        fixedCta.classList.add('is-show');
      } else {
        fixedCta.classList.remove('is-show');
      }
    }, { passive: true });
  }

  /* ---- FAQアコーディオン ---- */
  document.querySelectorAll('.faq__q').forEach(function (q) {
    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');

    function toggle() {
      var item = q.closest('.faq__item');
      var opening = !item.classList.contains('is-open');

      /* 他を閉じる */
      document.querySelectorAll('.faq__item.is-open').forEach(function (el) {
        el.classList.remove('is-open');
        el.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      });

      if (opening) {
        item.classList.add('is-open');
        q.setAttribute('aria-expanded', 'true');
      }
    }

    q.addEventListener('click', toggle);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  /* ---- スクロールフェードイン ---- */
  var fadeItems = document.querySelectorAll(
    '.target__item, .reason-card, .results__item, .plan-card, .faq__item'
  );
  fadeItems.forEach(function (el) { el.classList.add('js-fade'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeItems.forEach(function (el) { io.observe(el); });

  /* ---- LINEボタン GA4 計測 ---- */
  document.querySelectorAll('.btn-line').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (typeof gtag !== 'function') return;
      var sec = btn.closest('section');
      gtag('event', 'line_click', {
        event_category: 'CTA',
        event_label: sec ? sec.className.split(' ')[0] : 'fixed'
      });
    });
  });

});
