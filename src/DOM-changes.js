import { parse, format } from "date-fns";
import { lastData } from "./data";

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
    let now = parse(data.current.last_updated, "yyyy-LL-dd H:mm", new Date());
    let time = format(now, "h:m aa");
    let date = format(now, "iiii, LLLL do");
    let temp;
    if (currentUnit == "F") {
        temp = `${data.current.temp_f}° F`;
    } else if (currentUnit == "C") {
        temp = `${data.current.temp_c}° C`;
    }
    // Display information
    document.querySelector(".place").textContent = `${data.location.name}`;
    document.querySelector(".place-detail").textContent = `${placeDetail}`;
    document.querySelector(".time").textContent = `As of ${time}`;
    document.querySelector(".date").textContent = `${date}`;
    document.querySelector(".condition").textContent = `${data.current.condition.text}`;
    document.querySelector(".temp").textContent = `${temp}`;
    document.querySelector(".humidity").textContent = `${data.current.humidity}%`;
}

// Display sky
function displaySky(data) {
    if (data.current.is_day == 1) {
        document.querySelector(".sky").classList.add("clear");
    } else if (data.current.is_day == 0) {
        document.querySelector(".sky").classList.add("night");
        makeStars();
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeStars() {
    document.querySelector(".stars").replaceChildren();
    for (let i = 0; i < 300; i++) {
        let size = randomIntFromInterval(2, 4);
        let opacity = randomIntFromInterval(25, 75);
        let top = randomIntFromInterval(1, 100);
        let left = randomIntFromInterval(1, 100);
        let offsetX = randomIntFromInterval(-3, 3);
        let offsetY = randomIntFromInterval(-3, 3);
        let star = document.createElement("div");
        star.classList.add("star");
        star.style.height = `${size}px`;
        star.style.width = `${size}px`;
        star.style.opacity = `${opacity}%`;
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.transform = `translate(${offsetX}px, ${offsetY}px`;
        document.querySelector(".stars").appendChild(star);
    }
}

// Toggle units
let currentUnit = "C";

function toggleUnit() {
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

// Toggle animations
let animations = true;

function toggleAnimations() {
    document.querySelectorAll("button").forEach(button => {
        button.classList.toggle("no-animation");
    })
    if (animations == true) {
        animations = false;
        document.querySelector(".animation").textContent = "Turn On Animations";
    } else if (animations == false) {
        animations = true;
        document.querySelector(".animation").textContent = "Turn Off Animations";
    }
}

export { printData, displaySky, toggleUnit, toggleAnimations };