let cart = [];
let total = 0;

function addToCart(item, price) {
  const existing = cart.find((i) => i.name === item);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name: item, price, qty: 1 });
  }

  total += price;
  updateCart();
  document.getElementById("cart").classList.remove("hidden");
  updateProductGraph(item);
}
let stockData = {
  Mascara: 0,
  Blush: 0,
  Contour: 0,
  Highlighter: 0,
  Lipliner: 0,
  Gloss: 0,
  Concealer: 0,
  Lipstick: 0,
};

let stockDonutChart = null;

/* ===== PRODUCT GRAPH DATA ===== */
const productClicks = {
  Mascara: 0,
  Blush: 0,
  Contour: 0,
  Highlighter: 0,
  Lipliner: 0,
  Gloss: 0,
  Concealer: 0,
  Lipstick: 0,
};
function updateProductGraph(productName) {
  if (!productClicks.hasOwnProperty(productName)) return;

  productClicks[productName]++;

  productChart.data.datasets[0].data = Object.values(productClicks);
  productChart.update();
}

const ctx = document.getElementById("productChart");
let productChart = null;
function updateProductGraph(productName) {
  if (!productClicks.hasOwnProperty(productName)) return;

  productClicks[productName]++;

  productChart.data.datasets[0].data = Object.values(productClicks);
  productChart.update();
}

if (ctx) {
  productChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(productClicks),
      datasets: [
        {
          label: "Number of clicks",
          data: Object.values(productClicks),
          backgroundColor: "#955251",
        },
      ],

    },
    
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
        },
      },
    },
  });
}
let reviews = [];

function removeFromCart(index, event) {
  if (event) event.stopPropagation();

  total -= cart[index].price * cart[index].qty;
  cart.splice(index, 1);
  updateCart();

  if (cart.length === 0) {
    document.getElementById("cart").classList.add("hidden");
  }
}
function decreaseQty(index, event) {
  if (event) event.stopPropagation();

  if (cart[index].qty > 1) {
    cart[index].qty--;
    total -= cart[index].price;
  } else {
    // si qty = 1 → on supprime le produit
    total -= cart[index].price;
    cart.splice(index, 1);
  }

  updateCart();

  if (cart.length === 0) {
    document.getElementById("cart").classList.add("hidden");
  }
}

function updateCart() {
  const list = document.getElementById("cart-items");
  if (!list) return;

  list.innerHTML = "";

  cart.forEach((item, i) => {
    const li = document.createElement("li");
li.innerHTML = `
  <span class="item-text">
    ${item.name} (x${item.qty}) - $${(item.price * item.qty).toFixed(2)}
  </span>

  <div class="item-actions">
    <button class="qty-btn" onclick="decreaseQty(${i}, event)">−</button>
    <button class="remove-btn" onclick="removeFromCart(${i}, event)">x</button>
  </div>
`;


    list.appendChild(li);
  });

  document.getElementById("total-label").textContent = `${
    lang[currentLang].total
  }: $${total.toFixed(2)}`;

  document.getElementById("checkout-btn").textContent =
    lang[currentLang].checkout;

  updateAdminPanel();

}
function handleCart(event) {
  event.stopPropagation();
  const cartBox = document.getElementById("cart");
  cartBox.classList.toggle("hidden");
}
document.addEventListener("click", (e) => {
  const cartBox = document.getElementById("cart");
  const cartIcon = document.getElementById("cart-icon");

  if (
    !cartBox.classList.contains("hidden") &&
    !cartBox.contains(e.target) &&
    !cartIcon.contains(e.target)
  ) {
    cartBox.classList.add("hidden");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  updateTexts();
  updateCart();
  document.getElementById("cart").classList.add("hidden");
});
let currentLang = "en";
const lang = {
  en: {
    home: "Home",
    top_products: "Top Products",
    shop: "Shop",
    contact: "Contact",
    login: "Login",
    create_account: "Register",
    hero_title: "Where beauty meets confidence",
    hero_subtitle: "A touch of beauty",
    hero_main: "Elegant Everyday",
    hero_desc:
      "Soft textures, thoughtful shades, beauty that feels natural and stays with you",
    shop_now: "Shop Now",
    why_ksh_title: "Why KSH ?",
    premium_quality: "Premium Quality",
    premium_quality_desc:
      "High-end formulas designed for elegance and performance.",
    cruelty_free: "Cruelty Free",
    cruelty_free_desc: "Beauty with respect. Never tested on animals.",
    luxury_experience: "Luxury Experience",
    luxury_experience_desc: "Inspired by haute couture and timeless beauty.",
    newsletter_title: "Sign Up for NewsLetters",
    newsletter_desc: "Get E-mail updates about our latest shop and special offers",
    newsletter_span: "special offers",
    newsletter_btn: "Sign Up",
    total: "Total",
    checkout: "Checkout",
    remove: "x",
    add_to_cart: "Add to Cart",
    about: "About KSH",
    about_text: "Elegant makeup designed to enhance your natural beauty.",
    follow: "Follow Us",
    hero_text: "Our best sellers loved by beauty lovers",
    shop_title: "Shop Now",
    shop_text: "Check out our amazing products",
    add_to_cart: "Add to Cart",
    launch_offer: "KSH Makeup Launch Offer",
launch_discount: "-20% on selected products",
new_collection: "New collection now available",
limited_stock: "Limited quantities",
discover_now: "Discover the collection",
stay_tuned: "Stay tuned !",

  },
  fr: {
    home: "Accueil",
    top_products: "Meilleurs Produits",
    shop: "Boutique",
    contact: "Contact",
    login: "Connexion",
    create_account: "Créer un compte",
    hero_title: "Là où la beauté rencontre la confiance",
    hero_subtitle: "Une touche de beauté",
    hero_main: "Élégance Quotidienne",
    hero_desc:
      "Textures douces, teintes réfléchies, beauté naturelle qui vous accompagne",
    shop_now: "Acheter maintenant",
    why_ksh_title: "Pourquoi KSH ?",
    premium_quality: "Qualité Premium",
    premium_quality_desc:
      "Formules haut de gamme pour élégance et performance.",
    cruelty_free: "Sans Cruauté",
    cruelty_free_desc: "Beauté avec respect. Jamais testé sur les animaux.",
    luxury_experience: "Expérience de Luxe",
    luxury_experience_desc:
      "Inspiré par la haute couture et la beauté intemporelle.",
    newsletter_title: "Inscrivez-vous à la newsletter",
    newsletter_desc: "Recevez les dernières nouveautés et",
    newsletter_span: "offres spéciales",
    newsletter_btn: "S'inscrire",
    total: "Total",
    checkout: "Commander",
    remove: "x",
    add_to_cart: "Ajouter au panier",
    about: "À propos de KSH",
    about_text: "Un maquillage élégant pour sublimer votre beauté naturelle.",
    follow: "Suivez-nous",
    hero_text: "Nos meilleures ventes adorées par les passionnés de beauté",
    shop_title: "Boutique",
    shop_text: "Découvrez nos produits incroyables",
    add_to_cart: "Ajouter au panier",
    launch_offer: "Offre de lancement KSH Makeup",
launch_discount: "-20% sur les produits sélectionnés",
new_collection: "Nouvelle collection disponible",
limited_stock: "Quantités limitées",
discover_now: "Découvrir la collection",
stay_tuned: "Restez connectés !",

  },
  ar: {
    home: "الرئيسية",
    top_products: "أفضل المنتجات",
    shop: "المتجر",
    contact: "اتصال",
    login: "تسجيل الدخول",
    create_account: "إنشاء حساب",
    hero_title: "حيث تلتقي الجمال بالثقة",
    hero_subtitle: "لمسة من الجمال",
    hero_main: "أناقة يومية",
    hero_desc: "نسيج ناعم، ألوان مدروسة، جمال طبيعي يدوم معك",
    shop_now: "تسوق الآن",
    why_ksh_title: "لماذا KSH؟",
    premium_quality: "جودة ممتازة",
    premium_quality_desc: "صياغات عالية الجودة لأناقة وأداء مثالي.",
    cruelty_free: "خالٍ من القسوة",
    cruelty_free_desc: "الجمال مع الاحترام. لم يتم اختباره على الحيوانات.",
    luxury_experience: "تجربة فاخرة",
    luxury_experience_desc: "مستوحاة من الأزياء الراقية والجمال الخالد.",
    newsletter_title: "اشترك في النشرة الإخبارية",
    newsletter_desc: "احصل على آخر التحديثات حول متجرنا و",
    newsletter_span: "العروض الخاصة",
    newsletter_btn: "اشترك",
    total: "المجموع",
    checkout: "الدفع",
    remove: "حذف",
    add_to_cart: "أضف إلى السلة",
    about: "حول KSH",
    about_text: "مكياج أنيق لإبراز جمالك الطبيعي.",
    follow: "تابعونا",
    hero_text: "أفضل منتجاتنا محبوبة من عشاق الجمال",
    shop_title: "المتجر",
    shop_text: "اطلع على منتجاتنا المذهلة",
    add_to_cart: "أضف إلى السلة",
    launch_offer: "عرض إطلاق KSH Makeup",
launch_discount: "خصم 20٪ على منتجات مختارة",
new_collection: "المجموعة الجديدة متوفرة الآن",
limited_stock: "كميات محدودة",
discover_now: "اكتشف المجموعة",
stay_tuned: "تابعونا!",

  },
  es: {
    home: "Inicio",
    top_products: "Productos Top",
    shop: "Tienda",
    contact: "Contacto",
    login: "Iniciar sesión",
    create_account: "Crear una cuenta",
    hero_title: "Donde la belleza se encuentra con la confianza",
    hero_subtitle: "Un toque de belleza",
    hero_main: "Elegancia diaria",
    hero_desc:
      "Texturas suaves, tonos pensados, belleza que se siente natural y permanece contigo",
    shop_now: "Comprar ahora",
    why_ksh_title: "¿Por qué KSH?",
    premium_quality: "Calidad Premium",
    premium_quality_desc:
      "Fórmulas de alta gama diseñadas para elegancia y rendimiento.",
    cruelty_free: "Libre de crueldad",
    cruelty_free_desc: "Belleza con respeto. Nunca probado en animales.",
    luxury_experience: "Experiencia de lujo",
    luxury_experience_desc:
      "Inspirado en la alta costura y la belleza atemporal.",
    newsletter_title: "Suscríbete a nuestro boletín",
    newsletter_desc: "Recibe actualizaciones sobre nuestra tienda y",
    newsletter_span: "ofertas especiales",
    newsletter_btn: "Registrarse",
    total: "Total",
    checkout: "Pagar",
    remove: "x",
    add_to_cart: "Añadir al carrito",
    about: "Sobre KSH",
    about_text: "Maquillaje elegante para realzar tu belleza natural.",
    follow: "Síguenos",
    hero_text: "Nuestros más vendidos amados por los amantes de la belleza",
    shop_title: "Tienda",
    shop_text: "Descubre nuestros productos increíbles",
    add_to_cart: "Añadir al carrito",
    launch_offer: "Oferta de lanzamiento KSH Makeup",
launch_discount: "-20% en productos seleccionados",
new_collection: "Nueva colección disponible",
limited_stock: "Cantidades limitadas",
discover_now: "Descubre la colección",
stay_tuned: "¡Mantente atento!",

  },
  ko: {
    home: "홈",
    top_products: "인기 제품",
    shop: "쇼핑",
    contact: "연락처",
    login: "로그인",
    create_account: "계정 만들기",
    hero_title: "아름다움이 자신감과 만나는 곳",
    hero_subtitle: "아름다움의 터치",
    hero_main: "우아한 일상",
    hero_desc:
      "부드러운 질감, 세심한 색상, 자연스럽게 느껴지고 오래 지속되는 아름다움",
    shop_now: "지금 쇼핑",
    why_ksh_title: "왜 KSH인가?",
    premium_quality: "프리미엄 품질",
    premium_quality_desc: "우아함과 성능을 위해 디자인된 고급 포뮬러.",
    cruelty_free: "동물 실험 없음",
    cruelty_free_desc: "존중과 함께하는 아름다움. 동물 실험하지 않음.",
    luxury_experience: "럭셔리 경험",
    luxury_experience_desc:
      "하이 패션과 시대를 초월한 아름다움에서 영감을 받음.",
    newsletter_title: "뉴스레터 가입",
    newsletter_desc: "최신 소식과",
    newsletter_span: "특별 할인 정보를 받아보세요",
    newsletter_btn: "가입하기",
    total: "합계",
    checkout: "결제",
    remove: "삭제",
    add_to_cart: "장바구니에 추가",
    about: "KSH 소개",
    about_text: "자연스러운 아름다움을 강조하는 우아한 메이크업.",
    follow: "팔로우",
    hero_text: "뷰티 러버들이 사랑하는 베스트셀러",
    shop_title: "쇼핑",
    shop_text: "멋진 제품을 확인해보세요",
    add_to_cart: "장바구니에 추가",
    launch_offer: "KSH 메이크업 런칭 오퍼",
launch_discount: "선택된 제품 20% 할인",
new_collection: "신규 컬렉션 출시",
limited_stock: "한정 수량",
discover_now: "컬렉션 확인하기",
stay_tuned: "계속 지켜봐 주세요!",

  },
};

function updateTexts() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (lang[currentLang][key]) {
      el.textContent = lang[currentLang][key];
    }
  });

  document.querySelectorAll(".product button").forEach((btn) => {
    btn.textContent = lang[currentLang].add_to_cart;
  });
  // Promo scroll
  document.querySelectorAll(".promo-scroll [data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (lang[currentLang][key]) {
      el.textContent = lang[currentLang][key];
    }
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
const users = [
  { email: "admin@gmail.com", password: "admin123", name: "Admin" },
  { email: "user@gmail.com", password: "user123", name: "User" },
];

function toggleAuth() {
  const modal = document.getElementById("auth-modal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}
function switchAuth() {
  isLogin = !isLogin;

  const h2 = document.querySelector(".auth-box h2");
  const btn = document.querySelector(".auth-btn");

  if (isLogin) {
    h2.textContent = lang[currentLang].login;
    btn.textContent = lang[currentLang].login;
  } else {
    h2.textContent = lang[currentLang].create_account;
    btn.textContent = "Register"; 
  }
}
function handleLogin() {
  const emailInput = document.querySelector(".auth-box input[type='email']");
  const passInput = document.querySelector(".auth-box input[type='password']");
  const email = emailInput.value.trim();
  const password = passInput.value.trim();

  if (!email || !password) {
    alert("Please fill all fields!");
    return;
  }

  if (isLogin) {
    // login
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      updateNavbarUser();
      toggleAuth();
    } else {
      alert("Invalid email or password");
    }
  } else {
    // register
    if (users.some((u) => u.email === email)) {
      alert("Email already registered");
      return;
    }
    const name = email.split("@")[0]; // simple pseudo
    const newUser = { email, password, name };
    users.push(newUser);
    localStorage.setItem("loggedUser", JSON.stringify(newUser));
    updateNavbarUser();
    toggleAuth();
    updateAdminVisibility();

  }

  // clear inputs
  emailInput.value = "";
  passInput.value = "";
}


function updateNavbarUser() {
  const icon = document.getElementById("login-icon");
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (loggedUser) {
    icon.className = ""; 
    icon.insertAdjacentHTML(
      "afterend",
      `<span id="user-name">${loggedUser.name}</span>
      <button id="logout-btn" onclick="logoutUser()">Logout</button>`
    );
    icon.style.display = "none"; // on cache l'icône user
  } else {
    icon.style.display = "inline-block";
    const nameSpan = document.getElementById("user-name");
    const logoutBtn = document.getElementById("logout-btn");
    if (nameSpan) nameSpan.remove();
    if (logoutBtn) logoutBtn.remove();
    icon.className = "fa-regular fa-user";
  }

  updateAdminPanel();

}
function logoutUser() {
  localStorage.removeItem("loggedUser");
  updateNavbarUser();
  updateAdminPanel();
  updateAdminVisibility();


}
document.addEventListener("DOMContentLoaded", () => {
  updateNavbarUser();
  updateAdminPanel();
  updateAdminVisibility();


});

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}
window.addEventListener("scroll", () => {
  document.querySelector("header")
    .classList.toggle("scrolled", window.scrollY > 50);
});




window.onload = function() {
  const ctx = document.getElementById('shopChart').getContext('2d');

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Product A',
        data: [30, 50, 40, 60, 70],
        borderColor: '#955251',
        backgroundColor: '#e1b6b5ff',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Product B',
        data: [20, 40, 35, 55, 65],
        borderColor: '#dcae96',
        backgroundColor: '#b07e68ff',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Dynamic Shop Sales Chart' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  };

  const shopChart = new Chart(ctx, config);

  setInterval(() => {
    const nextMonth = `Month ${data.labels.length + 1}`;
    const nextA = Math.floor(Math.random() * 100);
    const nextB = Math.floor(Math.random() * 100);

    data.labels.push(nextMonth);
    data.datasets[0].data.push(nextA);
    data.datasets[1].data.push(nextB);

    if (data.labels.length > 10) {
      data.labels.shift();
      data.datasets[0].data.shift();
      data.datasets[1].data.shift();
    }

    shopChart.update();
  }, 3000);
};
function updateAdminPanel() {
  const adminPanel = document.getElementById("admin-panel");
  const stockBody = document.getElementById("stock-body");
  const donutBox = document.getElementById("admin-donut");
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (!adminPanel || !stockBody) return;

  // ❌ Not admin → hide everything
  if (!loggedUser || loggedUser.email !== "admin@gmail.com") {
    adminPanel.classList.add("hidden");
    if (donutBox) donutBox.classList.add("hidden");
    return;
  }

  // ✅ Admin logged in → show panel
  adminPanel.classList.remove("hidden");
  if (donutBox) donutBox.classList.remove("hidden");

  // 🔄 Render admin stock table (THIS WAS MISSING)
  stockBody.innerHTML = "";

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${item.qty}</td>
      <td>
        <button onclick="updateProduct(${index})">Update</button>
        <button onclick="removeFromCart(${index}, event)">Remove</button>
      </td>
    `;
    stockBody.appendChild(row);
  });

  // 🍩 DONUT LOGIC (SAFE ADDITION)
  if (donutBox && !stockDonutChart) {
    createStockDonut(); // create once
  }

  updateStockDonut(); // update always
}

function updateProduct(index) {
  const item = cart[index];

  const newName = prompt("Product name:", item.name);
  if (newName === null) return;

  const newPrice = prompt("Price:", item.price);
  if (newPrice === null || isNaN(newPrice) || newPrice <= 0) return;

  const newQty = prompt("Quantity:", item.qty);
  if (newQty === null || isNaN(newQty) || newQty < 1) return;

  // Mise à jour
  total -= item.price * item.qty;

  item.name = newName;
  item.price = parseFloat(newPrice);
  item.qty = parseInt(newQty);

  total += item.price * item.qty;

  updateCart();
  updateAdminPanel();
}


function updateAdminVisibility() {
  const adminPanel = document.getElementById("admin-panel");
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (!adminPanel) return;

  if (loggedUser && loggedUser.email === "admin@gmail.com") {
    adminPanel.classList.remove("hidden");
  } else {
    adminPanel.classList.add("hidden");
  }
}

function createStockDonut() {
  const ctx = document.getElementById("stockdonutchart");

  if (!ctx) return;

  stockDonutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(stockData),
      datasets: [
        {
          data: Object.values(stockData),
          backgroundColor: [
            "#955251",
            "#dcae96",
            "#b07e68",
            "#e1b6b5",
            "#c97c5d",
            "#f2c1ac",
            "#a45c40",
            "#7b3f2f",
          ],
        },
      ],
    },
    options: {
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const value = ctx.raw;
              const percent = total
                ? ((value / total) * 100).toFixed(1)
                : 0;
              return `${ctx.label}: ${percent}%`;
            },
          },
        },
      },
    },
  });
}
createStockDonut();

function updateStockDonut() {
  if (!stockDonutChart) return;

  // reset
  Object.keys(stockData).forEach((k) => (stockData[k] = 0));

  // fill from cart
  cart.forEach((item) => {
    if (stockData.hasOwnProperty(item.name)) {
      stockData[item.name] += item.qty;
    }
  });

  stockDonutChart.data.datasets[0].data = Object.values(stockData);
  stockDonutChart.update();
}
function resetChart() {
  for (let key in productClicks) productClicks[key] = 0;
  localStorage.setItem("productClicks", JSON.stringify(productClicks));
  updateCart();
}
// renderStockTable();
createStockDonut();

/* Script Back to the top*/ 
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});















