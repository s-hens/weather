import { format } from "date-fns";
import { lastData } from "./API-call";

// Display results on the page
function printData(data) {
    // Determine some details
    let placeDetail;
    switch(true) {
        case !data.location.region:
            placeDetail = data.location.country;
            break;
        case !data.location.country:
            placeDetail = data.location.region;
            break;
        case data.location.country == "United States of America":
            placeDetail = `${data.location.region}, USA`;
            break;
        case data.location.country == "United Kingdom":
            placeDetail = `${data.location.region}, UK`;
            break;
        default:
            placeDetail = `${data.location.region}, ${data.location.country}`;
    }
    let time = format(new Date(data.location.localtime_epoch * 1000), "h:m aa");
    let date = format(new Date(data.location.localtime_epoch * 1000), "iiii, LLLL do");
    let temp;
    if (currentUnit == "F") {
        temp = `${data.current.temp_f}° F`;
    } else if (currentUnit == "C") {
        temp = `${data.current.temp_c}° C`;
    }
    // Fill in DOM
    document.querySelector(".place").textContent = `${data.location.name}`;
    document.querySelector(".place-detail").textContent = `${placeDetail}`;
    document.querySelector(".time").textContent = `As of ${time}`;
    document.querySelector(".date").textContent = `${date}`;
    document.querySelector(".condition").textContent = `${data.current.condition.text}`;
    document.querySelector(".temp").textContent = `${temp}`;
    document.querySelector(".humidity").textContent = `${data.current.humidity}%`;
}

// Switch units
let currentUnit = "F";

function switchUnit() {
    if (currentUnit == "F") {
        currentUnit = "C";
        document.querySelector(".units").textContent = "Switch to Fahrenheit";
        printData(lastData);
    } else if (currentUnit == "C") {
        currentUnit = "F";
        document.querySelector(".units").textContent = "Switch to Celsius";
        printData(lastData);
    }
}

export { printData, switchUnit };