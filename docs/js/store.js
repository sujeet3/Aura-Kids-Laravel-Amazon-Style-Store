const ALL_PRODUCTS = [{"id":1,"name":"Pink Floral Dress","slug":"pink-floral-dress","category":"Party Wear","age_group":"Girls 2\u20139","price":"1299.00","mrp":"1999.00","image":null,"description":"Comfortable, playful AURA kidswear designed for everyday movement and special moments.","stock":50,"created_at":"2026-09-07T06:58:10.000000Z","updated_at":"2026-09-07T06:58:10.000000Z"},{"id":2,"name":"Blue Denim Co-ord Set","slug":"blue-denim-co-ord-set","category":"Co-ord Sets","age_group":"Girls 2\u20139","price":"1499.00","mrp":"2299.00","image":null,"description":"Comfortable, playful AURA kidswear designed for everyday movement and special moments.","stock":50,"created_at":"2026-09-07T06:58:10.000000Z","updated_at":"2026-09-07T06:58:10.000000Z"},{"id":3,"name":"Buttercup Baby Romper","slug":"buttercup-baby-romper","category":"Babywear","age_group":"Baby 0\u20132","price":"899.00","mrp":"1299.00","image":null,"description":"Comfortable, playful AURA kidswear designed for everyday movement and special moments.","stock":50,"created_at":"2026-09-07T06:58:10.000000Z","updated_at":"2026-09-07T06:58:10.000000Z"},{"id":4,"name":"Mint Party Frock","slug":"mint-party-frock","category":"Party Wear","age_group":"Girls 2\u20139","price":"1399.00","mrp":"2199.00","image":null,"description":"Comfortable, playful AURA kidswear designed for everyday movement and special moments.","stock":50,"created_at":"2026-09-07T06:58:10.000000Z","updated_at":"2026-09-07T06:58:10.000000Z"},{"id":5,"name":"Sunny Tee & Shorts","slug":"sunny-tee-shorts","category":"Boys","age_group":"Boys 2\u20139","price":"999.00","mrp":"1399.00","image":null,"description":"Comfortable, playful AURA kidswear designed for everyday movement and special moments.","stock":50,"created_at":"2026-09-07T06:58:10.000000Z","updated_at":"2026-09-07T06:58:10.000000Z"},{"id":6,"name":"Festive Kurta Set","slug":"festive-kurta-set","category":"Ethnic Wear","age_group":"Boys 2\u20139","price":"1599.00","mrp":"2199.00","image":null,"description":"Comfortable, playful AURA kidswear designed for everyday movement and special moments.","stock":50,"created_at":"2026-09-07T06:58:10.000000Z","updated_at":"2026-09-07T06:58:10.000000Z"},{"id":7,"name":"Lavender Dream Dress","slug":"lavender-dream-dress","category":"Dresses","age_group":"Girls 2\u20139","price":"1249.00","mrp":"1899.00","image":null,"description":"Comfortable, playful AURA kidswear designed for everyday movement and special moments.","stock":50,"created_at":"2026-09-07T06:58:10.000000Z","updated_at":"2026-09-07T06:58:10.000000Z"},{"id":8,"name":"Navy Jogger Set","slug":"navy-jogger-set","category":"Boys","age_group":"Boys 2\u20139","price":"1099.00","mrp":"1599.00","image":null,"description":"Comfortable, playful AURA kidswear designed for everyday movement and special moments.","stock":50,"created_at":"2026-09-07T06:58:10.000000Z","updated_at":"2026-09-07T06:58:10.000000Z"},{"id":9,"name":"Rainbow Summer Set","slug":"rainbow-summer-set","category":"Co-ord Sets","age_group":"Girls 2\u20139","price":"949.00","mrp":"1399.00","image":null,"description":"Comfortable, playful AURA kidswear designed for everyday movement and special moments.","stock":50,"created_at":"2026-09-07T06:58:10.000000Z","updated_at":"2026-09-07T06:58:10.000000Z"},{"id":10,"name":"Little Star Night Suit","slug":"little-star-night-suit","category":"Nightwear","age_group":"Baby 0\u20139","price":"799.00","mrp":"999.00","image":null,"description":"Comfortable, playful AURA kidswear designed for everyday movement and special moments.","stock":50,"created_at":"2026-09-07T06:58:10.000000Z","updated_at":"2026-09-07T06:58:10.000000Z"}];

function getCart() {
    try {
        return JSON.parse(localStorage.getItem('aura_cart')) || {};
    } catch(e) {
        return {};
    }
}

function setCart(cart) {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, qty = 1) {
    const cart = getCart();
    cart[productId] = (cart[productId] || 0) + qty;
    setCart(cart);
    showToast('Added to cart!');
}

function updateCartCount() {
    const cart = getCart();
    let totalItems = 0;
    for (let id in cart) {
        totalItems += cart[id];
    }
    document.querySelectorAll('.cart-count-badge').forEach(el => {
        el.textContent = `🛒 Cart (${totalItems})`;
    });
}

function showToast(msg) {
    let t = document.getElementById('aura-toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'aura-toast';
        t.className = 'toast';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.display = 'block';
    setTimeout(() => {
        t.style.display = 'none';
    }, 2500);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Intercept add to cart buttons
    document.querySelectorAll('[data-add-cart]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-add-cart');
            addToCart(id);
        });
    });

    // Search bar handling
    const searchForm = document.querySelector('form.search');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const q = searchForm.querySelector('input[name="q"]').value.trim();
            const cat = searchForm.querySelector('select[name="category"]').value;
            const params = new URLSearchParams();
            if (q) params.set('q', q);
            if (cat) params.set('category', cat);
            const prefix = searchForm.getAttribute('data-base') || '';
            window.location.href = prefix + 'shop.html' + (params.toString() ? '?' + params.toString() : '');
        });
    }

    // Shop page filtering
    if (window.location.pathname.endsWith('shop.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = (urlParams.get('q') || '').toLowerCase();
        const category = urlParams.get('category') || '';

        const cards = document.querySelectorAll('.product-grid-item');
        let visibleCount = 0;
        cards.forEach(card => {
            const name = (card.getAttribute('data-name') || '').toLowerCase();
            const cat = card.getAttribute('data-category') || '';
            const matchQuery = !query || name.includes(query);
            const matchCat = !category || cat === category;
            if (matchQuery && matchCat) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const noMatch = document.getElementById('no-match-msg');
        if (noMatch) {
            noMatch.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Cart page dynamic render
    const cartContainer = document.getElementById('cart-items-container');
    if (cartContainer) {
        renderCartPage();
    }

    // Checkout page dynamic render
    const checkoutContainer = document.getElementById('checkout-items-summary');
    if (checkoutContainer) {
        renderCheckoutPage();
    }
});

function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const summaryContainer = document.getElementById('cart-summary-container');
    const emptyMsg = document.getElementById('cart-empty-msg');
    const cart = getCart();

    container.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    for (let id in cart) {
        const qty = cart[id];
        if (qty <= 0) continue;
        const p = ALL_PRODUCTS.find(item => item.id == id);
        if (!p) continue;

        itemCount += qty;
        const lineTotal = p.price * qty;
        total += lineTotal;

        const row = document.createElement('div');
        row.className = 'cartrow';
        row.innerHTML = `
            <div class="smallphoto">${p.category}</div>
            <div>
                <h2>${p.name}</h2>
                <p>₹${Number(p.price).toLocaleString('en-IN')}</p>
                <div>
                    <input class="qty" type="number" min="1" value="${qty}" onchange="changeCartQty(${p.id}, this.value)">
                    <button class="linkbtn" onclick="removeCartItem(${p.id})">Remove</button>
                </div>
            </div>
            <b>₹${Number(lineTotal).toLocaleString('en-IN')}</b>
        `;
        container.appendChild(row);
    }

    if (itemCount === 0) {
        emptyMsg.style.display = 'block';
        summaryContainer.style.display = 'none';
    } else {
        emptyMsg.style.display = 'none';
        summaryContainer.style.display = 'block';
        document.getElementById('cart-subtotal').textContent = `₹${Number(total).toLocaleString('en-IN')}`;
    }
}

function changeCartQty(id, val) {
    const cart = getCart();
    const q = parseInt(val) || 0;
    if (q <= 0) {
        delete cart[id];
    } else {
        cart[id] = q;
    }
    setCart(cart);
    renderCartPage();
}

function removeCartItem(id) {
    const cart = getCart();
    delete cart[id];
    setCart(cart);
    renderCartPage();
}

function renderCheckoutPage() {
    const cart = getCart();
    let total = 0;
    let count = 0;
    for (let id in cart) {
        const qty = cart[id];
        const p = ALL_PRODUCTS.find(item => item.id == id);
        if (p && qty > 0) {
            total += p.price * qty;
            count += qty;
        }
    }

    const totalEl = document.getElementById('checkout-total-amount');
    if (totalEl) {
        totalEl.textContent = `₹${Number(total).toLocaleString('en-IN')}`;
    }

    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (count === 0) {
                alert('Your cart is empty! Please add products before checking out.');
                window.location.href = 'shop.html';
                return;
            }
            const orderId = 'AKW-' + Math.floor(100000 + Math.random() * 900000);
            const customerName = form.querySelector('[name="customer_name"]').value;
            localStorage.setItem('aura_last_order', JSON.stringify({
                id: orderId,
                name: customerName,
                total: total
            }));
            localStorage.removeItem('aura_cart');
            updateCartCount();
            window.location.href = 'success.html';
        });
    }
}