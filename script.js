// ================================
// DATA PRODUK UMKM PURBALINGGA
// ================================

const produk = [

    {
        id: 1,
        nama: "Basreng Arion",
        toko: "UMKM Purbalingga",
        kategori: "Makanan",
        harga: 12000,
        deskripsi: "Camilan basreng gurih dan renyah untuk teman santai.",
        foto: "https://images.unsplash.com/photo-1621939514649-280e2aa9f5c8?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        nama: "Keripik Jamur Tiram",
        toko: "UMKM Purbalingga",
        kategori: "Makanan",
        harga: 13000,
        deskripsi: "Keripik jamur tiram renyah dengan rasa gurih.",
        foto: "https://images.unsplash.com/photo-1621939514649-280e2aa9f5c8?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        nama: "Kripik Tempe Sagu",
        toko: "UMKM Purbalingga",
        kategori: "Makanan",
        harga: 15000,
        deskripsi: "Kripik tempe sagu khas dengan rasa gurih dan renyah.",
        foto: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        nama: "Madu Lokal Purbalingga",
        toko: "Peternak Lebah Lokal",
        kategori: "Minuman",
        harga: 35000,
        deskripsi: "Madu lokal dengan rasa alami dan berkualitas.",
        foto: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        nama: "Es Teh Rempah",
        toko: "UMKM Minuman Lokal",
        kategori: "Minuman",
        harga: 8000,
        deskripsi: "Minuman teh rempah dengan rasa segar.",
        foto: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        nama: "Sayur Kangkung Segar",
        toko: "Petani Purbalingga",
        kategori: "Sayuran",
        harga: 5000,
        deskripsi: "Kangkung segar langsung dari petani lokal.",
        foto: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        nama: "Cabai Merah",
        toko: "Petani Lokal",
        kategori: "Sayuran",
        harga: 12000,
        deskripsi: "Cabai merah segar untuk kebutuhan memasak.",
        foto: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        nama: "Wortel Segar",
        toko: "Petani Purbalingga",
        kategori: "Sayuran",
        harga: 10000,
        deskripsi: "Wortel segar dan berkualitas dari petani lokal.",
        foto: "https://images.unsplash.com/photo-1447175008436-170170753d52?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 9,
        nama: "Anyaman Bambu",
        toko: "Kerajinan Lokal",
        kategori: "Kerajinan",
        harga: 25000,
        deskripsi: "Kerajinan anyaman bambu buatan pengrajin lokal.",
        foto: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 10,
        nama: "Tas Anyaman",
        toko: "Kriya Purbalingga",
        kategori: "Fashion",
        harga: 45000,
        deskripsi: "Tas anyaman cantik untuk aktivitas sehari-hari.",
        foto: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80"
    }

];


// ================================
// VARIABEL
// ================================

let keranjang = [];

let kategoriAktif = "Semua";


// ================================
// FORMAT RUPIAH
// ================================

function rupiah(angka) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);

}


// ================================
// MENAMPILKAN PRODUK
// ================================

function tampilkanProduk() {

    const kata = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    const hasil = produk.filter(function(p) {

        const cocokKategori =
            kategoriAktif === "Semua" ||
            p.kategori === kategoriAktif;


        const cocokKata =
            p.nama.toLowerCase().includes(kata) ||
            p.toko.toLowerCase().includes(kata) ||
            p.deskripsi.toLowerCase().includes(kata);


        return cocokKategori && cocokKata;

    });


    const productGrid =
        document.getElementById("productGrid");


    document.getElementById("productTotal").textContent =
        hasil.length + " produk";


    document.getElementById("emptyMessage").hidden =
        hasil.length > 0;


    productGrid.innerHTML = hasil.map(function(p) {

        return `

        <div class="product-card">

            <img
                src="${p.foto}"
                alt="${p.nama}"
                onerror="this.src='https://placehold.co/600x400/eaf1e7/315b43?text=Produk+UMKM'"
            >

            <div class="product-info">

                <span class="product-category">
                    ${p.kategori}
                </span>

                <h3>
                    ${p.nama}
                </h3>

                <p class="product-shop">
                    🏪 ${p.toko}
                </p>

                <p class="product-description">
                    ${p.deskripsi}
                </p>

                <h4 class="product-price">
                    ${rupiah(p.harga)}
                </h4>


                <div class="product-buttons">

                    <button
                        class="btn-cart"
                        onclick="tambahKeranjang(${p.id})">

                        🛒 Keranjang

                    </button>


                    <button
                        class="btn-buy"
                        onclick="beliPesanan(${p.id})">

                        🛍 Beli Pesanan

                    </button>


                    <button
                        class="btn-detail"
                        onclick="detailProduk(${p.id})">

                        👁 Detail

                    </button>

                </div>

            </div>

        </div>

        `;

    }).join("");

}


// ================================
// BELI PESANAN
// ================================

function beliPesanan(id) {

    const p = produk.find(function(item) {
        return item.id === id;
    });


    if (!p) return;


    const item = keranjang.find(function(item) {
        return item.id === id;
    });


    if (item) {

        item.jumlah++;

    } else {

        keranjang.push({

            id: p.id,

            nama: p.nama,

            harga: p.harga,

            jumlah: 1

        });

    }


    tampilkanKeranjang();


    document
        .getElementById("keranjang")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================================
// TAMBAH KE KERANJANG
// ================================

function tambahKeranjang(id) {

    const p = produk.find(function(item) {
        return item.id === id;
    });


    if (!p) return;


    const item = keranjang.find(function(item) {
        return item.id === id;
    });


    if (item) {

        item.jumlah++;

    } else {

        keranjang.push({

            id: p.id,

            nama: p.nama,

            harga: p.harga,

            jumlah: 1

        });

    }


    tampilkanKeranjang();


    alert(
        p.nama +
        " berhasil ditambahkan ke pesanan!"
    );

}


// ================================
// MENAMPILKAN KERANJANG
// ================================

function tampilkanKeranjang() {

    const cartItems =
        document.getElementById("cartItems");


    const cartCount =
        document.getElementById("cartCount");


    const cartTotal =
        document.getElementById("cartTotal");


    if (keranjang.length === 0) {

        cartItems.innerHTML = `
            <p class="cart-empty">
                Belum ada pesanan.
            </p>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "Rp0";

        return;

    }


    let total = 0;

    let jumlahBarang = 0;


    cartItems.innerHTML =
        keranjang.map(function(item) {

            const subtotal =
                item.harga * item.jumlah;


            total += subtotal;

            jumlahBarang += item.jumlah;


            return `

            <div class="cart-item">

                <div>

                    <h3>
                        ${item.nama}
                    </h3>

                    <p>
                        ${rupiah(item.harga)}
                    </p>

                </div>


                <div class="cart-controls">

                    <button
                        onclick="kurangiJumlah(${item.id})">

                        −

                    </button>


                    <span>
                        ${item.jumlah}
                    </span>


                    <button
                        onclick="tambahJumlah(${item.id})">

                        +

                    </button>


                    <strong>
                        ${rupiah(subtotal)}
                    </strong>


                    <button
                        onclick="hapusPesanan(${item.id})">

                        🗑️

                    </button>

                </div>

            </div>

            `;

        }).join("");


    cartCount.textContent =
        jumlahBarang;


    cartTotal.textContent =
        rupiah(total);

}


// ================================
// TAMBAH JUMLAH
// ================================

function tambahJumlah(id) {

    const item = keranjang.find(function(item) {
        return item.id === id;
    });


    if (item) {

        item.jumlah++;

    }


    tampilkanKeranjang();

}


// ================================
// KURANGI JUMLAH
// ================================

function kurangiJumlah(id) {

    const item = keranjang.find(function(item) {
        return item.id === id;
    });


    if (!item) return;


    item.jumlah--;


    if (item.jumlah <= 0) {

        keranjang =
            keranjang.filter(function(item) {
                return item.id !== id;
            });

    }


    tampilkanKeranjang();

}


// ================================
// HAPUS PESANAN
// ================================

function hapusPesanan(id) {

    keranjang =
        keranjang.filter(function(item) {
            return item.id !== id;
        });


    tampilkanKeranjang();

}


// ================================
// DETAIL PRODUK
// ================================

function detailProduk(id) {

    const p = produk.find(function(item) {
        return item.id === id;
    });


    if (!p) return;


    alert(

        "DETAIL PRODUK\n\n" +

        p.nama + "\n" +

        "UMKM: " + p.toko + "\n" +

        "Kategori: " + p.kategori + "\n" +

        "Harga: " + rupiah(p.harga) + "\n\n" +

        p.deskripsi

    );

}


// ================================
// FILTER KATEGORI
// ================================

document
    .querySelectorAll(".category")
    .forEach(function(button) {

        button.addEventListener("click", function() {

            document
                .querySelectorAll(".category")
                .forEach(function(btn) {
                    btn.classList.remove("active");
                });


            this.classList.add("active");


            kategoriAktif =
                this.dataset.category;


            tampilkanProduk();

        });

    });


// ================================
// PENCARIAN
// ================================

document
    .getElementById("searchInput")
    .addEventListener("input", tampilkanProduk);


// ================================
// TOMBOL KERANJANG
// ================================

document
    .getElementById("cartButton")
    .addEventListener("click", function() {

        document
            .getElementById("keranjang")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


// ================================
// CHECKOUT WHATSAPP
// ================================

document
    .getElementById("checkoutButton")
    .addEventListener("click", function() {

        if (keranjang.length === 0) {

            alert(
                "Pesanan masih kosong. Silakan pilih produk terlebih dahulu."
            );

            return;

        }


        let pesan =
            "Halo, saya ingin memesan produk UMKM Purbalingga:%0A%0A";


        let total = 0;


        keranjang.forEach(function(item) {

            const subtotal =
                item.harga * item.jumlah;


            total += subtotal;


            pesan +=
                "• " +
                item.nama +
                " x" +
                item.jumlah +
                " = " +
                rupiah(subtotal) +
                "%0A";

        });


        pesan +=
            "%0ATotal: " +
            rupiah(total) +
            "%0A%0A" +
            "Terima kasih.";


        // GANTI NOMOR DI BAWAH DENGAN NOMOR WHATSAPP PENJUAL
        const nomorWhatsApp =
            "6281234567890";


        window.open(
            "https://wa.me/" +
            nomorWhatsApp +
            "?text=" +
            pesan,
            "_blank"
        );

    });


// ================================
// MENU HP
// ================================

document
    .getElementById("menuToggle")
    .addEventListener("click", function() {

        document
            .getElementById("navMenu")
            .classList.toggle("show");

    });


// ================================
// BACK TO TOP
// ================================

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", function() {

    if (window.scrollY > 300) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});


backToTop.addEventListener("click", function() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ================================
// JALANKAN WEBSITE
// ================================

tampilkanProduk();

tampilkanKeranjang();