import axios from 'axios';
import { hoursOptions, dayOptions } from './options.js';

export const convertTempToString = (temp) => {
    if(temp < 0) { return `${temp}` } else { return `+${temp}` }
}

export const getForecast = async (interval) => {
    const APIurl = `https://api.openweathermap.org/data/2.5/forecast?q=Vinnytsia&units=metric&appid=${process.env.API_KEY}`;


    let response = await axios.get(APIurl);
    let weatherData = response.data.list;

    let resultMessage = "Weather in Vinnytsia:\n"

    weatherData.forEach((el, index) => {
        if(interval === 6) {
            if( index % 2 != 0) return;
        }
        
        let data = new Date(el.dt * 1000);

        let dayMonthString = data.toLocaleString("en-US", dayOptions)
        let hoursString = data.toLocaleString("ru", hoursOptions);

        let temperature = convertTempToString(Math.round(el.main.temp));
        let feelsLike = convertTempToString(Math.round(el.main.feels_like));   
        let weatherDesc = el.weather[0].description;     

        if(resultMessage.indexOf(dayMonthString) === -1) {
            resultMessage += `\n${dayMonthString}\n`
        } 

        resultMessage += `${hoursString}, ${temperature} °С, feels like: ${feelsLike} °С, ${weatherDesc}\n`
    })

    return resultMessage;
}