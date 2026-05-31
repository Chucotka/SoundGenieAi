from fastapi import FastAPI
from pydantic import BaseModel
import uuid

app = FastAPI(title="SoundGenie Audio API")

class AnalyzeRequest(BaseModel):
    audio_url: str

class RemixRequest(BaseModel):
    track_id: str
    remix_type: str
    user_prompt: str = None

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze_audio(request: AnalyzeRequest):
    return {
        "bpm": 120,
        "key": "C Minor",
        "energy_level": 0.8,
        "duration": 204.5,
        "sample_rate": 44100
    }

@app.post("/remix")
async def create_remix(request: RemixRequest):
    return {
        "remix_id": str(uuid.uuid4()),
        "remix_url": "https://example.com/mock-remix.mp3",
        "original_bpm": 120,
        "remix_bpm": 145 if request.remix_type == "speed_up" else 120,
        "duration": 180,
        "ai_prompt_used": f"Remix of track {request.track_id} in style {request.remix_type}"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
