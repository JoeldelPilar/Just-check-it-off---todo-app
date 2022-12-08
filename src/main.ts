import './style/style.css';

/************************************************************************************************************
 * -------------------------------------> Variables and Selectors <------------------------------------------
 ************************************************************************************************************/

const date = new Date();
let year: number = date.getFullYear();
let month: number = date.getMonth() + 1;
let day: number = date.getDate();

const displayDay: any = document.getElementById("date-stamp");  // any, not crusial for page function.
const displayWeek: any = document.getElementById('current-week'); // any, not crusial for page function.

/**
 * Print todays date to date-stamp container. 
 */
displayDay.innerHTML = year + '-' + month + '-' + String(day).padStart(2, '0');


/************************************************************************************************************
 * -------------------------------------> Listerners <-------------------------------------------------------
 ************************************************************************************************************/

/************************************************************************************************************
 * -------------------------------------> Functions <--------------------------------------------------------
 ************************************************************************************************************/

/**
 *  Fetch Time API from http://worldtimeapi.org/
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

/**
 * Use week_number prop. from API to get current week number.
 */

const currentTime = await getCurrentTime();
displayWeek.innerHTML = '| week: ' + currentTime.week_number

console.log(currentTime);
