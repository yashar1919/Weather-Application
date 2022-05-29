const getLocation = async function () {
    const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone';
    const response = await fetch(url);
    const data = response.json();
    return data;
}

const getWeather = async function (lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f0894defae7c5584798f8812232a40c2`;
    const response = await fetch(url);
    const data = response.json();
    return data;
}


function getIcon(weatherMain) {
    let icon;
    switch (weatherMain) {
        case 'Thunderstorm':
            icon = `${weatherMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weatherMain}.svg`;
            break;
        case 'Rain':
            icon = `${weatherMain}.svg`;
            break;
        case 'Snow':
            icon = `${weatherMain}.svg`;
            break;
        case 'Clear':
            const DayOrNigh = getDayOrNight();
            icon = `${weatherMain}-${DayOrNigh}.svg`;
            break;
        case 'Clouds':
            icon = `${weatherMain}.svg`;
            break;
        case 'Atmosphere':
            icon = `${weatherMain}.png`;
            break;
    }
    return icon;
}

function getDayOrNight() {
    let DayOrNigh;
    var d = new Date();

    const hour = d.getHours();

    if (hour >= 6 && hour <= 19) {
        DayOrNigh = 'Day';
    } else {
        DayOrNigh = 'Night';
    }
    return DayOrNigh;
}

function getTemp(weatherTemp) {
    const k = weatherTemp;
    const f = (k - 273.15) * 9 / 5 + 32;
    const c = k - 273.15;
    return temp = { kel: Math.floor(k), far: Math.floor(f), can: Math.floor(c) };
}

const locationTimezone = document.querySelector('.timezone');
const icon = document.querySelector('.icon');
const degreeSection = document.querySelector('.degree-section');
const degree = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');
const tempDescription = document.querySelector('.temperature-description');

window.addEventListener('load', function () {
    getLocation()
        .then(locationData => {
            const timeZone = locationData.timezone;
            locationTimezone.innerHTML = timeZone;
            getWeather(locationData.lat, locationData.lon)
                .then(weatherData => {
                    const weatherTemp = weatherData.main.temp;
                    const weatherMain = weatherData.weather[0].main;
                    const weatherDescription = weatherData.weather[0].description;

                    const iconName = getIcon(weatherMain);
                    icon.innerHTML = `<img src='icons/${iconName}'></img>`;

                    degree.innerHTML = getTemp(weatherTemp).can;
                    unit.innerHTML = 'C';
                    
                    degreeSection.addEventListener('click', function (e) {
                        if (unit.innerHTML == 'K') {
                            degree.innerHTML = getTemp(weatherTemp).far;
                            unit.innerHTML = 'F';
                        }
                        else if (unit.innerHTML == 'F') {
                            degree.innerHTML = getTemp(weatherTemp).can;
                            unit.innerHTML = 'C';
                        }
                        else {
                            degree.innerHTML = getTemp(weatherTemp).kel;
                            unit.innerHTML = 'K';
                        }
                    })
                    tempDescription.innerHTML = weatherDescription;
                    console.log(weatherTemp, weatherMain, weatherDescription);
                })
        })
})
