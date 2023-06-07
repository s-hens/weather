import { callAPI } from "./API-call";

function getLocale() {
    event.preventDefault();
    const locale = document.getElementById("locale").value;
    callAPI(locale);
}

export { getLocale };