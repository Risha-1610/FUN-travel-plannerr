/* --- MASTER DATABASE DATASET --- */
const travelDatabase = [
    { id: 1, destination: "Paris", type: "transport", name: "Supersonic Business Class Jet", price: 1200, info: "Time to destination: 7h 15m", icon: "✈️" },
    { id: 2, destination: "Paris", type: "transport", name: "Eurostar High-Speed Premium Rail", price: 350, info: "Time to destination: 2h 20m", icon: "🚄" },
    { id: 3, destination: "Paris", type: "hotel", name: "Le Bristol Palace Luxe Hotel", price: 850, info: "5-star ultra-lux accommodation near Louvre", icon: "🏨" },
    { id: 4, destination: "Paris", type: "hotel", name: "Montmartre Bohemian Boutique Stay", price: 190, info: "Dreamy vistas overlooking the local artists alley", icon: "🏡" },
    { id: 5, destination: "Bali", type: "transport", name: "Direct Intercontinental EcoAir Flight", price: 950, info: "Time to destination: 11h 40m", icon: "✈️" },
    { id: 6, destination: "Bali", type: "transport", name: "Luxury Fast Cruise Island-Hopper Ferry", price: 120, info: "Time to destination: 1h 45m", icon: "🚢" },
    { id: 7, destination: "Bali", type: "hotel", name: "Ubud Hanging Gardens Infinity Resort", price: 600, info: "Private villas suspended over the canopy", icon: "🌴" },
    { id: 8, destination: "Bali", type: "hotel", name: "Seminyak Wavefront Surfers Cabin", price: 65, info: "Right on the golden beachfront paths", icon: "🌊" },
    { id: 9, destination: "Tokyo", type: "transport", name: "Shinkansen Bullet Rail First-Class Seat", price: 210, info: "Time to destination: 3h 05m", icon: "🚅" },
    { id: 10, destination: "Tokyo", type: "transport", name: "Pacific Dreamliner Flight Express", price: 1400, info: "Time to destination: 9h 10m", icon: "✈️" },
    { id: 11, destination: "Tokyo", type: "hotel", name: "Aman Tokyo Sky-High Mega Penthouse", price: 1100, info: "Panoramic views over Tokyo Tower", icon: "🏙️" },
    { id: 12, destination: "Tokyo", type: "hotel", name: "Shinjuku Neon Cyber Capsule Pods", price: 45, info: "Sleek, sci-fi modular cozy pod setup", icon: "🚀" }
];

const recommendationDatabase = [
    { id: 101, destination: "Paris", type: "spot", name: "Eiffel Tower Golden Hour Access", price: 45, info: "Skip-the-line elevator pass included", icon: "🗼" },
    { id: 102, destination: "Paris", type: "spot", name: "L'Ambroisie Legendary Triple-Michelin Dinner", price: 380, info: "Best spot for authentic Foie Gras & pastries", icon: "🍽️" },
    { id: 103, destination: "Bali", type: "spot", name: "Sacred Uluwatu Cliff Temple Tour", price: 25, info: "Sunset Fire Dance performance included", icon: "🛕" },
    { id: 104, destination: "Bali", type: "spot", name: "Naughty Nuri's Famous Grilled Spare Ribs", price: 18, info: "Iconic local Balinese sweet-soy glaze", icon: "🍖" },
    { id: 105, destination: "Tokyo", type: "spot", name: "TeamLab Borderless Digital Museum Pass", price: 38, info: "Immersive futuristic optical illusions", icon: "🎨" },
    { id: 106, destination: "Tokyo", type: "spot", name: "Sukiyabashi Jiro High-End Omakase Experience", price: 450, info: "World's most sought-after hand-rolled Master Sushi", icon: "🍣" }
];

let cart = [];
let currentAuthMode = 'login';
let typedPaymentAmount = "";

/* --- INITIALIZER LAUNCH --- */
window.onload = () => {
    spawnFloatingEmojis();
    switchAuth('login');
    startNotificationEngine();
};

/* --- EMOTICON MATRIX ENGINE --- */
function spawnFloatingEmojis() {
    const canvas = document.getElementById('emoji-canvas');
    const icons = ['🥖', '🏖️', '👒', '🌋', '⛰️', '✈️', '🚢', '🎟️', '🍝'];
    setInterval(() => {
        const el = document.createElement('div');
        el.className = 'floating-emoji';
        el.innerText = icons[Math.floor(Math.random() * icons.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 6 + 8) + 's';
        canvas.appendChild(el);
        setTimeout(() => el.remove(), 14000);
    }, 1200);
}

/* --- NOTIFICATION ALERTS ENGINE --- */
function triggerToast(message) {
    const container = document.getElementById('notification-zone');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4500);
}

function startNotificationEngine() {
    const systemAlerts = [
        "🔥 Alert: Flights to Paris are dropping 15% right now!",
        "💡 Tip: Bali is sunny. Best spot for local seafood is Seminyak!",
        "⚡ Flash Deal added: Shinkansen Tickets are selling out fast!",
        "⭐ Travelers Choice award given to Aman Tokyo Penthouse package!"
    ];
    setInterval(() => {
        if(document.getElementById('app-container').style.display === 'block') {
            triggerToast(systemAlerts[Math.floor(Math.random() * systemAlerts.length)]);
        }
    }, 10000);
}

/* --- MODE TOGGLE LOGIC --- */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    triggerToast(`Switched into the ${targetTheme === 'dark' ? 'Cool Cyber Dark' : 'Dreamy Cloud Light'} mode!`);
}

/* --- AUTH MATRIX DISPATCHER --- */
function switchAuth(mode) {
    currentAuthMode = mode;
    const container = document.getElementById('auth-fields');
    const tabs = document.querySelectorAll('.auth-tab');
    
    tabs[0].classList.toggle('active', mode === 'login');
    tabs[1].classList.toggle('active', mode === 'signup');

    if(mode === 'login') {
        container.innerHTML = `
            <div class="input-group">
                <label>Phone / Email ID</label>
                <input type="text" id="auth-user" placeholder="Enter contact handle...">
            </div>
            <div class="input-group">
                <label>Password</label>
                <input type="password" id="auth-pass" placeholder="••••••••">
            </div>`;
    } else {
        container.innerHTML = `
            <div class="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe">
            </div>
            <div class="input-group">
                <label>Mobile Number</label>
                <input type="text" placeholder="+62 812...">
            </div>
            <div class="input-group">
                <label>Email ID</label>
                <input type="email" placeholder="john@horizon.com">
            </div>
            <div class="input-group">
                <label>Create Secure Password</label>
                <input type="password" placeholder="••••••••">
            </div>
            <div class="input-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="••••••••">
            </div>`;
    }
}

function executeAuth() {
    document.getElementById('auth-module').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    triggerToast("🎉 Welcome aboard! Authentication token activated successfully.");
    renderCatalog();
}

/* --- CATALOG GENERATOR & SEARCH ENGINE --- */
function renderCatalog() {
    const targetDest = document.getElementById('destination-select').value;
    const order = document.getElementById('price-sort').value;

    // Filter Arrays
    let items = travelDatabase.filter(i => targetDest === 'all' || i.destination === targetDest);
    let spots = recommendationDatabase.filter(i => targetDest === 'all' || i.destination === targetDest);

    // Sort Arrays
    const sortFn = (a, b) => order === 'low' ? a.price - b.price : b.price - a.price;
    items.sort(sortFn);
    spots.sort(sortFn);

    // Inject Content
    const catalogGrid = document.getElementById('catalog-grid');
    catalogGrid.innerHTML = items.map(item => createCardMarkup(item, false)).join('');

    const spotsGrid = document.getElementById('recommendations-grid');
    spotsGrid.innerHTML = spots.map(spot => createCardMarkup(spot, true)).join('');
}

function createCardMarkup(item, isRec) {
    return `
        <div class="card">
            <div class="card-img-placeholder">${item.icon}</div>
            <div class="card-content">
                <span class="card-tag ${item.type === 'transport' ? 'tag-transport' : item.type === 'hotel' ? 'tag-hotel' : 'tag-spot'}">${item.destination} | ${item.type}</span>
                <h3>${item.name}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top:6px;">${item.info}</p>
                <div class="price-tag">$${item.price}</div>
                <button class="btn-add" onclick="addItemToCart(${item.id}, ${isRec})">Add To Trip</button>
            </div>
        </div>`;
}

/* --- CART LOGIC --- */
function toggleCart(open) {
    document.getElementById('cart-sidebar').classList.toggle('open', open);
}

function addItemToCart(id, isRec) {
    const searchPool = isRec ? recommendationDatabase : travelDatabase;
    const targetItem = searchPool.find(i => i.id === id);
    
    cart.push({...targetItem, cartInstanceId: Date.now() + Math.random()});
    updateCartUI();
    triggerToast(`🛒 Appended ${targetItem.name} into your itinerary allocation.`);
}

function removeCartItem(instanceId) {
    cart = cart.filter(item => item.cartInstanceId !== instanceId);
    updateCartUI();
    triggerToast("🗑️ Item pruned from current bill statement.");
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const container = document.getElementById('cart-items-list');
    
    if(cart.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); text-align:center; padding: 40px 0;">No travel items selected yet.</p>`;
        document.getElementById('cart-total-price').innerText = "$0";
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4 style="font-size:0.95rem;">${item.icon} ${item.name}</h4>
                <small style="color: var(--primary-green); font-weight:bold;">$${item.price}</small>
            </div>
            <button class="btn-delete" onclick="removeCartItem(${item.cartInstanceId})">🗑️</button>
        </div>
    `).join('');

    const grandTotal = cart.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById('cart-total-price').innerText = `$${grandTotal}`;
}

/* --- SECURITY PAYPAD CASH SYSTEM --- */
function openPaymentGateway() {
    if(cart.length === 0) {
        triggerToast("🚨 Cannot process an empty voucher list!");
        return;
    }
    const grandTotal = cart.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById('modal-target-amount').innerText = `$${grandTotal}`;
    typedPaymentAmount = "";
    document.getElementById('keypad-readout').innerText = "0";
    document.getElementById('payment-modal').style.display = 'flex';
}

function closePaymentGateway() {
    document.getElementById('payment-modal').style.display = 'none';
}

function pressKey(val) {
    const readout = document.getElementById('keypad-readout');
    const targetTotal = cart.reduce((acc, curr) => acc + curr.price, 0);

    if(val === 'C') {
        typedPaymentAmount = "";
        readout.innerText = "0";
    } else if (val === 'OK') {
        if(parseInt(typedPaymentAmount) === targetTotal) {
            closePaymentGateway();
            toggleCart(false);
            cart = [];
            updateCartUI();
            
            triggerToast("✨ TRANSACTION AUTHORIZED! ✨");
            alert("🎫 Booking Successful!\nYour digital passes and confirmations have been deployed to your device logs.");
        } else {
            triggerToast("❌ Denied: Digital entry balance must match overall cost statement perfectly.");
        }
    } else {
        if(typedPaymentAmount === "" && val === '0') return;
        typedPaymentAmount += val;
        readout.innerText = "$" + typedPaymentAmount;
    }
}
