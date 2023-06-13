import { lastData } from "./data";
import { printData, checkAnimations } from "./DOM-changes";

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
    if (animations == true) {
        animations = false;
        document.querySelector(".animation").textContent = "Turn On Animations";
        checkAnimations();
    } else if (animations == false) {
        animations = true;
        document.querySelector(".animation").textContent = "Turn Off Animations";
        checkAnimations();
    }
}

export { currentUnit, toggleUnit, animations, toggleAnimations };