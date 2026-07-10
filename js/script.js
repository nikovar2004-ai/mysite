// Фото для рыжикового масла ещё не снято — используем кунжутное как временную заглушку
const PLACEHOLDER_IMAGE = 'assets/img/product-sesame.jpg';

// ---------- Данные товаров ----------
const products = [
  {
    id: 1,
    name: 'Подсолнечное масло',
    desc: 'Классика с ярким ореховым ароматом, отжато из отборных семечек.',
    image: 'assets/img/product-sunflower.jpg',
    sizes: [
      { volume: '100 мл', price: 160 },
      { volume: '250 мл', price: 250 },
      { volume: '500 мл', price: 400 }
    ]
  },
  {
    id: 2,
    name: 'Льняное масло',
    desc: 'Богато Омега-3, идеально для салатов и утренних смузи.',
    image: 'assets/img/product-flax.jpg',
    sizes: [
      { volume: '100 мл', price: 350 },
      { volume: '250 мл', price: 730 },
      { volume: '500 мл', price: 1350 }
    ]
  },
  {
    id: 3,
    name: 'Тыквенное масло',
    desc: 'Насыщенный тёмный цвет и глубокий вкус жареных тыквенных семечек.',
    image: 'assets/img/product-pumpkin.jpg',
    sizes: [
      { volume: '100 мл', price: 500 },
      { volume: '250 мл', price: 1100 },
      { volume: '500 мл', price: 2100 }
    ]
  },
  {
    id: 4,
    name: 'Кунжутное масло',
    desc: 'Ароматное масло для азиатской кухни и заправки овощных блюд.',
    image: 'assets/img/product-sesame.jpg',
    sizes: [
      { volume: '100 мл', price: 200 },
      { volume: '250 мл', price: 350 },
      { volume: '500 мл', price: 600 }
    ]
  },
  {
    id: 5,
    name: 'Горчичное масло',
    desc: 'Пикантный вкус с лёгкой остротой, отлично подходит для жарки.',
    image: 'assets/img/product-mustard.jpg',
    sizes: [
      { volume: '100 мл', price: 130 },
      { volume: '250 мл', price: 260 },
      { volume: '500 мл', price: 480 }
    ]
  },
  {
    id: 6,
    name: 'Грецкий орех',
    desc: 'Изысканное масло премиум-класса из свежих грецких орехов.',
    image: 'assets/img/product-walnut.jpg',
    sizes: [
      { volume: '100 мл', price: 480 },
      { volume: '250 мл', price: 1100 },
      { volume: '500 мл', price: 2120 }
    ]
  },
  {
    id: 7,
    name: 'Миндальное масло',
    desc: 'Нежный ореховый вкус и лёгкая текстура, богато витамином Е — подходит для кулинарии и ухода за кожей.',
    image: 'assets/img/product-almond.jpg',
    sizes: [
      { volume: '100 мл', price: 620 },
      { volume: '250 мл', price: 1420 },
      { volume: '500 мл', price: 2740 }
    ]
  },
  {
    id: 8,
    name: 'Расторопша',
    desc: 'Масло для поддержки печени с деликатным травяным вкусом.',
    image: 'assets/img/product-milkthistle.jpg',
    sizes: [
      { volume: '100 мл', price: 280 },
      { volume: '250 мл', price: 560 },
      { volume: '500 мл', price: 1020 }
    ]
  },
  {
    id: 9,
    name: 'Рыжиковое масло',
    desc: 'Из семян рыжика посевного — пикантный горчично-ореховый вкус и рекордное содержание Омега-3.',
    image: PLACEHOLDER_IMAGE,
    sizes: [
      { volume: '100 мл', price: 210 },
      { volume: '250 мл', price: 400 },
      { volume: '500 мл', price: 720 }
    ]
  },
  {
    id: 10,
    name: 'Конопляное масло',
    desc: 'Сбалансированный состав жирных кислот и мягкий ореховый вкус с лёгкой травяной ноткой.',
    image: 'assets/img/product-hemp.jpg',
    sizes: [
      { volume: '100 мл', price: 260 },
      { volume: '250 мл', price: 480 },
      { volume: '500 мл', price: 850 }
    ]
  }
];

// ---------- Состояние корзины ----------
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

// Выбранный объём для каждой карточки товара (id -> индекс в sizes)
const selectedSize = {};

const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

// ---------- DOM-элементы ----------
const catalogGrid = document.getElementById('catalogGrid');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartPanel = document.getElementById('cartPanel');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const overlay = document.getElementById('overlay');
const checkoutModal = document.getElementById('checkoutModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const checkoutForm = document.getElementById('checkoutForm');
const modalSummary = document.getElementById('modalSummary');
const modalSuccess = document.getElementById('modalSuccess');
const successCloseBtn = document.getElementById('successCloseBtn');
const modalError = document.getElementById('modalError');
const submitOrderBtn = document.getElementById('submitOrderBtn');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const toggleCatalogBtn = document.getElementById('toggleCatalogBtn');
const catalogCarouselWrap = document.getElementById('catalogCarouselWrap');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

// ---------- Рендер каталога ----------
function renderCatalog() {
  catalogGrid.innerHTML = products.map(p => {
    selectedSize[p.id] = 0;
    return `
    <article class="product-card">
      <div class="product-card__image">
        <img src="${p.image}" alt="${p.name}" width="700" height="933" loading="lazy">
      </div>
      <div class="product-card__body">
        <h3>${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="size-select" data-id="${p.id}">
          ${p.sizes.map((s, i) => `
            <button type="button" class="size-btn${i === 0 ? ' active' : ''}" data-size-index="${i}">${s.volume}</button>
          `).join('')}
        </div>
        <div class="product-card__footer">
          <span class="product-card__price" data-price-for="${p.id}">${p.sizes[0].price} ₽</span>
          <button class="add-btn" data-id="${p.id}">В корзину</button>
        </div>
      </div>
    </article>
  `;
  }).join('');

  catalogGrid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(Number(btn.dataset.id)));
  });

  catalogGrid.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.size-select');
      const id = Number(wrap.dataset.id);
      const index = Number(btn.dataset.sizeIndex);
      const product = products.find(p => p.id === id);

      selectedSize[id] = index;
      wrap.querySelectorAll('.size-btn').forEach(b => b.classList.toggle('active', b === btn));
      wrap.closest('.product-card').querySelector('.product-card__price').textContent = `${product.sizes[index].price} ₽`;
    });
  });
}

// ---------- Логика корзины ----------
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
  const sizeIndex = selectedSize[id] || 0;
  const item = cart.find(i => i.id === id && i.sizeIndex === sizeIndex);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id, sizeIndex, qty: 1 });
  }
  saveCart();
  renderCart();
  openCart();
}

function changeQty(id, sizeIndex, delta) {
  const item = cart.find(i => i.id === id && i.sizeIndex === sizeIndex);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => !(i.id === id && i.sizeIndex === sizeIndex));
  }
  saveCart();
  renderCart();
}

function removeFromCart(id, sizeIndex) {
  cart = cart.filter(i => !(i.id === id && i.sizeIndex === sizeIndex));
  saveCart();
  renderCart();
}

function calcTotal() {
  return cart.reduce((sum, i) => {
    const product = products.find(p => p.id === i.id);
    const size = product ? product.sizes[i.sizeIndex] : null;
    return sum + (size ? size.price * i.qty : 0);
  }, 0);
}

function renderCart() {
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  cartBadge.textContent = totalCount;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty" id="cartEmpty">Корзина пока пуста 🌾</p>';
  } else {
    cartItemsEl.innerHTML = cart.map(i => {
      const p = products.find(prod => prod.id === i.id);
      const size = p ? p.sizes[i.sizeIndex] : null;
      if (!p || !size) return '';
      return `
        <div class="cart-item" data-id="${p.id}" data-size-index="${i.sizeIndex}">
          <img class="cart-item__icon" src="${p.image}" alt="${p.name}" width="50" height="50">
          <div class="cart-item__info">
            <h4>${p.name} <span class="cart-item__volume">${size.volume}</span></h4>
            <span class="cart-item__price">${size.price * i.qty} ₽</span>
          </div>
          <div class="cart-item__controls">
            <button class="qty-btn" data-action="dec">−</button>
            <span>${i.qty}</span>
            <button class="qty-btn" data-action="inc">+</button>
            <button class="cart-item__remove" data-action="remove">✕</button>
          </div>
        </div>
      `;
    }).join('');

    cartItemsEl.querySelectorAll('.cart-item').forEach(el => {
      const id = Number(el.dataset.id);
      const sizeIndex = Number(el.dataset.sizeIndex);
      el.querySelector('[data-action="inc"]').addEventListener('click', () => changeQty(id, sizeIndex, 1));
      el.querySelector('[data-action="dec"]').addEventListener('click', () => changeQty(id, sizeIndex, -1));
      el.querySelector('[data-action="remove"]').addEventListener('click', () => removeFromCart(id, sizeIndex));
    });
  }

  cartTotalEl.textContent = `${calcTotal()} ₽`;
}

// ---------- Открытие/закрытие корзины ----------
function openCart() {
  cartPanel.classList.add('active');
  overlay.classList.add('active');
}

function closeCart() {
  cartPanel.classList.remove('active');
  if (!checkoutModal.classList.contains('active')) {
    overlay.classList.remove('active');
  }
}

cartBtn.addEventListener('click', openCart);
cartCloseBtn.addEventListener('click', closeCart);

// ---------- Модалка оформления заказа ----------
function openCheckout() {
  if (cart.length === 0) return;
  modalSummary.innerHTML = `Товаров: ${cart.reduce((s, i) => s + i.qty, 0)} на сумму <strong>${calcTotal()} ₽</strong>`;
  modalError.classList.remove('active');
  checkoutForm.style.display = 'block';
  modalSuccess.classList.remove('active');
  checkoutModal.classList.add('active');
  overlay.classList.add('active');
  cartPanel.classList.remove('active');
}

function closeCheckout() {
  checkoutModal.classList.remove('active');
  overlay.classList.remove('active');
}

checkoutBtn.addEventListener('click', openCheckout);
modalCloseBtn.addEventListener('click', closeCheckout);
successCloseBtn.addEventListener('click', closeCheckout);

overlay.addEventListener('click', () => {
  closeCart();
  closeCheckout();
});

// ---------- Отправка заказа на почту через Formspree ----------
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgyygwo';

checkoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(checkoutForm);
  const itemsList = cart.map(i => {
    const p = products.find(prod => prod.id === i.id);
    const size = p.sizes[i.sizeIndex];
    return `${p.name} (${size.volume}) × ${i.qty} = ${size.price * i.qty} ₽`;
  }).join('\n');

  formData.append('_subject', 'Новый заказ с сайта Follow Me');
  formData.append('items', itemsList);
  formData.append('total', `${calcTotal()} ₽`);

  modalError.classList.remove('active');
  submitOrderBtn.disabled = true;
  submitOrderBtn.textContent = 'Отправляем...';

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error('Formspree request failed');

    checkoutForm.reset();
    checkoutForm.style.display = 'none';
    modalSuccess.classList.add('active');

    cart = [];
    saveCart();
    renderCart();
  } catch (err) {
    modalError.textContent = 'Не удалось отправить заказ. Проверьте связь с интернетом и попробуйте ещё раз.';
    modalError.classList.add('active');
  } finally {
    submitOrderBtn.disabled = false;
    submitOrderBtn.textContent = 'Подтвердить заказ';
  }
});

// ---------- Карусель каталога ----------
let isCatalogCarousel = true;

function setCatalogMode(carousel) {
  isCatalogCarousel = carousel;
  catalogCarouselWrap.classList.toggle('is-carousel', carousel);
  catalogGrid.classList.toggle('is-carousel', carousel);
  toggleCatalogBtn.textContent = carousel ? 'Показать всё' : 'Свернуть в карусель';
  if (carousel) catalogGrid.scrollLeft = 0;
}

toggleCatalogBtn.addEventListener('click', () => {
  setCatalogMode(!isCatalogCarousel);
});

carouselPrev.addEventListener('click', () => {
  catalogGrid.scrollBy({ left: -catalogGrid.clientWidth * 0.8, behavior: 'smooth' });
});

carouselNext.addEventListener('click', () => {
  catalogGrid.scrollBy({ left: catalogGrid.clientWidth * 0.8, behavior: 'smooth' });
});

// ---------- Мобильное меню ----------
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('active'));
});

// ---------- Пиксельные капли масла на фоне ----------
function initOilDrops() {
  const container = document.getElementById('oilDrops');
  if (!container || prefersReducedMotionQuery.matches) return;

  const dropCount = 14;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < dropCount; i++) {
    const drop = document.createElement('div');
    drop.className = 'drop';

    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 8;
    const delay = -(Math.random() * duration);
    const scale = 0.7 + Math.random() * 0.7;
    const opacity = 0.3 + Math.random() * 0.35;

    drop.style.left = `${left}%`;
    drop.style.animationDuration = `${duration}s`;
    drop.style.animationDelay = `${delay}s`;
    drop.style.setProperty('--drop-scale', scale.toFixed(2));
    drop.style.setProperty('--drop-opacity', opacity.toFixed(2));

    const pixel = document.createElement('div');
    pixel.className = 'drop__pixel';
    drop.appendChild(pixel);

    fragment.appendChild(drop);
  }

  container.appendChild(fragment);
}

// ---------- Инициализация ----------
renderCatalog();
renderCart();
initOilDrops();
setCatalogMode(true);
