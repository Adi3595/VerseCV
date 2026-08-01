from abc import ABC, abstractmethod
from typing import Dict, Any, List
import openai
import os

class AIProvider(ABC):
    @abstractmethod
    async def generate_text(self, prompt: str, system_prompt: str = "") -> str:
        pass
        
    @abstractmethod
    async def extract_structured_data(self, text: str, schema: Dict[str, Any]) -> Dict[str, Any]:
        pass
        
    @abstractmethod
    async def generate_image(self, prompt: str) -> str:
        pass

class OpenAIProvider(AIProvider):
    def __init__(self):
        self.client = openai.AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.text_model = os.getenv("OPENAI_TEXT_MODEL", "gpt-4-turbo-preview")
        self.image_model = os.getenv("OPENAI_IMAGE_MODEL", "dall-e-3")

    async def generate_text(self, prompt: str, system_prompt: str = "") -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        response = await self.client.chat.completions.create(
            model=self.text_model,
            messages=messages,
            temperature=0.7
        )
        return response.choices[0].message.content

    async def extract_structured_data(self, text: str, schema: Dict[str, Any]) -> Dict[str, Any]:
        messages = [
            {"role": "system", "content": "You are an expert data extractor. Always return JSON matching the schema."},
            {"role": "user", "content": f"Extract data from this text: {text}\nSchema: {schema}"}
        ]
        
        response = await self.client.chat.completions.create(
            model=self.text_model,
            messages=messages,
            response_format={"type": "json_object"}
        )
        import json
        return json.loads(response.choices[0].message.content)

    async def generate_image(self, prompt: str) -> str:
        response = await self.client.images.generate(
            model=self.image_model,
            prompt=prompt,
            n=1,
            size="1024x1024",
            quality="hd"
        )
        return response.data[0].url

class OpenRouterProvider(AIProvider):
    def __init__(self):
        # OpenRouter uses the exact same interface as OpenAI, just a different base_url
        self.client = openai.AsyncOpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=os.getenv("OPENROUTER_API_KEY")
        )
        # Using Gemini 2.5 Flash API as a fast, often free/cheap default on OpenRouter
        self.text_model = os.getenv("OPENROUTER_TEXT_MODEL", "google/gemini-2.5-flash-api")
        # Note: OpenRouter doesn't natively support image generation through the standard DALL-E endpoint
        # We fallback to a placeholder or OpenAI if needed for images
        self.image_model = os.getenv("OPENAI_IMAGE_MODEL", "dall-e-3")

    async def generate_text(self, prompt: str, system_prompt: str = "") -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        response = await self.client.chat.completions.create(
            model=self.text_model,
            messages=messages,
            temperature=0.7
        )
        return response.choices[0].message.content

    async def extract_structured_data(self, text: str, schema: Dict[str, Any]) -> Dict[str, Any]:
        messages = [
            {"role": "system", "content": f"You are an expert data extractor. Always return valid JSON EXACTLY matching this schema with no markdown formatting: {schema}"},
            {"role": "user", "content": f"Extract data from this text: {text}"}
        ]
        
        # OpenRouter's gemini/llama models might not support `response_format={"type": "json_object"}` flawlessly
        # So we request it normally and parse carefully
        response = await self.client.chat.completions.create(
            model=self.text_model,
            messages=messages
        )
        import json
        import re
        result_text = response.choices[0].message.content
        try:
            return json.loads(result_text)
        except json.JSONDecodeError:
            match = re.search(r'```json\n(.*?)\n```', result_text, re.DOTALL)
            if match:
                return json.loads(match.group(1))
            return {}

    async def generate_image(self, prompt: str) -> str:
        # Using Pollinations.ai for completely free, keyless image generation
        import urllib.parse
        encoded_prompt = urllib.parse.quote(prompt)
        image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true"
        return image_url

# Factory to get the configured provider
def get_ai_provider() -> AIProvider:
    provider = os.getenv("AI_PROVIDER", "openai").lower()
    if provider == "openai":
        return OpenAIProvider()
    elif provider == "openrouter":
        return OpenRouterProvider()
    raise ValueError(f"Unsupported AI provider: {provider}")
