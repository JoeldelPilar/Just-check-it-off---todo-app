import './style/style.css';
import { v4 as uuidV4 } from "uuid"

/************************************************************************************************************
 * -------------------------------> "Database array, save to local storage"<---------------------------------
 ************************************************************************************************************/

type Task = {
    id: string,
    inputContent: string;
    createdAt: Date;
    deadline: string | undefined;
    completed: boolean;
}

const todoDatabase: Task[] = [];

/************************************************************************************************************
 * -------------------------------------> Variables and Selectors <------------------------------------------
 ************************************************************************************************************/

const date = new Date();
let year: number = date.getFullYear();
let month: number = date.getMonth() + 1; // +1 otherwise January becomes 0
let day: number = date.getDate();

const displayDay: any = document.getElementById('date-stamp');  // any, not crusial for page function.
const displayWeek: any = document.getElementById('current-week'); // any, not crusial for page function.

const allTasks = document.querySelector<HTMLElement>('#all-tasks'); // container for all individual tasks

const taskForm = document.querySelector<HTMLFormElement>('#task-form');
const taskInput = document.querySelector<HTMLInputElement>('#new-task-input'); // main input field.
const dateDropdown = document.querySelector<HTMLInputElement>('#date-dropdown');  // date dropdown for setting deadline.

// const addButton = document.querySelector('#add') // add button 

/**
 * Print todays date to date-stamp container. 
 */

displayDay.innerHTML = year + '-' + month + '-' + String(day).padStart(2, '0'); // convert "day" to string to be able to pring 0X-number ie 01-09


/************************************************************************************************************
 * -------------------------------------> Listerners <-------------------------------------------------------
 ************************************************************************************************************/

/** 
 * Read what user types
*/

taskForm?.addEventListener('submit', event => {
    event.preventDefault();

    if (taskInput?.value == '' || taskInput == null ) return
    
        const newTask = {
            id: uuidV4(),
            inputContent: taskInput?.value,
            createdAt: date,
            deadline: dateDropdown?.value,
            completed: false,
        }
         addToTodoDatabase(newTask);
         taskInput.value = '';
});



/************************************************************************************************************
 * -------------------------------------> Functions <--------------------------------------------------------
 ************************************************************************************************************/

/**
 * Add input field value and date drop down value to "todoDatabase"
 */

function addToTodoDatabase(Task: Task) {
    todoDatabase.push(Task);
    console.log(todoDatabase);
    printTodoList();
 }

 function printTodoList () {
    if(allTasks)
    allTasks.innerHTML = '';
    for (var i = 0; i <todoDatabase.length; i++) {
        if (todoDatabase[i].id == '') {
            continue;
        }
        if (allTasks)
        allTasks.innerHTML += 
        `
        <div class="task p-1 text-slate-800 flex">
              <input type="checkbox" id="task-${todoDatabase[i].id}" class="absolute opacity-0">
              <label for="task-${todoDatabase[i].id}" class="flex-grow bg-slate-200/20 p-1 flex items-center">
                <span class="custom-checkbox"></span>
                ${todoDatabase[i].inputContent}
              </label>
              <button class="p-1 bg-slate-200/20">
                <span class="material-symbols-outlined pt-2">
                  delete
                </span>
              </button>
            </div>
        `
    }
 }

/**
 *  Fetch Time API from http://worldtimeapi.org/
 */

async function getCurrentTime() {
    return fetch('http://worldtimeapi.org/api/ip/')
    .then ((data) => data.json())
    .then ((json) => json)
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
