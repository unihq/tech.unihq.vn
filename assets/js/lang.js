(function () {
  var root = document.documentElement;
  function setLang(l, remember) {
    if (l !== 'vi' && l !== 'en') l = 'vi';
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
    var btns = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-set-lang') === l ? 'true' : 'false');
    }
    if (remember) { try { localStorage.setItem('uni-lang', l); } catch (e) {} }
  }
  // Thứ tự chọn ngôn ngữ: ?lang= trên đường dẫn → lựa chọn người xem đã bấm trước đó →
  // lần đầu vào: trình duyệt dùng tiếng Việt thì hiện tiếng Việt, ngôn ngữ khác thì hiện tiếng Anh.
  var start = 'vi', q = null, saved = null;
  try {
    q = new URLSearchParams(location.search).get('lang');
    saved = localStorage.getItem('uni-lang');
  } catch (e) {}
  if (q === 'vi' || q === 'en') start = q;
  else if (saved === 'vi' || saved === 'en') start = saved;
  else {
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'vi'];
    start = /^vi\b/i.test(String(langs[0] || 'vi')) ? 'vi' : 'en';
  }
  setLang(start, q === 'vi' || q === 'en');
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-set-lang]');
    if (b) setLang(b.getAttribute('data-set-lang'), true);
  });
})();
