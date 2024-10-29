from fastapi import FastAPI
from fastapi.responses import JSONResponse
import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as np

app = FastAPI()

# Load and preprocess your data
def load_weather_data():
    # Load your data (assumes you have a CSV file or similar)
    weather = pd.read_csv('your_weather_data.csv')  # Replace with your actual data source

    core_weather = weather[['PRCP', 'SNOW', 'SNWD', 'TMAX', 'TMIN', 'ACMH', 'AWND']].copy()
    core_weather.columns = ['precipitation', 'snow', 'snow depth', 'max temp', 'min temp', 'cloudiness', 'wind_speed']

    # Data preprocessing (similar to your provided script)
    core_weather.drop(columns=['snow', 'snow depth'], inplace=True)

    core_weather.fillna(method='ffill', inplace=True)
    cols_to_fill_zero = ['cloudiness', 'wind_speed']
    core_weather[cols_to_fill_zero] = core_weather[cols_to_fill_zero].fillna(0)

    core_weather['target'] = core_weather.shift(-1)['max temp']
    core_weather.dropna(inplace=True)

    # Further processing...
    predictors = ['precipitation', 'cloudiness', 'wind_speed', 'max temp', 'min temp']

    # Train Ridge Regression
    reg = Ridge(alpha=0.1)
    train = core_weather.loc[:'2020-12-31']
    test = core_weather.loc['2021-01-01':]

    reg.fit(train[predictors], train['target'])
    predictions = reg.predict(test[predictors])
    error = mean_absolute_error(test['target'], predictions)

    combined = pd.concat([test['target'], pd.Series(predictions, index=test.index)], axis=1)
    combined.columns = ['actual', 'predictions']

    return combined, error

@app.get("/weather")
def get_weather_data():
    combined, error = load_weather_data()
    # Convert DataFrame to JSON format
    data = combined.to_dict(orient='records')
    return JSONResponse(content={"data": data, "error": error})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
