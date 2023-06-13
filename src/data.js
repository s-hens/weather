import { printData, displaySky } from "./DOM-changes";

// This variable holds onto the most recent API results
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
    try {
        const APIresponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=8149f881dcf243d0b39105948233005&q=${locale}&aqi=no`, {mode: "cors"});
        const data = await APIresponse.json();
        lastData = data;
        console.log(data);
        printData(data);
        displaySky(data);
    } catch {
        const errorAPIresponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=8149f881dcf243d0b39105948233005&q=${locale}&aqi=no`, {mode: "cors"});
        const errorData = await errorAPIresponse.json();
        //console.log(errorData);
        if (errorData.error.code == 1003) {
            alert(`Error: Please enter a location to search.`);
        } else if (errorData.error.code == 1006) {
            alert(`Error: No matches found for ${locale}. Please try a different search term.`);
        } else {
            alert(`Error: ${errorData.error.message}`);
        }
    }
}

export { getLocale, callAPI, lastData };