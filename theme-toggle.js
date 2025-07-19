// Script para alternar entre tema claro e escuro
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Verificar tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
    checkDarkImage();
  }
  
  // Alternar tema
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '☀️';
      checkDarkImage();
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌙';
      document.documentElement.style.setProperty('--bg-image', 'url("version3.png")');
      document.documentElement.style.setProperty('--bg-overlay', 'none');
    }
  });
  
  // Função para verificar e usar a imagem escura se existir
  function checkDarkImage() {
    const darkImg = new Image();
    darkImg.src = 'version3-dark.png';
    
    darkImg.onload = function() {
      // A imagem escura existe, vamos usá-la
      document.documentElement.style.setProperty('--bg-image', 'url("version3-dark.png")');
      document.documentElement.style.setProperty('--bg-overlay', 'none');
    };
    
    darkImg.onerror = function() {
      // A imagem escura não existe, usar overlay
      document.documentElement.style.setProperty('--bg-image', 'url("version3.png")');
      document.documentElement.style.setProperty('--bg-overlay', 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))');
    };
  }
});