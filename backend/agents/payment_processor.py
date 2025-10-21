import uuid
from datetime import datetime

class PaymentProcessor:
    def __init__(self):
        self.stripe_key = "sk_test_your_stripe_key"
        self.payfast_merchant_id = "your_merchant_id"
        self.payfast_merchant_key = "your_merchant_key"
    
    def create_payment_session(self, cart_items, total_amount, payment_method, user_email):
        """Create payment session for Stripe or PayFast"""
        
        payment_id = str(uuid.uuid4())
        
        if payment_method == "stripe":
            return self.create_stripe_session(cart_items, total_amount, payment_id, user_email)
        elif payment_method == "payfast":
            return self.create_payfast_session(cart_items, total_amount, payment_id, user_email)
        else:
            raise ValueError("Unsupported payment method")
    
    def create_stripe_session(self, cart_items, total_amount, payment_id, user_email):
        """Create Stripe payment session"""
        # In a real implementation, this would integrate with Stripe API
        return {
            "payment_id": payment_id,
            "payment_method": "stripe",
            "amount": total_amount,
            "currency": "zar",
            "checkout_url": f"/stripe-checkout/{payment_id}",
            "user_email": user_email,
            "items": [
                {
                    "course_id": item["id"],
                    "name": item["title"],
                    "amount": item["price"]
                } for item in cart_items
            ]
        }
    
    def create_payfast_session(self, cart_items, total_amount, payment_id, user_email):
        """Create PayFast payment session"""
        # In a real implementation, this would integrate with PayFast API
        return {
            "payment_id": payment_id,
            "payment_method": "payfast",
            "amount": total_amount,
            "currency": "zar",
            "checkout_url": f"/payfast-checkout/{payment_id}",
            "user_email": user_email,
            "merchant_id": self.payfast_merchant_id,
            "items": [
                {
                    "course_id": item["id"],
                    "name": item["title"],
                    "amount": item["price"]
                } for item in cart_items
            ]
        }
    
    def handle_successful_payment(self, payment_id):
        """Process successful payment and grant course access"""
        # In real implementation, this would:
        # 1. Verify payment with payment provider
        # 2. Grant user access to purchased courses
        # 3. Send confirmation email
        # 4. Update user records
        
        return {
            "success": True,
            "payment_id": payment_id,
            "courses_granted": ["AI Trading Fundamentals", "Intermediate AI Trading Strategies"],
            "access_expires": (datetime.now() + timedelta(days=365)).isoformat()
        }
    
    def validate_payment(self, payment_id, provider):
        """Validate payment with provider"""
        # This would make API calls to Stripe/PayFast to verify payment
        return True  # Simulated success
