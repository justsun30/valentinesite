// Script para corrigir o carrossel
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se os elementos do carrossel existem
  const viewport = document.getElementById('carouselViewport');
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!viewport || !track || !prevBtn || !nextBtn) {
    console.error('Elementos do carrossel não encontrados');
    return;
  }
  
  const polaroids = track.querySelectorAll('.polaroid');
  if (!polaroids.length) {
    console.error('Nenhuma polaroid encontrada');
    return;
  }
  
  // Verificar se as imagens estão carregando corretamente
  polaroids.forEach((polaroid, index) => {
    const img = polaroid.querySelector('img');
    if (img) {
      img.onerror = function() {
        console.error(`Erro ao carregar imagem ${index + 1}: ${img.src}`);
        // Substituir por uma imagem de placeholder
        this.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="200" viewBox="0 0 280 200"%3E%3Crect width="280" height="200" fill="%23f8bbd0"%3E%3C/rect%3E%3Ctext x="50%" y="50%" font-family="Arial" font-size="20" text-anchor="middle" fill="%23880e4f"%3EImagem não encontrada%3C/text%3E%3C/svg%3E';
      };
      img.onload = function() {
        console.log(`Imagem ${index + 1} carregada com sucesso`);
      };
    }
  });
  
  let currentIndex = 0;
  
  // Função para ir para um slide específico
  function goToSlide(index) {
    const totalSlides = polaroids.length;
    
    // Garantir que o índice esteja dentro dos limites
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    
    const polaroidWidth = polaroids[0].offsetWidth; // largura total incluindo margens
    
    // Usar transform em vez de scrollTo para melhor desempenho
    track.style.transform = `translateX(-${index * polaroidWidth}px)`;
    
    updateIndicators(index);
    currentIndex = index;
    
    // Adicionar efeito de destaque ao slide atual
    polaroids.forEach((polaroid, i) => {
      if (i === index) {
        polaroid.classList.add('active');
      } else {
        polaroid.classList.remove('active');
      }
    });
  }
  
  // Função para atualizar indicadores
  function updateIndicators(index) {
    const indicators = document.querySelectorAll('.polaroid-carousel-indicator');
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Função para avançar para o próximo slide (com loop)
  function nextSlide() {
    const totalSlides = polaroids.length;
    if (currentIndex >= totalSlides - 1) {
      goToSlide(0); // Volta para o primeiro slide
    } else {
      goToSlide(currentIndex + 1);
    }
  }
  
  // Função para voltar para o slide anterior (com loop)
  function prevSlide() {
    const totalSlides = polaroids.length;
    if (currentIndex <= 0) {
      goToSlide(totalSlides - 1); // Vai para o último slide
    } else {
      goToSlide(currentIndex - 1);
    }
  }
  
  // Adicionar eventos aos botões
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Criar container de indicadores
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'polaroid-carousel-indicators';
  
  // Criar indicadores (um para cada foto)
  for (let i = 0; i < polaroids.length; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'polaroid-carousel-indicator';
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => {
      goToSlide(i);
    });
    indicatorsContainer.appendChild(indicator);
  }
  
  // Adicionar container de indicadores ao carrossel
  const carouselContainer = document.querySelector('.polaroid-carousel-container');
  if (carouselContainer) {
    // Remover indicadores antigos se existirem
    const oldIndicators = carouselContainer.querySelector('.polaroid-carousel-indicators');
    if (oldIndicators) {
      oldIndicators.remove();
    }
    carouselContainer.appendChild(indicatorsContainer);
  }
  
  // Adicionar efeito de rotação aleatória nas polaroids
  polaroids.forEach(polaroid => {
    // Rotação aleatória sutil para cada polaroid
    const randomRotation = (Math.random() * 4 - 2); // entre -2 e 2 graus
    polaroid.style.setProperty('--rotation', `${randomRotation}deg`);
    
    // Efeito de hover
    polaroid.addEventListener('mouseenter', () => {
      polaroid.style.transform = 'scale(1.05) rotate(0deg)';
    });
    
    polaroid.addEventListener('mouseleave', () => {
      polaroid.style.transform = `scale(1) rotate(${randomRotation}deg)`;
    });
  });
  
  // Adicionar suporte para gestos de toque (swipe)
  let touchStartX = 0;
  let touchEndX = 0;
  
  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  viewport.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe para a esquerda (próximo slide)
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe para a direita (slide anterior)
      prevSlide();
    }
  }
  
  // Adicionar suporte para navegação por teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
  
  // Autoplay: troca a foto a cada 4 segundos
  let autoplayInterval = setInterval(nextSlide, 4000);
  
  // Pausar autoplay quando o mouse estiver sobre o carrossel
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  // Retomar autoplay quando o mouse sair do carrossel
  carouselContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 4000);
  });
  
  // Inicializar o carrossel
  goToSlide(0);
  console.log('Carrossel inicializado com sucesso');
  
  // Adicionar classe para indicar que o carrossel está pronto
  carouselContainer.classList.add('carousel-initialized');
});