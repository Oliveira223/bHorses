// ---------------------- Tela De Carremento --------------------- \\
const tempoMinimo = 300; // mínimo 2 segundos
const inicio = Date.now();

window.onload = function () {
  const tempoDecorrido = Date.now() - inicio;
  const tempoRestante = tempoMinimo - tempoDecorrido;

  setTimeout(() => {
    const preload = document.getElementById("preload");
    const conteudo = document.getElementById("conteudo");

    // Aplica fade
    preload.classList.add("esconder");

    // Espera a transição de 1s terminar antes de esconder
    setTimeout(() => {
      preload.style.display = "none";
      conteudo.style.display = "block";
    }, 1000); // deve ser igual ao tempo da transição (1s)
  }, tempoRestante > 0 ? tempoRestante : 0);
};

// ------------------- Menu De Navegação --------------------- \\
const navIcon = document.querySelector('.nav-icon-5'); // O ícone do menu
const overlay = document.querySelector('.overlay'); // O overlay
const overlayLinks = document.querySelectorAll('.overlay a'); // Links dentro do overlay


// -----------------------EVENTO DE CLIQUE ---------------- \\
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


    // Fechar o overlay ao clicar em um link dentro dele
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('open'); // Fecha o overlay
            navIcon.classList.remove('open'); // Reseta o ícone

            document.body.style.overflow = ''; // Reativa o scroll da página
            isMenuOpen = false; // Atualiza o estado do menu
        });
    });


// ----------------- Revelar Containers ------------------------- \\
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


// --------------- Scroll para cobrir tela ------------------- \\
let jaRolou = false;

  window.addEventListener('scroll', () => 
  {
    if (window.innerWidth >= 768) return;  //apenas funciona para mobile
    if (jaRolou) return;

    const secao = document.getElementById('links-imagens');
    const posicao = secao.getBoundingClientRect().top;

    // Ativa o scroll automático apenas uma vez
     if (posicao < 350 && posicao > -80) //200 acima e 80 abaixo da viewport
     {
      jaRolou = true; // marca que já rolou
      secao.scrollIntoView({ behavior: 'smooth' });

       // Libera novamente depois de 4 segundos
       setTimeout(() => 
       {
         jaRolou = false;
       }, 4000);

      }
    }
  );

