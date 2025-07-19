// Script para corrigir o problema do botão coração
document.addEventListener('DOMContentLoaded', function() {
  // Função para alternar a visibilidade do botão de surpresa
  window.toggleSurpresa = function() {
    const botao = document.getElementById('surpresa-botao');
    if (botao) {
      if (botao.style.opacity === '1') {
        botao.style.opacity = '0';
        botao.style.pointerEvents = 'none';
      } else {
        botao.style.opacity = '1';
        botao.style.pointerEvents = 'auto';
      }
    }
  };
  
  // Adicionar evento de clique ao botão do coração
  const botaoCoracao = document.querySelector('.heart-reveal');
  if (botaoCoracao) {
    botaoCoracao.addEventListener('click', window.toggleSurpresa);
  }
  
  // Adicionar evento de clique ao botão de ver surpresa
  const botaoVerSurpresa = document.getElementById('botao-ver-surpresa');
  if (botaoVerSurpresa) {
    botaoVerSurpresa.addEventListener('click', function() {
      if (typeof abrirModalSenha === 'function') {
        abrirModalSenha();
      }
    });
  }
});