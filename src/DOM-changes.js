import { parse, format } from "date-fns";
import { currentUnit, animations } from "./user-settings";

// Weather result codes
const clearCode = 1000;
const partlyCloudyCode = 1003;
const cloudyCodes = [ 1006, 1009, 1030, 1135, 1147 ];
const rainCodes = [ 1063, 1072, 1087, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276 ];
const snowCodes = [ 1066, 1069, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282 ];

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
        case data.location.country == "United States of America" || data.location.country == "USA United States of America":
            placeDetail = `${data.location.region}, USA`;
            break;
        case data.location.country == "United Kingdom":
            placeDetail = `${data.location.region}, UK`;
            break;
        default:
            placeDetail = `${data.location.region}, ${data.location.country}`;
    }
    let now = parse(data.current.last_updated, "yyyy-LL-dd H:mm", new Date());
    let time = format(now, "h:mm aa");
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
    let condition = data.current.condition.code;
    if (data.current.is_day == 1) {
        if (condition == clearCode) {
                    ///////////////
                    // Clear day //
                    ///////////////
            // Remove old
            document.querySelector(".sky").classList.remove("clear-night", "overcast-day", "overcast-night");
            document.querySelector(".stars").replaceChildren();
            document.querySelector(".rain").replaceChildren();
            document.querySelector(".snow").replaceChildren();
            document.querySelector(".clouds").style.display = "none";
            // Add new
            document.querySelector(".sky").classList.add("clear-day");
        } else if (condition == partlyCloudyCode) {
                    ///////////////////////
                    // Partly cloudy day //
                    ///////////////////////                    
            // Remove old
            document.querySelector(".sky").classList.remove("clear-night", "overcast-day", "overcast-night");
            document.querySelector(".stars").replaceChildren();
            document.querySelector(".rain").replaceChildren();
            document.querySelector(".snow").replaceChildren();
            // Add new
            document.querySelector(".clouds").style.display = "block";
            document.querySelectorAll(".cloud").forEach(cloud => {
                cloud.classList.remove("dark-cloud");
                cloud.classList.add("light-cloud");
            })
            document.querySelector(".sky").classList.add("clear-day");
        } else if (cloudyCodes.includes(condition)) {
                    ////////////////
                    // Cloudy day //
                    ////////////////
            // Remove old
            document.querySelector(".sky").classList.remove("clear-night", "clear-day", "overcast-night");
            document.querySelector(".stars").replaceChildren();
            document.querySelector(".rain").replaceChildren();
            document.querySelector(".snow").replaceChildren();
            // Add new
            document.querySelector(".clouds").style.display = "block";
            document.querySelectorAll(".cloud").forEach(cloud => {
                cloud.classList.remove("light-cloud");
                cloud.classList.add("dark-cloud");
            })
            document.querySelector(".sky").classList.add("overcast-day");
        } else if (rainCodes.includes(condition)) {
                    ///////////////
                    // Rainy day //
                    ///////////////
            // Remove old
            document.querySelector(".sky").classList.remove("clear-night", "clear-day", "overcast-night");
            document.querySelector(".stars").replaceChildren();
            document.querySelector(".snow").replaceChildren();
            // Add new
            document.querySelector(".clouds").style.display = "block";
            document.querySelectorAll(".cloud").forEach(cloud => {
                cloud.classList.remove("light-cloud");
                cloud.classList.add("dark-cloud");
            })
            document.querySelector(".sky").classList.add("overcast-day");
            makeRain();
        } else if (snowCodes.includes(condition)) {
                    ///////////////
                    // Snowy day //
                    ///////////////
            // Remove old
            document.querySelector(".sky").classList.remove("clear-night", "clear-day", "overcast-night");
            document.querySelector(".stars").replaceChildren();
            document.querySelector(".rain").replaceChildren();

            // Add new
            document.querySelector(".clouds").style.display = "block";
            document.querySelectorAll(".cloud").forEach(cloud => {
                cloud.classList.remove("light-cloud");
                cloud.classList.add("dark-cloud");
            })
            document.querySelector(".sky").classList.add("overcast-day");
            makeSnow();
        }
    } else if (data.current.is_day == 0) {
        if (condition == clearCode) {
                    /////////////////
                    // Clear night //
                    /////////////////
            // Remove old
            document.querySelector(".rain").replaceChildren();
            document.querySelector(".sky").classList.remove("clear-day", "overcast-day", "overcast-night");
            document.querySelector(".clouds").style.display = "none";
            // Add new
            document.querySelector(".sky").classList.add("clear-night");
            makeStars();
        } else if (condition == partlyCloudyCode) {
                    /////////////////////////
                    // Partly cloudy night //
                    /////////////////////////
            // Remove old
            document.querySelector(".rain").replaceChildren();
            document.querySelector(".sky").classList.remove("clear-day", "overcast-day", "overcast-night");
            document.querySelector(".stars").replaceChildren();
            // Add new
            document.querySelector(".clouds").style.display = "block";
            document.querySelectorAll(".cloud").forEach(cloud => {
                cloud.classList.add("dark-cloud");
            })
            document.querySelector(".sky").classList.add("clear-night");
            makeStars();
        } else if (cloudyCodes.includes(condition)) {
                    //////////////////
                    // Cloudy night //
                    //////////////////
            // Remove old
            document.querySelector(".rain").replaceChildren();
            document.querySelector(".sky").classList.remove("clear-night", "clear-day", "overcast-day");
            // Add new
            document.querySelector(".clouds").style.display = "block";
            document.querySelectorAll(".cloud").forEach(cloud => {
                cloud.classList.remove("light-cloud");
                cloud.classList.add("dark-cloud");
            })
            document.querySelector(".sky").classList.add("overcast-night");
            //makeStars();
        } else if (rainCodes.includes(condition)) {
                    /////////////////
                    // Rainy night //
                    /////////////////
            // Remove old
            document.querySelector(".sky").classList.remove("clear-night", "clear-day", "overcast-day");
            // Add new
            document.querySelector(".clouds").style.display = "block";
            document.querySelectorAll(".cloud").forEach(cloud => {
                cloud.classList.remove("light-cloud");
                cloud.classList.add("dark-cloud");
            })
            document.querySelector(".sky").classList.add("overcast-night");
            //makeStars();
            makeRain();
        } else if (snowCodes.includes(condition)) {
                    /////////////////
                    // Snowy night //
                    /////////////////
            // Remove old
            document.querySelector(".sky").classList.remove("clear-night", "clear-day", "overcast-day");
            document.querySelector(".stars").replaceChildren();
            document.querySelector(".rain").replaceChildren();

            // Add new
            document.querySelector(".clouds").style.display = "block";
            document.querySelectorAll(".cloud").forEach(cloud => {
                cloud.classList.remove("light-cloud");
                cloud.classList.add("dark-cloud");
            })
            document.querySelector(".sky").classList.add("overcast-night");
            makeSnow();
        }
    }
    checkAnimations();
}

// Check animations
function checkAnimations() {
    if (animations == true) {
        document.querySelectorAll(".cloud").forEach(cloud => {
            cloud.style.animationPlayState = "running";
        })
        document.querySelectorAll(".star").forEach(star => {
            star.style.animationPlayState = "running";
        })
        document.querySelectorAll(".raindrop").forEach(raindrop => {
            raindrop.style.animationPlayState = "running";
        })
        document.querySelectorAll(".snowflake").forEach(snowflake => {
            snowflake.style.animationPlayState = "running";
        })
    } else if (animations == false) {
        document.querySelectorAll(".cloud").forEach(cloud => {
            cloud.style.animationPlayState = "paused";
        })
        document.querySelectorAll(".star").forEach(star => {
            star.style.animationPlayState = "paused";
        })
        document.querySelectorAll(".raindrop").forEach(raindrop => {
            raindrop.style.animationPlayState = "paused";
        })
        document.querySelectorAll(".snowflake").forEach(snowflake => {
            snowflake.style.animationPlayState = "paused";
        })
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

function makeRain() {
    document.querySelector(".rain").replaceChildren();
    for (let i = 0; i < 800; i++) {
        let opacity = randomIntFromInterval(25, 50);
        let top = randomIntFromInterval(-100, -20);
        let left = randomIntFromInterval(1, 100);
        let offsetX = randomIntFromInterval(-3, 3);
        let offsetY = randomIntFromInterval(-3, 3);
        let delay = randomIntFromInterval(0, 4000);
        let raindrop = document.createElement("div");
        raindrop.classList.add("raindrop");
        raindrop.style.opacity = `${opacity}%`;
        raindrop.style.top = `${top}%`;
        raindrop.style.left = `${left}%`;
        raindrop.style.transform = `translate(${offsetX}px, ${offsetY}px`;
        raindrop.style.animationDelay = `${delay}ms`;
        document.querySelector(".rain").appendChild(raindrop);
    }
}

function makeSnow() {
    document.querySelector(".snow").replaceChildren();
    for (let i = 0; i < 800; i++) {
        let size = randomIntFromInterval(5, 10);
        let top = randomIntFromInterval(-100, -20);
        let left = randomIntFromInterval(1, 100);
        let offsetX = randomIntFromInterval(-3, 3);
        let offsetY = randomIntFromInterval(-3, 3);
        let delay = randomIntFromInterval(0, 15000);
        let snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.height = `${size}px`;
        snowflake.style.width = `${size}px`;
        snowflake.style.top = `${top}%`;
        snowflake.style.left = `${left}%`;
        snowflake.style.transform = `translate(${offsetX}px, ${offsetY}px`;
        snowflake.style.animationDelay = `${delay}ms`;
        document.querySelector(".snow").appendChild(snowflake);
    }
}

export { printData, displaySky, checkAnimations };