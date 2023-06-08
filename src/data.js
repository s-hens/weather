import { printData } from "./DOM-changes";

// This variable holds onto the most recent API call
// in case someone wants to switch from C to F
let lastData;

// Get user's input
function getLocale() {
    event.preventDefault();
    const locale = document.getElementById("locale").value;
    callAPI(locale);
}

// API call
async function callAPI(locale) {
    const APIresponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=8149f881dcf243d0b39105948233005&q=${locale}&aqi=no`, {mode: "cors"});
    const data = await APIresponse.json();
    lastData = data;
    printData(data);
}

export { getLocale, callAPI, lastData };