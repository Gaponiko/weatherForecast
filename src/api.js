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
