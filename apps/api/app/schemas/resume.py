from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ResumeSection(BaseModel):
    title: str
    items: List[Dict[str, Any]]

class ParsedResume(BaseModel):
    personal_info: Dict[str, str]
    experience: List[Dict[str, Any]]
    education: List[Dict[str, Any]]
    skills: List[str]
    projects: List[Dict[str, Any]]
    
class UniverseConfig(BaseModel):
    name: str
    description: str
    tone: str
    visual_theme: str

class TransformRequest(BaseModel):
    resume_id: str
    universe_id: str

class TransformationResult(BaseModel):
    original_resume_id: str
    universe_id: str
    transformed_content: ParsedResume
    portrait_url: Optional[str] = None
