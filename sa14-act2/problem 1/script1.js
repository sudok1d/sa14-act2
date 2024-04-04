const weatherInfo = document.getElementById("weatherInfo");
const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const forecastInfo = document.getElementById('forecastInfo');

form.addEventListener("submit", function(event){
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
    else {
        alert("Please enter name of city");
    }

});

function fetchWeather(city){
    const api_key = "28bf3781c8474b168eb182347240204"
    fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error(error));

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=5`)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error(error));

}

function displayWeather(data){
    weatherInfo.innerHTML = `
        <h2>${data.location.name}</h2>
        <p>Current Date and Time: ${data.location.localtime}</p>
        <p>Current Temperature: ${data.current.temp_f}F</p>
        <p>Weather Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon">
        <p>Humidity: ${data.current.humidity}%</p>

    
    `;
}

function displayForecast(data) {
    const forecast = data.forecast.forecastday;
    forecastInfo.innerHTML = '<h3>5-Day Forecast:</h3>';
    forecast.forEach(day => {
        forecastInfo.innerHTML += `
            <div>
                <p>Date: ${day.date}</p>
                <p>Max Temperature: ${day.day.maxtemp_f}F</p>
                <p>Min Temperature: ${day.day.mintemp_f}F</p>
                <p>Condition: ${day.day.condition.text}</p>
                <img src="${day.day.condition.icon}" alt="Weather Icon">
            </div>
        `;
    });
}