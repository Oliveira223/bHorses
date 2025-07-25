// ---------------------- Tela De Carregamento --------------------- \\
const tempoMinimo = 800;
const inicio = Date.now();

window.addEventListener("load", function () {
  const tempoDecorrido = Date.now() - inicio;
  const tempoRestante = tempoMinimo - tempoDecorrido;

  const preload = document.getElementById("preload");
  const conteudo = document.getElementById("conteudo");

  preload.classList.add("esconder");

  setTimeout(() => {
    preload.style.display = "none";
    conteudo.classList.add("visivel"); // apenas tira o "fade"
  }, Math.max(0, tempoRestante)); // garante tempo mínimo

    // Imagens com blur (low-res -> high-res) — agora para todas
  const imgs = document.querySelectorAll('.blur-load');
  imgs.forEach(img => {
    const realSrc = img.dataset.src;

    // Pequeno delay para garantir que a low-res apareça primeiro
    setTimeout(() => {
      const highRes = new Image();
      highRes.src = realSrc;
      highRes.onload = () => {
        img.src = realSrc;
        img.classList.add('loaded');
      };
    }, 50);
  });
});

// ------------------- Menu De Navegação --------------------- \\
const navIcon = document.querySelector('.nav-icon-5');
const overlay = document.querySelector('.overlay');
const overlayLinks = document.querySelectorAll('.overlay a');

let isMenuOpen = false;

navIcon.addEventListener('click', () => {
  overlay.classList.toggle('open');
  navIcon.classList.toggle('open');

  isMenuOpen = !isMenuOpen;
  document.body.style.overflow = isMenuOpen ? 'hidden' : '';
});

overlayLinks.forEach(link => {
  link.addEventListener('click', () => {
    overlay.classList.remove('open');
    navIcon.classList.remove('open');
    document.body.style.overflow = '';
    isMenuOpen = false;
  });
});

// ----------------- Revelar Containers ------------------------- \\
const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
    }
  });
}, {
  threshold: 0.08
});

document.querySelectorAll('.revelar').forEach((el) => observer.observe(el));

// --------------- Scroll para cobrir tela (mobile) ------------------- \\
let jaRolou = false;

window.addEventListener('scroll', () => {
  if (window.innerWidth >= 768 || jaRolou) return;

  const secao = document.getElementById('links-imagens');
  const posicao = secao.getBoundingClientRect().top;

  if (posicao < 360 && posicao > -100) {
    jaRolou = true;
    secao.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      jaRolou = false;
    }, 4000);
  }
});


