from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import csv
import pandas as pd
from pathlib import Path
from typing import List
from datetime import datetime, timedelta
import random
from models.weatherData import WeatherData2


router = APIRouter()

class Weather(BaseModel):
    name:str = Field(default="Unknown")
    date: str = Field(default="Unknown")
    precipitation: float = Field(default=0.0)
    max_temp: float = Field(default=0.0)
    min_temp: float = Field(default=0.0)
    snow: float = Field(default=0.0)
    snow_depth: float = Field(default=0.0)
    cloudiness: float = Field(default=0.0)
    wind_speed: float = Field(default=0.0)

async def fetch_weather_data(date: str = None):
    weather_data = []
    csv_file_path = Path("data/weather.csv")

    try:
        with open(csv_file_path, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if date and row.get("DATE", "").strip() != date:
                    continue
                weather_data.append({

                    "name": row.get("NAME", "Unknown"),
                    "date": row.get("DATE", "Unknown"),
                    "precipitation": float(row.get("PRCP", 0.0) or 0.0),
                    "max_temp": float(row.get("TMAX", 0.0) or 0.0),
                    "min_temp": float(row.get("TMIN", 0.0) or 0.0),
                    "snow": float(row.get("SNOW", 0.0) or 0.0),
                    "snow_depth": float(row.get("SNWD", 0.0) or 0.0),
                    "wind_speed": float(row.get("AWND", 0.0) or 0.0),
                    "cloudiness": float(row.get("ACMH", 0.0) or 0.0)
                })
    except FileNotFoundError:
        print(f"CSV file not found at {csv_file_path}")
    except Exception as e:
        print(f"Error reading CSV file: {e}")

    return weather_data


@router.get("/weather/history/{date}", response_model=Weather)
async def get_weather_by_date(date: str):
    historical_data = await fetch_weather_data(date)

    if historical_data:
        return Weather(**historical_data[0])

    recent_data = await fetch_weather_data()
    if not recent_data:
        raise HTTPException(status_code=404, detail="Weather data not found")

    target_date = datetime.strptime(date, '%Y-%m-%d')
    within_30_days = [
        record for record in recent_data
        if (target_date - datetime.strptime(record['date'], '%Y-%m-%d')).days <= 30
    ]

    if not within_30_days:
        raise HTTPException(status_code=404, detail=f"No data within 30 days of {date}")

    # Calculate averages for max_temp, min_temp, and precipitation
    avg_max_temp = sum(r['max_temp'] for r in within_30_days) / len(within_30_days)
    avg_min_temp = sum(r['min_temp'] for r in within_30_days) / len(within_30_days)
    avg_precipitation = sum(r['precipitation'] for r in within_30_days) / len(within_30_days)

    # Example logic to set snow and snow_depth based on the date or historical conditions
    # This is a basic placeholder logic; you can implement your own logic as needed.
    if any(record['snow'] > 0 for record in within_30_days):
        snow = random.uniform(1, 5)  # Random snow amount if it snowed in the last 30 days
        snow_depth = random.uniform(0, 15)  # Random snow depth
    else:
        snow = 0  # No snow if it hasn't snowed in the last 30 days
        snow_depth = 0  # No snow depth

    # Return the weather data with adjusted values
    return Weather(
        date=date,
        max_temp=avg_max_temp + random.uniform(-5, 5),
        min_temp=avg_min_temp + random.uniform(-5, 5),
        precipitation=avg_precipitation + random.uniform(-1, 1),
        snow=snow,
        snow_depth=snow_depth,
        wind_speed=random.uniform(0, 15),
        cloudiness=random.uniform(0, 100)
    )


@router.get("/weather", response_model=List[Weather])
async def get_weather_data():
    # Fetch all weather data from the CSV file
    weather_data = await fetch_weather_data()
    if not weather_data:
        raise HTTPException(status_code=404, detail="Weather data not found")

    return weather_data



