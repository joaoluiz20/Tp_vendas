/* =========================================
   PRODUTOS
========================================= */

const produtos = [

  {
    nome: "Smartphone Premium",

    preco: "R$ 2.499,90",

    descricao:
      "Smartphone premium com câmera profissional.",

    imagens: [

      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",

      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop",

      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop"

    ],

    badge: "Mais Vendido"
  },

  {
    nome: "Headphone Wireless",

    preco: "R$ 599,90",

    descricao:
      "Headphone premium com cancelamento de ruído.",

    imagens: [

      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",

      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop",

      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"

    ],

    badge: "Promoção"
  }

];

/* =========================================
   CONFIG
========================================= */

const WHATSAPP_NUMBER =
  "5511999999999";

/* =========================================
   ELEMENTOS
========================================= */

const productsGrid =
  document.getElementById(
    "productsGrid"
  );

const menuToggle =
  document.getElementById(
    "menuToggle"
  );

const nav =
  document.getElementById(
    "nav"
  );

const header =
  document.getElementById(
    "header"
  );

const themeToggle =
  document.getElementById(
    "themeToggle"
  );

/* =========================================
   MODAL
========================================= */

const productModal =
  document.getElementById(
    "productModal"
  );

const closeModal =
  document.getElementById(
    "closeModal"
  );

const modalImage =
  document.getElementById(
    "modalImage"
  );

const modalTitle =
  document.getElementById(
    "modalTitle"
  );

const modalDescription =
  document.getElementById(
    "modalDescription"
  );

const modalPrice =
  document.getElementById(
    "modalPrice"
  );

const modalBadge =
  document.getElementById(
    "modalBadge"
  );

const modalBuy =
  document.getElementById(
    "modalBuy"
  );

const prevImage =
  document.getElementById(
    "prevImage"
  );

const nextImage =
  document.getElementById(
    "nextImage"
  );

const modalThumbnails =
  document.getElementById(
    "modalThumbnails"
  );

/* =========================================
   CAROUSEL VARS
========================================= */

let currentImages = [];

let currentIndex = 0;

/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts(){

  productsGrid.innerHTML = "";

  produtos.forEach((produto)=>{

    const card =
      document.createElement("article");

    card.classList.add(
      "product-card",
      "reveal"
    );

    card.innerHTML = `
      <div class="product-image">

        <img
          src="${produto.imagens[0]}"
          alt="${produto.nome}"
        />

      </div>

      <div class="product-content">

        <span class="product-badge">
          ${produto.badge}
        </span>

        <h3>
          ${produto.nome}
        </h3>

        <p>
          ${produto.descricao}
        </p>

        <div class="product-price">
          ${produto.preco}
        </div>

        <button class="btn-primary">
          Ver Detalhes
        </button>

      </div>
    `;

    const button =
      card.querySelector(
        "button"
      );

    button.addEventListener(
      "click",
      ()=>{

        openProductModal(
          produto
        );

      }
    );

    productsGrid.appendChild(card);

  });

  revealElements();
}

renderProducts();

/* =========================================
   OPEN MODAL
========================================= */

function openProductModal(
  produto
){

  productModal.classList.add(
    "active"
  );

  modalTitle.textContent =
    produto.nome;

  modalDescription.textContent =
    produto.descricao;

  modalPrice.textContent =
    produto.preco;

  modalBadge.textContent =
    produto.badge;

  currentImages =
    produto.imagens;

  currentIndex = 0;

  updateCarousel();

  createThumbnails();

  modalBuy.onclick = ()=>{

    const mensagem = `
Olá, tenho interesse no produto:

${produto.nome}

Preço:
${produto.preco}
    `;

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

    window.open(
      url,
      "_blank"
    );

  };

}

/* =========================================
   UPDATE CAROUSEL
========================================= */

function updateCarousel(){

  modalImage.src =
    currentImages[currentIndex];

  document
    .querySelectorAll(
      ".modal-thumbnails img"
    )
    .forEach((img,index)=>{

      img.classList.toggle(
        "active",
        index === currentIndex
      );

    });

}

/* =========================================
   THUMBNAILS
========================================= */

function createThumbnails(){

  modalThumbnails.innerHTML = "";

  currentImages.forEach(
    (image,index)=>{

      const thumb =
        document.createElement(
          "img"
        );

      thumb.src = image;

      if(index === 0){
        thumb.classList.add(
          "active"
        );
      }

      thumb.addEventListener(
        "click",
        ()=>{

          currentIndex = index;

          updateCarousel();

        }
      );

      modalThumbnails.appendChild(
        thumb
      );

    }
  );

}

/* =========================================
   NEXT IMAGE
========================================= */

nextImage.addEventListener(
  "click",
  ()=>{

    currentIndex++;

    if(
      currentIndex >=
      currentImages.length
    ){
      currentIndex = 0;
    }

    updateCarousel();

  }
);

/* =========================================
   PREV IMAGE
========================================= */

prevImage.addEventListener(
  "click",
  ()=>{

    currentIndex--;

    if(currentIndex < 0){

      currentIndex =
        currentImages.length - 1;
    }

    updateCarousel();

  }
);

/* =========================================
   CLOSE MODAL
========================================= */

closeModal.addEventListener(
  "click",
  ()=>{

    productModal.classList.remove(
      "active"
    );

  }
);

productModal.addEventListener(
  "click",
  (e)=>{

    if(
      e.target === productModal
    ){

      productModal.classList.remove(
        "active"
      );

    }

  }
);

/* =========================================
   MENU MOBILE
========================================= */

menuToggle.addEventListener(
  "click",
  ()=>{

    nav.classList.toggle(
      "active"
    );

  }
);

/* =========================================
   HEADER SCROLL
========================================= */

window.addEventListener(
  "scroll",
  ()=>{

    if(window.scrollY > 50){

      header.classList.add(
        "scrolled"
      );

    }else{

      header.classList.remove(
        "scrolled"
      );
    }

    revealElements();

  }
);

/* =========================================
   FAQ
========================================= */

document
  .querySelectorAll(
    ".faq-question"
  )
  .forEach((question)=>{

    question.addEventListener(
      "click",
      ()=>{

        const answer =
          question.nextElementSibling;

        if(answer.style.maxHeight){

          answer.style.maxHeight =
            null;

        }else{

          answer.style.maxHeight =
            answer.scrollHeight +
            "px";
        }

      }
    );

  });

/* =========================================
   REVEAL
========================================= */

function revealElements(){

  document
    .querySelectorAll(
      ".reveal"
    )
    .forEach((element)=>{

      const top =
        element
        .getBoundingClientRect()
        .top;

      if(
        top <
        window.innerHeight - 100
      ){

        element.classList.add(
          "active"
        );

      }

    });

}

window.addEventListener(
  "load",
  revealElements
);

/* =========================================
   THEME
========================================= */

const savedTheme =
  localStorage.getItem(
    "theme"
  );

if(savedTheme === "light"){

  document.body.classList.add(
    "light-mode"
  );

  themeToggle.innerHTML = "☀️";
}

themeToggle.addEventListener(
  "click",
  ()=>{

    document.body.classList.toggle(
      "light-mode"
    );

    const isLight =
      document.body.classList.contains(
        "light-mode"
      );

    if(isLight){

      localStorage.setItem(
        "theme",
        "light"
      );

      themeToggle.innerHTML = "☀️";

    }else{

      localStorage.setItem(
        "theme",
        "dark"
      );

      themeToggle.innerHTML = "🌙";
    }

  }
);