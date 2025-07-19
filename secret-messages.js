// Script para adicionar mensagens secretas
document.addEventListener('DOMContentLoaded', function() {
  // Lista de elementos e suas mensagens secretas
  const secretSpots = [
    { selector: 'header h1', message: 'Eu te amo mais a cada dia! ❤️' },
    { selector: '#cartinha h2', message: 'Escrito com todo meu amor' },
    { selector: '#dias-juntos h2', message: 'E muitos mais virão!' },
    { selector: '#quiz h2', message: 'Será que você vai acertar tudo?' },
    { selector: '#motivos h2', message: 'Na verdade eu amo tudo em você!' },
    { selector: '#filmes h2', message: 'Qual você vai escolher hoje?' },
    { selector: '.rodape p', message: 'Te amo para sempre!' }
  ];
  
  // Adicionar mensagens secretas aos elementos
  secretSpots.forEach(spot => {
    const elements = document.querySelectorAll(spot.selector);
    elements.forEach(el => {
      // Verificar se o elemento já tem uma mensagem secreta
      if (!el.querySelector('.secret-message')) {
        el.classList.add('secret-trigger');
        
        const message = document.createElement('div');
        message.className = 'secret-message';
        message.textContent = spot.message;
        el.appendChild(message);
      }
    });
  });
});