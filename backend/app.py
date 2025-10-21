from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS
import json
import uuid
from datetime import datetime, timedelta
from agents.course_generator import CourseGenerator
from agents.content_updater import ContentUpdater
from agents.payment_processor import PaymentProcessor

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'
CORS(app)

# Initialize AI Agents
course_generator = CourseGenerator()
content_updater = ContentUpdater()
payment_processor = PaymentProcessor()

class AITradingAcademy:
    def __init__(self):
        self.courses = self.load_courses()
        self.ai_agents = self.load_ai_agents()
        
    def load_courses(self):
        return [
            {
                "id": 1,
                "title": "AI Trading Fundamentals",
                "description": "Begin your journey into AI-powered trading with our foundational course",
                "level": "Beginner",
                "price": 499,
                "currency": "ZAR",
                "duration": "4 weeks",
                "lessons": 12,
                "features": [
                    "Basic trading concepts",
                    "Introduction to AI in trading",
                    "Risk management fundamentals",
                    "Live AI-assisted exercises"
                ],
                "ai_generated": True,
                "last_updated": "2024-01-15",
                "next_update": "2024-02-15",
                "content_version": "1.2.3"
            },
            {
                "id": 2,
                "title": "Intermediate AI Trading Strategies",
                "description": "Advanced strategies and AI integration for consistent returns",
                "level": "Intermediate",
                "price": 899,
                "currency": "ZAR",
                "duration": "6 weeks",
                "lessons": 18,
                "features": [
                    "Technical analysis with AI",
                    "Algorithm development",
                    "Portfolio optimization",
                    "Real-time market analysis"
                ],
                "ai_generated": True,
                "last_updated": "2024-01-10",
                "next_update": "2024-02-10",
                "content_version": "2.1.4"
            },
            {
                "id": 3,
                "title": "Advanced AI Trading Mastery",
                "description": "Master complex AI algorithms and high-frequency trading strategies",
                "level": "Advanced",
                "price": 1499,
                "currency": "ZAR",
                "duration": "8 weeks",
                "lessons": 24,
                "features": [
                    "Neural network strategies",
                    "High-frequency trading",
                    "Advanced risk models",
                    "Personal AI trading assistant"
                ],
                "ai_generated": True,
                "last_updated": "2024-01-05",
                "next_update": "2024-02-05",
                "content_version": "3.0.1"
            }
        ]
    
    def load_ai_agents(self):
        return [
            {
                "name": "Course Architect AI",
                "role": "Course Design & Structure",
                "description": "Designs and structures all course content based on latest market trends",
                "version": "2.1.4",
                "last_update": "2024-01-15",
                "status": "active",
                "capabilities": ["course_design", "curriculum_planning", "learning_path_optimization"]
            },
            {
                "name": "Content Generator SI",
                "role": "Content Creation",
                "description": "Generates up-to-date trading strategies and educational content",
                "version": "1.8.7",
                "last_update": "2024-01-14",
                "status": "active",
                "capabilities": ["content_generation", "strategy_development", "market_analysis"]
            },
            {
                "name": "Market Analyst AI",
                "role": "Real-time Analysis",
                "description": "Continuously analyzes markets to update course material",
                "version": "3.2.1",
                "last_update": "2024-01-15",
                "status": "active",
                "capabilities": ["market_analysis", "trend_prediction", "risk_assessment"]
            },
            {
                "name": "Strategy Optimizer",
                "role": "Strategy Improvement",
                "description": "Constantly improves and evolves trading strategies",
                "version": "2.5.3",
                "last_update": "2024-01-13",
                "status": "active",
                "capabilities": ["strategy_optimization", "backtesting", "performance_analysis"]
            }
        ]

academy = AITradingAcademy()

@app.route('/')
def home():
    return jsonify({
        "message": "AI Trading Academy API",
        "version": "1.0.0",
        "status": "active"
    })

@app.route('/api/courses')
def get_courses():
    return jsonify(academy.courses)

@app.route('/api/courses/<int:course_id>')
def get_course(course_id):
    course = next((c for c in academy.courses if c['id'] == course_id), None)
    if course:
        return jsonify(course)
    return jsonify({"error": "Course not found"}), 404

@app.route('/api/ai-agents')
def get_ai_agents():
    return jsonify(academy.ai_agents)

@app.route('/api/generate-course', methods=['POST'])
def generate_course():
    """Generate a new course using AI agents"""
    try:
        data = request.json
        level = data.get('level', 'Intermediate')
        
        # Use AI agents to generate course
        new_course = course_generator.generate_course(level)
        academy.courses.append(new_course)
        
        return jsonify({
            "message": "Course generated successfully",
            "course": new_course
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/update-courses', methods=['POST'])
def update_courses():
    """Update all courses with latest content"""
    try:
        updated_courses = content_updater.update_all_courses(academy.courses)
        academy.courses = updated_courses
        
        return jsonify({
            "message": "Courses updated successfully",
            "updated_count": len(updated_courses)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/create-payment', methods=['POST'])
def create_payment():
    """Create payment session for Stripe or PayFast"""
    try:
        data = request.json
        cart_items = data.get('cart', [])
        payment_method = data.get('payment_method')
        user_email = data.get('email')
        
        if not cart_items:
            return jsonify({"error": "Cart is empty"}), 400
        
        # Calculate total
        total = sum(item['price'] for item in cart_items)
        
        # Create payment session
        payment_data = payment_processor.create_payment_session(
            cart_items, total, payment_method, user_email
        )
        
        return jsonify(payment_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/payment-success', methods=['POST'])
def payment_success():
    """Handle successful payment"""
    try:
        data = request.json
        payment_id = data.get('payment_id')
        
        # Process successful payment
        result = payment_processor.handle_successful_payment(payment_id)
        
        return jsonify({
            "message": "Payment processed successfully",
            "payment_id": payment_id,
            "courses_granted": result['courses_granted']
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
  app.run(debug=True, port=5000)
