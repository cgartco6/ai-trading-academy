import os
from datetime import timedelta

class Config:
    """Base configuration class"""
    
    # Flask Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY', 'ai-trading-academy-secret-key-2024')
    DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    # Database Configuration
    DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///aitrading.db')
    
    # AI Agents Configuration
    AI_AGENTS = {
        'course_generator': {
            'version': '2.1.4',
            'auto_update': True,
            'update_interval_days': 7
        },
        'content_updater': {
            'version': '1.8.7', 
            'auto_update': True,
            'update_interval_days': 1
        },
        'market_analyzer': {
            'version': '3.2.1',
            'auto_update': True,
            'update_interval_hours': 4
        },
        'strategy_optimizer': {
            'version': '2.5.3',
            'auto_update': True,
            'update_interval_days': 3
        }
    }
    
    # Payment Configuration
    PAYMENT_CONFIG = {
        'stripe': {
            'public_key': os.environ.get('STRIPE_PUBLIC_KEY', 'pk_test_your_stripe_public_key'),
            'secret_key': os.environ.get('STRIPE_SECRET_KEY', 'sk_test_your_stripe_secret_key'),
            'webhook_secret': os.environ.get('STRIPE_WEBHOOK_SECRET', 'whsec_your_webhook_secret')
        },
        'payfast': {
            'merchant_id': os.environ.get('PAYFAST_MERCHANT_ID', '10000100'),
            'merchant_key': os.environ.get('PAYFAST_MERCHANT_KEY', '46f0cd694581a'),
            'passphrase': os.environ.get('PAYFAST_PASSPHRASE', ''),
            'test_mode': os.environ.get('PAYFAST_TEST_MODE', 'True').lower() == 'true'
        }
    }
    
    # Course Configuration
    COURSE_CONFIG = {
        'base_price_zar': 499,
        'price_increment': {
            'beginner': 1.0,
            'intermediate': 1.8,
            'advanced': 3.0
        },
        'auto_generation': {
            'enabled': True,
            'schedule': '0 0 1 * *',  # First day of every month
            'timezone': 'Africa/Johannesburg'
        },
        'content_update': {
            'enabled': True,
            'interval_days': 30,
            'max_versions': 10
        }
    }
    
    # Email Configuration
    EMAIL_CONFIG = {
        'smtp_server': os.environ.get('SMTP_SERVER', 'smtp.gmail.com'),
        'smtp_port': int(os.environ.get('SMTP_PORT', 587)),
        'username': os.environ.get('EMAIL_USERNAME', ''),
        'password': os.environ.get('EMAIL_PASSWORD', ''),
        'from_email': os.environ.get('FROM_EMAIL', 'noreply@aitradingacademy.com'),
        'from_name': 'AI Trading Academy'
    }
    
    # Security Configuration
    SECURITY_CONFIG = {
        'password_hashing': 'bcrypt',
        'token_expiration': timedelta(days=30),
        'max_login_attempts': 5,
        'lockout_duration': timedelta(minutes=30)
    }
    
    # Analytics Configuration
    ANALYTICS_CONFIG = {
        'enabled': True,
        'track_user_progress': True,
        'track_course_performance': True,
        'ai_learning_optimization': True
    }

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    DATABASE_URL = 'sqlite:///aitrading_dev.db'
    
    # Override payment config for development
    PAYMENT_CONFIG = {
        'stripe': {
            'public_key': 'pk_test_development_key',
            'secret_key': 'sk_test_development_key', 
            'webhook_secret': 'whsec_development_secret'
        },
        'payfast': {
            'merchant_id': '10000100',
            'merchant_key': '46f0cd694581a',
            'passphrase': '',
            'test_mode': True
        }
    }

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    
    # Override with production values
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
    PAYMENT_CONFIG = {
        'stripe': {
            'public_key': os.environ.get('STRIPE_PUBLIC_KEY'),
            'secret_key': os.environ.get('STRIPE_SECRET_KEY'),
            'webhook_secret': os.environ.get('STRIPE_WEBHOOK_SECRET')
        },
        'payfast': {
            'merchant_id': os.environ.get('PAYFAST_MERCHANT_ID'),
            'merchant_key': os.environ.get('PAYFAST_MERCHANT_KEY'),
            'passphrase': os.environ.get('PAYFAST_PASSPHRASE'),
            'test_mode': False
        }
    }

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = True
    DATABASE_URL = 'sqlite:///aitrading_test.db'
    
    # Mock payments for testing
    PAYMENT_CONFIG = {
        'stripe': {
            'public_key': 'pk_test_mock',
            'secret_key': 'sk_test_mock',
            'webhook_secret': 'whsec_mock'
        },
        'payfast': {
            'merchant_id': 'mock_merchant_id',
            'merchant_key': 'mock_merchant_key', 
            'passphrase': 'mock_passphrase',
            'test_mode': True
        }
    }

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig, 
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

def get_config(config_name=None):
    """Get configuration based on environment"""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'default')
    return config.get(config_name, config['default'])
