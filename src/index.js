document.getElementById("weather").addEventListener("submit", getLocale);

function getLocale() {
    event.preventDefault();
    const locale = document.getElementById("locale").value;
    callAPI(locale);
}

async function callAPI(locale) {
    // Get weather data
    const APIresponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=8149f881dcf243d0b39105948233005&q=${locale}&aqi=no`, {mode: "cors"});
    const data = await APIresponse.json();
    printData(data);
    console.log(data);
}

function printData(data) {
    document.querySelector(".result").textContent = `In ${data.location.name} it is ${data.current.temp_f}°F and ${data.current.condition.text}`;
}