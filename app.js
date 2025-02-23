var cityInput = document.getElementById("cityInput");
var addInput = document.getElementById("add");
var cityOutput = document.getElementById("cityoutput");
var descOutput = document.getElementById("description");
var tempOutput = document.getElementById("temp");
var windOutput = document.getElementById("wind");
const apiKey = "3045dd712ffe6e702e3245525ac7fa38";

function convertToCel(value){
    return (value - 273.15).toFixed(2);
}

async function GetWeather() {
  try {
    var weatherResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`);
    if (!weatherResult.ok) throw new Error('City not found');
    var weatherData = await weatherResult.json();
    //console.log(weatherData)
    
    setInfo(weatherData);

  } catch (error) {
    console.error(error);
    alert('Could not retrieve weather data. Please try again.');
  }
  console.log(weatherData)
}

function setInfo(data) {
  var cityName = data["name"];
  var description = data["weather"][0]["description"];
  var temp = data["main"]["temp"];
  var wind = data["wind"]["speed"];

  cityOutput.innerHTML = cityName;
  descOutput.innerHTML = `Description: ${description}`;
  tempOutput.innerHTML = `Temperature: ${convertToCel(temp)} °C`;
  windOutput.innerHTML = `Wind Speed: ${wind} km/h`;
}

addInput.addEventListener("click", GetWeather);
