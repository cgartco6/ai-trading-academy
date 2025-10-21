class CoursesPage {
    constructor() {
        this.courses = [];
        this.filteredCourses = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadCourses();
        this.setupEventListeners();
        this.setupCountdown();
    }

    async loadCourses() {
        try {
            // In a real app, this would be an API call
            this.courses = [
                {
                    id: 1,
                    title: "AI Trading Fundamentals",
                    description: "Begin your journey into AI-powered trading with our foundational course. Learn basic concepts, risk management, and introductory AI applications in trading.",
                    level: "beginner",
                    price: 499,
                    currency: "ZAR",
                    duration: "4 weeks",
                    lessons: 12,
                    image: "assets/images/course-beginner.jpg",
                    features: [
                        "Basic trading concepts",
                        "Introduction to AI in trading",
                        "Risk management fundamentals",
                        "Live AI-assisted exercises",
                        "Market terminology",
                        "Trading platform basics"
                    ],
                    aiGenerated: true,
                    lastUpdated: "2024-01-15",
                    nextUpdate: "2024-02-15",
                    contentVersion: "1.2.3",
                    aiAgents: ["Course Architect AI", "Content Generator SI"]
                },
                {
                    id: 2,
                    title: "Intermediate AI Trading Strategies",
                    description: "Advanced strategies and AI integration for consistent returns. Master technical analysis, algorithm development, and portfolio optimization.",
                    level: "intermediate",
                    price: 899,
                    currency: "ZAR",
                    duration: "6 weeks",
                    lessons: 18,
                    image: "assets/images/course-intermediate.jpg",
                    features: [
                        "Technical analysis with AI",
                        "Algorithm development",
                        "Portfolio optimization",
                        "Real-time market analysis",
                        "Backtesting strategies",
                        "Risk assessment models"
                    ],
                    aiGenerated: true,
                    lastUpdated: "2024-01-10",
                    nextUpdate: "2024-02-10",
                    contentVersion: "2.1.4",
                    aiAgents: ["Market Analyst AI", "Strategy Optimizer"]
                },
                {
                    id: 3,
                    title: "Advanced AI Trading Mastery",
                    description: "Master complex AI algorithms and high-frequency trading strategies. Learn neural networks, quantitative analysis, and professional trading systems.",
                    level: "advanced",
                    price: 1499,
                    currency: "ZAR",
                    duration: "8 weeks",
                    lessons: 24,
                    image: "assets/images/course-advanced.jpg",
                    features: [
                        "Neural network strategies",
                        "High-frequency trading",
                        "Advanced risk models",
                        "Personal AI trading assistant",
                        "Quantum computing concepts",
                        "Blockchain integration"
                    ],
                    aiGenerated: true,
                    lastUpdated: "2024-01-05",
                    nextUpdate: "2024-02-05",
                    contentVersion: "3.0.1",
                    aiAgents: ["All AI Agents"]
                }
            ];

            this.filteredCourses = [...this.courses];
            this.displayCourses();
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    }

    displayCourses() {
        const container = document.getElementById('courses-grid');
        if (!container) return;

        if (this.filteredCourses.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>No courses found</h4>
                    <p class="text-muted">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredCourses.map(course => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card course-card h-100" data-course-level="${course.level}">
                    <div class="position-relative">
                        <img src="${course.image}" class="card-img-top" alt="${course.title}" style="height: 200px; object-fit: cover;">
                        <span class="badge ${this.getLevelBadgeClass(course.level)} difficulty-badge">${course.level.charAt(0).toUpperCase() + course.level.slice(1)}</span>
                        <div class="ai-badge">
                            <i class="fas fa-robot"></i> AI-Generated
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="card-text flex-grow-1">${course.description}</p>
                        
                        <div class="course-meta mb-3">
                            <div class="d-flex justify-content-between small text-muted">
                                <span><i class="fas fa-clock me-1"></i>${course.duration}</span>
                                <span><i class="fas fa-book-open me-1"></i>${course.lessons} lessons</span>
                                <span><i class="fas fa-sync-alt me-1"></i>v${course.contentVersion}</span>
                            </div>
                        </div>

                        <div class="mb-3">
                            ${course.features.slice(0, 3).map(feature => `
                                <small class="d-block text-muted mb-1">
                                    <i class="fas fa-check text-success me-1"></i>${feature}
                                </small>
                            `).join('')}
                            ${course.features.length > 3 ? `
                                <small class="text-primary">
                                    +${course.features.length - 3} more features
                                </small>
                            ` : ''}
                        </div>
                        
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="price-tag">R${course.price}</span>
                                <small class="text-muted">
                                    <i class="fas fa-calendar me-1"></i>
                                    Updates: ${course.nextUpdate}
                                </small>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-primary flex-fill" onclick="addToCart(${course.id})">
                                    <i class="fas fa-cart-plus me-2"></i>Add to Cart
                                </button>
                                <a href="course-detail.html?course=${course.id}" class="btn btn-outline-primary">
                                    <i class="fas fa-info"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterCourses(filter) {
        this.currentFilter = filter;
        
        if (filter === 'all') {
            this.filteredCourses = [...this.courses];
        } else {
            this.filteredCourses = this.courses.filter(course => 
                course.level.toLowerCase() === filter.toLowerCase()
            );
        }
        
        this.displayCourses();
    }

    searchCourses(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
            this.filteredCourses = [...this.courses];
        } else {
            this.filteredCourses = this.courses.filter(course =>
                course.title.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm) ||
                course.features.some(feature => feature.toLowerCase().includes(searchTerm))
            );
        }
        
        this.displayCourses();
    }

    getLevelBadgeClass(level) {
        const classes = {
            'beginner': 'bg-success',
            'intermediate': 'bg-warning',
            'advanced': 'bg-danger'
        };
        return classes[level] || 'bg-secondary';
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('[data-filter]').forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                
                // Update active state
                document.querySelectorAll('[data-filter]').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                this.filterCourses(filter);
            });
        });

        // Search input
        const searchInput = document.getElementById('courseSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchCourses(e.target.value);
            });
        }

        // Global cart updates
        document.addEventListener('cartUpdated', () => {
            this.updateCartCount();
        });
    }

    setupCountdown() {
        // Set countdown to next month
        const now = new Date();
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const diffTime = nextMonth - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const daysElement = document.getElementById('days');
        if (daysElement) {
            daysElement.textContent = diffDays;
        }
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = cart.length;
        });
    }
}

// Initialize courses page
document.addEventListener('DOMContentLoaded', () => {
    new CoursesPage();
});
