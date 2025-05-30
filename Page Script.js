
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
