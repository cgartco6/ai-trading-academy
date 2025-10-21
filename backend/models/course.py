from datetime import datetime
from typing import List, Dict, Any
import json

class Course:
    def __init__(self, 
                 course_id: int,
                 title: str,
                 description: str,
                 level: str,
                 price: float,
                 currency: str = "ZAR",
                 duration: str = "",
                 lessons: int = 0,
                 image: str = "",
                 features: List[str] = None,
                 curriculum: List[Dict] = None,
                 ai_instructors: List[Dict] = None,
                 reviews: List[Dict] = None,
                 ai_generated: bool = True,
                 last_updated: str = None,
                 next_update: str = None,
                 content_version: str = "1.0.0"):
        
        self.course_id = course_id
        self.title = title
        self.description = description
        self.level = level
        self.price = price
        self.currency = currency
        self.duration = duration
        self.lessons = lessons
        self.image = image
        self.features = features or []
        self.curriculum = curriculum or []
        self.ai_instructors = ai_instructors or []
        self.reviews = reviews or []
        self.ai_generated = ai_generated
        self.last_updated = last_updated or datetime.now().strftime("%Y-%m-%d")
        self.next_update = next_update or (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
        self.content_version = content_version
        
        # AI-specific fields
        self.ai_agents_used = []
        self.market_context = {}
        self.optimized_strategies = []
        self.ai_improvements = []
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert course to dictionary for JSON serialization"""
        return {
            "id": self.course_id,
            "title": self.title,
            "description": self.description,
            "level": self.level,
            "price": self.price,
            "currency": self.currency,
            "duration": self.duration,
            "lessons": self.lessons,
            "image": self.image,
            "features": self.features,
            "curriculum": self.curriculum,
            "ai_instructors": self.ai_instructors,
            "reviews": self.reviews,
            "ai_generated": self.ai_generated,
            "last_updated": self.last_updated,
            "next_update": self.next_update,
            "content_version": self.content_version,
            "ai_agents_used": self.ai_agents_used,
            "market_context": self.market_context,
            "optimized_strategies": self.optimized_strategies,
            "ai_improvements": self.ai_improvements
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Course':
        """Create Course instance from dictionary"""
        return cls(
            course_id=data.get("id", data.get("course_id")),
            title=data["title"],
            description=data["description"],
            level=data["level"],
            price=data["price"],
            currency=data.get("currency", "ZAR"),
            duration=data.get("duration", ""),
            lessons=data.get("lessons", 0),
            image=data.get("image", ""),
            features=data.get("features", []),
            curriculum=data.get("curriculum", []),
            ai_instructors=data.get("ai_instructors", []),
            reviews=data.get("reviews", []),
            ai_generated=data.get("ai_generated", True),
            last_updated=data.get("last_updated"),
            next_update=data.get("next_update"),
            content_version=data.get("content_version", "1.0.0")
        )
    
    def update_content(self, new_version: str, updates: Dict[str, Any]):
        """Update course content with new version"""
        self.content_version = new_version
        self.last_updated = datetime.now().strftime("%Y-%m-%d")
        self.next_update = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
        
        # Apply updates
        for key, value in updates.items():
            if hasattr(self, key):
                setattr(self, key, value)
    
    def add_ai_agent(self, agent_name: str):
        """Add AI agent to the list of agents used"""
        if agent_name not in self.ai_agents_used:
            self.ai_agents_used.append(agent_name)
    
    def get_ai_agents_summary(self) -> str:
        """Get summary of AI agents used"""
        return ", ".join(self.ai_agents_used) if self.ai_agents_used else "No AI agents recorded"

class CourseModule:
    def __init__(self, module_id: int, title: str, description: str, order: int = 0):
        self.module_id = module_id
        self.title = title
        self.description = description
        self.order = order
        self.lessons = []
    
    def add_lesson(self, lesson: 'Lesson'):
        """Add lesson to module"""
        self.lessons.append(lesson)
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "module_id": self.module_id,
            "title": self.title,
            "description": self.description,
            "order": self.order,
            "lessons": [lesson.to_dict() for lesson in self.lessons]
        }

class Lesson:
    def __init__(self, lesson_id: int, title: str, duration: int, content: str, 
                 lesson_type: str = "video", order: int = 0):
        self.lesson_id = lesson_id
        self.title = title
        self.duration = duration  # in minutes
        self.content = content
        self.lesson_type = lesson_type  # video, text, quiz, exercise
        self.order = order
        self.completed = False
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "lesson_id": self.lesson_id,
            "title": self.title,
            "duration": self.duration,
            "content": self.content,
            "lesson_type": self.lesson_type,
            "order": self.order,
            "completed": self.completed
      }
