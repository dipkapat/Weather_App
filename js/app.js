'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var conditionObj;
var forecastObj;

var conditionsPath = "http://api.openweathermap.org/data/2.5/weather?q=Kolkata,IN&units=metric&APPID=0dfa7081b88c8bb4ce043507ed280eb2&cnt=3";
var forecastPath = "http://api.openweathermap.org/data/2.5/forecast?q=Kolkata,IN&units=metric&APPID=0dfa7081b88c8bb4ce043507ed280eb2&cnt=3";

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
        console.log(conditionObj);
        document.getElementById('location').innerHTML = conditionObj.name + ", " + conditionObj.sys.country;
        document.getElementById('weather').innerHTML = conditionObj.weather["0"].main;
        var imagePath = baseImgPath + conditionObj.weather["0"].icon + ".png";
        document.getElementById('weatherIcon').src = imagePath;
        document.getElementById('temperature').innerHTML = conditionObj.main.temp + "&deg;C";
        var weatherDescStr = conditionObj.weather["0"].description;
        document.getElementById('desc').innerHTML = weatherDescStr.substr(0, 1).toUpperCase() + weatherDescStr.substr(1);
        document.getElementById('humidity').innerHTML = "Humidity: " + conditionObj.main.humidity + "%";
    }
};

var baseImgPath = 'http://openweathermap.org/img/w/';
weatherForecast.onload = function () {
    /*var baseImgPath = 'http://openweathermap.org/img/w/';*/
    if (weatherForecast.status === 200) {
        forecastObj = JSON.parse(weatherForecast.responseText);
        console.log(forecastObj);

        // Day1
        document.getElementById('dayDate1').innerHTML = aryDates[1];
        document.getElementById('maxTemp1').innerHTML = forecastObj.list["0"].main.temp_max + "&deg;C";
        document.getElementById('minTemp1').innerHTML = forecastObj.list["0"].main.temp_min + "&deg;C";
        var dailyWeatherDescStr1 = forecastObj.list["0"].weather["0"].description;
        document.getElementById('dailyForecast1').innerHTML = dailyWeatherDescStr1.substr(0, 1).toUpperCase() + dailyWeatherDescStr1.substr(1);
        var imagePath = baseImgPath + forecastObj.list["0"].weather["0"].icon + ".png";
        document.getElementById('weatherIcon1').src = imagePath;

        // Day2
        document.getElementById('dayDate2').innerHTML = aryDates[2];
        document.getElementById('maxTemp2').innerHTML = forecastObj.list[1].main.temp_max + "&deg;C";
        document.getElementById('minTemp2').innerHTML = forecastObj.list[1].main.temp_min + "&deg;C";
        var dailyWeatherDescStr2 = forecastObj.list[1].weather["0"].description
        document.getElementById('dailyForecast2').innerHTML = dailyWeatherDescStr2.substr(0, 1).toUpperCase() + dailyWeatherDescStr2.substr(1);
        var imagePath = baseImgPath + forecastObj.list[1].weather["0"].icon + ".png";
        document.getElementById('weatherIcon2').src = imagePath;

        // Day3
        document.getElementById('dayDate3').innerHTML = aryDates[3];
        document.getElementById('maxTemp3').innerHTML = forecastObj.list[2].main.temp_max + "&deg;C";
        document.getElementById('minTemp3').innerHTML = forecastObj.list[2].main.temp_min + "&deg;C";
        var dailyWeatherDescStr3 = forecastObj.list[2].weather["0"].description;
        document.getElementById('dailyForecast3').innerHTML = dailyWeatherDescStr3.substr(0, 1).toUpperCase() + dailyWeatherDescStr3.substr(1);
        var imagePath = baseImgPath + forecastObj.list[2].weather["0"].icon + ".png";
        document.getElementById('weatherIcon3').src = imagePath;
    }
};

function GetDates(startDate, daysToAdd) {
    var aryDates = [];

    for (var i = 0; i <= daysToAdd; i++) {
        var currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) /*+ " " + currentDate.getFullYear()*/);
    }

    return aryDates;
}

function MonthAsString(monthIndex) {
    var d = new Date();
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    return month[monthIndex];
}

function DayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "Sun";
    weekdays[1] = "Mon";
    weekdays[2] = "Tue";
    weekdays[3] = "Wed";
    weekdays[4] = "Thu";
    weekdays[5] = "Fri";
    weekdays[6] = "Sat";

    return weekdays[dayIndex];
}

var startDate = new Date();
var aryDates = GetDates(startDate, 7);
//console.log(aryDates);
