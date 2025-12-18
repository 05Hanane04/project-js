 let cart = [];
    let total = 0;

    function addToCart(item, price) {
        const existing = cart.find(i => i.name === item);
        if (existing)
            existing.qty++;
        else cart.push({ name: item, price: price, qty: 1 });
        total += price;
        updateCart();
    }

    function removeFromCart(index) {
        total -= cart[index].price * cart[index].qty;
        cart.splice(index, 1);
        updateCart();
    }

    function updateCart() {
        const list = document.getElementById('cart-items');
        list.innerHTML = '';
        cart.forEach((item, i) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} (x${item.qty}) - $${(item.price*item.qty).toFixed(2)} <button class='remove-btn' onclick='removeFromCart(${i})'>x</button>`;
            list.appendChild(li);
        });
        document.getElementById('total').textContent = total.toFixed(2);
    }

    function toggleCart() {
        const cart = document.getElementById('cart');
        cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
    }

    function checkout() {
        alert('Checkout not implemented in this demo');
    }



    // Language dictionary
const lang = {
    en: { total: "Total", checkout: "Checkout", remove: "x" },
    fr: { total: "Total", checkout: "Commander", remove: "x" },
    ar: { total: "المجموع", checkout: "الدفع", remove: "حذف" },
    es: { total: "Total", checkout: "Pagar", remove: "x" },
    ko: { total: "합계", checkout: "결제", remove: "삭제" }
};

let currentLang = "en"; // default

function changeLanguage() {
    const select = document.getElementById("language-select");
    currentLang = select.value;
    updateCart();
}

// Updated updateCart function with language support
function updateCart() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    cart.forEach((item, i) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} (x${item.qty}) - $${(item.price*item.qty).toFixed(2)} 
            <button class='remove-btn' onclick='removeFromCart(${i})'>${lang[currentLang].remove}</button>`;
        list.appendChild(li);
    });
    document.getElementById('total-label').textContent = `${lang[currentLang].total}: $${total.toFixed(2)}`;
    document.getElementById('checkout-btn').textContent = lang[currentLang].checkout;
}

let isLogin = true;

function toggleAuth() {
    const modal = document.getElementById("auth-modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function switchAuth() {
    isLogin = !isLogin;

    document.querySelector(".auth-box h2").textContent =
        isLogin ? "Login to KSH" : "Create Account";

    document.querySelector(".auth-btn").textContent =
        isLogin ? "Login" : "Register";
}
function handleLogin() {

    // Close the modal
    document.getElementById("auth-modal").style.display = "none";

    // Change icon to logged in
    const icon = document.getElementById("login-icon");
    if (icon) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    }
}
// Close cart when clicking outside
document.addEventListener("click", function (e) {
    const cartBox = document.getElementById("cart");
    const cartIcon = document.getElementById("cart-icon");

    // If cart is open
    if (cartBox.style.display === "block") {
        // If click is NOT inside cart and NOT on cart icon
        if (!cartBox.contains(e.target) && !cartIcon.contains(e.target)) {
            cartBox.style.display = "none";
            cartIcon.style.opacity = "0.7";
        }
    }
});
function handleCart(event) {
    event.stopPropagation(); // empêche la fermeture immédiate

    const cartBox = document.getElementById("cart");

    cartBox.style.display =
        cartBox.style.display === "block" ? "none" : "block";
}
document.addEventListener("click", function (e) {
    const cartBox = document.getElementById("cart");
    const cartIcon = document.getElementById("cart-icon");

    if (cartBox.style.display === "block") {
        if (!cartBox.contains(e.target) && !cartIcon.contains(e.target)) {
            cartBox.style.display = "none";
        }
    }
});


