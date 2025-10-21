class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
        this.init();
    }

    init() {
        this.displayCartItems();
        this.setupEventListeners();
    }

    displayCartItems() {
        const container = document.getElementById('cart-items');
        const emptyCart = document.getElementById('empty-cart');
        const cartTotal = document.getElementById('cart-total');

        if (this.cart.length === 0) {
            if (container) container.innerHTML = '';
            if (emptyCart) emptyCart.style.display = 'block';
            if (cartTotal) cartTotal.textContent = 'R0';
            return;
        }

        if (emptyCart) emptyCart.style.display = 'none';

        if (container) {
            container.innerHTML = this.cart.map((item, index) => `
                <div class="cart-item" data-course-id="${item.id}">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h6 class="mb-1">${item.title}</h6>
                            <small class="text-muted">Level: ${item.level} • ${item.lessons} lessons</small>
                        </div>
                        <div class="col-md-2 text-center">
                            <span class="price-tag">R${item.price}</span>
                        </div>
                        <div class="col-md-2 text-center">
                            <div class="btn-group">
                                <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, -1)">-</button>
                                <span class="btn btn-outline-primary btn-sm disabled">1</span>
                                <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
                            </div>
                        </div>
                        <div class="col-md-2 text-end">
                            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        this.updateCartTotal();
    }

    updateCartTotal() {
        const total = this.cart.reduce((sum, item) => sum + item.price, 0);
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) {
            cartTotalElement.textContent = `R${total}`;
        }
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.displayCartItems();
        document.dispatchEvent(new Event('cartUpdated'));
        showToast('Course removed from cart', 'info');
    }

    updateQuantity(index, change) {
        // For now, we only allow one of each course
        // In future, we might allow multiple quantities
        showToast('Only one of each course can be purchased', 'warning');
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    setupEventListeners() {
        document.addEventListener('cartUpdated', () => {
            this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
            this.displayCartItems();
        });
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.displayCartItems();
        document.dispatchEvent(new Event('cartUpdated'));
    }
}

// Global functions
function removeFromCart(index) {
    const cartManager = new CartManager();
    cartManager.removeItem(index);
}

function updateQuantity(index, change) {
    const cartManager = new CartManager();
    cartManager.updateQuantity(index, change);
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        showToast('Your cart is empty', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
}

// Initialize cart manager
document.addEventListener('DOMContentLoaded', () => {
    new CartManager();
});
