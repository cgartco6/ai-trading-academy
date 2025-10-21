class PaymentProcessor {
    constructor() {
        this.selectedMethod = null;
        this.init();
    }

    init() {
        this.loadOrderSummary();
        this.setupEventListeners();
    }

    loadOrderSummary() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const container = document.getElementById('checkout-items');
        const summaryContainer = document.getElementById('order-summary');

        if (container) {
            container.innerHTML = cart.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <h6 class="mb-0">${item.title}</h6>
                        <small class="text-muted">${item.level}</small>
                    </div>
                    <span class="price-tag">R${item.price}</span>
                </div>
            `).join('');
        }

        if (summaryContainer) {
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            const vat = total * 0.15; // 15% VAT
            const grandTotal = total + vat;

            summaryContainer.innerHTML = `
                <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>R${total}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>VAT (15%):</span>
                    <span>R${vat.toFixed(2)}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>R${grandTotal.toFixed(2)}</span>
                </div>
            `;
        }
    }

    selectPaymentMethod(method) {
        this.selectedMethod = method;
        
        // Update UI
        document.querySelectorAll('.payment-method').forEach(el => {
            el.classList.remove('selected');
        });
        event.currentTarget.classList.add('selected');
        
        // Show appropriate form
        this.showPaymentForm(method);
    }

    showPaymentMethod(method) {
        const formsContainer = document.getElementById('payment-forms');
        
        switch (method) {
            case 'stripe':
                formsContainer.innerHTML = this.getStripeForm();
                break;
            case 'payfast':
                formsContainer.innerHTML = this.getPayFastForm();
                break;
            default:
                formsContainer.innerHTML = '<p class="text-muted">Please select a payment method</p>';
        }
    }

    getStripeForm() {
        return `
            <div class="card">
                <div class="card-header">
                    <h6 class="mb-0">Stripe Payment</h6>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Card Number</label>
                        <input type="text" class="form-control" placeholder="1234 5678 9012 3456" id="card-number">
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Expiry Date</label>
                            <input type="text" class="form-control" placeholder="MM/YY" id="card-expiry">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">CVC</label>
                            <input type="text" class="form-control" placeholder="123" id="card-cvc">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Cardholder Name</label>
                        <input type="text" class="form-control" placeholder="John Doe" id="card-name">
                    </div>
                </div>
            </div>
        `;
    }

    getPayFastForm() {
        return `
            <div class="card">
                <div class="card-header">
                    <h6 class="mb-0">PayFast Payment</h6>
                </div>
                <div class="card-body">
                    <p class="text-muted">
                        You will be redirected to PayFast to complete your payment securely.
                        We support all major South African payment methods.
                    </p>
                    <div class="alert alert-info">
                        <small>
                            <i class="fas fa-info-circle me-2"></i>
                            Supported: Credit Cards, EFT, Instant EFT, SnapScan, and more
                        </small>
                    </div>
                </div>
            </div>
        `;
    }

    async processPayment() {
        if (!this.selectedMethod) {
            showToast('Please select a payment method', 'warning');
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) {
            showToast('Your cart is empty', 'warning');
            return;
        }

        const button = document.getElementById('pay-button');
        const originalText = button.innerHTML;
        button.innerHTML = '<div class="loading"></div> Processing...';
        button.disabled = true;

        try {
            // Simulate API call
            await this.simulatePayment();
            
            // Clear cart
            localStorage.removeItem('cart');
            document.dispatchEvent(new Event('cartUpdated'));
            
            // Show success
            showToast('Payment successful! Redirecting...', 'success');
            
            // Redirect to success page
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 2000);
            
        } catch (error) {
            showToast('Payment failed. Please try again.', 'error');
            button.innerHTML = originalText;
            button.disabled = false;
        }
    }

    simulatePayment() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                Math.random() > 0.1 ? resolve() : reject(new Error('Payment processing failed'));
            }, 2000);
        });
    }

    setupEventListeners() {
        // Additional event listeners can be added here
    }
}

// Global functions
function selectPaymentMethod(method) {
    const processor = new PaymentProcessor();
    processor.selectPaymentMethod(method);
}

function processPayment() {
    const processor = new PaymentProcessor();
    processor.processPayment();
}

// Initialize payment processor
document.addEventListener('DOMContentLoaded', () => {
    new PaymentProcessor();
});
