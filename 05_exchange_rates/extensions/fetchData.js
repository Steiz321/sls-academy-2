import axios from 'axios';
import { myCache } from "../app.js";

const urlMono = 'https://api.monobank.ua/bank/currency';
const urlPrivat = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

export const getPrivatRates = async () => {
    let response = await axios.get(urlPrivat)
    return response.data;
}

export const getMonoRates = async () => {
    let response = await axios.get(urlMono);
    myCache.set('monoData', response.data);
    return response.data;
}