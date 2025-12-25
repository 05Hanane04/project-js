/******************** CART ********************/
let cart = [];
let total = 0;

function addToCart(item, price) {
    const existing = cart.find(i => i.name === item);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name: item, price, qty: 1 });
    }
    total += price;
    updateCart();
}

function removeFromCart(index) {
    total -= cart[index].price * cart[index].qty;
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const list = document.getElementById("cart-items");
    if (!list) return;

    list.innerHTML = "";

    cart.forEach((item, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} (x${item.qty}) - $${(item.price * item.qty).toFixed(2)}
            <button class="remove-btn" onclick="removeFromCart(${i})">
                ${lang[currentLang].remove}
            </button>
        `;
        list.appendChild(li);
    });

    document.getElementById("total-label").textContent =
        `${lang[currentLang].total}: $${total.toFixed(2)}`;

    document.getElementById("checkout-btn").textContent =
        lang[currentLang].checkout;
}

function handleCart(event) {
    event.stopPropagation();
    const cartBox = document.getElementById("cart");
    cartBox.style.display =
        cartBox.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", e => {
    const cartBox = document.getElementById("cart");
    const cartIcon = document.getElementById("cart-icon");

    if (
        cartBox &&
        cartBox.style.display === "block" &&
        !cartBox.contains(e.target) &&
        !cartIcon.contains(e.target)
    ) {
        cartBox.style.display = "none";
    }
});

/******************** LANGUAGES ********************/
const lang = {
    en: {
        home: "Home",
        top_products: "Top Products",
        shop: "Shop",
        welcome: "Welcome to KSH",
        login: "Login",
        new_here: "New here?",
        create_account: "Create an account",
        about: "About KSH",
        about_text: "Elegant makeup designed to enhance your natural beauty.",
        contact: "Contact",
        follow: "Follow Us",
        add_to_cart: "Add to Cart",
        total: "Total",
        checkout: "Checkout",
        remove: "x"
    },
    fr: {
        home: "Accueil",
        top_products: "Meilleurs Produits",
        shop: "Boutique",
        welcome: "Bienvenue chez KSH",
        login: "Connexion",
        new_here: "Nouvelle ici ?",
        create_account: "Créer un compte",
        about: "À propos de KSH",
        about_text: "Un maquillage élégant pour sublimer votre beauté naturelle.",
        contact: "Contact",
        follow: "Suivez-nous",
        add_to_cart: "Ajouter au panier",
        total: "Total",
        checkout: "Commander",
        remove: "x"
    },
    ar: {
        home: "الرئيسية",
        top_products: "أفضل المنتجات",
        shop: "المتجر",
        welcome: "مرحباً بكم في KSH",
        login: "تسجيل الدخول",
        new_here: "جديدة هنا؟",
        create_account: "إنشاء حساب",
        about: "حول KSH",
        about_text: "مكياج أنيق لإبراز جمالك الطبيعي.",
        contact: "اتصل بنا",
        follow: "تابعونا",
        add_to_cart: "أضف إلى السلة",
        total: "المجموع",
        checkout: "الدفع",
        remove: "حذف"
    },
    es: {
        home: "Inicio",
        top_products: "Productos Top",
        shop: "Tienda",
        welcome: "Bienvenido a KSH",
        login: "Iniciar sesión",
        new_here: "¿Nueva aquí?",
        create_account: "Crear una cuenta",
        about: "Sobre KSH",
        about_text: "Maquillaje elegante para realzar tu belleza natural.",
        contact: "Contacto",
        follow: "Síguenos",
        add_to_cart: "Añadir al carrito",
        total: "Total",
        checkout: "Pagar",
        remove: "x"
    },
    ko: {
        home: "홈",
        top_products: "인기 제품",
        shop: "쇼핑",
        welcome: "KSH에 오신 것을 환영합니다",
        login: "로그인",
        new_here: "처음이신가요?",
        create_account: "계정 만들기",
        about: "KSH 소개",
        about_text: "자연스러운 아름다움을 강조하는 우아한 메이크업.",
        contact: "연락처",
        follow: "팔로우",
        add_to_cart: "장바구니에 추가",
        total: "합계",
        checkout: "결제",
        remove: "삭제"
    }
};

let currentLang = "en";

/******************** APPLY LANGUAGE ********************/
function updateTexts() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (lang[currentLang][key]) {
            el.textContent = lang[currentLang][key];
        }
    });

    // boutons Add to Cart
    document.querySelectorAll(".product button").forEach(btn => {
        btn.textContent = lang[currentLang].add_to_cart;
    });
}

function changeLanguage() {
    const select = document.getElementById("language-select");
    currentLang = select.value;
    updateTexts();
    updateCart();
}

/******************** AUTH ********************/
let isLogin = true;
function toggleAuth() {
    const modal = document.getElementById("auth-modal");
    modal.style.display =
        modal.style.display === "flex" ? "none" : "flex";
}

function switchAuth() {
    isLogin = !isLogin;

    document.querySelector(".auth-box h2").textContent =
        isLogin ? lang[currentLang].login : lang[currentLang].create_account;

    document.querySelector(".auth-btn").textContent =
        isLogin ? lang[currentLang].login : "Register";
}

function handleLogin() {
    document.getElementById("auth-modal").style.display = "none";

    const icon = document.getElementById("login-icon");
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
}

/******************** INIT ********************/
document.addEventListener("DOMContentLoaded", () => {
    updateTexts();
    updateCart();
});

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}



