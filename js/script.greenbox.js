document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');

  function revealSections() {
    const windowHeight = window.innerHeight;
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        section.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealSections);
  revealSections();
});
// Carrello base: aggiungi, rimuovi, somma prezzi in tempo reale

document.addEventListener('DOMContentLoaded', () => {
  // Prendi i pulsanti "aggiungi al carrello" in pagina prodotto
  const addCartButtons = document.querySelectorAll('.add-cart');

  // Elementi carrello pagina shop
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElem = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Stato carrello (array di prodotti)
  let cart = [];

  // Se siamo nella pagina prodotto, aggiungi listener ai bottoni
  if (addCartButtons.length) {
    addCartButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        addToCart({ name, price });
        showModal('Carrello', `Hai aggiunto "${name}" al carrello`);
      });
    });
  }

  // Funzione per aggiungere prodotto
  function addToCart(product) {
    cart.push(product);
    alert(`Hai aggiunto "${product.name}" al carrello`);
    saveCart();
  }

  // Funzione per salvare carrello in localStorage
  function saveCart() {
    localStorage.setItem('greenboxCart', JSON.stringify(cart));
  }

  // Funzione per caricare carrello da localStorage
  function loadCart() {
    const saved = localStorage.getItem('greenboxCart');
    if (saved) {
      cart = JSON.parse(saved);
    }
  }

  // Funzione per rimuovere prodotto per indice
  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  // Funzione per calcolare totale
  function calculateTotal() {
    return cart.reduce((sum, p) => sum + p.price, 0);
  }

  // Funzione per aggiornare UI carrello
  function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Il carrello è vuoto.</p>';
      cartTotalElem.textContent = 'Totale: €0,00';
      checkoutBtn.disabled = true;
      return;
    }

    cart.forEach((product, i) => {
      const div = document.createElement('div');
      div.classList.add('cart-item');

      div.innerHTML = `
        <span class="cart-item-name">${product.name}</span>
        <span class="cart-item-price">€${product.price.toFixed(2)}</span>
        <button class="remove-btn" aria-label="Rimuovi ${product.name}" data-index="${i}">&times;</button>
      `;

      cartItemsContainer.appendChild(div);
    });

    cartTotalElem.textContent = `Totale: €${calculateTotal().toFixed(2)}`;
    checkoutBtn.disabled = false;

    // Aggiungo listener ai bottoni rimuovi
    const removeBtns = cartItemsContainer.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        removeFromCart(idx);
      });
    });
  }

  // Carico carrello e mostro
  loadCart();
  renderCart();

  // Bottone checkout finto
  checkoutBtn.addEventListener('click', () => {
    alert('Procedura di acquisto non ancora implementata.');
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (!form) return;

  // prendo il colore verde dal CSS
  const verde = getComputedStyle(document.documentElement).getPropertyValue('--verde').trim();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      formMessage.textContent = 'Compila tutti i campi correttamente.';
      formMessage.style.color = '#ff4c4c';
      return;
    }

    formMessage.textContent = 'Invio in corso...';
    formMessage.style.color = verde;

    setTimeout(() => {
      formMessage.textContent = 'Messaggio inviato con successo! Ti risponderemo presto.';
      formMessage.style.color = verde;
      form.reset();
    }, 1500);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      // Chiudi tutte le risposte
      faqButtons.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.nextElementSibling.hidden = true;
      });
      // Apri o chiudi quella cliccata
      if (!expanded) {
        button.setAttribute('aria-expanded', 'true');
        button.nextElementSibling.hidden = false;
      }
    });
  });
});
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modalClose');

function showModal(title, message) {
  if (!modal) return;
  modal.querySelector('#modalTitle').textContent = title;
  modal.querySelector('#modalDesc').textContent = message;
  modal.removeAttribute('hidden');
  modal.classList.add('show');
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('hidden', '');
}

modalCloseBtn?.addEventListener('click', closeModal);

modal?.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});
document.addEventListener('DOMContentLoaded', () => {
  const scrollElems = document.querySelectorAll('.scroll-anim');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  scrollElems.forEach(elem => observer.observe(elem));
});
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slide-img');
    const nextBtn = slider.querySelector('.next');
    const prevBtn = slider.querySelector('.prev');

    let index = 0;

    function updateSlider() {
      const offset = -index * 100;
      track.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      updateSlider();
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Controlla se in precedenza è stata attivata la dark mode
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark');
  }

  toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });
});
document.querySelectorAll('.slider').forEach(slider => {
  let autoSlideIndex = 0;
  const slides = slider.querySelectorAll('.slide-img');
  const track = slider.querySelector('.slider-track');

  function autoSlide() {
    autoSlideIndex = (autoSlideIndex + 1) % slides.length;
    track.style.transform = `translateX(${-autoSlideIndex * 100}%)`;
  }

  let slideInterval = setInterval(autoSlide, 5000);

  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(autoSlide, 5000);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.createElement('div');
  menuToggle.classList.add('menu-toggle');
  menuToggle.innerHTML = '&#9776;'; // icona hamburger
  const nav = document.querySelector('nav');
  nav.appendChild(menuToggle);

  const ul = nav.querySelector('ul');

  menuToggle.addEventListener('click', () => {
    ul.classList.toggle('show');
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 1300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
