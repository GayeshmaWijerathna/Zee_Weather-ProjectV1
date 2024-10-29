
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js"; // Ensure this is imported if you're using Plotly

export const Charts = ({ inputDate }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [forecastData, setForecastData] = useState([]); // State to store actual vs predictions data
    const comparisonDate = "2024-10-02"; // Fixed comparison date

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/weather");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Weather Data:", data); // Debugging log
                setWeatherData(data);
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            }
        };

        const fetchForecastData = async () => {
            // Validate inputDate
            const validInputDate = new Date(inputDate);
            if (isNaN(validInputDate.getTime())) {
                console.error("Invalid input date:", inputDate);
                return; // Exit if inputDate is not valid
            }

            // Generate a random number based on a range
            const getRandomTemp = () => {
                const minTemp = 50; // Minimum temperature
                const maxTemp = 70; // Maximum temperature
                return (Math.random() * (maxTemp - minTemp) + minTemp).toFixed(2); // Random temperature in the specified range
            };

            // Generate forecast data based on the input date
            const forecast = [];
            for (let i = 0; i < 7; i++) { // Generate 7 days of forecast
                const currentDate = new Date(validInputDate);
                currentDate.setDate(validInputDate.getDate() + i); // Increment the date
                forecast.push({
                    DATE: currentDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
                    actual: parseFloat(getRandomTemp()), // Generate a random actual temperature
                    predictions: parseFloat(getRandomTemp()), // Generate a random prediction temperature
                });
            }
            setForecastData(forecast);
        };

        fetchWeatherData();
        fetchForecastData();
    }, [inputDate]); // Ensure to run this effect when inputDate changes

    // Prepare data for Plotly with conditional styling for inputDate
    const preparePlotlyData = (data, name, color, tempType) => ({
        x: data.map(d => d.DATE || d.date), // Using DATE from forecastData or date from weatherData
        y: data.map(d => d[tempType]),
        type: "scatter",
        mode: "lines+markers",
        name: name,
        marker: {
            color: color,
            size: data.map(d => d.DATE === inputDate ? 10 : 6), // Larger size for input date
            symbol: data.map(d => d.DATE === inputDate ? "star" : "circle"), // Star shape for input date
        },
        line: { color: color },
    });

    // Prepare Plotly data for weatherData
    const minTempData = preparePlotlyData(weatherData, "Min Temp", "#61dafb", "min_temp");
    const maxTempData = preparePlotlyData(weatherData, "Max Temp", "#ff6347", "max_temp");

    // Prepare Plotly data for forecastData
    const actualData = preparePlotlyData(forecastData, "Actual", "#ff4500", "actual");
    const predictionData = preparePlotlyData(forecastData, "Predictions", "#1e90ff", "predictions");

    return (
        <div className="fullwidth-block" style={{ backgroundColor: "#262936" }}>
            <div className="container">
                <h2 className="section-title">Weather Data Charts</h2>
                <div className="row">
                    <div className="col-md-12">
                        <div className="news">
                            <h3>Maximum Temperature Chart</h3>
                            <Plot
                                data={[maxTempData]} // Display all max temps, highlighting input date
                                layout={{
                                    title: "Maximum Temperature Over Time",
                                    xaxis: { title: "Date" },
                                    yaxis: { title: "Temperature (°C)" },
                                    paper_bgcolor: "#262936",
                                    plot_bgcolor: "#262936",
                                    font: { color: "white" },
                                }}
                                style={{ width: "100%", height: "300px" }}
                            />
                            <h3>Minimum Temperature Chart</h3>
                            <Plot
                                data={[minTempData]} // Display all min temps, highlighting input date
                                layout={{
                                    title: "Minimum Temperature Over Time",
                                    xaxis: { title: "Date" },
                                    yaxis: { title: "Temperature (°C)" },
                                    paper_bgcolor: "#262936",
                                    plot_bgcolor: "#262936",
                                    font: { color: "white" },
                                }}
                                style={{ width: "100%", height: "300px" }}
                            />
                            <h3>Actual vs Predictions Chart</h3>
                            <Plot
                                data={[actualData, predictionData]}
                                layout={{
                                    title: "Actual vs Predictions Over Time",
                                    xaxis: { title: "Date" },
                                    yaxis: { title: "Values" },
                                    paper_bgcolor: "#262936",
                                    plot_bgcolor: "#262936",
                                    font: { color: "white" },
                                }}
                                style={{ width: "100%", height: "300px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
