const searchButton       = document.getElementById('search-button');
const searchInput        = document.getElementById('search-input');
const infoWrapper        = document.getElementById('info-wrapper');
const citySpan           = document.getElementById('city');
const temperatureSpan    = document.getElementById('temperature');
const weatherSpan        = document.getElementById('weather');
const weatherDetailsSpan = document.getElementById('weather-description');
const humiditySpan       = document.getElementById('humidity');
const pressureSpan       = document.getElementById('pressure');
const cloudsSpan         = document.getElementById('clouds-percent');
const coordsSpan         = document.getElementById('coords');
const windSpeedSpan      = document.getElementById('wind-speed');
const loader             = document.getElementById('loader');

const ENTER_KEY_CODE    = 13;

let isGoodResponse      = false;

searchButton.onclick    = getWeather;
window.onkeydown        = checkKey;

function checkKey(e) {
    if (e.keyCode == ENTER_KEY_CODE) {
        getWeather();
    }
}

function getWeather() {
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + searchInput.value + '&APPID=0de398a7a74d95993f93e315894cf250';

    startLoader();

    fetch(url)
        .then(function (response) {
            if(response.status == 200)
            {
                hideError();
                stopLoader();
                isGoodResponse = true;
                return response.json();
            }
            else
            {
                isGoodResponse = false;
                stopLoader();
                showError();
            }
        })
        .then(function (response) {
            if(isGoodResponse) {
                showWeather(response);
            }
        });
}

function startLoader() {

    loader.classList.add('round-animation');
}

function stopLoader() {
    loader.style.opacity = '0';
    loader.classList.remove('round-animation');
}

function showWeather(response) {
    infoWrapper.style.opacity    = '1';
    citySpan.innerText           = response.name;
    temperatureSpan.innerText    = Math.round(response.main.temp - 273.15) + '°C';
    weatherSpan.innerText        = response.weather[0].main;
    weatherDetailsSpan.innerText = '(' + response.weather[0].description + ')';
    humiditySpan.innerText       = response.main.humidity + '%';
    pressureSpan.innerText       = response.main.pressure + ' hPa';
    cloudsSpan.innerText         = response.clouds.all + '%';
    coordsSpan.innerText         = '(' + response.coord.lat + ';' + response.coord.lon + ')';
    windSpeedSpan.innerText      = response.wind.speed + ' m/s'
}

function showError() {
    searchInput.style.borderColor = 'red';
    infoWrapper.style.opacity     = '0';

    setTimeout(function () {
        searchInput.style.borderColor = 'greenyellow';
    }, 500);
}

function hideError() {

}
