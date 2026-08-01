import sys
import os
import json
from typing import Dict, Any

# Ensure AI package is in path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../packages/ai")))

try:
    from multiverse_ai.provider import get_ai_provider
except ImportError:
    pass

class AIService:
    def __init__(self):
        self.provider = get_ai_provider()

    async def parse_resume(self, raw_text: str) -> Dict[str, Any]:
        schema = {
            "personal_info": {"name": "string", "email": "string", "phone": "string"},
            "experience": [{"company": "string", "role": "string", "duration": "string", "description": "string"}],
            "education": [{"institution": "string", "degree": "string", "year": "string"}],
            "skills": ["string"],
            "projects": [{"name": "string", "description": "string"}]
        }
        return await self.provider.extract_structured_data(raw_text, schema)

    async def transform_resume(self, parsed_resume: Dict[str, Any], universe: str) -> Dict[str, Any]:
        system_prompt = f"You are an AI tasked with transforming a professional resume into an alternate universe reality: {universe}. Preserve the exact structure and meaning, but change terminology, tone, and descriptions to fit perfectly into the {universe} theme. Return valid JSON matching the provided structure."
        
        prompt = f"Transform the following resume:\n{json.dumps(parsed_resume)}"
        
        result_text = await self.provider.generate_text(prompt, system_prompt)
        
        # In a robust implementation, we would extract JSON from markdown blocks if necessary
        try:
            return json.loads(result_text)
        except json.JSONDecodeError:
            # Simple fallback to parse json blocks
            import re
            match = re.search(r'```json\n(.*?)\n```', result_text, re.DOTALL)
            if match:
                return json.loads(match.group(1))
            return parsed_resume # fallback

    async def generate_portrait(self, resume_summary: str, universe: str) -> str:
        prompt = f"A professional portrait photo of a person in a {universe} setting. High quality, cinematic lighting. Based on: {resume_summary}"
        return await self.provider.generate_image(prompt)

ai_service = AIService()
