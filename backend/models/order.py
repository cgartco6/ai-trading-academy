from datetime import datetime
from typing import List, Dict, Any

class Order:
    def __init__(self, 
                 order_id: str,
                 user_id: int,
                 total_amount: float,
                 currency: str = "ZAR",
                 status: str = "pending"):
        
        self.order_id = order_id
        self.user_id = user_id
        self.total_amount = total_amount
        self.currency = currency
        self.status = status  # pending, completed, failed, refunded
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()
        self.items = []
        self.payment_method = None
        self.payment_id = None
        self.billing_address = {}
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "order_id": self.order_id,
            "user_id": self.user_id,
            "total_amount": self.total_amount,
            "currency": self.currency,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "items": [item.to_dict() for item in self.items],
            "payment_method": self.payment_method,
            "payment_id": self.payment_id,
            "billing_address": self.billing_address
        }
    
    def add_item(self, item: 'OrderItem'):
        """Add item to order"""
        self.items.append(item)
    
    def update_status(self, new_status: str):
        """Update order status"""
        self.status = new_status
        self.updated_at = datetime.now().isoformat()
    
    def calculate_total(self):
        """Calculate total amount from items"""
        self.total_amount = sum(item.price for item in self.items)
    
    def set_payment_info(self, payment_method: str, payment_id: str):
        """Set payment information"""
        self.payment_method = payment_method
        self.payment_id = payment_id

class OrderItem:
    def __init__(self, 
                 course_id: int,
                 course_title: str,
                 price: float,
                 quantity: int = 1):
        
        self.course_id = course_id
        self.course_title = course_title
        self.price = price
        self.quantity = quantity
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "course_id": self.course_id,
            "course_title": self.course_title,
            "price": self.price,
            "quantity": self.quantity
        }

class Payment:
    def __init__(self,
                 payment_id: str,
                 order_id: str,
                 amount: float,
                 currency: str = "ZAR",
                 payment_method: str = "stripe",
                 status: str = "pending"):
        
        self.payment_id = payment_id
        self.order_id = order_id
        self.amount = amount
        self.currency = currency
        self.payment_method = payment_method
        self.status = status  # pending, completed, failed, refunded
        self.created_at = datetime.now().isoformat()
        self.processed_at = None
        self.payment_gateway_response = {}
        self.refund_amount = 0.0
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "payment_id": self.payment_id,
            "order_id": self.order_id,
            "amount": self.amount,
            "currency": self.currency,
            "payment_method": self.payment_method,
            "status": self.status,
            "created_at": self.created_at,
            "processed_at": self.processed_at,
            "payment_gateway_response": self.payment_gateway_response,
            "refund_amount": self.refund_amount
        }
    
    def mark_completed(self, gateway_response: Dict = None):
        """Mark payment as completed"""
        self.status = "completed"
        self.processed_at = datetime.now().isoformat()
        if gateway_response:
            self.payment_gateway_response = gateway_response
    
    def mark_failed(self, error_message: str):
        """Mark payment as failed"""
        self.status = "failed"
        self.payment_gateway_response = {"error": error_message}
    
    def process_refund(self, amount: float):
        """Process refund for payment"""
        self.refund_amount = amount
        if amount >= self.amount:
            self.status = "refunded"
