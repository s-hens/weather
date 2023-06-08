import { getLocale, callAPI } from "./data";
import { toggleUnit, toggleAnimations } from "./DOM-changes";

document.getElementById("weather").addEventListener("submit", getLocale);

callAPI("Honolulu");

document.querySelector(".units").addEventListener("click", toggleUnit);
document.querySelector(".animation").addEventListener("click", toggleAnimations);