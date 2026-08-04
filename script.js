/**
 * Campus SnackPass – script.js
 * Complete Vanilla JavaScript logic for the canteen ordering app.
 * Uses ES6 syntax, modular functions, and no external dependencies.
 */

/* =====================================================================
   1. MENU DATA
   ===================================================================== */

/**
 * Full menu data array.
 * Each item: { id, name, category, description, price, image, emoji }
 * 'image' is optional – falls back to 'emoji' if image not found.
 */
const menuData = [
  {
    id: 1,
    name: "Veg Burger",
    category: "Snacks",
    description: "Juicy veggie patty with fresh lettuce, tomato, cheese & special sauce in a toasted sesame bun.",
    price: 65,
    image: "images/burger.png",
    emoji: "🍔"
  },
  {
    id: 2,
    name: "Cheese Pizza",
    category: "Snacks",
    description: "Hand-tossed pizza loaded with mozzarella, bell peppers, olives & tomato sauce.",
    price: 120,
    image: "images/pizza.png",
    emoji: "🍕"
  },
  {
    id: 3,
    name: "French Fries",
    category: "Snacks",
    description: "Golden crispy fries seasoned with herbs and spices. Served with ketchup & mayo.",
    price: 55,
    image: "images/fries.png",
    emoji: "🍟"
  },
  {
    id: 4,
    name: "Cold Coffee",
    category: "Drinks",
    description: "Chilled blended coffee with rich cream, a hint of chocolate & whipped cream on top.",
    price: 70,
    image: "images/cold_coffee.png",
    emoji: "☕"
  },
  {
    id: 5,
    name: "Masala Dosa",
    category: "Breakfast",
    description: "Crispy golden dosa filled with spiced potato masala. Served with sambar & chutneys.",
    price: 55,
    image: "images/dosa.png",
    emoji: "🫓"
  },
  {
    id: 6,
    name: "Idli (3 pcs)",
    category: "Breakfast",
    description: "Soft, fluffy steamed rice cakes served with sambar and freshly ground coconut chutney.",
    price: 40,
    image: "images/idli.png",
    emoji: "🍚"
  },
  {
    id: 7,
    name: "Paneer Wrap",
    category: "Snacks",
    description: "Grilled paneer tikka with onions, peppers, mint chutney wrapped in a soft flour tortilla.",
    price: 90,
    image: "images/paneer_wrap.png",
    emoji: "🌯"
  },
  {
    id: 8,
    name: "Veg Fried Rice",
    category: "Meals",
    description: "Wok-tossed basmati rice with garden vegetables, soy sauce, and aromatic seasoning.",
    price: 85,
    image: "images/fried_rice.png",
    emoji: "🍳"
  },
  {
    id: 9,
    name: "Veg Noodles",
    category: "Meals",
    description: "Stir-fried noodles with colorful vegetables, soy-chilli sauce and spring onions.",
    price: 80,
    image: "images/noodles.png",
    emoji: "🍜"
  },
  {
    id: 10,
    name: "Grilled Sandwich",
    category: "Snacks",
    description: "Multi-layered grilled sandwich with cheese, veggies, and herb butter. Golden and crunchy.",
    price: 60,
    image: "images/sandwich.png",
    emoji: "🥪"
  },
  {
    id: 11,
    name: "Samosa (2 pcs)",
    category: "Snacks",
    description: "Crispy triangular pastry stuffed with spiced potatoes and peas. Served with green chutney.",
    price: 30,
    image: "images/samosa.png",
    emoji: "🥟"
  },
  {
    id: 12,
    name: "Creamy Pasta",
    category: "Meals",
    description: "Penne pasta in a rich creamy white sauce with mushrooms, peppers, and Italian herbs.",
    price: 100,
    image: null,
    emoji: "🍝"
  },
  {
    id: 13,
    name: "Brownie",
    category: "Desserts",
    description: "Warm, dense chocolate brownie with walnuts. Served with a dusting of powdered sugar.",
    price: 50,
    image: null,
    emoji: "🍫"
  },
  {
    id: 14,
    name: "Ice Cream",
    category: "Desserts",
    description: "Creamy two-scoop ice cream in vanilla & chocolate flavours. Topped with chocolate chips.",
    price: 45,
    image: null,
    emoji: "🍨"
  },
  {
    id: 15,
    name: "Fresh Juice",
    category: "Drinks",
    description: "Freshly squeezed seasonal fruit juice. Ask for today's special blend!",
    price: 50,
    image: null,
    emoji: "🍊"
  },
  {
    id: 16,
    name: "Milkshake",
    category: "Drinks",
    description: "Thick, creamy milkshake in chocolate, vanilla, or strawberry. Topped with whipped cream.",
    price: 80,
    image: null,
    emoji: "🥤"
  },
  {
    id: 17,
    name: "Muffin",
    category: "Desserts",
    description: "Fluffy bakery-style muffin in blueberry or chocolate chip. Perfect with a hot drink!",
    price: 40,
    image: null,
    emoji: "🧁"
  },
  {
    id: 18,
    name: "Garlic Bread",
    category: "Snacks",
    description: "Toasted baguette slices with garlic butter and fresh herbs. Crispy on the outside, soft inside.",
    price: 50,
    image: null,
    emoji: "🥖"
  },
  {
    id: 19,
    name: "Chocolate Cake",
    category: "Desserts",
    description: "Decadent layered chocolate cake with silky ganache frosting. A choco lover's dream!",
    price: 65,
    image: null,
    emoji: "🎂"
  },
  {
    id: 20,
    name: "Masala Tea",
    category: "Drinks",
    description: "Freshly brewed Indian chai with ginger, cardamom, and aromatic spices.",
    price: 20,
    image: null,
    emoji: "🍵"
  }
];

/* =====================================================================
   2. STATE
   ===================================================================== */

/** @type {Array<{id: number, name: string, price: number, image: string|null, emoji: string, quantity: number}>} */
let cart = [];

/** @type {string} Active category filter */
let activeCategory = "all";

/** @type {string} Current search query */
let searchQuery = "";

/** @type {number|null} Toast timeout reference */
let toastTimeout = null;

/* =====================================================================
   3. DOM REFERENCES (cached on DOMContentLoaded)
   ===================================================================== */
let menuGrid, noResults, cartItemsList, cartSummary,
    summarySubtotal, summaryGst, summaryGrandTotal,
    cartCount, cartSidebar, cartOverlay,
    navSearchInput, mobileSearchInput, orderModal, modalToken,
    pageLoader, scrollTopBtn, hamburgerBtn, mobileNav, navbar;

/* =====================================================================
   4. INIT
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM
  menuGrid         = document.getElementById("menu-grid");
  noResults        = document.getElementById("no-results");
  cartItemsList    = document.getElementById("cart-items-list");
  cartSummary      = document.getElementById("cart-summary");
  summarySubtotal  = document.getElementById("summary-subtotal");
  summaryGst       = document.getElementById("summary-gst");
  summaryGrandTotal= document.getElementById("summary-grand-total");
  cartCount        = document.getElementById("cart-count");
  cartSidebar      = document.getElementById("cart-sidebar");
  cartOverlay      = document.getElementById("cart-overlay");
  navSearchInput   = document.getElementById("nav-search-input");
  mobileSearchInput= document.getElementById("mobile-search-input");
  orderModal       = document.getElementById("order-modal");
  modalToken       = document.getElementById("modal-token");
  pageLoader       = document.getElementById("page-loader");
  scrollTopBtn     = document.getElementById("scroll-top-btn");
  hamburgerBtn     = document.getElementById("hamburger-btn");
  mobileNav        = document.getElementById("mobile-nav");
  navbar           = document.getElementById("navbar");

  // Initial render
  displayMenu(menuData);

  // Setup event listeners
  setupSearchListeners();
  setupCategoryFilter();
  setupScrollEvents();
  setupScrollTopBtn();
  setupHamburger();
  setupCartToggle();
  setupContactForm();
  setupRevealAnimations();

  // Hide loader after a short delay
  setTimeout(hideLoader, 1200);
});

/* =====================================================================
   5. LOADER
   ===================================================================== */
/**
 * Hides the page loader with a fade-out animation.
 */
function hideLoader() {
  if (!pageLoader) return;
  pageLoader.classList.add("hidden");
  // Remove from DOM after animation
  setTimeout(() => {
    if (pageLoader && pageLoader.parentNode) {
      pageLoader.parentNode.removeChild(pageLoader);
    }
  }, 600);
}

/* =====================================================================
   6. DISPLAY & RENDER MENU
   ===================================================================== */
/**
 * Displays the given array of food items as cards in the menu grid.
 * @param {Array} items - Array of food item objects to render.
 */
function displayMenu(items) {
  if (!menuGrid) return;

  menuGrid.innerHTML = "";

  if (items.length === 0) {
    noResults.hidden = false;
    menuGrid.hidden = true;
    return;
  }

  noResults.hidden = true;
  menuGrid.hidden = false;

  items.forEach((item, index) => {
    const card = renderFoodCard(item, index);
    menuGrid.appendChild(card);
  });
}

/**
 * Creates and returns a food card DOM element for a given menu item.
 * @param {Object} item - The food item object.
 * @param {number} index - Position index for staggered animation delay.
 * @returns {HTMLElement} The food card element.
 */
function renderFoodCard(item, index) {
  const card = document.createElement("article");
  card.classList.add("food-card");
  card.style.animationDelay = `${index * 0.05}s`;
  card.setAttribute("role", "listitem");

  // Image or Emoji fallback
  const imageHtml = item.image
    ? `<img
        src="${item.image}"
        alt="${item.name}"
        class="food-card-img"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      />
      <div class="food-card-emoji" style="display:none;" aria-hidden="true">${item.emoji}</div>`
    : `<div class="food-card-emoji" aria-hidden="true">${item.emoji}</div>`;

  card.innerHTML = `
    <div class="food-card-img-wrap">
      ${imageHtml}
      <span class="food-card-badge">${item.category}</span>
    </div>
    <div class="food-card-body">
      <h3 class="food-card-name">${escapeHtml(item.name)}</h3>
      <p class="food-card-desc">${escapeHtml(item.description)}</p>
    </div>
    <div class="food-card-footer">
      <div class="food-card-price"><span>₹</span>${item.price}</div>
      <button
        class="add-to-cart-btn"
        id="add-btn-${item.id}"
        aria-label="Add ${item.name} to cart"
        onclick="addToCart(${item.id})"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add
      </button>
    </div>
  `;

  return card;
}

/* =====================================================================
   7. FILTER MENU
   ===================================================================== */
/**
 * Applies both category and search filters and re-renders the menu.
 */
function filterMenu() {
  let filtered = menuData;

  // Category filter
  if (activeCategory !== "all") {
    filtered = filtered.filter(item =>
      item.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  // Search filter
  if (searchQuery.trim() !== "") {
    const query = searchQuery.trim().toLowerCase();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }

  displayMenu(filtered);
}

/**
 * Sets up category filter button click events.
 */
function setupCategoryFilter() {
  const buttons = document.querySelectorAll(".category-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active state
      buttons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      activeCategory = btn.dataset.category;
      filterMenu();
    });
  });
}

/**
 * Externally-callable function to filter by category (e.g., from footer links).
 * @param {string} category - Category to filter by.
 */
function filterByCategory(category) {
  activeCategory = category;
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach(b => {
    const match = b.dataset.category === category;
    b.classList.toggle("active", match);
    b.setAttribute("aria-pressed", String(match));
  });
  filterMenu();
}

/* =====================================================================
   8. SEARCH MENU
   ===================================================================== */
/**
 * Sets up input listeners on both navbar and mobile search inputs.
 */
function setupSearchListeners() {
  if (navSearchInput) {
    navSearchInput.addEventListener("input", handleSearch);
  }
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", handleSearch);
  }
}

/**
 * Handles search input events by syncing both inputs and triggering filter.
 * @param {Event} e - Input event.
 */
function handleSearch(e) {
  searchQuery = e.target.value;

  // Sync both search inputs
  if (navSearchInput) navSearchInput.value = searchQuery;
  if (mobileSearchInput) mobileSearchInput.value = searchQuery;

  filterMenu();

  // Scroll to menu section if not already visible
  const menuSection = document.getElementById("menu");
  if (menuSection && searchQuery.trim() !== "") {
    const rect = menuSection.getBoundingClientRect();
    if (rect.top < -100 || rect.bottom < 0) {
      menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

/* =====================================================================
   9. CART – ADD, REMOVE, INCREASE, DECREASE
   ===================================================================== */
/**
 * Adds an item to the cart, or increases its quantity if already in cart.
 * @param {number} itemId - The id of the menu item to add.
 */
function addToCart(itemId) {
  const item = menuData.find(m => m.id === itemId);
  if (!item) return;

  const existingIndex = cart.findIndex(c => c.id === itemId);

  if (existingIndex !== -1) {
    // Increase quantity
    cart[existingIndex].quantity += 1;
  } else {
    // Add new item
    cart.push({
      id:       item.id,
      name:     item.name,
      price:    item.price,
      image:    item.image,
      emoji:    item.emoji,
      quantity: 1
    });
  }

  updateCart();
  showToast(`${item.emoji} ${item.name} added to cart!`, "success");
  animateCartBadge();
}

/**
 * Removes an item from the cart entirely.
 * @param {number} itemId - The id of the cart item to remove.
 */
function removeFromCart(itemId) {
  const idx = cart.findIndex(c => c.id === itemId);
  if (idx === -1) return;
  const name = cart[idx].name;
  cart.splice(idx, 1);
  updateCart();
  showToast(`${name} removed from cart.`, "");
}

/**
 * Increases the quantity of a cart item by 1.
 * @param {number} itemId - The id of the cart item.
 */
function increaseQuantity(itemId) {
  const item = cart.find(c => c.id === itemId);
  if (!item) return;
  item.quantity += 1;
  updateCart();
}

/**
 * Decreases the quantity of a cart item by 1. Removes item if qty reaches 0.
 * @param {number} itemId - The id of the cart item.
 */
function decreaseQuantity(itemId) {
  const item = cart.find(c => c.id === itemId);
  if (!item) return;

  if (item.quantity <= 1) {
    removeFromCart(itemId);
  } else {
    item.quantity -= 1;
    updateCart();
  }
}

/* =====================================================================
   10. UPDATE CART (render + recalculate)
   ===================================================================== */
/**
 * Re-renders the cart sidebar items list, updates badge and totals.
 */
function updateCart() {
  renderCartItems();
  updateCartBadge();
  calculateTotals();
}

/**
 * Renders all cart items inside the sidebar list.
 */
function renderCartItems() {
  if (!cartItemsList) return;

  cartItemsList.innerHTML = "";

  if (cart.length === 0) {
    // Show empty cart state
    cartItemsList.innerHTML = `
      <div class="empty-cart-wrap" role="status" aria-label="Cart is empty">
        <img src="images/empty_cart.png" alt="Empty cart illustration" class="empty-cart-img"
             onerror="this.style.display='none'" />
        <h3 class="empty-cart-title">Cart is Empty</h3>
        <p class="empty-cart-text">Your cart is empty. Start adding delicious food!</p>
      </div>
    `;
    if (cartSummary) cartSummary.hidden = true;
    return;
  }

  if (cartSummary) cartSummary.hidden = false;

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("role", "listitem");

    const thumbHtml = item.image
      ? `<img src="${item.image}" alt="${item.name}" class="cart-item-img"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
         <div class="cart-item-emoji-thumb" style="display:none;" aria-hidden="true">${item.emoji}</div>`
      : `<div class="cart-item-emoji-thumb" aria-hidden="true">${item.emoji}</div>`;

    cartItem.innerHTML = `
      ${thumbHtml}
      <div class="cart-item-info">
        <div class="cart-item-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
        <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
      </div>
      <div class="cart-item-controls" aria-label="Quantity controls for ${item.name}">
        <button
          class="qty-btn"
          aria-label="Decrease quantity of ${item.name}"
          onclick="decreaseQuantity(${item.id})"
        >−</button>
        <span class="cart-item-qty" aria-label="Quantity: ${item.quantity}">${item.quantity}</span>
        <button
          class="qty-btn"
          aria-label="Increase quantity of ${item.name}"
          onclick="increaseQuantity(${item.id})"
        >+</button>
        <button
          class="remove-btn"
          aria-label="Remove ${item.name} from cart"
          onclick="removeFromCart(${item.id})"
          title="Remove"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;

    cartItemsList.appendChild(cartItem);
  });
}

/**
 * Updates the cart count badge in the navbar.
 */
function updateCartBadge() {
  if (!cartCount) return;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.setAttribute("aria-label", `${totalItems} items in cart`);
}

/**
 * Triggers the bounce animation on the cart badge.
 */
function animateCartBadge() {
  if (!cartCount) return;
  cartCount.classList.remove("bump");
  // Force reflow to restart animation
  void cartCount.offsetWidth;
  cartCount.classList.add("bump");
}

/* =====================================================================
   11. CALCULATE TOTALS & GST
   ===================================================================== */
/**
 * Calculates subtotal, GST (5%), and grand total, then updates the UI.
 */
function calculateTotals() {
  const subtotal = calculateSubtotal();
  const gst      = calculateGST(subtotal);
  const grand    = subtotal + gst;

  if (summarySubtotal)   summarySubtotal.textContent   = `₹${subtotal.toFixed(2)}`;
  if (summaryGst)        summaryGst.textContent         = `₹${gst.toFixed(2)}`;
  if (summaryGrandTotal) summaryGrandTotal.textContent  = `₹${grand.toFixed(2)}`;
}

/**
 * Calculates the cart subtotal.
 * @returns {number} The subtotal amount.
 */
function calculateSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Calculates GST at 5% of the subtotal.
 * @param {number} subtotal - The subtotal amount.
 * @returns {number} The GST amount.
 */
function calculateGST(subtotal) {
  return subtotal * 0.05;
}

/* =====================================================================
   12. ORDER CONFIRMATION
   ===================================================================== */
/**
 * Validates the cart and shows the order confirmation modal.
 */
function confirmOrder() {
  if (cart.length === 0) {
    showToast("❌ Your cart is empty! Add items first.", "error");
    return;
  }

  const token = generateOrderToken();
  if (modalToken) modalToken.textContent = token;

  showModal();
}

/**
 * Generates a unique random order token in the format SNK-XXXX.
 * @returns {string} The generated order token.
 */
function generateOrderToken() {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `SNK-${digits}`;
}

/**
 * Shows the order confirmation modal.
 */
function showModal() {
  if (!orderModal) return;
  orderModal.hidden = false;
  document.body.style.overflow = "hidden";

  // Close modal on overlay click
  orderModal.addEventListener("click", handleModalOverlayClick);
}

/**
 * Closes the order confirmation modal.
 */
function closeModal() {
  if (!orderModal) return;
  orderModal.hidden = true;
  document.body.style.overflow = "";
  orderModal.removeEventListener("click", handleModalOverlayClick);
}

/**
 * Handles click on modal overlay backdrop to close.
 * @param {MouseEvent} e - Click event.
 */
function handleModalOverlayClick(e) {
  if (e.target === orderModal) {
    closeModal();
  }
}

/**
 * Resets the entire order: clears cart, closes modal and sidebar.
 */
function startNewOrder() {
  cart = [];
  updateCart();
  closeModal();
  closeCartSidebar();
  showToast("🎉 New order started. Explore the menu!", "success");

  // Scroll back to menu
  const menuSection = document.getElementById("menu");
  if (menuSection) {
    setTimeout(() => menuSection.scrollIntoView({ behavior: "smooth" }), 300);
  }
}

/* =====================================================================
   13. CART SIDEBAR
   ===================================================================== */
/**
 * Opens the cart sidebar panel.
 */
function openCartSidebar() {
  if (!cartSidebar || !cartOverlay) return;
  cartSidebar.classList.add("open");
  cartSidebar.setAttribute("aria-hidden", "false");
  cartOverlay.classList.add("active");
  cartOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  if (cartToggleBtn) cartToggleBtn.setAttribute("aria-expanded", "true");
}

/**
 * Closes the cart sidebar panel.
 */
function closeCartSidebar() {
  if (!cartSidebar || !cartOverlay) return;
  cartSidebar.classList.remove("open");
  cartSidebar.setAttribute("aria-hidden", "true");
  cartOverlay.classList.remove("active");
  cartOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  if (cartToggleBtn) cartToggleBtn.setAttribute("aria-expanded", "false");
}

/**
 * Sets up cart toggle button and overlay click-to-close.
 */
function setupCartToggle() {
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener("click", () => {
      if (cartSidebar && cartSidebar.classList.contains("open")) {
        closeCartSidebar();
      } else {
        openCartSidebar();
      }
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCartSidebar);
  }

  // Keyboard ESC closes sidebar
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (cartSidebar && cartSidebar.classList.contains("open")) closeCartSidebar();
      if (orderModal && !orderModal.hidden) closeModal();
    }
  });
}

/* =====================================================================
   14. TOAST NOTIFICATIONS
   ===================================================================== */
/**
 * Displays a toast notification at the bottom of the screen.
 * @param {string} message - The message to display.
 * @param {string} type - Toast type: 'success' | 'error' | '' (default).
 */
function showToast(message, type = "") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.classList.add("toast");
  if (type) toast.classList.add(type);
  toast.textContent = message;
  toast.setAttribute("role", "status");

  container.appendChild(toast);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
  }, 3000);
}

/* =====================================================================
   15. SCROLL EVENTS – NAVBAR + ACTIVE NAV LINKS
   ===================================================================== */
/**
 * Sets up scroll listener for navbar shadow and active nav highlighting.
 */
function setupScrollEvents() {
  window.addEventListener("scroll", handleScroll, { passive: true });
}

/**
 * Handles scroll events: sticky navbar style, active nav link, scroll-top button.
 */
function handleScroll() {
  const scrollY = window.scrollY;

  // Sticky navbar style
  if (navbar) {
    navbar.classList.toggle("scrolled", scrollY > 30);
  }

  // Scroll-to-top button
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle("visible", scrollY > 400);
  }

  // Active nav highlighting
  updateActiveNavLink();
}

/**
 * Updates the active nav link based on currently visible section.
 */
function updateActiveNavLink() {
  const sections = ["home", "menu", "about", "contact"];
  const scrollY = window.scrollY + 100;

  let current = "home";
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scrollY) {
      current = id;
    }
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    const isActive = href === `#${current}`;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

/* =====================================================================
   16. SCROLL TO TOP
   ===================================================================== */
/**
 * Sets up click event for the scroll-to-top button.
 */
function setupScrollTopBtn() {
  if (!scrollTopBtn) return;
  scrollTopBtn.addEventListener("click", scrollToTop);
}

/**
 * Smoothly scrolls the page to the top.
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =====================================================================
   17. HAMBURGER / MOBILE NAV
   ===================================================================== */
/**
 * Sets up the hamburger button to toggle the mobile navigation.
 */
function setupHamburger() {
  if (!hamburgerBtn || !mobileNav) return;

  hamburgerBtn.addEventListener("click", toggleMobileNav);

  // Close mobile nav when a link is clicked
  const mobileLinks = mobileNav.querySelectorAll(".mobile-nav-link");
  mobileLinks.forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });
}

/**
 * Toggles the mobile navigation open/closed.
 */
function toggleMobileNav() {
  const isOpen = !mobileNav.hidden;
  if (isOpen) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
}

/**
 * Opens the mobile navigation menu.
 */
function openMobileNav() {
  if (!mobileNav || !hamburgerBtn) return;
  mobileNav.hidden = false;
  hamburgerBtn.classList.add("open");
  hamburgerBtn.setAttribute("aria-expanded", "true");
}

/**
 * Closes the mobile navigation menu.
 */
function closeMobileNav() {
  if (!mobileNav || !hamburgerBtn) return;
  mobileNav.hidden = true;
  hamburgerBtn.classList.remove("open");
  hamburgerBtn.setAttribute("aria-expanded", "false");
}

/* =====================================================================
   18. CONTACT FORM
   ===================================================================== */
/**
 * Sets up the contact form submit handler with basic validation.
 */
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name    = document.getElementById("contact-name")?.value.trim();
    const email   = document.getElementById("contact-email")?.value.trim();
    const message = document.getElementById("contact-message")?.value.trim();

    if (!name || !email || !message) {
      showToast("⚠️ Please fill in all fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showToast("⚠️ Please enter a valid email address.", "error");
      return;
    }

    showToast("✅ Message sent! We'll get back to you soon.", "success");
    form.reset();
  });
}

/**
 * Basic email validation helper.
 * @param {string} email - Email string to validate.
 * @returns {boolean} Whether the email format is valid.
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =====================================================================
   19. REVEAL ANIMATIONS (Intersection Observer)
   ===================================================================== */
/**
 * Sets up IntersectionObserver for scroll-triggered reveal animations.
 */
function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(
    ".about-section, .contact-section, .about-stat-card, .contact-info-item, .contact-form, .about-feature-item"
  );

  revealElements.forEach(el => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    // Fallback: just show everything
    revealElements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* =====================================================================
   20. UTILITY HELPERS
   ===================================================================== */
/**
 * Escapes HTML special characters to prevent XSS.
 * @param {string} str - Input string.
 * @returns {string} Escaped string.
 */
function escapeHtml(str) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return String(str).replace(/[&<>"']/g, m => map[m]);
}
