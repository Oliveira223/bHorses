window.onload = function () {
    document.getElementById("preload").style.display = "none";  // Esconde a tela de carregamento
    document.getElementById("conteudo").style.display = "block";  // Exibe o conteúdo
};

const navIcon = document.querySelector('.nav-icon-5'); // O ícone do menu
const overlay = document.querySelector('.overlay'); // O overlay
const overlayLinks = document.querySelectorAll('.overlay a'); // Links dentro do overlay


/* ---------------------------EVENTO DE CLIQUE ----------------------------- */
let isMenuOpen = false;



    /*decteca o clique no navMenu*/
    navIcon.addEventListener('click', () => {
        console.log('Ícone clicado');

        // Alterna a classe 'open' no overlay para exibir ou ocultar
        overlay.classList.toggle('open');
        // Alterna a classe 'open' no ícone do menu para o efeito de animação
        navIcon.classList.toggle('open');

        //torna isMenuOpen Verdadeiro, o que faz os ifs realizarem suas devidas taredas
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';  // Bloqueia o scroll
            console.log('scroll desativado');
        } else {
            document.body.style.overflow = '';  // Restaura o scroll
            console.log('scroll reativado');
        }
    });

/* ------------------------------------------------------------------------ */


    // Fechar o overlay ao clicar em um link dentro dele
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('open'); // Fecha o overlay
            navIcon.classList.remove('open'); // Reseta o ícone

            document.body.style.overflow = ''; // Reativa o scroll da página
            isMenuOpen = false; // Atualiza o estado do menu
        });
    });


/* ----------------- Revelar -------------------------- */
const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        // Se quiser animar só uma vez, descomente:
        // observer.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.2 // só ativa quando 20% da div estiver visível
  });

  document.querySelectorAll('.revelar').forEach((el) => observer.observe(el));


/* ------------- Scroll para cobrir tela ------------- */
let jaRolou = false;

  window.addEventListener('scroll', () => {
    if (jaRolou) return;

    const secao = document.getElementById('links-imagens');
    const posicao = secao.getBoundingClientRect().top;

    // Ativa o scroll automático apenas uma vez
    if (posicao < 150 && posicao > 0) {
      jaRolou = true; // marca que já rolou
      secao.scrollIntoView({ behavior: 'smooth' });
    }
  });