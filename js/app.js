function display() {
    var zip = document.getElementById('zip').value;
    var code = document.getElementById('countryCode').value;
    var weatherConditions = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + code + "&units=metric&APPID=0dfa7081b88c8bb4ce043507ed280eb2&cnt=3&callback";
    var weatherForecast = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "," + code + "&units=metric&APPID=0dfa7081b88c8bb4ce043507ed280eb2&cnt=3&callback";
    var baseImgPath = "http://openweathermap.org/img/w/";

    $.getJSON(weatherConditions, function(condition) {
        console.log(condition);
        if (condition.cod === 200) {
            document.getElementById('location').innerHTML = condition.name + ", " + condition.sys.country;
            document.getElementById('weather').innerHTML = condition.weather["0"].main;
            document.getElementById('temperature').innerHTML = condition.main.temp + "&deg;C";
            var imagePath = baseImgPath + condition.weather["0"].icon + ".png";
            document.getElementById('weatherIcon').src = imagePath;
            var weatherDescStr = condition.weather["0"].description;
            document.getElementById('desc').innerHTML = weatherDescStr.substr(0, 1).toUpperCase() + weatherDescStr.substr(1);
            document.getElementById('humidity').innerHTML = "Humidity: " + condition.main.humidity + "%";
            var wind = parseFloat(condition.wind.speed * (18 / 5));
            document.getElementById('wind').innerHTML = "Wind Speed: " + wind.toFixed(2) + " kmph";
            document.getElementById('clouds').innerHTML = "Cloud Cover: " + condition.clouds.all + "%";
            document.getElementById('coData').innerHTML = "Message: " + condition.sys.message;
        }
    });
    $.getJSON(weatherForecast, function(forecast) {
        //console.log(forecast);
        if (forecast.cod === "200") {
            // Day1
            document.getElementById('dayDate1').innerHTML = aryDates[1];
            document.getElementById('maxTemp1').innerHTML = forecast.list["0"].main.temp_max + "&deg;C";
            document.getElementById('minTemp1').innerHTML = forecast.list["0"].main.temp_min + "&deg;C";
            document.getElementById('dailyForecast1').innerHTML = forecast.list["0"].weather["0"].description;
            var imagePath = baseImgPath + forecast.list["0"].weather["0"].icon + ".png";
            document.getElementById('weatherIcon1').src = imagePath;
            var windDay1 = parseFloat(forecast.list["0"].wind.speed * (18 / 5));
            document.getElementById('windDay1').innerHTML = "Wind Speed: " + windDay1.toFixed(2) + "kmph";
            document.getElementById('cloudsDay1').innerHTML = "Cloud Cover: " + forecast.list["0"].clouds.all + "%";
            document.getElementById('humidityDay1').innerHTML = "Humidity: " + forecast.list["0"].main.humidity + "%";
            var precipitationDay1 = forecast.list["0"].rain["3h"];
            if (precipitationDay1 === undefined) {
                precipitationDay1 = 0;
            }
            document.getElementById('rainDay1').innerHTML = "Precipitation: " + precipitationDay1.toFixed(2) + "mm";

            // Day2
            document.getElementById('dayDate2').innerHTML = aryDates[2];
            document.getElementById('maxTemp2').innerHTML = forecast.list[1].main.temp_max + "&deg;C";
            document.getElementById('minTemp2').innerHTML = forecast.list[1].main.temp_min + "&deg;C";
            document.getElementById('dailyForecast2').innerHTML = forecast.list[1].weather["0"].description;
            var imagePath = baseImgPath + forecast.list[1].weather["0"].icon + ".png";
            document.getElementById('weatherIcon2').src = imagePath;
            var windDay2 = parseFloat(forecast.list[1].wind.speed * (18 / 5));
            document.getElementById('windDay2').innerHTML = "Wind Speed: " + windDay2.toFixed(2) + "kmph";
            document.getElementById('cloudsDay2').innerHTML = "Cloud Cover: " + forecast.list[1].clouds.all + "%";
            document.getElementById('humidityDay2').innerHTML = "Humidity: " + forecast.list[1].main.humidity + "%";
            var precipitationDay2 = forecast.list[1].rain["3h"];
            if (precipitationDay2 === undefined) {
                precipitationDay2 = 0;
            }
            document.getElementById('rainDay2').innerHTML = "Precipitation: " + precipitationDay2.toFixed(2) + "mm";

            // Day3
            document.getElementById('dayDate3').innerHTML = aryDates[3];
            document.getElementById('maxTemp3').innerHTML = forecast.list[2].main.temp_max + "&deg;C";
            document.getElementById('minTemp3').innerHTML = forecast.list[2].main.temp_min + "&deg;C";
            document.getElementById('dailyForecast3').innerHTML = forecast.list[2].weather["0"].description;;
            var imagePath = baseImgPath + forecast.list[2].weather["0"].icon + ".png";
            document.getElementById('weatherIcon3').src = imagePath;
            var windDay3 = parseFloat(forecast.list[2].wind.speed * (18 / 5));
            document.getElementById('windDay3').innerHTML = "Wind Speed: " + windDay1.toFixed(2) + "kmph";
            document.getElementById('cloudsDay3').innerHTML = "Cloud Cover: " + forecast.list[2].clouds.all + "%";
            document.getElementById('humidityDay3').innerHTML = "Humidity: " + forecast.list[2].main.humidity + "%";
            var precipitationDay3 = forecast.list[2].rain["3h"];
            if (precipitationDay3 === undefined) {
                precipitationDay3 = 0;
            }
            document.getElementById('rainDay3').innerHTML = "Precipitation: " + precipitationDay3.toFixed(2) + "mm";
        }
    });
}

function GetDates(startDate, daysToAdd) {
    var aryDates = [];

    for (var i = 0; i <= daysToAdd; i++) {
        var currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) /*+ " " + currentDate.getFullYear()*/ );
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