// IGM360 · mở, đóng mục trang trên điện thoại.
(function () {
  var dau = document.querySelector('.ig-dau');
  var nut = document.querySelector('.ig-menu');
  if (!dau || !nut) return;
  function dat(mo) {
    dau.classList.toggle('mo', mo);
    nut.setAttribute('aria-expanded', mo ? 'true' : 'false');
  }
  nut.addEventListener('click', function () {
    var mo = !dau.classList.contains('mo');
    dat(mo);
    if (mo) { var dau1 = dau.querySelector('.ig-nav a'); if (dau1) dau1.focus(); }
  });
  dau.addEventListener('click', function (ev) { if (ev.target.closest('.ig-nav a')) dat(false); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && dau.classList.contains('mo')) { dat(false); nut.focus(); }
  });
})();
