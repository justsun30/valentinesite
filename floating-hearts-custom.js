// Script para criar corações flutuantes
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('floating-hearts');
  
  // Definir z-index negativo para o container
  container.style.zIndex = '-1';
  
  // Função para criar um coração flutuante
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = ['❤️', '💖', '💕', '💗', '💓', '💘'][Math.floor(Math.random() * 6)];
    
    // Posição inicial aleatória
    const startPos = Math.random() * 100;
    heart.style.left = startPos + 'vw';
    
    // Valores aleatórios para animação
    heart.style.setProperty('--tx', (Math.random() * 100 - 50) + 'px');
    heart.style.setProperty('--r', (Math.random() * 360) + 'deg');
    
    // Tamanho aleatório
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    container.appendChild(heart);
    
    // Remover após a animação
    setTimeout(() => {
      heart.remove();
    }, 15000);
  }
  
  // Criar corações em intervalos aleatórios
  setInterval(createHeart, 1000);
  
  // Criar alguns corações iniciais
  for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, Math.random() * 1500);
  }
});