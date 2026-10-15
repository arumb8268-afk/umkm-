
/* ==========================================
   PASAR LOKAL PURBALINGGA
   Contoh data produk - silakan disesuaikan.
========================================== */

// GANTI dengan nomor WhatsApp penjual.
// Gunakan kode negara 62, tanpa tanda +.
// Contoh format: 6281234567890
const WHATSAPP_NUMBER = "628XXXXXXXXXX";

// DATA CONTOH PRODUK UMKM
// Harga dalam Rupiah. Sesuaikan nama, harga,
// toko, foto, dan kategori dengan produk asli.

const products = [
  {
    id: 1,
    name: "Basreng Pedas",
    shop: "UMKM Camilan Lokal",
    category: "Makanan",
    price: 12000,
    badge: "Favorit",
    image: "https://images.unsplash.com/photo-1621939514649-280e2aa2f00b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Keripik Pisang",
    shop: "Dapur Purbalingga",
    category: "Makanan",
    price: 15000,
    badge: "Populer",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Keripik Singkong",
    shop: "Camilan Nusantara",
    category: "Makanan",
    price: 10000,
    badge: "Pilihan",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Madu Kemasan",
    shop: "Usaha Alam Sejahtera",
    category: "Minuman",
    price: 25000,
    badge: "Alami",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Kopi Lokal",
    shop: "Kedai Kopi Desa",
    category: "Minuman",
    price: 18000,
    badge: "Favorit",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Minuman Rempah",
    shop: "Racikan Tradisional",
    category: "Minuman",
    price: 12000,
    badge: "Pilihan",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Keranjang Anyaman",
    shop: "Karya Tangan Lokal",
    category: "Kerajinan",
    price: 35000,
    badge: "Handmade",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Hiasan Rumah",
    shop: "Kreasi Purbalingga",
    category: "Kerajinan",
    price: 28000,
    badge: "Unik",
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    name: "Tas Anyaman",
    shop: "Kriya Lokal",
    category: "Kerajinan",
    price: 45000,
    badge: "Handmade",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    name: "Kaos Lokal",
    shop: "Purbalingga Apparel",
    category: "Fashion",
    price: 65000,
    badge: "Tren",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 11,
    name: "Totebag Kanvas",
    shop: "Kreasi Anak Muda",
    category: "Fashion",
    price: 30000,
    badge: "Favorit",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 12,
    name: "Dompet Kain",
    shop: "Aneka Aksesori",
    category: "Fashion",
    price: 22000,
    badge: "Pilihan",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=600&q=80"
  }
];

/* ==========================================
   ELEMEN WEBSITE
========================================== */

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const categoryList = document.getElementById("categoryList");
const resultCount = document.getElementById("resultCount");

const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const overlay = document.getElementById("overlay");

const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const toast = document.getElementById("toast");

// State website
let selectedCategory = "Semua";
let cart = {};
let toastTimer;

/* ==========================================
   FUNGSI BANTUAN
========================================== */

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function getProduct(id) {
  return products.find(product => product.id === Number(id));
}

function getCartQuantity() {
  return Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );
}

function getCartTotal() {
  return Object.entries(cart).reduce((total, entry) => {
    const id = Number(entry[0]);
    const quantity = entry[1];
    const product = getProduct(id);

    return total + (product ? product.price * quantity : 0);
  }, 0);
}

// Mencegah teks produk dianggap sebagai HTML.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

/* ==========================================
   MENAMPILKAN PRODUK
========================================== */

function renderProducts() {
  const keyword = searchInput.value
    .trim()
    .toLowerCase();

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === "Semua" ||
      product.category === selectedCategory;

    const searchableText = [
      product.name,
      product.shop,
      product.category
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(keyword);

    return matchesCategory && matchesSearch;
  });

  resultCount.textContent =
    `${filteredProducts.length} produk ditemukan`;

  clearSearch.style.display =
    searchInput.value ? "block" : "none";

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <p class="empty-state">
        Produk tidak ditemukan. Coba kata kunci lain, ya! 😊
      </p>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.style.display='none'">
        <span class="product-badge">
          ${escapeHTML(product.badge)}
        </span>
      </div>

      <div class="product-info">
        <span class="product-category">
          ${escapeHTML(product.category)}
        </span>

        <h3>${escapeHTML(product.name)}</h3>

        <p class="product-shop">
          ${escapeHTML(product.shop)}
        </p>

        <div class="product-bottom">
          <span class="product-price">
            ${formatRupiah(product.price)}
          </span>

          <button
            class="add-cart"
            data-add="${product.id}"
            aria-label="Tambah ${escapeHTML(product.name)} ke keranjang">
            +
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

/* ==========================================
   PENCARIAN DAN KATEGORI
========================================== */

searchInput.addEventListener("input", renderProducts);

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  renderProducts();
  searchInput.focus();
});

categoryList.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");

  if (!button) return;

  selectedCategory = button.dataset.category;

  categoryList.querySelectorAll(".category").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderProducts();
});

/* ==========================================
   KERANJANG BELANJA
========================================== */

function addToCart(id) {
  const product = getProduct(id);

  if (!product) return;

  cart[id] = (cart[id] || 0) + 1;

  renderCart();
  showToast(`${product.name} ditambahkan ke keranjang!`);
}

function changeQuantity(id, amount) {
  const product = getProduct(id);

  if (!product || !cart[id]) return;

  cart[id] += amount;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  renderCart();
  showToast("Produk dihapus dari keranjang.");
}

function renderCart() {
  cartCount.textContent = getCartQuantity();
  cartTotal.textContent = formatRupiah(getCartTotal());

  const entries = Object.entries(cart);

  if (entries.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-state">
        Keranjang masih kosong. Yuk, pilih produk favoritmu! 🛍️
      </p>
    `;

    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.55";
    checkoutBtn.style.cursor = "not-allowed";
    return;
  }

  checkoutBtn.disabled = false;
  checkoutBtn.style.opacity = "1";
  checkoutBtn.style.cursor = "pointer";

  cartItems.innerHTML = entries.map(([id, quantity]) => {
    const product = getProduct(id);

    if (!product) return "";

    return `
      <div class="cart-item">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.style.display='none'">

        <div>
          <h4>${escapeHTML(product.name)}</h4>

          <p class="cart-item-price">
            ${formatRupiah(product.price * quantity)}
          </p>

          <div class="cart-item-controls">
            <button
              class="qty-btn"
              data-id="${id}"
              data-change="-1"
              aria-label="Kurangi jumlah">−</button>

            <span>${quantity}</span>

            <button
              class="qty-btn"
              data-id="${id}"
              data-change="1"
              aria-label="Tambah jumlah">+</button>

            <button
              class="remove-btn"
              data-remove="${id}">
              Hapus
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Event delegation untuk tombol tambah produk.
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (button) {
    addToCart(button.dataset.add);
  }
});

// Tombol tambah, kurangi, dan hapus di keranjang.
cartItems.addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-change]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    changeQuantity(
      quantityButton.dataset.id,
      Number(quantityButton.dataset.change)
    );
  }

  if (removeButton) {
    removeFromCart(removeButton.dataset.remove);
  }
});

/* ==========================================
   BUKA DAN TUTUP KERANJANG
========================================== */

function showCart() {
  cartDrawer.classList.add("show");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
  closeCart.focus();
}

function hideCart() {
  cartDrawer.classList.remove("show");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

openCart.addEventListener("click", showCart);
closeCart.addEventListener("click", hideCart);
overlay.addEventListener("click", hideCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    hideCart();
  }
});

/* ==========================================
   CHECKOUT WHATSAPP
========================================== */

checkoutBtn.addEventListener("click", () => {
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    showToast("Keranjang kamu masih kosong.");
    return;
  }

  // Pastikan nomor WhatsApp sudah diganti.
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (!/^62\d{8,13}$/.test(phone)) {
    showToast("Isi nomor WhatsApp penjual di script.js dulu.");
    return;
  }

  const lines = entries.map(([id, quantity]) => {
    const product = getProduct(id);

    return product
      ? `- ${product.name} x${quantity} = ${formatRupiah(product.price * quantity)}`
      : "";
  }).filter(Boolean);

  const message = [
    "Halo, saya ingin memesan produk UMKM Purbalingga.",
    "",
    "Daftar pesanan:",
    ...lines,
    "",
    `Total belanja: ${formatRupiah(getCartTotal())}`,
    "",
    "Mohon informasi ketersediaan produk dan ongkirnya. Terima kasih!"
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  // Membuka WhatsApp dengan ringkasan pesanan.
  window.open(whatsappURL, "_blank");
});

/* ==========================================
   INISIALISASI WEBSITE
========================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();

renderProducts();
renderCart();
