// script.js - LP固有スクリプト

document.addEventListener('DOMContentLoaded', function () {

  // ===== スクロールアニメーション =====
  const fadeTargets = document.querySelectorAll(
    '.target-item, .reason-card, .result-item, .pricing-card, .faq-item'
  );

  fadeTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeTargets.forEach(function (el) {
    observer.observe(el);
  });


  // ===== FAQアコーディオン（スムーズ開閉） =====
  document.querySelectorAll('.faq-q').forEach(function (question) {
    const answer = question.nextElementSibling;
    if (!answer) return;

    // 初期状態：FAは非表示
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
    answer.style.paddingTop = '0';
    answer.style.paddingBottom = '0';

    question.setAttribute('aria-expanded', 'false');
    question.style.cursor = 'pointer';

    question.addEventListener('click', function () {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        answer.style.maxHeight = '0';
        answer.style.paddingTop = '0';
        answer.style.paddingBottom = '0';
        question.setAttribute('aria-expanded', 'false');
      } else {
        answer.style.maxHeight = answer.scrollHeight + 60 + 'px';
        answer.style.paddingTop = '18px';
        answer.style.paddingBottom = '18px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // ===== LINEボタンのクリック計測（GA4 イベント） =====
  document.querySelectorAll('.line-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var label = btn.closest('section')
        ? btn.closest('section').id || 'unknown'
        : 'unknown';

      if (typeof gtag === 'function') {
        gtag('event', 'line_click', {
          event_category: 'CTA',
          event_label: label,
        });
      }
    });
  });

});
