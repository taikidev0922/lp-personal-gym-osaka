// common.js - 共通スクリプト

// スムーススクロール（anchorリンク）
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// スクロール時にヘッダーCTAを表示
function initStickyLineCta() {
  const stickyBtn = document.getElementById('sticky-line-btn');
  if (!stickyBtn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      stickyBtn.classList.add('visible');
    } else {
      stickyBtn.classList.remove('visible');
    }
  });
}

document.addEventListener('DOMContentLoaded', initStickyLineCta);

// UTMパラメータをLINEリンクに付与
function appendUtmToLineLinks() {
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
    if (params.has(key)) utm[key] = params.get(key);
  });

  if (Object.keys(utm).length === 0) return;

  document.querySelectorAll('a.line-btn').forEach(function (link) {
    const url = new URL(link.href);
    Object.entries(utm).forEach(function ([k, v]) {
      url.searchParams.set(k, v);
    });
    link.href = url.toString();
  });
}

document.addEventListener('DOMContentLoaded', appendUtmToLineLinks);
