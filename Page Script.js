function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}


function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}


function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = totalCount;
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }
}


function showPopup(message) {
  let popup = document.createElement('div');
  popup.className = 'popup-message';
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
  setTimeout(() => {
    popup.classList.remove('show');
    popup.remove();
  }, 2000);
}


function setupAddToCartButton() {
  const addBtn = document.getElementById('add-to-cart');
  if (!addBtn) return;

  addBtn.addEventListener('click', () => {
    const productId = addBtn.dataset.productId;
    const productName = addBtn.dataset.name;
    const productPrice = parseFloat(addBtn.dataset.price);

    let cart = getCart();
    let existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    saveCart(cart);
    showPopup("Added to cart!");
  });
}


function renderCartPage() {
  const cartContainer = document.getElementById('cart-items');
  if (!cartContainer) return;

  const cart = getCart();
  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <p>${item.name}</p>
      <p>AU$${item.price.toFixed(2)}</p>
      <div class="quantity-control">
        <button class="decrease" data-index="${index}">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
      <p class="subtotal">AU$${(item.price * item.quantity).toFixed(2)}</p>
      <button class="delete" data-index="${index}">🗑️</button>
    `;
    cartContainer.appendChild(div);
    total += item.price * item.quantity;
  });

  const totalEl = document.getElementById('cart-total');
  if (totalEl) {
    totalEl.textContent = `Total: AU$${total.toFixed(2)}`;
  }

  setupCartEventListeners();
}

function setupCartEventListeners() {
  document.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      let cart = getCart();
      cart[index].quantity += 1;
      saveCart(cart);
      renderCartPage();
    });
  });
  document.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      let cart = getCart();
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }
      saveCart(cart);
      renderCartPage();
    });
  });
  document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      let cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      renderCartPage();
    });
  });
}



document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('searchOverlay');
  const modal = document.getElementById('searchModal');
  const closeBtn = document.getElementById('searchClose');
  const inputBox = document.getElementById('searchInput');
  const placeholderText = document.getElementById('placeholderText');
  const suggestionList = document.getElementById('suggestionList');
  const searchIcon = document.querySelector('.search-icon-svg');

  const displaySuggestions = [
    "Strawberry Biscoff Waffle",
    "Snow Strawberry Cheese Cake",
    "Snow Moon Rice",
    "Cream FoiThong Waffle",
    "Cocoa Milk Tea",
    "Cake"
  ];

  const linkSuggestions = [
    { name: "Strawberry Biscoff Waffle", url: "Product detail 1.html" },
    { name: "Cream FoiThong Waffle", url: "Product detail 2.html" }
  ];

  document.querySelectorAll('.icon')[0]?.addEventListener('click', () => {
    overlay.style.display = 'block';
    modal.style.display = 'block';
    inputBox?.focus();
  });

  closeBtn?.addEventListener('click', () => {
    overlay.style.display = 'none';
    modal.style.display = 'none';
    inputBox.value = '';
    placeholderText.style.opacity = '1';
    suggestionList.style.display = 'none';
    suggestionList.innerHTML = '';
  });

  inputBox?.addEventListener('input', () => {
    const keyword = inputBox.value.trim().toLowerCase();
    placeholderText.style.opacity = keyword === "" ? '1' : '0';

    suggestionList.innerHTML = '';
    if (keyword === '') {
      suggestionList.style.display = 'none';
      return;
    }

    const filtered = displaySuggestions.filter(name =>
      name.toLowerCase().startsWith(keyword)
    );

    if (filtered.length === 0) {
      suggestionList.style.display = 'none';
      return;
    }

    suggestionList.style.display = 'block';

    filtered.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      li.style.cursor = 'pointer';

      const match = linkSuggestions.find(item =>
        item.name.toLowerCase() === name.toLowerCase()
      );

      if (match) {
        li.addEventListener('click', () => {
          window.location.href = match.url;
        });
      }

      suggestionList.appendChild(li);
    });
  });

  inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSearchAction();
    }
  });

  searchIcon?.addEventListener('click', () => {
    handleSearchAction();
  });

  function handleSearchAction() {
    const keyword = inputBox.value.trim().toLowerCase();
    if (keyword === '') return;

    const match = linkSuggestions.find(item =>
      item.name.toLowerCase().startsWith(keyword)
    );
    if (match) {
      window.location.href = match.url;
    }
  }
});



function setupSearchFilter() {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get('search');
  if (!keyword) return;

  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const name = card.querySelector('.product-name')?.textContent.toLowerCase();
    if (name && name.includes(keyword.toLowerCase())) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}


document.addEventListener('DOMContentLoaded', setupSearchFilter);




document.addEventListener("DOMContentLoaded", () => {
  // index open/close
  document.querySelectorAll(".toggle-card").forEach(card => {
    card.addEventListener("click", () => {
      const dropdown = card.nextElementSibling;
      dropdown?.classList.toggle("hidden");
    });
  });

  // popup window
  document.getElementById("feature-button")?.addEventListener("click", e => {
    e.preventDefault();
    alert("sorry");
  });

  // Explore More
  document.getElementById("scroll-to-category")?.addEventListener("click", () => {
    document.getElementById("category-section")?.scrollIntoView({ behavior: "smooth" });
  });

  // Add to cart toast
  const addBtn = document.getElementById("add-to-cart");
  const toast = document.getElementById("toast");
  addBtn?.addEventListener("click", () => {
    toast?.classList.add("show");
    setTimeout(() => toast?.classList.remove("show"), 2000);
  });

  // Remove from cart
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".cart-item")?.remove();
    });
  });
});

