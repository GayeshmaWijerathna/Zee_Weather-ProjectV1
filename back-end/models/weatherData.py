# models/weather_data.py
import pandas as pd
from pydantic import BaseModel
import os
from datetime import date

# Define the Weather model based on the CSV columns
class Weather(BaseModel):
    name: str
    date: str
    temperature_max: float
    temperature_min: float
    precipitation: float
    snow: float  # Added field for snow
    snow_depth: float  # Added field for snow depth

# WeatherData class to handle loading, searching, and accessing the data
class WeatherData:
    instance = None

    def __init__(self, path: str):

        try:
            # Load the CSV file into a DataFrame
            data = pd.read_csv(path)

            # Standardize data columns if needed
            data["location"] = data["NAME"].astype(str)  # Assuming "NAME" is the location name column
            data["date"] = data["DATE"].astype(str)      # Ensure date is kept as string
            data["temperature_max"] = data["TMAX"].astype(float)
            data["precipitation"] = data["PRCP"].astype(float)
            data["snow"] = data["SNOW"].fillna(0).astype(float)
            data["snow_depth"] = data["SNWD"].fillna(0).astype(float)
            data["wind_speed"] = data["AWND"].astype(float)
            data["cloudiness"] = data["ACMH"].astype(float)
            # Store data in a list of dictionaries
            self.data = data.to_dict(orient="records")
            print(data.head())

            WeatherData.instance = self
        except FileNotFoundError:
            print("CSV file not found. Please check the file path.")
        except pd.errors.ParserError:
            print("Error parsing CSV file. Please check the file format.")
        except Exception as e:
            print(f"Unexpected error loading data: {e}")

    @classmethod
    def get_instance(cls, path: str = None):
        """Singleton method to get or create the WeatherData instance."""
        if cls.instance is None and path is not None:
            cls.instance = cls(path)
        return cls.instance

    def find_by_location(self, location_name: str):
        """Find weather data by location name (NAME column)."""
        try:
            results = [Weather(**entry) for entry in self.data if entry["location"] == location_name]
            if not results:
                print(f"No data found for location: {location_name}")
            return results
        except Exception as e:
            print(f"Error searching for location '{location_name}': {e}")
            return []

# Initialize WeatherData instance with the path to weather.csv
csv_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/weather.csv")
weather_data = WeatherData.get_instance(csv_file_path)




class WeatherData2(BaseModel):
    date: date
    temperature_max: float
    temperature_min: float