// /******************** FAVORITES ********************/
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(productName, price) {
  const index = favorites.findIndex(p => p.name === productName);

  if (index > -1) {
    favorites.splice(index, 1); // retirer des favoris
  } else {
    favorites.push({ name: productName, price });
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoritesUI();
}

function updateFavoritesUI() {
  const list = document.getElementById("favorites-items");
  list.innerHTML = "";

  favorites.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button onclick="removeFavorite(${i})">x</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("favorites").classList.toggle("hidden", favorites.length === 0);

  document.querySelectorAll(".pro").forEach((card) => {
    const productName = card.querySelector(".des h5").textContent;
    const heart = card.querySelector(".favorite-heart");
    if (favorites.some(f => f.name === productName)) {
      heart.className = "favorite-heart fa-solid fa-heart";
    } else {
      heart.className = "favorite-heart fa-regular fa-heart";
    }
  });
}

function removeFavorite(index) {
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoritesUI();
}

function toggleFavorites() {
  const favBox = document.getElementById("favorites");
  favBox.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  updateFavoritesUI();
});