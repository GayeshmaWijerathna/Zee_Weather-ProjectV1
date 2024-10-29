from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import suburbs, clustering, regression, data, weather
from models.weatherData import WeatherData

from models import SuburbData
import os

app = FastAPI()

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data instances
weather_data = WeatherData(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/weather.csv"))
suburb_data = SuburbData.SuburbData(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/suburbs.csv"))
regression_model = regression.regression(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/data.csv"))
cluster_model = clustering.Cluster(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/data.csv"))

# Include routers
app.include_router(weather.router, prefix="/weather", tags=["data", "weather"])
app.include_router(suburbs.router, prefix="/suburbs", tags=["data", "suburbs"])
app.include_router(clustering.router, prefix="/clustering", tags=["model", "clustering"])
app.include_router(regression.router, prefix="/regression", tags=["model", "regression"])
app.include_router(data.router, prefix="/data", tags=["data"])
app.include_router(weather.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
