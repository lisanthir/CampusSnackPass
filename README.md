# 🍔 Campus SnackPass

> **Skip the Queue, Grab Your Food!**  
> A modern campus canteen ordering web application built with pure HTML5, CSS3 & Vanilla JavaScript.

---

## 🚀 Quick Start

1. Open the project folder `campussnackpack/`
2. Double-click **`index.html`** to open in your browser
3. No server, no build tools, no installation required!

---

## 📁 Project Structure

```
campussnackpack/
│
├── index.html        ← Main HTML structure
├── style.css         ← All styles (design system, animations, responsive)
├── script.js         ← All JavaScript logic (modular ES6 functions)
├── images/           ← Food images & illustrations
│   ├── hero_banner.png
│   ├── empty_cart.png
│   ├── burger.png
│   ├── pizza.png
│   ├── dosa.png
│   ├── cold_coffee.png
│   ├── fries.png
│   ├── samosa.png
│   ├── idli.png
│   ├── paneer_wrap.png
│   ├── fried_rice.png
│   ├── noodles.png
│   └── sandwich.png
└── README.md
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Search** | Real-time search by name, category, or description |
| 🏷️ **Category Filter** | Filter by Breakfast, Snacks, Meals, Drinks, Desserts |
| 🛒 **Cart Management** | Add, remove, increase/decrease quantity |
| 💰 **Live Totals** | Subtotal + GST (5%) + Grand Total auto-updated |
| ✅ **Order Confirmation** | Modal with unique token (e.g., SNK-4832) |
| 📱 **Responsive** | Works on Desktop, Tablet & Mobile |
| 🔔 **Toast Notifications** | Feedback for every cart action |
| ⬆️ **Scroll to Top** | Floating button appears on scroll |
| 🎬 **Animations** | Fade-in, hover effects, page loader |
| ♿ **Accessibility** | Semantic HTML, ARIA labels, keyboard support |

---

## 🍽️ Menu Categories (20 Items)

| Category | Items |
|---|---|
| 🥞 Breakfast | Masala Dosa, Idli |
| 🍟 Snacks | Veg Burger, Cheese Pizza, French Fries, Paneer Wrap, Grilled Sandwich, Samosa, Garlic Bread |
| 🍽️ Meals | Veg Fried Rice, Veg Noodles, Creamy Pasta |
| 🥤 Drinks | Cold Coffee, Fresh Juice, Milkshake, Masala Tea |
| 🍰 Desserts | Brownie, Ice Cream, Muffin, Chocolate Cake |

---

## 🎨 Design System

- **Primary:** `#FF6B35` (Vibrant Orange)
- **Success:** `#2ECC71` (Green)
- **Background:** `#FFF8F0` (Warm White)
- **Dark:** `#1A1A2E`
- **Font:** Outfit (headings) + Inter (body) — Google Fonts

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure, accessibility, SEO meta tags
- **CSS3** — Variables, Grid, Flexbox, Animations, Glassmorphism
- **Vanilla JavaScript (ES6)** — Modules, Arrow functions, Template literals

---

## 🧩 JavaScript Architecture

All logic is split into clearly named, single-responsibility functions:

```
displayMenu()         → Renders food cards to the DOM
filterMenu()          → Applies category + search filters
renderFoodCard()      → Creates a single food card element
addToCart()           → Adds item or increments quantity
removeFromCart()      → Removes item from cart
increaseQuantity()    → Increments quantity
decreaseQuantity()    → Decrements quantity (removes if 0)
updateCart()          → Re-renders cart items + badge + totals
renderCartItems()     → Renders cart sidebar list
calculateSubtotal()   → Sums all item totals
calculateGST()        → 5% of subtotal
calculateTotals()     → Updates all summary fields
generateOrderToken()  → Returns unique SNK-XXXX string
confirmOrder()        → Validates & shows modal
showModal()           → Opens order confirmation modal
closeModal()          → Closes modal
startNewOrder()       → Resets cart & closes everything
openCartSidebar()     → Opens cart panel
closeCartSidebar()    → Closes cart panel
showToast()           → Displays toast notification
scrollToTop()         → Scrolls to top of page
filterByCategory()    → External category filter trigger
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| > 1024px | Full desktop layout |
| 768px–1024px | Tablet – collapsed columns |
| < 768px | Mobile – hamburger menu, full-width cart |
| < 480px | Extra small – 2-column menu grid |

---

## © 2026 Campus SnackPass

Made with ❤️ for College Students.
