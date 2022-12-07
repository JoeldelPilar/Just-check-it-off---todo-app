import './style/style.css';

/**
 *  Variables and Selectors
 */

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

const dayDisplay = document.getElementById("date-stamp");

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