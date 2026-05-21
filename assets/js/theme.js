(function() {
  var toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('garch-theme', theme); } catch(e) {}
  }

  function getPreferredTheme() {
    try {
      var saved = localStorage.getItem('garch-theme');
      if (saved) return saved;
    } catch(e) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(getPreferredTheme());

  toggle.addEventListener('click', function() {
    var current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
})();
