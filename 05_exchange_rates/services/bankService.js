import { getPrivatRates, getMonoRates } from "../extensions/fetchData.js";
import { myCache } from "../app.js";
import { USD, EUR } from "../extensions/currenciesCodes.js";
import { getDate } from "../extensions/getDate.js";

export const getUSDRate = async () => {
    let privatRates = await getPrivatRates();
    let privatUSDRate = privatRates.find(el => el.ccy === USD.privat);

    let monoRates;
    if(myCache.has('monoData')) {
        monoRates = myCache.get('monoData');
    } else {
        monoRates = await getMonoRates();
    }
    let monoUSDRate = monoRates.find(el => el.currencyCodeA === USD.mono);

    let resultMessage = `USD exchange rate on ${getDate()}:\n\n`;

    resultMessage += `Privatbank\n\nbuy: ${Number(privatUSDRate.buy).toFixed(2)} ₴\nsale: ${Number(privatUSDRate.sale).toFixed(2)} ₴\n\n`;
    resultMessage += `Monobank\n\nbuy: ${Number(monoUSDRate.rateBuy).toFixed(2)} ₴\nsale: ${Number(monoUSDRate.rateSell).toFixed(2)} ₴`
    return resultMessage;
}

export const getEURRate = async () => {
    let privatRates = await getPrivatRates();
    let privatEURRate = privatRates.find(el => el.ccy === EUR.privat);

    let monoRates;
    if(myCache.has('monoData')) {
        monoRates = myCache.get('monoData');
    } else {
        monoRates = await getMonoRates();
    }
    let monoEURRate = monoRates.find(el => el.currencyCodeA === EUR.mono);

    let resultMessage = `EUR exchange rate on ${getDate()}:\n\n`;

    resultMessage += `Privatbank\n\nbuy: ${Number(privatEURRate.buy).toFixed(2)} ₴\nsele: ${Number(privatEURRate.sale).toFixed(2)} ₴\n\n`;
    resultMessage += `Monobank\n\nbuy: ${Number(monoEURRate.rateBuy).toFixed(2)} ₴\nsale: ${Number(monoEURRate.rateSell).toFixed(2)} ₴`
    
    return resultMessage;
}