// Main Application JavaScript
class AITradingAcademy {
    constructor() {
        this.courses = [];
        this.aiAgents = [];
        this.init();
    }

    init() {
        this.loadCourses();
        this.loadAIAgents();
        this.updateCartCount();
        this.setupEventListeners();
    }

    async loadCourses() {
        try {
            // In a real app, this would be an API call
            this.courses = [
                {
                    id: 1,
                    title: "AI Trading Fundamentals",
                    description: "Begin your journey into AI-powered trading with our foundational course",
                    level: "Beginner",
                    price: 499,
                    currency: "ZAR",
                    duration: "4 weeks",
                    lessons: 12,
                    image: "assets/images/course-beginner.jpg",
                    features: [
                        "Basic trading concepts",
                        "Introduction to AI in trading",
                        "Risk management fundamentals",
                        "Live AI-assisted exercises"
                    ],
                    aiGenerated: true,
                    lastUpdated: "2024-01-15"
                },
                {
                    id: 2,
                    title: "Intermediate AI Trading Strategies",
                    description: "Advanced strategies and AI integration for consistent returns",
                    level: "Intermediate",
                    price: 899,
                    currency: "ZAR",
                    duration: "6 weeks",
                    lessons: 18,
                    image: "assets/images/course-intermediate.jpg",
                    features: [
                        "Technical analysis with AI",
                        "Algorithm development",
                        "Portfolio optimization",
                        "Real-time market analysis"
                    ],
                    aiGenerated: true,
                    lastUpdated: "2024-01-10"
                },
                {
                    id: 3,
                    title: "Advanced AI Trading Mastery",
                    description: "Master complex AI algorithms and high-frequency trading strategies",
                    level: "Advanced",
                    price: 1499,
                    currency: "ZAR",
                    duration: "8 weeks",
                    lessons: 24,
                    image: "assets/images/course-advanced.jpg",
                    features: [
                        "Neural network strategies",
                        "High-frequency trading",
                        "Advanced risk models",
                        "Personal AI trading assistant"
                    ],
                    aiGenerated: true,
                    lastUpdated: "2024-01-05"
                }
            ];

            this.displayCourses();
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    }

    async loadAIAgents() {
        this.aiAgents = [
            {
                name: "Course Architect AI",
                role: "Course Design & Structure",
                description: "Designs and structures all course content based on latest market trends",
                version: "2.1.4",
                lastUpdate: "2024-01-15"
            },
            {
                name: "Content Generator SI",
                role: "Content Creation",
                description: "Generates up-to-date trading strategies and educational content",
                version: "1.8.7",
                lastUpdate: "2024-01-14"
            },
            {
                name: "Market Analyst AI",
                role: "Real-time Analysis",
                description: "Continuously analyzes markets to update course material",
                version: "3.2.1",
                lastUpdate: "2024-01-15"
            },
            {
                name: "Strategy Optimizer",
                role: "Strategy Improvement",
                description: "Constantly improves and evolves trading strategies",
                version: "2.5.3",
                lastUpdate: "2024-01-13"
            }
        ];

        this.displayAIAgents();
    }

    displayCourses() {
        const container = document.getElementById('featured-courses');
        if (!container) return;

        container.innerHTML = this.courses.map(course => `
            <div class="col-md-4 mb-4">
                <div class="card course-card h-100">
                    <div class="position-relative">
                        <img src="${course.image}" class="card-img-top" alt="${course.title}">
                        <span class="badge ${this.getLevelBadgeClass(course.level)} difficulty-badge">${course.level}</span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="card-text flex-grow-1">${course.description}</p>
                        <div class="mb-2">
                            ${course.features.map(feature => `
                                <small class="d-block text-muted">
                                    <i class="fas fa-check text-success me-1"></i>${feature}
                                </small>
                            `).join('')}
                        </div>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="price-tag">R${course.price}</span>
                                <small class="text-muted">
                                    <i class="fas fa-sync-alt me-1"></i>
                                    Updated: ${course.lastUpdated}
                                </small>
                            </div>
                            <button class="btn btn-primary w-100" onclick="addToCart(${course.id})">
                                <i class="fas fa-cart-plus me-2"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayAIAgents() {
        const container = document.getElementById('ai-agents-grid');
        if (!container) return;

        container.innerHTML = this.aiAgents.map(agent => `
            <div class="col-md-6 col-lg-3 mb-4">
                <div class="card ai-agent-card text-white h-100">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <i class="fas fa-robot fa-2x me-3 text-warning"></i>
                            <div>
                                <h6 class="card-title mb-0">${agent.name}</h6>
                                <small class="text-warning">v${agent.version}</small>
                            </div>
                        </div>
                        <p class="card-text small">${agent.description}</p>
                        <div class="mt-auto">
                            <small class="text-muted">
                                <i class="fas fa-shield-alt me-1"></i>
                                ${agent.role}
                            </small>
                            <br>
                            <small class="text-muted">
                                <i class="fas fa-clock me-1"></i>
                                Updated: ${agent.lastUpdate}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getLevelBadgeClass(level) {
        const classes = {
            'Beginner': 'bg-success',
            'Intermediate': 'bg-warning',
            'Advanced': 'bg-danger'
        };
        return classes[level] || 'bg-secondary';
    }

    setupEventListeners() {
        // Global event listeners
        document.addEventListener('cartUpdated', () => {
            this.updateCartCount();
        });
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = cart.length;
        });
    }
}

// Global functions
function addToCart(courseId) {
    const app = new AITradingAcademy();
    const course = app.courses.find(c => c.id === courseId);
    
    if (course) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Check if course already in cart
        if (!cart.find(item => item.id === courseId)) {
            cart.push(course);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Trigger event for cart updates
            document.dispatchEvent(new Event('cartUpdated'));
            
            // Show success message
            showToast('Course added to cart!', 'success');
        } else {
            showToast('Course already in cart', 'warning');
        }
    }
}

function showToast(message, type = 'info') {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close float-end" onclick="this.parentElement.remove()"></button>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 3000);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AITradingAcademy();
});
