let isInfoBlockVisible   = false;

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