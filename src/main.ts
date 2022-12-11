import './style/style.css';
import { v4 as uuidV4 } from "uuid"

/************************************************************************************************************
 * -------------------------------> "Database array, save to local storage"<---------------------------------
 ************************************************************************************************************/

type Task = {
    id: any;
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
const taskInput: any = document.querySelector<HTMLInputElement>('#new-task-input'); // main input field.
const dateDropdown = document.querySelector<HTMLInputElement>('#date-dropdown');  // date dropdown for setting deadline.

const trashBtn = document.querySelector<HTMLButtonElement>('.trash-btn'); // trash or delete task button - one on each task.

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

    if (taskInput?.value == '' || taskInput == null) return
    
        const newTask = {
            id: uuidV4(),
            inputContent: taskInput?.value,
            createdAt: date,
            deadline: dateDropdown?.value,
            completed: false,
        }
         addToTodoDatabase(newTask);
         taskInput.value = '';              // clear input field when current task is added.
});





/************************************************************************************************************
 * -------------------------------------> Functions <--------------------------------------------------------
 ************************************************************************************************************/

/**
 * Add input field value and date drop down value to "todoDatabase"
 */

function addToTodoDatabase(Tasks: Task) {
    if (taskInput.value == 0) {
        alert('Don\'t forget to specify your task'); // alert the user that he or she needs to type in a task and not a empty string.
        return;
    }
    
    const found = todoDatabase.find((object) => object.inputContent === taskInput.value);
    if (found?.inputContent === taskInput.value) {
        alert('Task is already on your list, work smarter not harder!'); // prevent user from adding the same task twice.
    } else {
        todoDatabase.push(Tasks);
        printTodoList();
    }
  
}

 /**
  * Print database of task to DOM
  */

 function printTodoList () {
    if(allTasks)
    allTasks.innerHTML = '';
    for (var i = 0; i <todoDatabase.length; i++) {
        // const inUse = todoDatabase.find(item => item.inputContent[i])
        // if (todoDatabase[i].inputContent != taskInput?.innerHTML) {
        //     continue;
        // }
        if (allTasks)
        allTasks.innerHTML += 
        `
            <div class="task p-1 text-slate-800 flex">
              <input type="checkbox" id="task-${todoDatabase[i].id}" class="absolute opacity-0">
              <label title="Deadline at ${todoDatabase[i].deadline}" for="task-${todoDatabase[i].id}" class="flex-grow bg-slate-200/20 p-1 flex items-center">
                <span class="custom-checkbox"></span>
                ${todoDatabase[i].inputContent}
              </label>
              <button id="remove-${todoDatabase[i].id}" class="trash-btn p-1 bg-slate-200/20">
                <span class="material-symbols-outlined pt-2">
                  delete
                </span>
              </button>
            </div>
        `
    }
        
 }

/** 
 *  Delete task, remove from taskDatabase, trashBtn
 */



function deleteTask(event: any) {
    const trashBtnClicked = event.target;
    console.log(trashBtnClicked);

    }

/**
 *  Fetch Time API from http://worldtimeapi.org/
 */

// async function getCurrentTime() {
//     return fetch('http://worldtimeapi.org/api/ip/')
//     .then ((data) => data.json())
//     .then ((json) => json)
//     .catch((error) => {
//     console.error('Error fetching timezone', error);
//     return null;
//     });
// }

/**
 * Use week_number prop. from API to get current week number.
 */

// const currentTime = await getCurrentTime();
// displayWeek.innerHTML = '| week: ' + currentTime.week_number

