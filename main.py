from fastapi import FastAPI
from app.services.pm_kisan_service import router as pm_kisan_router

app = FastAPI(
    title="AI Scheme Eligibility & Impact Predictor",
    version="1.0"
)

@app.get("/")
def root():
    return {
        "message": "AI Scheme Eligibility & Impact Predictor API",
        "docs": "/docs"
    }

# ✅ Attach router
app.include_router(pm_kisan_router, prefix="/api")
