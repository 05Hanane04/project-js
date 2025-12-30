/*search bar*/
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function searchProduct() {
  const input = document.getElementById("search-input").value.toLowerCase();
  const products = document.querySelectorAll(".pro");

  products.forEach((product) => {
    const name = product.querySelector("h5").textContent.toLowerCase();
    product.style.display = name.includes(input) ? "block" : "none";
  });
}

function saveSearch(value) {
  if (!value || searchHistory.includes(value)) return;
  searchHistory.unshift(value);
  if (searchHistory.length > 5) searchHistory.pop();
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function showHistory() {
  const historyBox = document.getElementById("search-history");
  historyBox.innerHTML = "";

  if (searchHistory.length === 0) return;

  historyBox.style.display = "block";

  searchHistory.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="selectHistory('${item}')">${item}</span>
      <span onclick="removeHistory(${index})">✖</span>
    `;
    historyBox.appendChild(li);
  });
}
function selectHistory(value) {
  document.getElementById("search-input").value = value;
  searchProduct();
}

function removeHistory(index) {
  searchHistory.splice(index, 1);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  showHistory();
}

document.getElementById("search-input").addEventListener("change", function () {
  saveSearch(this.value.toLowerCase());
});