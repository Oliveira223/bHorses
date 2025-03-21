window.onload = function () {
  document.getElementById("preload").style.display = "none";  // Esconde a tela de carregamento
  document.getElementById("conteudo").style.display = "block";  // Exibe o conteúdo
};


const icons = document.querySelectorAll('.icon');
const overlay = document.querySelector('.overlay');
const icon = document.querySelector('.icon.nav-icon-5');
const navMenu = document.querySelector('.nav-menu');

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        // Alterna a classe 'open' no overlay (para exibir ou ocultar a camada cinza)
        overlay.classList.toggle('open');

        // Alterna a classe 'open' no ícone (hambúrguer para X)
        icon.classList.toggle('open');

        // Alterna a classe 'open' no menu de navegação
        navMenu.classList.toggle('open');
    });
});


