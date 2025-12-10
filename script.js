/* --- JAVASCRIPT LOGIC --- */

// Carousel Images
const carouselImages = [
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
];

let currentCarouselIndex = 0;

// 1. Data (The "Database")
const products = [
  {
    id: 1,
    name: "Premium Cotton Blend",
    price: 1000.0,
    desc: "Soft cotton blend perfect for everyday wear and home textiles.",
    image: "img/1.jpg",
  },
  {
    id: 2,
    name: "Silk Charmeuse",
    price: 1000.0,
    desc: "Luxurious silk charmeuse with smooth, glossy finish for elegant evening wear.",
    image: "img/2.jpg",
  },
  {
    id: 3,
    name: "Linen Weave",
    price: 1000.0,
    desc: "Classic linen weave perfect for summer garments and home furnishings.",
    image: "img/3.jpg",
  },
  {
    id: 4,
    name: "Jacquard Brocade",
    price: 1000.0,
    desc: "Ornate jacquard brocade with intricate patterns for formal occasions.",
    image: "img/4.jpg",
  },
  {
    id: 5,
    name: "Velveteen Luxury",
    price: 1000.0,
    desc: "Plush velveteen with rich texture, ideal for upholstery and evening wear.",
    image: "img/5.jpg",
  },
  {
    id: 6,
    name: "Satin Damask",
    price: 1000.0,
    desc: "Elegant satin damask with geometric patterns for sophisticated interiors.",
    image: "img/6.jpg",
  },
  {
    id: 7,
    name: "Cotton Sateen",
    price: 1000.0,
    desc: "Lustrous cotton sateen with smooth feel for apparel and home décor.",
    image: "img/7.jpg",
  },
  {
    id: 8,
    name: "Twill Gabardine",
    price: 1000.0,
    desc: "Durable twill gabardine weave perfect for structured garments and workwear.",
    image: "img/8.jpg",
  },
];

let cart = [];

// 2. Initialize Store
const productGrid = document.getElementById("product-grid");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const cartOverlay = document.getElementById("cart-overlay");
const toast = document.getElementById("toast");
const carouselImage = document.getElementById("carousel-image");
const carouselDots = document.querySelector(".carousel-dots");

// Initialize carousel
function initializeCarousel() {
  updateCarousel();
  renderCarouselDots();
  // Auto-advance carousel every 6 seconds
  setInterval(() => {
    currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
    updateCarousel();
  }, 6000);
}

// Update carousel display
function updateCarousel() {
  carouselImage.src = carouselImages[currentCarouselIndex];
  updateCarouselDots();
}

// Render carousel dots
function renderCarouselDots() {
  carouselDots.innerHTML = carouselImages
    .map(
      (_, index) =>
        `<div class="carousel-dot ${
          index === currentCarouselIndex ? "active" : ""
        }" onclick="goToCarouselSlide(${index})"></div>`
    )
    .join("");
}

// Update carousel dots active state
function updateCarouselDots() {
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentCarouselIndex);
  });
}

// Carousel navigation functions
function nextCarousel() {
  currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
  updateCarousel();
}

function prevCarousel() {
  currentCarouselIndex =
    (currentCarouselIndex - 1 + carouselImages.length) % carouselImages.length;
  updateCarousel();
}

function goToCarouselSlide(index) {
  currentCarouselIndex = index;
  updateCarousel();
}

// Render Products
function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
                <div class="product-card">
                    <div class="product-card-image-wrap">
                        <img src="${product.image}" alt="${
        product.name
      }" class="product-img">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-desc">${product.desc}</p>
                        <div class="product-price">₦${product.price.toFixed(
                          2
                        )} / yard</div>
                        <button class="add-btn" onclick="addToCart(${
                          product.id
                        })">Add to Cart</button>
                    </div>
                </div>
            `
    )
    .join("");
}

// 3. Cart Functions
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`Added ${product.name} to cart`);
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  // Update Count
  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  cartCountEl.textContent = totalQty;

  // Update Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  cartTotalEl.textContent = "₦" + totalPrice.toFixed(2);

  // Update Sidebar HTML
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p style="text-align:center; margin-top:20px; color:#999;">Your cart is empty.</p>';
  } else {
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">${
                              item.qty
                            } x ₦${item.price.toFixed(2)}</div>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${
                          item.id
                        })">Remove</button>
                    </div>
                `
      )
      .join("");
  }
}

// 4. UI Utilities
function toggleCart() {
  const isOpen = cartOverlay.style.display === "block";
  if (isOpen) {
    cartOverlay.classList.remove("open");
    setTimeout(() => (cartOverlay.style.display = "none"), 300); // Wait for transition
  } else {
    cartOverlay.style.display = "block";
    // Small timeout to allow display block to apply before adding class for transition
    setTimeout(() => cartOverlay.classList.add("open"), 10);
  }
}
// Toggle mobile nav (hamburger)
function toggleNav() {
  const links = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  if (!links) return;
  links.classList.toggle('open');
  const expanded = links.classList.contains('open');
  if (hamburger) hamburger.setAttribute('aria-expanded', expanded);
}

// Close nav when a link is clicked (for mobile)
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-links .nav-link');
  links.forEach((a) => {
    a.addEventListener('click', () => {
      const container = document.querySelector('.nav-links');
      if (container && container.classList.contains('open')) {
        container.classList.remove('open');
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// Initialize
initializeCarousel();
renderProducts();

