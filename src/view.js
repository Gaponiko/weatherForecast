let isInfoBlockVisible   = false;

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

function startLoader() {

    loader.classList.add('round-animation');
}

function stopLoader() {
    loader.style.opacity = '0';
    loader.classList.remove('round-animation');
}

function infoTextChange(response) {
    for(let i = 0; i < dataValue.length; i++) {
        dataValue[i].style.opacity = '0';
    }

    setTimeout(function () {
        fillInfo(response);

        for(let i = 0; i < dataValue.length; i++) {
            dataValue[i].style.opacity = '1';
        }
    }, 300)
}

function showInfoBlock() {
    isInfoBlockVisible            = true;
    mainTitle.style.marginTop     = '5%';
    loader.style.top              = '70px';

    setTimeout(function () {
        infoWrapper.style.opacity = '1';
    }, 500)
}

function hideInfoBlock() {
    isInfoBlockVisible            = false;
    infoWrapper.style.opacity     = '0';

    setTimeout(function () {
        mainTitle.style.marginTop = '30%';
        loader.style.top          = '195px';
    }, 500)
}

function showError() {
    searchInput.style.borderColor = 'red';

    setTimeout(function () {
        searchInput.style.borderColor = 'greenyellow';
    }, 500);

    hideInfoBlock();
}
