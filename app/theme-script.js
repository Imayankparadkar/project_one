(function() {
  try {
    // Get stored theme
    var stored = localStorage.getItem('theme');
    var theme = stored;
    
    // If no stored theme, use system preference
    if (!theme || (theme !== 'light' && theme !== 'dark')) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Apply theme immediately
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    
    // Also set a CSS variable for immediate access
    document.documentElement.style.setProperty('--initial-theme', theme);
    
  } catch (e) {
    // Fallback to system theme if anything fails
    try {
      var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
      document.documentElement.setAttribute('data-theme', systemTheme);
    } catch (err) {}
  }
})();
