import { getLocale } from "./user-inputs";
import { callAPI } from "./API-call";

document.getElementById("weather").addEventListener("submit", getLocale);

callAPI("auto:ip");