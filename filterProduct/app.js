const searchField = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const categoryBtn = document.querySelectorAll(".category-btn");
const products = document.querySelectorAll(".product-items");

//Functions
const filterProduct = () => {
  const searchValue = searchField.value.toLowerCase();
  const activeCategory = document.querySelector(".category-btn.active").dataset
    .category;

  products.forEach((item) => {
    const title = item.querySelector("h3").innerText.toLowerCase();
    const category = item.dataset.category;

    const matchesSearch = title.includes(searchValue);
    const matchesCategory =
      activeCategory === "all" || category === activeCategory;

    // Show the product if it matches both the search and the active category
    if (matchesSearch && matchesCategory) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};

const setCategory = (e) => {
  // Remove active class from all category buttons
  categoryBtn.forEach((btn) => btn.classList.remove("active"));

  // Add active class to the clicked button
  e.target.classList.add("active");

  // Filter products based on the selected category
  filterProduct();
};

// Event Listeners
searchField.addEventListener("input", filterProduct);
searchBtn.addEventListener("click", filterProduct);
categoryBtn.forEach((btn) => {
  btn.addEventListener("click", setCategory);
});
