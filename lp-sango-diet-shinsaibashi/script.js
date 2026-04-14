// script.js - LP固有スクリプト

document.addEventListener('DOMContentLoaded', function () {

  // ===== スクロールアニメーション =====
  var fadeTargets = document.querySelectorAll(
    '.target-item, .reason-card, .result-item, .pricing-card, .faq-item'
  );

  fadeTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeTargets.forEach(function (el) { observer.observe(el); });


  // ===== FAQアコーディオン =====
  // CSSで max-height: 0 / is-open で開閉する方式
  document.querySelectorAll('.faq-q').forEach(function (question) {
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('tabindex', '0');

    function toggle() {
      var item = question.closest('.faq-item');
      var isOpen = item.classList.contains('is-open');

      // 他を閉じる
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    }

    question.addEventListener('click', toggle);
    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });


  // ===== LINEボタン クリック計測（GA4） =====
  document.querySelectorAll('.line-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var section = btn.closest('section');
      var label = section ? (section.id || 'unknown') : 'sticky';
      if (typeof gtag === 'function') {
        gtag('event', 'line_click', { event_category: 'CTA', event_label: label });
      }
    });
  });

});
