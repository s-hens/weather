import { printData } from "./DOM-changes";

let lastData;

async function callAPI(locale) {
    const APIresponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=8149f881dcf243d0b39105948233005&q=${locale}&aqi=no`, {mode: "cors"});
    const data = await APIresponse.json();
    lastData = data;
    printData(data);
}

export { callAPI, lastData };