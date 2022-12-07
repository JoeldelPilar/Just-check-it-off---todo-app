import './style/style.css';





/**
 *  Variables and Selectors
 */

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

const dayDisplay = document.getElementById("date-stamp");
const displayWeek = document.getElementById('current-week');

/**
 * Print todays date to date-stamp container. 
 */
dayDisplay.innerHTML = String(year) + '-' + String(month) + '-' + String(day).padStart(2, '0');


/**
 *  Listerners 
 */

/**
 *  Functions
 */

async function getCurrentTime() {
    return fetch('http://worldtimeapi.org/api/ip/')
    .then((data) => data.json())
    .then((json) => json)
    .catch((error) => {
    console.error('Error fetching timezone', error);
    return null;
});
}
const currentTime = await getCurrentTime();
displayWeek.innerHTML = '| week: ' + currentTime.week_number

console.log(currentTime);
