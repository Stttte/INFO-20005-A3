
document.addEventListener("DOMContentLoaded", () => {
  // Catalog
  document.querySelectorAll(".toggle-card").forEach(card => {
    card.addEventListener("click", () => {
      const dropdown = card.nextElementSibling;
      dropdown?.classList.toggle("hidden");
    });
  });

  // Function development in progress
  document.getElementById("feature-button")?.addEventListener("click", e => {
    e.preventDefault();
    alert("Sorry, the function is under development, stay tuned!");
  });

  // Move 
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
