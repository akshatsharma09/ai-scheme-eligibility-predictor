from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers from app.services
from app.services.pm_kisan_service import router as pmkisan_router
from app.services.pmay_service import router as pmay_router
from app.services.nsp_service import router as nsp_router
from app.services.ayushman_service import router as ayushman_router

app = FastAPI(
    title="AI Scheme Eligibility & Impact Predictor",
    description="Predict eligibility, approval probability, and benefits for multiple government schemes.",
    version="1.0.0"
)

# Allow frontend (Vercel) to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For hackathon/demo, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all scheme routers
app.include_router(pmkisan_router)
app.include_router(pmay_router)
app.include_router(nsp_router)
app.include_router(ayushman_router)

# Root endpoint
@app.get("/")
def root():
    return {
        "message": "AI Scheme Eligibility & Impact Predictor API is running",
        "available_schemes": ["PM-KISAN", "PMAY", "NSP", "Ayushman Bharat"]
    }
