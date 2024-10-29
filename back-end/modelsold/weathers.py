import pandas as pd
import os

# WeatherData class to handle loading and searching weather data
class WeatherData:
    # Class variable which will store an instance of the class
    instance = None

    # Initialization function
    # This loads the data and sets the class instance variable
    def __init__(self, path):
        # Load the CSV data
        data = pd.read_csv(os.path.dirname(os.path.abspath(__file__)) + "/" + path)

        # Standardize and clean data columns as necessary
        data["location"] = data["NAME"].astype(str)
        data["date"] = data["DATE"].astype(str)
        data["temperature_max"] = pd.to_numeric(data["TMAX"], errors="coerce")
        data["temperature_min"] = pd.to_numeric(data["TMIN"], errors="coerce")
        data["precipitation"] = pd.to_numeric(data["PRCP"], errors="coerce")

        # Remove duplicates
        data.drop_duplicates(inplace=True)

        self.data = data
        WeatherData.instance = self

    # Search function
    # This takes a search parameter and returns matching records
    def search(self, search):
        # Search location name
        mask = self.data['location'].str.lower().str.contains(search.lower())
        # Optionally, you could add more search criteria here (e.g., for date)
        return self.data[mask]

    # Get function
    # This retrieves a specific record by its index
    def get(self, id):
        try:
            return self.data.iloc[int(id)]
        except IndexError:
            return None  # Return None if the ID is out of range
