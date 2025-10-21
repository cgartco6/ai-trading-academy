class CourseDetailPage {
    constructor() {
        this.course = null;
        this.courseId = null;
        this.allCourses = [];
        this.init();
    }

    init() {
        this.getCourseIdFromURL();
        this.loadAllCourses();
        this.loadCourseDetails();
        this.setupEventListeners();
    }

    getCourseIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        this.courseId = parseInt(urlParams.get('course')) || 1;
        window.currentCourseId = this.courseId;
    }

    async loadAllCourses() {
        // Simulate API call
        this.allCourses = [
            {
                id: 1,
                title: "AI Trading Fundamentals",
                description: "Begin your journey into AI-powered trading with our foundational course. Learn basic concepts, risk management, and introductory AI applications in trading.",
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
                    "Live AI-assisted exercises",
                    "Market terminology",
                    "Trading platform basics"
                ],
                curriculum: [
                    {
                        module: "Module 1: Trading Basics",
                        lessons: [
                            "Understanding Financial Markets",
                            "Basic Trading Terminology",
                            "Introduction to Trading Platforms",
                            "Risk Management Principles"
                        ]
                    },
                    {
                        module: "Module 2: AI in Trading",
                        lessons: [
                            "What is AI in Trading?",
                            "Basic AI Concepts",
                            "AI vs Traditional Methods",
                            "Your First AI Trading Exercise"
                        ]
                    },
                    {
                        module: "Module 3: Practical Application",
                        lessons: [
                            "Setting Up Your Environment",
                            "Basic Strategy Development",
                            "Paper Trading with AI",
                            "Course Project: First AI Strategy"
                        ]
                    }
                ],
                aiInstructors: [
                    {
                        name: "Course Architect AI",
                        role: "Course Design & Structure",
                        description: "Designed the optimal learning path for beginners",
                        capabilities: ["Curriculum Planning", "Learning Path Optimization"]
                    },
                    {
                        name: "Content Generator SI",
                        role: "Content Creation",
                        description: "Generated all educational content and exercises",
                        capabilities: ["Content Generation", "Exercise Creation"]
                    }
                ],
                reviews: [
                    {
                        student: "John D.",
                        rating: 5,
                        comment: "The AI explanations made complex concepts easy to understand!",
                        date: "2024-01-10"
                    },
                    {
                        student: "Sarah M.",
                        rating: 5,
                        comment: "Loved the real-time market examples. Highly recommended for beginners.",
                        date: "2024-01-08"
                    }
                ],
                aiGenerated: true,
                lastUpdated: "2024-01-15",
                nextUpdate: "2024-02-15",
                contentVersion: "1.2.3"
            },
            {
                id: 2,
                title: "Intermediate AI Trading Strategies",
                description: "Advanced strategies and AI integration for consistent returns. Master technical analysis, algorithm development, and portfolio optimization.",
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
                    "Real-time market analysis",
                    "Backtesting strategies",
                    "Risk assessment models"
                ],
                curriculum: [
                    {
                        module: "Module 1: Advanced Technical Analysis",
                        lessons: [
                            "AI-Powered Chart Analysis",
                            "Indicator Optimization",
                            "Pattern Recognition with ML",
                            "Multi-timeframe Analysis"
                        ]
                    },
                    {
                        module: "Module 2: Algorithm Development",
                        lessons: [
                            "Building Trading Algorithms",
                            "Backtesting Strategies",
                            "Optimization Techniques",
                            "Risk Management in Algorithms"
                        ]
                    },
                    {
                        module: "Module 3: Portfolio Management",
                        lessons: [
                            "Portfolio Optimization",
                            "Diversification Strategies",
                            "Risk Assessment Models",
                            "Performance Analysis"
                        ]
                    }
                ],
                aiInstructors: [
                    {
                        name: "Market Analyst AI",
                        role: "Market Analysis",
                        description: "Provides real-time market data and analysis",
                        capabilities: ["Market Analysis", "Trend Prediction"]
                    },
                    {
                        name: "Strategy Optimizer",
                        role: "Strategy Improvement",
                        description: "Continuously optimizes trading strategies",
                        capabilities: ["Strategy Optimization", "Backtesting"]
                    }
                ],
                reviews: [
                    {
                        student: "Mike R.",
                        rating: 5,
                        comment: "The algorithm development section transformed my trading approach.",
                        date: "2024-01-12"
                    },
                    {
                        student: "Lisa T.",
                        rating: 4,
                        comment: "Great content! The AI examples were incredibly helpful.",
                        date: "2024-01-09"
                    }
                ],
                aiGenerated: true,
                lastUpdated: "2024-01-10",
                nextUpdate: "2024-02-10",
                contentVersion: "2.1.4"
            },
            {
                id: 3,
                title: "Advanced AI Trading Mastery",
                description: "Master complex AI algorithms and high-frequency trading strategies. Learn neural networks, quantitative analysis, and professional trading systems.",
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
                    "Personal AI trading assistant",
                    "Quantum computing concepts",
                    "Blockchain integration"
                ],
                curriculum: [
                    {
                        module: "Module 1: Neural Network Strategies",
                        lessons: [
                            "Deep Learning in Trading",
                            "Neural Network Architectures",
                            "Feature Engineering",
                            "Model Training & Validation"
                        ]
                    },
                    {
                        module: "Module 2: High-Frequency Trading",
                        lessons: [
                            "HFT Fundamentals",
                            "Low-Latency Systems",
                            "Market Microstructure",
                            "HFT Risk Management"
                        ]
                    },
                    {
                        module: "Module 3: Advanced Systems",
                        lessons: [
                            "Quantitative Strategies",
                            "Portfolio Optimization AI",
                            "Risk Modeling",
                            "Professional Trading Systems"
                        ]
                    }
                ],
                aiInstructors: [
                    {
                        name: "All AI Agents",
                        role: "Comprehensive Instruction",
                        description: "All our AI agents work together for advanced course delivery",
                        capabilities: ["Comprehensive Analysis", "Advanced Strategy Development"]
                    }
                ],
                reviews: [
                    {
                        student: "David K.",
                        rating: 5,
                        comment: "The neural network strategies alone are worth the price!",
                        date: "2024-01-14"
                    },
                    {
                        student: "Emma L.",
                        rating: 5,
                        comment: "Finally, a course that covers professional-level AI trading systems.",
                        date: "2024-01-11"
                    }
                ],
                aiGenerated: true,
                lastUpdated: "2024-01-05",
                nextUpdate: "2024-02-05",
                contentVersion: "3.0.1"
            }
        ];
    }

    loadCourseDetails() {
        this.course = this.allCourses.find(c => c.id === this.courseId) || this.allCourses[0];
        this.displayCourseDetails();
        this.displayRelatedCourses();
    }

    displayCourseDetails() {
        if (!this.course) return;

        // Update basic course info
        document.getElementById('course-title').textContent = this.course.title;
        document.getElementById('course-description').textContent = this.course.description;
        document.getElementById('course-level').textContent = this.course.level;
        document.getElementById('course-level-badge').textContent = this.course.level;
        document.getElementById('course-duration').textContent = this.course.duration;
        document.getElementById('course-lessons').textContent = `${this.course.lessons} lessons`;
        document.getElementById('course-updated').textContent = this.course.lastUpdated;
        document.getElementById('course-price').textContent = `R${this.course.price}`;
        document.getElementById('content-version').textContent = this.course.contentVersion;

        // Update features list
        const featuresList = document.getElementById('course-features');
        featuresList.innerHTML = this.course.features.map(feature => `
            <li class="mb-2">
                <i class="fas fa-check text-success me-2"></i>
                <small>${feature}</small>
            </li>
        `).join('');

        // Update curriculum
        this.displayCurriculum();

        // Update AI instructors
        this.displayAIInstructors();

        // Update reviews
        this.displayReviews();
    }

    displayCurriculum() {
        const accordion = document.getElementById('curriculumAccordion');
        if (!accordion || !this.course.curriculum) return;

        accordion.innerHTML = this.course.curriculum.map((module, index) => `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#module${index + 1}">
                        <i class="fas fa-folder-open me-2 text-primary"></i>
                        ${module.module}
                    </button>
                </h2>
                <div id="module${index + 1}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}">
                    <div class="accordion-body">
                        <ul class="list-unstyled">
                            ${module.lessons.map(lesson => `
                                <li class="d-flex align-items-center mb-2">
                                    <i class="fas fa-play-circle text-success me-3"></i>
                                    <span>${lesson}</span>
                                    <small class="text-muted ms-auto">15 min</small>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayAIInstructors() {
        const container = document.getElementById('ai-instructors');
        if (!container || !this.course.aiInstructors) return;

        container.innerHTML = this.course.aiInstructors.map(instructor => `
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <i class="fas fa-robot fa-2x text-primary me-3"></i>
                            <div>
                                <h6 class="card-title mb-0">${instructor.name}</h6>
                                <small class="text-muted">${instructor.role}</small>
                            </div>
                        </div>
                        <p class="card-text small">${instructor.description}</p>
                        <div class="mt-3">
                            <small class="text-muted">Capabilities:</small>
                            <div class="mt-1">
                                ${instructor.capabilities.map(capability => `
                                    <span class="badge bg-light text-dark me-1 mb-1">${capability}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayReviews() {
        const container = document.getElementById('course-reviews');
        if (!container || !this.course.reviews) return;

        if (this.course.reviews.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-comments fa-2x text-muted mb-3"></i>
                    <p class="text-muted">No reviews yet. Be the first to review this course!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.course.reviews.map(review => `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h6 class="card-title mb-0">${review.student}</h6>
                        <div class="text-warning">
                            ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                        </div>
                    </div>
                    <p class="card-text">${review.comment}</p>
                    <small class="text-muted">Posted on ${review.date}</small>
                </div>
            </div>
        `).join('');
    }

    displayRelatedCourses() {
        const container = document.getElementById('related-courses');
        if (!container) return;

        const relatedCourses = this.allCourses
            .filter(course => course.id !== this.courseId)
            .slice(0, 3);

        container.innerHTML = relatedCourses.map(course => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card course-card h-100">
                    <div class="position-relative">
                        <img src="${course.image}" class="card-img-top" alt="${course.title}" style="height: 150px; object-fit: cover;">
                        <span class="badge ${this.getLevelBadgeClass(course.level)} difficulty-badge">${course.level}</span>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title">${course.title}</h6>
                        <p class="card-text small">${course.description.substring(0, 100)}...</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="price-tag">R${course.price}</span>
                            <a href="course-detail.html?course=${course.id}" class="btn btn-primary btn-sm">
                                View Details
                            </a>
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
function buyNow(courseId) {
    addToCart(courseId);
    window.location.href = 'cart.html';
}

// Initialize course detail page
document.addEventListener('DOMContentLoaded', () => {
    new CourseDetailPage();
});
