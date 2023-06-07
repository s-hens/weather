import { getLocale } from "./user-inputs";
import { callAPI } from "./API-call";
import { switchUnit } from "./DOM-changes";

document.getElementById("weather").addEventListener("submit", getLocale);

callAPI("Honolulu");

document.querySelector(".units").addEventListener("click", switchUnit);