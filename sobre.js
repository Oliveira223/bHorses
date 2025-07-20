// ================================
// Visualizador de imagens estilo galeria (com scroll e botões)
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const imagens = Array.from(document.querySelectorAll(".thumb-secundaria"));
  if (imagens.length === 0) return;

  // ================================
  // Criação do visualizador fullscreen
  // ================================
  const viewer = document.createElement("div");
  viewer.id = "imagem-viewer";
  viewer.innerHTML = `
  <button class="fechar">
    <img src="icons/close.svg" alt="Fechar">
  </button>

  <button class="navegacao prev">
    <img src="icons/arrow-left.svg" alt="Anterior">
  </button>

  <div class="imagem-scroll-container"></div>
  <button class="navegacao next">
    <img src="icons/arrow-right.svg" alt="Próxima">
  </button>
`;
  document.body.appendChild(viewer);

  const scrollContainer = viewer.querySelector(".imagem-scroll-container");
  let atual = 0;

  // ================================
  // Clona as miniaturas para o viewer fullscreen
  // ================================
  imagens.forEach((img) => {
    const clone = document.createElement("img");
    clone.src = img.src;
    clone.classList.add("imagem-fullscreen");
    scrollContainer.appendChild(clone);
  });

  const imagensFullscreen = scrollContainer.querySelectorAll(".imagem-fullscreen");

  // ================================
  // Abrir visualizador e posicionar a imagem atual
  // ================================
  function abrir(index) {
    atual = index;
    viewer.style.display = "flex";
    document.body.classList.add("modal-aberto");

    const targetImage = imagensFullscreen[atual];
    targetImage.scrollIntoView({
      behavior: "auto",
      inline: "center",
      block: "nearest"
    });
  }

  // ================================
  // Fechar visualizador
  // ================================
  function fechar() {
    viewer.style.display = "none";
    document.body.classList.remove("modal-aberto");
  }

  // ================================
  // Navegação com botões
  // ================================
  function proxima() {
    atual = (atual + 1) % imagensFullscreen.length;
    imagensFullscreen[atual].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }

  function anterior() {
    atual = (atual - 1 + imagensFullscreen.length) % imagensFullscreen.length;
    imagensFullscreen[atual].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }

  // ================================
  // Eventos
  // ================================
  imagens.forEach((img, index) => {
    img.addEventListener("click", () => abrir(index));
  });

  viewer.querySelector(".fechar").addEventListener("click", fechar);
  viewer.querySelector(".next").addEventListener("click", proxima);
  viewer.querySelector(".prev").addEventListener("click", anterior);

  // Tecla Esc fecha o visualizador
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fechar();
  });

  // ================================
  // Atualiza índice ao rolar manualmente
  // ================================
  scrollContainer.addEventListener("scroll", () => {
    const scrollLeft = scrollContainer.scrollLeft;
    let maisProxima = 0;
    let menorDistancia = Infinity;

    imagensFullscreen.forEach((img, i) => {
      const distancia = Math.abs(img.offsetLeft - scrollLeft);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        maisProxima = i;
      }
    });

    atual = maisProxima;
  });
});

