// Global Cart State initialized from Local Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productsCache = []; // To easily grab product details when adding to cart from listing

// Router: Execute code based on which page is currently loaded
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    if (document.getElementById('products-grid')) {
        loadListingPage();
    } else if (document.getElementById('product-detail-container')) {
        loadProductPage();
    } else if (document.getElementById('cart-container')) {
        loadCartPage();
    }
});

// --- TASK 1: LISTING PAGE ---
async function loadListingPage() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '<p>Loading products...</p>';
    
    try {
        const response = await fetch('https://dummyjson.com/products?limit=194');
        const data = await response.json();
        productsCache = data.products; 
        
        grid.innerHTML = '';
        productsCache.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button class="btn-primary" onclick="viewProduct(${product.id})">View Details</button>
                <button class="btn-success" onclick="addToCartFromListing(${product.id})">Add to Cart</button>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        grid.innerHTML = '<p>Failed to load products. Please try again.</p>';
        console.error(error);
    }
}

// --- TASK 2: PRODUCT PAGE ---
async function loadProductPage() {
    const container = document.getElementById('product-detail-container');
    
    // Get the product ID from the URL parameters (e.g., product.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        container.innerHTML = '<p>Product not found.</p>';
        return;
    }

    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();
        
        container.innerHTML = `
            <div class="product-container">
                <img src="${product.thumbnail}" alt="${product.title}">
                <div class="product-details">
                    <h2>${product.title}</h2>
                    <p style="color: #666; margin: 10px 0;">${product.description}</p>
                    <p style="font-size: 1.5rem; color: #27ae60; font-weight: bold;">$${product.price}</p>
                    <p>Rating: ${product.rating} ⭐</p>
                    <p>Stock: ${product.stock} left</p>
                    <br>
                    <button class="btn-success" onclick='addToCart(${JSON.stringify(product).replace(/'/g, "&#39;")})'>Add to Cart</button>
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = '<p>Failed to load product details.</p>';
        console.error(error);
    }
}

// --- TASK 3: CART PAGE ---
function loadCartPage() {
    const cartItemsDiv = document.getElementById('cart-items');
    const billSummaryDiv = document.getElementById('bill-summary');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        billSummaryDiv.style.display = 'none';
        return;
    }

    billSummaryDiv.style.display = 'block';
    cartItemsDiv.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.thumbnail}" alt="${item.title}">
                <div style="flex: 1; margin-left: 15px;">
                    <h4>${item.title}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <div>
                    <button class="btn-danger" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    const tax = subtotal * 0.10; // 10% tax for example
    const total = subtotal + tax;

    billSummaryDiv.innerHTML = `
        <h3>Bill Summary</h3>
        <div class="summary-row"><span>Subtotal:</span> <span>$${subtotal.toFixed(2)}</span></div>
        <div class="summary-row"><span>Tax (10%):</span> <span>$${tax.toFixed(2)}</span></div>
        <div class="summary-row total"><span>Total:</span> <span>$${total.toFixed(2)}</span></div>
        <button class="btn-success" style="width: 100%; margin-top: 15px;" onclick="checkout()">Proceed to Checkout</button>
    `;
}

// --- UTILITY FUNCTIONS ---
function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

function addToCartFromListing(id) {
    const product = productsCache.find(p => p.id === id);
    if (product) addToCart(product);
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.title} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage(); // Refresh cart view
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) countElement.innerText = totalItems;
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}