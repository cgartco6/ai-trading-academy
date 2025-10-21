import json
import random
from datetime import datetime, timedelta
from typing import Dict, List

class MarketAnalyzer:
    def __init__(self):
        self.version = "3.2.1"
        self.last_analysis = None
        self.market_data = {}
        
    def analyze_market_conditions(self) -> Dict:
        """Analyze current market conditions for course updates"""
        print("🔍 MarketAnalyzer analyzing current market conditions...")
        
        # Simulate market analysis
        market_conditions = {
            "timestamp": datetime.now().isoformat(),
            "volatility_index": random.uniform(15, 45),
            "trend_direction": random.choice(["bullish", "bearish", "sideways"]),
            "sector_performance": {
                "technology": random.uniform(-2, 5),
                "finance": random.uniform(-1, 3),
                "energy": random.uniform(-3, 8)
            },
            "trading_volume": random.uniform(0.8, 1.5),
            "market_sentiment": random.choice(["positive", "neutral", "negative"]),
            "key_events": self._get_recent_market_events()
        }
        
        self.last_analysis = market_conditions
        self.market_data = market_conditions
        
        return market_conditions
    
    def _get_recent_market_events(self) -> List[str]:
        """Get recent market events that might affect trading strategies"""
        events = [
            "Federal Reserve interest rate decision",
            "Major earnings reports released",
            "Geopolitical developments affecting markets",
            "New economic data releases",
            "Cryptocurrency market movements",
            "AI and technology sector innovations"
        ]
        return random.sample(events, 3)
    
    def generate_trading_insights(self, course_level: str) -> Dict:
        """Generate trading insights specific to course level"""
        base_insights = {
            "Beginner": [
                "Focus on risk management in current volatile conditions",
                "Practice with demo accounts before live trading",
                "Understand basic technical indicators"
            ],
            "Intermediate": [
                "Consider algorithmic approaches for current market trends",
                "Diversify strategies across different timeframes",
                "Implement proper position sizing"
            ],
            "Advanced": [
                "Explore machine learning models for pattern recognition",
                "Consider high-frequency trading opportunities",
                "Implement advanced risk management protocols"
            ]
        }
        
        return {
            "level": course_level,
            "insights": base_insights.get(course_level, []),
            "recommended_strategies": self._get_recommended_strategies(course_level),
            "risk_warnings": self._get_risk_warnings()
        }
    
    def _get_recommended_strategies(self, level: str) -> List[str]:
        """Get recommended trading strategies based on level and market conditions"""
        strategies = {
            "Beginner": ["Swing Trading", "Position Trading", "Trend Following"],
            "Intermediate": ["Mean Reversion", "Breakout Trading", "Momentum Strategies"],
            "Advanced": ["Arbitrage", "Statistical Arbitrage", "Market Making", "HFT"]
        }
        return strategies.get(level, [])
    
    def _get_risk_warnings(self) -> List[str]:
        """Generate risk warnings based on current analysis"""
        warnings = [
            "Market volatility is elevated - adjust position sizes accordingly",
            "Monitor economic calendar for upcoming events",
            "Consider hedging strategies in uncertain market conditions",
            "Maintain disciplined risk management protocols"
        ]
        return random.sample(warnings, 2)
    
    def update_course_with_market_analysis(self, course: Dict) -> Dict:
        """Update course content with latest market analysis"""
        analysis = self.analyze_market_conditions()
        insights = self.generate_trading_insights(course["level"])
        
        # Add market context to course
        if "market_context" not in course:
            course["market_context"] = {}
        
        course["market_context"].update({
            "last_analysis": analysis["timestamp"],
            "current_volatility": analysis["volatility_index"],
            "trading_insights": insights,
            "recommended_approaches": insights["recommended_strategies"]
        })
        
        # Update course features with market-relevant content
        market_features = [
            f"Live analysis of {analysis['trend_direction']} market conditions",
            f"Strategies for {analysis['volatility_index']:.1f} volatility environment",
            "Real-time market examples and case studies"
        ]
        
        course["features"] = list(set(course["features"] + market_features))
        
        return course
