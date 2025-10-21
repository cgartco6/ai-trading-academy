-- AI Trading Academy Database Schema
-- This schema supports AI-generated courses, user management, and payment processing

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT 1,
    preferences JSON,
    learning_style VARCHAR(50),
    preferred_difficulty VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(20) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'ZAR',
    duration VARCHAR(50),
    lessons INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    features JSON,
    curriculum JSON,
    ai_instructors JSON,
    reviews JSON,
    ai_generated BOOLEAN DEFAULT 1,
    content_version VARCHAR(20) DEFAULT '1.0.0',
    last_updated DATE,
    next_update DATE,
    ai_agents_used JSON,
    market_context JSON,
    optimized_strategies JSON,
    ai_improvements JSON,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course Modules Table
CREATE TABLE IF NOT EXISTS course_modules (
    module_id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    module_order INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    UNIQUE(course_id, module_order)
);

-- Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
    lesson_id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    duration INTEGER, -- in minutes
    lesson_type VARCHAR(20) DEFAULT 'video' CHECK (lesson_type IN ('video', 'text', 'quiz', 'exercise')),
    lesson_order INTEGER NOT NULL,
    is_free_preview BOOLEAN DEFAULT 0,
    ai_generated BOOLEAN DEFAULT 1,
    content_version VARCHAR(20) DEFAULT '1.0.0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES course_modules(module_id) ON DELETE CASCADE,
    UNIQUE(module_id, lesson_order)
);

-- User Courses (Purchase History)
CREATE TABLE IF NOT EXISTS user_courses (
    user_course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    purchase_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'ZAR',
    access_expiry TIMESTAMP, -- NULL means lifetime access
    is_active BOOLEAN DEFAULT 1,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    UNIQUE(user_id, course_id)
);

-- User Progress Tracking
CREATE TABLE IF NOT EXISTS user_progress (
    progress_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    completion_status VARCHAR(20) DEFAULT 'enrolled' CHECK (completion_status IN ('enrolled', 'in_progress', 'completed')),
    progress_percentage DECIMAL(5,2) DEFAULT 0.0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lessons_completed JSON, -- Array of completed lesson IDs
    quiz_scores JSON, -- Object with quiz_id: score
    time_spent INTEGER DEFAULT 0, -- in minutes
    achievements JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    UNIQUE(user_id, course_id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    order_id VARCHAR(50) PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'ZAR',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_method VARCHAR(20),
    payment_id VARCHAR(100),
    billing_address JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id VARCHAR(50) NOT NULL,
    course_id INTEGER NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
    payment_id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'ZAR',
    payment_method VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    gateway_response JSON,
    processed_at TIMESTAMP,
    refund_amount DECIMAL(10,2) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- AI Agents Log Table
CREATE TABLE IF NOT EXISTS ai_agents_log (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_name VARCHAR(100) NOT NULL,
    agent_version VARCHAR(20) NOT NULL,
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(50), -- course, lesson, strategy, etc.
    target_id INTEGER,
    details JSON,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('started', 'completed', 'failed')),
    execution_time_ms INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course Update History
CREATE TABLE IF NOT EXISTS course_update_history (
    update_id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    old_version VARCHAR(20),
    new_version VARCHAR(20) NOT NULL,
    update_type VARCHAR(50) NOT NULL, -- content, strategy, market_data, etc.
    changes JSON NOT NULL,
    ai_agents_used JSON,
    market_conditions JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

-- Market Analysis Data
CREATE TABLE IF NOT EXISTS market_analysis (
    analysis_id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    volatility_index DECIMAL(5,2),
    trend_direction VARCHAR(20),
    sector_performance JSON,
    trading_volume DECIMAL(5,2),
    market_sentiment VARCHAR(20),
    key_events JSON,
    insights JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_registration ON users(registration_date);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_user_courses_user ON user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_course ON user_courses(course_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_course ON user_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_ai_agents_log_agent ON ai_agents_log(agent_name);
CREATE INDEX IF NOT EXISTS idx_ai_agents_log_date ON ai_agents_log(created_at);
CREATE INDEX IF NOT EXISTS idx_course_updates_course ON course_update_history(course_id);
CREATE INDEX IF NOT EXISTS idx_market_analysis_date ON market_analysis(timestamp);

-- Insert initial AI Trading Courses
INSERT OR IGNORE INTO courses (
    course_id, title, description, level, price, duration, lessons, features,
    ai_generated, content_version, last_updated, next_update
) VALUES 
(
    1,
    'AI Trading Fundamentals',
    'Begin your journey into AI-powered trading with our foundational course. Learn basic concepts, risk management, and introductory AI applications in trading.',
    'beginner',
    499.00,
    '4 weeks',
    12,
    '["Basic trading concepts", "Introduction to AI in trading", "Risk management fundamentals", "Live AI-assisted exercises", "Market terminology", "Trading platform basics"]',
    1,
    '1.2.3',
    '2024-01-15',
    '2024-02-15'
),
(
    2,
    'Intermediate AI Trading Strategies', 
    'Advanced strategies and AI integration for consistent returns. Master technical analysis, algorithm development, and portfolio optimization.',
    'intermediate',
    899.00,
    '6 weeks', 
    18,
    '["Technical analysis with AI", "Algorithm development", "Portfolio optimization", "Real-time market analysis", "Backtesting strategies", "Risk assessment models"]',
    1,
    '2.1.4',
    '2024-01-10',
    '2024-02-10'
),
(
    3,
    'Advanced AI Trading Mastery',
    'Master complex AI algorithms and high-frequency trading strategies. Learn neural networks, quantitative analysis, and professional trading systems.',
    'advanced',
    1499.00,
    '8 weeks',
    24, 
    '["Neural network strategies", "High-frequency trading", "Advanced risk models", "Personal AI trading assistant", "Quantum computing concepts", "Blockchain integration"]',
    1,
    '3.0.1',
    '2024-01-05',
    '2024-02-05'
);

-- Insert sample AI agents log
INSERT OR IGNORE INTO ai_agents_log (
    agent_name, agent_version, action, target_type, target_id, details, status, execution_time_ms
) VALUES 
(
    'Course Architect AI',
    '2.1.4',
    'Course structure optimization',
    'course',
    1,
    '{"modules_added": 1, "lessons_optimized": 3, "learning_path_improved": true}',
    'completed',
    2450
),
(
    'Market Analyst AI', 
    '3.2.1',
    'Market condition analysis',
    'market',
    NULL,
    '{"volatility": 25.4, "trend": "bullish", "sectors_analyzed": 5}',
    'completed',
    1200
);
