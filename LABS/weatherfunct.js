document.getElementById("selectcity").onchange = fetchWeather;

async function fetchWeather() {
    const city = document.getElementById("selectcity").value;
    const weatherContainer = document.getElementById('weather-container');
    const forecast = document.getElementById('forecast')

    try {
        if (city === "") {
            weatherContainer.innerHTML = '<p>Please select a city.</p>';
            return; // Stop execution if city is not selected
        }

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f333103af83348a8988212010240502&q=${city}&aqi=no&days=9`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Extract relevant weather information from the API response
        const location = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
        const temperature = `${data.current.temp_c}°C`;
        const condition = data.current.condition.text;

        //extracting days for forcast
        const temp_arr = [];
        const date_arr = [];

        for (let i = 0; i < 7; i++) {
            const date = data.forecast.forecastday[i].date;
            date_arr.push(date);

            const temp = data.forecast.forecastday[i].day.avgtemp_c;
            temp_arr.push(temp);
        }


        // Display weather information on the webpage
        weatherContainer.innerHTML = `
            <h2>Current Weather</h2>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Temperature:</strong> ${temperature}</p>
            <p><strong>Condition:</strong> ${condition}</p>
        `;

        //display the 7-day forcast
        forecast.innerHTML = '<h2>7-day forecast </h2>';

        for (let i = 0; i < 7; i++) {
            forecast.innerHTML += `
            <p><strong>Date:</strong> ${date_arr[i]}</p>
            <p>Temperature:</strong> ${temp_arr[i]}</p>
            `;
        }



    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display error message on the webpage
        weatherContainer.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    }
}