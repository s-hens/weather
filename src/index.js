import { getLocale, callAPI } from "./data";
import { switchUnit } from "./DOM-changes";

document.getElementById("weather").addEventListener("submit", getLocale);

callAPI("Honolulu");

document.querySelector(".units").addEventListener("click", switchUnit);