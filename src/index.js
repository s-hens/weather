import { getLocale, callAPI } from "./data";
import { toggleUnit, toggleAnimations, detectMotionPrefs } from "./user-settings";

// Initial setup
callAPI("Honolulu");
detectMotionPrefs();

// Event listeners
document.getElementById("weather").addEventListener("submit", getLocale);
document.querySelector(".units").addEventListener("click", toggleUnit);
document.querySelector(".animation").addEventListener("click", toggleAnimations);