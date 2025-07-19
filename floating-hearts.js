// 1. Efeito de partículas flutuantes de corações
function createFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  const heartSymbols = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝'];
  
  // Criar 20 corações
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
      heart.style.setProperty('--r', (Math.random() * 360) + 'deg');
      heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
      container.appendChild(heart);
      
      // Remover coração após a animação
      setTimeout(() => {
        heart.remove();
      }, 15000);
    }, i * 1000);
  }
  
  // Continuar criando corações
  setInterval(createHeartBatch, 15000);
}

function createHeartBatch() {
  const container = document.getElementById('floating-hearts');
  const heartSymbols = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝'];
  
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
    heart.style.setProperty('--r', (Math.random() * 360) + 'deg');
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    container.appendChild(heart);
    
    // Remover coração após a animação
    setTimeout(() => {
      heart.remove();
    }, 15000);
  }
}

// 2. Modo escuro/claro
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  });
  
  // Verificar tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }
}

// 3. Mensagens secretas
function addSecretMessages() {
  const secretSpots = [
    { selector: 'header h1', message: 'Eu te amo mais a cada dia! ❤️' },
    { selector: '.bem-vindo-coracao', message: 'Você é o amor da minha vida!' },
    { selector: '#dias-juntos h2', message: 'E muitos mais virão!' },
    { selector: '.heart-icon', message: 'Clique para uma surpresa especial!' },
    { selector: '#cartinha h2', message: 'Escrito com todo meu amor' }
  ];
  
  secretSpots.forEach(spot => {
    const elements = document.querySelectorAll(spot.selector);
    elements.forEach(el => {
      el.classList.add('secret-trigger');
      const message = document.createElement('div');
      message.className = 'secret-message';
      message.textContent = spot.message;
      el.appendChild(message);
    });
  });
}

// 7. Efeito de digitação
function addTypingEffect() {
  const cartinha = document.querySelector('#cartinha p');
  if (cartinha) {
    const text = cartinha.textContent;
    cartinha.innerHTML = '';
    cartinha.classList.add('typing-effect');
    
    let i = 0;
    const speed = 50; // velocidade da digitação
    
    function typeWriter() {
      if (i < text.length) {
        cartinha.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        cartinha.classList.remove('typing-effect');
      }
    }
    
    // Iniciar efeito quando a seção estiver visível
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('#cartinha'));
  }
}

// 10. Efeito de zoom nas fotos
function setupImageZoom() {
  // Criar container de zoom
  const zoomContainer = document.createElement('div');
  zoomContainer.className = 'zoom-container';
  zoomContainer.innerHTML = `
    <button class="zoom-close">&times;</button>
    <img class="zoom-image" src="" alt="Imagem ampliada">
  `;
  document.body.appendChild(zoomContainer);
  
  // Adicionar evento de clique em todas as imagens
  const images = document.querySelectorAll('.carousel-track img, .polaroid img');
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      const zoomImg = document.querySelector('.zoom-image');
      zoomImg.src = this.src;
      zoomContainer.classList.add('active');
    });
  });
  
  // Fechar zoom
  document.querySelector('.zoom-close').addEventListener('click', () => {
    zoomContainer.classList.remove('active');
  });
  
  // Fechar ao clicar fora da imagem
  zoomContainer.addEventListener('click', function(e) {
    if (e.target === this) {
      zoomContainer.classList.remove('active');
    }
  });
}

// 4. Galeria de memórias expandida com efeito polaroid
function createPolaroidGallery() {
  const memories = [
    { img: '1.jpg', caption: 'Nosso primeiro encontro ❤️' },
    { img: '3.jpg', caption: 'Aquele dia especial' },
    { img: '4.jpg', caption: 'Momentos que guardo no coração' },
    { img: 'img5.jpg', caption: 'Sempre juntos' },
    { img: '6.jpg', caption: 'Te amo demais!' },
    { img: '7.jpg', caption: 'Meu amor' }
  ];
  
  const gallery = document.createElement('div');
  gallery.className = 'polaroid-gallery';
  
  memories.forEach(memory => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.style.setProperty('--rotation', `${Math.random() * 10 - 5}deg`);
    
    polaroid.innerHTML = `
      <img src="${memory.img}" alt="${memory.caption}">
      <p>${memory.caption}</p>
    `;
    
    gallery.appendChild(polaroid);
  });
  
  // Adicionar a galeria após o carrossel
  const galeria = document.getElementById('galeria');
  galeria.appendChild(gallery);
}

// Inicializar todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  createFloatingHearts();
  setupThemeToggle();
  setTimeout(() => {
    addSecretMessages();
    addTypingEffect();
    setupImageZoom();
    createPolaroidGallery();
  }, 1000);
});