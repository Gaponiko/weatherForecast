const ENTER_KEY_CODE     = 13;

let isGoodResponse       = false;

searchButton.onclick     = getWeather;
window.onkeydown         = checkKey;

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
        })
        .catch(function () {
            stopLoader();
            showError();
        });
}

function showWeather(response) {
    if(!isInfoBlockVisible) {
        fillInfo(response);
        showInfoBlock();
    }
    else {
        infoTextChange(response);
    }
}

function fillInfo(response) {
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
