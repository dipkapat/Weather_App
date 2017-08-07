'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var conditionObj;
var forecastObj;

var conditionsPath = "http://api.openweathermap.org/data/2.5/weather?q=Kolkata,IN&units=metric&APPID=0dfa7081b88c8bb4ce043507ed280eb2";
var forecastPath = "http://api.openweathermap.org/data/2.5/forecast?q=Kolkata,IN&units=metric&APPID=0dfa7081b88c8bb4ce043507ed280eb2";

// GET THE CONDITIONS
weatherConditions.open('GET', conditionsPath, true);
weatherConditions.responseType = 'text';
weatherConditions.send();

// GET THE FORECARST
weatherForecast.open('GET', forecastPath, true);
weatherForecast.responseType = 'text';
weatherForecast.send();

weatherConditions.onload = function () {
    if (weatherConditions.status === 200) {
        conditionObj = JSON.parse(weatherConditions.responseText);
        //console.log(conditionObj);
        document.getElementById('location').innerHTML = conditionObj.name + ", " + conditionObj.sys.country;
        document.getElementById('weather').innerHTML = conditionObj.weather["0"].main;
        document.getElementById('temperature').innerHTML = conditionObj.main.temp + "°C";
        var weatherDescStr = conditionObj.weather["0"].description;
        document.getElementById('desc').innerHTML = weatherDescStr.substr(0, 1).toUpperCase() + weatherDescStr.substr(1);
    }
};

var baseImgPath = 'http://openweathermap.org/img/w/';
weatherForecast.onload = function () {
    /*var baseImgPath = 'http://openweathermap.org/img/w/';*/
    if (weatherForecast.status === 200) {
        forecastObj = JSON.parse(weatherForecast.responseText);
        console.log(forecastObj);

        // Day1
        //document.getElementById('dayDate1').innerHTML = forecastObj.list["0"].dt_txt;
        document.getElementById('maxTemp1').innerHTML = forecastObj.list["0"].main.temp_max + "&deg;C";
        document.getElementById('minTemp1').innerHTML = forecastObj.list["0"].main.temp_min + "&deg;C";
        var dailyWeatherDescStr1 = forecastObj.list["0"].weather["0"].description;
        document.getElementById('dailyForecast1').innerHTML = dailyWeatherDescStr1.substr(0, 1).toUpperCase() + dailyWeatherDescStr1.substr(1);
        var imagePath = baseImgPath + forecastObj.list["0"].weather["0"].icon + ".png";
        document.getElementById('weatherIcon1').src = imagePath;

        // Day2
        document.getElementById('maxTemp2').innerHTML = forecastObj.list[1].main.temp_max + "&deg;C";
        document.getElementById('minTemp2').innerHTML = forecastObj.list[1].main.temp_min + "&deg;C";
        var dailyWeatherDescStr2 = forecastObj.list[1].weather["0"].description
        document.getElementById('dailyForecast2').innerHTML = dailyWeatherDescStr2.substr(0, 1).toUpperCase() + dailyWeatherDescStr2.substr(1);
        var imagePath = baseImgPath + forecastObj.list[1].weather["0"].icon + ".png";
        document.getElementById('weatherIcon2').src = imagePath;

        // Day3
        document.getElementById('maxTemp3').innerHTML = forecastObj.list[2].main.temp_max + "&deg;C";
        document.getElementById('minTemp3').innerHTML = forecastObj.list[2].main.temp_min + "&deg;C";
        var dailyWeatherDescStr3 = forecastObj.list[2].weather["0"].description;
        document.getElementById('dailyForecast3').innerHTML = dailyWeatherDescStr3.substr(0, 1).toUpperCase() + dailyWeatherDescStr3.substr(1);
        var imagePath = baseImgPath + forecastObj.list[2].weather["0"].icon + ".png";
        document.getElementById('weatherIcon3').src = imagePath;
    }
};
