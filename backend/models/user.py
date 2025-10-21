from datetime import datetime
from typing import List, Dict, Any

class User:
    def __init__(self, 
                 user_id: int,
                 email: str,
                 first_name: str,
                 last_name: str,
                 country: str = "",
                 registration_date: str = None):
        
        self.user_id = user_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.country = country
        self.registration_date = registration_date or datetime.now().isoformat()
        self.is_active = True
        self.last_login = None
        self.preferences = {}
        
        # Learning analytics
        self.learning_style = None
        self.preferred_difficulty = None
        self.progress_tracking = True
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "user_id": self.user_id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "country": self.country,
            "registration_date": self.registration_date,
            "is_active": self.is_active,
            "last_login": self.last_login,
            "preferences": self.preferences,
            "learning_style": self.learning_style,
            "preferred_difficulty": self.preferred_difficulty
        }
    
    def update_login(self):
        """Update last login timestamp"""
        self.last_login = datetime.now().isoformat()
    
    def set_preference(self, key: str, value: Any):
        """Set user preference"""
        self.preferences[key] = value
    
    def get_preference(self, key: str, default: Any = None) -> Any:
        """Get user preference"""
        return self.preferences.get(key, default)

class UserProgress:
    def __init__(self, user_id: int, course_id: int):
        self.user_id = user_id
        self.course_id = course_id
        self.enrollment_date = datetime.now().isoformat()
        self.completion_status = "enrolled"  # enrolled, in_progress, completed
        self.progress_percentage = 0.0
        self.last_accessed = datetime.now().isoformat()
        self.lessons_completed = []
        self.quiz_scores = {}
        self.time_spent = 0  # in minutes
        self.achievements = []
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "user_id": self.user_id,
            "course_id": self.course_id,
            "enrollment_date": self.enrollment_date,
            "completion_status": self.completion_status,
            "progress_percentage": self.progress_percentage,
            "last_accessed": self.last_accessed,
            "lessons_completed": self.lessons_completed,
            "quiz_scores": self.quiz_scores,
            "time_spent": self.time_spent,
            "achievements": self.achievements
        }
    
    def complete_lesson(self, lesson_id: int):
        """Mark lesson as completed"""
        if lesson_id not in self.lessons_completed:
            self.lessons_completed.append(lesson_id)
            self._update_progress()
    
    def add_quiz_score(self, quiz_id: int, score: float):
        """Add quiz score"""
        self.quiz_scores[quiz_id] = score
    
    def _update_progress(self):
        """Update overall progress percentage"""
        # This would typically query the total lessons in the course
        total_lessons = 12  # This should come from course data
        if total_lessons > 0:
            self.progress_percentage = (len(self.lessons_completed) / total_lessons) * 100
            
            if self.progress_percentage >= 100:
                self.completion_status = "completed"
            elif self.progress_percentage > 0:
                self.completion_status = "in_progress"

class UserCourse:
    def __init__(self, user_id: int, course_id: int):
        self.user_id = user_id
        self.course_id = course_id
        self.purchase_date = datetime.now().isoformat()
        self.access_expiry = None  # None means lifetime access
        self.is_active = True
        self.rating = None
        self.review = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "user_id": self.user_id,
            "course_id": self.course_id,
            "purchase_date": self.purchase_date,
            "access_expiry": self.access_expiry,
            "is_active": self.is_active,
            "rating": self.rating,
            "review": self.review
        }
    
    def add_review(self, rating: int, review: str):
        """Add user review and rating"""
        self.rating = rating
        self.review = review
