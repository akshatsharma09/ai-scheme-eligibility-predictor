from fastapi import FastAPI
from app.services.pm_kisan_service import router as pm_kisan_router

app = FastAPI(
    title="AI Scheme Eligibility & Impact Predictor",
    description="AI-powered eligibility prediction for Indian government schemes",
    version="1.0"
)

app.include_router(pm_kisan_router)


@app.get("/")
def root():
    return {"message": "AI Scheme Eligibility API is running"}


from app.services.ayushman_service import router as ayushman_router

app.include_router(ayushman_router)
