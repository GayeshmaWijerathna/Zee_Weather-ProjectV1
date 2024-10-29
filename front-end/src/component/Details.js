import { useEffect, useState } from "react";
import { Video } from "./Video";
import { Charts } from "./Charts";
import { About } from "./About";

export const Details = () => {
    const [weatherData, setWeatherData] = useState([]); // Holds the weather data
    const [location, setLocation] = useState(""); // User input for location
    const [isDataAvailable, setIsDataAvailable] = useState(true); // Flag for data availability



    // Fetch weather data when the location is updated
    useEffect(() => {
        if (location) fetchWeatherData(location);
    }, [location]);

    // Fetch weather data from the backend API
    const fetchWeatherData = async (location) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/weather/weather/history/${location}`);
            const data = await response.json();
            setWeatherData(data ? [data] : []); // Set data, ensuring it's an array
            setIsDataAvailable(!!data); // Check if data is available
        } catch (error) {
            console.error("Error fetching data:", error);
            setWeatherData([]); // Reset weather data on error
            setIsDataAvailable(false);
        }
    };

    // Handle input change in the location field
    const handleInputChange = (e) => setLocation(e.target.value);

    // Handle form submission to fetch data
    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData(location);
    };

    // Generate future days from the start date
    const getFutureDays = (startDate, daysCount) => {
        const days = [];
        const start = new Date(startDate);
        const isValidStartDate = !isNaN(start.getTime());

        for (let i = 1; i <= daysCount; i++) {
            if (isValidStartDate) {
                start.setDate(start.getDate() + 1);
                days.push({
                    day: start.toLocaleDateString('en-US', { weekday: 'long' }),
                    date: start.toISOString().split('T')[0],
                });
            } else {
                days.push({ day: "NaN", date: "NaN" });
            }
        }
        return days;
    };

    const startDate = weatherData?.[0]?.date || new Date().toISOString().split('T')[0];
    const futureDays = getFutureDays(startDate, 7); // Get 7 future days

    // Extract max and min temperatures for the Charts component
    const maxTemp = weatherData?.[0]?.max_temp || 0;
    const minTemp = weatherData?.[0]?.min_temp || 0;

    const handleDateInputChange = (e) => {
        let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (input.length > 4) input = input.slice(0, 4) + '-' + input.slice(4);
        if (input.length > 7) input = input.slice(0, 7) + '-' + input.slice(7);
        setLocation(input.slice(0, 10)); // Limit to "yyyy-mm-dd"
    };

    return (
        <>
            <div className="hero" style={{ backgroundImage: 'url(images/coverN.jpg)', backgroundPosition: 'center' }}>
                <div className="container">
                    <form className="find-location" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            placeholder="Input Date (YYYY-DD-MM) to Find Weather"
                            value={location}
                            onChange={handleDateInputChange}
                        />
                        <input type="submit" value="Find" />
                    </form>
                </div>
            </div>

            <div className="forecast-table">
                <div className="container">
                    <div className="forecast-container">
                        {isDataAvailable && weatherData.length > 0 ? (
                            weatherData.map((day, index) => (
                                <div key={index} className="today forecast">
                                    <div className="forecast-header">
                                        <div className="day">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
                                        <div className="date">{day.date}</div>
                                    </div>
                                    <div className="forecast-content">
                                        <div className="location">{day.name}</div>
                                        <div className="degree">
                                            <div className="num">{day.max_temp}<sup>o</sup>C</div>
                                            <small style={{ color: 'gray' }}>{day.min_temp}<sup>o</sup>C</small>
                                            <div className="forecast-icon">
                                                <img src="images/icons/icon-1.svg" alt="" width="90" />
                                            </div>
                                        </div>
                                        <span><img src="images/snow.png" alt="" /> {day.snow}%</span>
                                        <span><img src="images/snow_depth.png" alt="" /> {day.snow_depth}%</span>
                                        <span><img src="images/icon-umberella.png" alt="" /> {day.precipitation}%</span>
                                        <span><img src="images/icon-wind.png" alt="" /> {day.wind_speed} km/h</span>
                                        <span><img src="images/cloud.png" alt="" /> {day.cloudiness}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No weather data found</div>
                        )}

                        {/* Render future days using FutureWeatherDay component */}
                        {futureDays.map((futureDay, index) => (
                            <FutureWeatherDay key={index} day={futureDay} iconIndex={index + 3} />
                        ))}
                    </div>
                </div>
            </div>

            <Video />
            {/* Pass the location and temperature data to the Charts component */}


            <Charts inputDate={location} />
            <About />
        </>
    );
};

// Component to display future weather day
const FutureWeatherDay = ({ day, iconIndex }) => {
    // Generate random temperatures if not provided
    const getRandomTemp = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const maxTemp = getRandomTemp(20, 30); // Random max temp between 20-30°C
    const minTemp = getRandomTemp(10, 19); // Random min temp between 10-19°C
    const dayName = day?.day || "NaN";

    return (
        <div className="forecast">
            <div className="forecast-header">
                <div className="day">{dayName}</div>
            </div>
            <div className="forecast-content">
                <div className="forecast-icon">
                    <img src={`images/icons/icon-${iconIndex}.svg`} alt="" width="48" />
                </div>
                <div className="degree">{maxTemp}<sup>o</sup>C</div>
                <small>{minTemp}<sup>o</sup>C</small>
            </div>
        </div>
    );
};
