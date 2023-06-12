import { getLocale, callAPI } from "./data";
import { toggleUnit, toggleAnimations } from "./user-settings";

callAPI("Honolulu");

document.getElementById("weather").addEventListener("submit", getLocale);

document.querySelector(".units").addEventListener("click", toggleUnit);

document.querySelector(".animation").addEventListener("click", toggleAnimations);