function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function showPopup(message) {
  let popup = document.createElement('div');
  popup.className = 'popup-message';
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => popup.classList.add('show'), 10);
  setTimeout(() => {
    popup.classList.remove('show');
    popup.remove();
  }, 2000);
}

function setupQuantityControls1() {
  let cart = getCart().filter(item => item.id !== "strawberry-waffle-001");
  saveCart(cart);

  const minusBtn = document.querySelector('.quan-control .minus');
  const plusBtn = document.querySelector('.quan-control .plus');
  const display  = document.querySelector('.quan-control .qt-display');
  if (!minusBtn || !plusBtn || !display) return;

  display.textContent = '0';

  minusBtn.onclick = () => {
    let current = parseInt(display.textContent, 10);
    if (!isNaN(current) && current > 0) {
      display.textContent = current - 1;
      updateSingleProductInCart(-1);
    }
  };

  plusBtn.onclick = () => {
    let current = parseInt(display.textContent, 10);
    display.textContent = current + 1;
    updateSingleProductInCart(1);
  };
}

function updateSingleProductInCart(change) {
  const productId    = "strawberry-waffle-001";
  const productName  = "Strawberry Biscoff Waffle";
  const productPrice = 8.75;

  let cart = getCart();
  let item = cart.find(p => p.id === productId);

  if (!item && change > 0) {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  } else if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== productId);
    }
  }

  saveCart(cart);
  if (typeof renderCartPage === 'function') renderCartPage();
}

function setupQuantityControls2() {
  let cart = getCart().filter(item => item.id !== "cream-foithong-waffle-002");
  saveCart(cart);

  const minusBtn = document.querySelector('.qu-control .minus');
  const plusBtn  = document.querySelector('.qu-control .plus');
  const display  = document.querySelector('.qu-control .q-display');
  if (!minusBtn || !plusBtn || !display) return;

  display.textContent = '0';

  minusBtn.onclick = () => {
    let current = parseInt(display.textContent, 10);
    if (!isNaN(current) && current > 0) {
      display.textContent = current - 1;
      updateSingleProductInCart2(-1);
    }
  };

  plusBtn.onclick = () => {
    let current = parseInt(display.textContent, 10);
    display.textContent = current + 1;
    updateSingleProductInCart2(1);
  };
}

function updateSingleProductInCart2(change) {
  const productId    = "cream-foithong-waffle-002";
  const productName  = "Cream FoiThong Waffle";
  const productPrice = 17.50;

  let cart = getCart();
  let item = cart.find(p => p.id === productId);

  if (!item && change > 0) {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  } else if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== productId);
    }
  }

  saveCart(cart);
  if (typeof renderCartPage === 'function') renderCartPage();
}

function renderCartPage() {
  const cart = getCart();
  const cartContainer = document.querySelector('.cart-items');
  const emptyMessage = document.querySelector('.empty-cart');
  const cartPanel = document.querySelector('.cart-panel');
  const payPanel = document.querySelector('.pay-panel');
  const totalEl = document.getElementById('cart-total');

  if (cart.length === 0) {
    if (emptyMessage) emptyMessage.style.display = 'flex';
    if (cartPanel) cartPanel.style.display = 'none';
    if (payPanel) payPanel.style.display = 'none';
    if (totalEl) totalEl.textContent = 'AU$0.00';
    return;
  }

  if (emptyMessage) emptyMessage.style.display = 'none';
  if (cartPanel) cartPanel.style.display = '';
  if (payPanel) payPanel.style.display = '';

  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    const imgSrc = item.id === 'strawberry-waffle-001' ? 'strawberry-waffle.png' : 'waffle.png';
    div.innerHTML = `
      <div class="small-frame"><img src="${imgSrc}" alt="${item.name}" /></div>
      <div class="item-info"><h2 class="item-name">${item.name}</h2></div>
      <div class="item-price">AU$${item.price.toFixed(2)}</div>
      <img src="trash-box.svg" alt="Remove" class="price-icon" data-index="${index}" />
      <div class="qcart-control">
        <button class="qcart-btn minus" data-index="${index}">−</button>
        <div class="divider"></div>
        <div class="qcart-display">${item.quantity}</div>
        <div class="divider"></div>
        <button class="qcart-btn plus" data-index="${index}">＋</button>
      </div>
    `;
    cartContainer.appendChild(div);
    total += item.price * item.quantity;
  });

  if (totalEl) {
    totalEl.textContent = `AU$${total.toFixed(2)}`;
  }

  setupCartEventListeners();
}


function setupCartEventListeners() {
  document.querySelectorAll('.qcart-btn.plus').forEach(btn => {
    btn.onclick = () => {
      const index = parseInt(btn.dataset.index, 10);
      const cart = getCart();
      cart[index].quantity += 1;
      saveCart(cart);
      renderCartPage();
    };
  });

  document.querySelectorAll('.qcart-btn.minus').forEach(btn => {
    btn.onclick = () => {
      const index = parseInt(btn.dataset.index, 10);
      const cart = getCart();
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      saveCart(cart);
      renderCartPage();
    };
  });

  document.querySelectorAll('.price-icon').forEach(icon => {
    icon.onclick = () => {
      const index = parseInt(icon.dataset.index, 10);
      const cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      renderCartPage();
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.quan-control')) setupQuantityControls1();
  if (document.querySelector('.qu-control')) setupQuantityControls2();
  if (document.querySelector('.cart-items')) renderCartPage();
});



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

function setupCheckoutButton() {
  const checkoutBtn = document.querySelector('.icon-button-yellow');
  if (!checkoutBtn) return;
  checkoutBtn.addEventListener('click', () => {
    if (window.innerWidth <= 480) {
      localStorage.removeItem('cart');
      const overlay = document.getElementById('paymentOverlay');
      if (overlay) {
        overlay.style.display = 'flex';
        overlay.addEventListener('click', () => {
          window.location.href = "index.html";
        }, { once: true });
      }
      return;
    }
    const cardInput   = document.getElementById('card-input')?.value.trim().replace(/\s/g, '');
    const cvvInput    = document.getElementById('cvv-input')?.value.trim();
    const expiryInput = document.getElementById('expiry-input')?.value.trim();
    const isCardValid = /^\d{16}$/.test(cardInput);
    const isCVVValid  = /^\d{3}$/.test(cvvInput);
    const expiryDigits = expiryInput.replace(/\D/g, '');
    let isExpiryValid = expiryDigits.length === 4;
    if (isExpiryValid) {
      const month = parseInt(expiryDigits.slice(0, 2), 10);
      isExpiryValid = month >= 1 && month <= 12;
    }
    if (!isCardValid || !isCVVValid || !isExpiryValid) {
      showPopup("Please enter a valid card number, CVV, and expiry date.");
      return;
    }
    localStorage.removeItem('cart');
    const overlay = document.getElementById('paymentOverlay');
    if (overlay) {
      overlay.style.display = 'flex';
      overlay.addEventListener('click', () => {
        window.location.href = "index.html";
      }, { once: true });
    }
  });
}

 document.addEventListener('DOMContentLoaded', () => {
  const waffleButtons = document.querySelectorAll('.waffle-button');
  const popupOverlay = document.querySelector('.product-popup-overlay');
  const popup = document.querySelector('.product-popup');
  const waffleHeader = document.querySelector('.waffle-button');

  waffleButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      if (window.innerWidth > 480) {
        e.stopPropagation();
        popup.style.display = 'block';
        popupOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        waffleHeader.setAttribute('aria-expanded', 'true');
        const firstImg = popup.querySelector('.popup-item img');
        if (firstImg) firstImg.focus();
      }
    });
  });

  popupOverlay.addEventListener('click', () => {
    popup.style.display = 'none';
    popupOverlay.style.display = 'none';
    document.body.style.overflow = '';
    waffleHeader.setAttribute('aria-expanded', 'false');
    waffleHeader.focus();
  });

  popup.addEventListener('click', e => {
    e.stopPropagation();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popup.style.display === 'block') {
      popup.style.display = 'none';
      popupOverlay.style.display = 'none';
      document.body.style.overflow = '';
      waffleHeader.setAttribute('aria-expanded', 'false');
      waffleHeader.focus();
    }
  });

  const mobileHeader = document.querySelector('.mobile-waffle-header');
  const mobileSublist = document.querySelector('.mobile-sublist');
  const mobileArrowPolyline = document.querySelector('.mobile-waffle-arrow polyline');

  function toggleMobileSublist() {
    const isExpanded = mobileSublist.classList.contains('expanded');
    if (isExpanded) {
      mobileSublist.classList.remove('expanded');
      mobileHeader.setAttribute('aria-expanded', 'false');
      mobileArrowPolyline.setAttribute('points', '6 9 12 15 18 9');
    } else {
      mobileSublist.classList.add('expanded');
      mobileHeader.setAttribute('aria-expanded', 'true');
      mobileArrowPolyline.setAttribute('points', '6 15 12 9 18 15');
      mobileSublist.scrollIntoView({ behavior: 'smooth' });
    }
  }

  mobileHeader.addEventListener('click', () => {
    toggleMobileSublist();
  });

  const waffleGrid = document.querySelector('.waffle-button');

  waffleGrid.addEventListener('click', () => {
    if (window.innerWidth <= 480) {
      if (!mobileSublist.classList.contains('expanded')) {
        mobileSublist.classList.add('expanded');
        mobileHeader.setAttribute('aria-expanded', 'true');
        mobileArrowPolyline.setAttribute('points', '6 15 12 9 18 15');
      }
      mobileSublist.scrollIntoView({ behavior: 'smooth' });
    }
  });


  document.querySelectorAll('.mobile-sublist .product-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.product-name')?.textContent.toLowerCase();
      if (name.includes('strawberry')) {
        window.location.href = 'Product detail 1.html';
      } else if (name.includes('criminal') || name.includes('foithong')) {
        window.location.href = 'Product detail 2.html';
      }
    });
  });

  
  popup.querySelectorAll('.popup-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.product-name')?.textContent.toLowerCase();
      if (name.includes('strawberry')) {
        window.location.href = 'Product detail 1.html';
      } else if (name.includes('criminal') || name.includes('foithong')) {
        window.location.href = 'Product detail 2.html';
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 480) {
      if (mobileSublist.classList.contains('expanded')) {
        mobileSublist.classList.remove('expanded');
        mobileHeader.setAttribute('aria-expanded', 'false');
        mobileArrowPolyline.setAttribute('points', '6 9 12 15 18 9');
      }
    } else {
      if (popup.style.display === 'block') {
        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
        document.body.style.overflow = '';
        waffleHeader.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
