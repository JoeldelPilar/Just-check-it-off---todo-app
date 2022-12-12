import './style/style.css';
import { v4 as uuidV4 } from "uuid"

/*************************************************************************************************************
 * -------------------------------> "Database array, saved to local storage"<---------------------------------
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
// const displayWeek: any = document.getElementById('current-week'); // any, not crusial for page function.

const allTasks = document.querySelector<HTMLElement>('#all-tasks'); // container for all individual tasks

const taskForm = document.querySelector<HTMLFormElement>('#task-form');
const taskInput: any = document.querySelector<HTMLInputElement>('#new-task-input'); // main input field.
const dateDropdown = document.querySelector<HTMLInputElement>('#date-dropdown');  // date dropdown for setting deadline.

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

/** 
 * Checkbox changed status
*/





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

function printTodoList() {
    if(allTasks)
    allTasks.innerHTML = '';
    for (var i = 0; i <todoDatabase.length; i++) {
        if (allTasks)
        allTasks.innerHTML += 
        `
            <div class="task p-1 text-slate-800 flex">
              <input type="checkbox" id="task-${todoDatabase[i].id}" class="add-click-listener hidden-checkbox absolute opacity-1">
              <label title="Deadline at ${todoDatabase[i].deadline}" for="task-${todoDatabase[i].id}" class="flex-grow bg-slate-200/20 p-1 flex items-center">
                <span class="custom-checkbox"></span>
                ${todoDatabase[i].inputContent}
              </label>
              <button id="remove-${todoDatabase[i].id}" class="add-click-listener trash-btn p-1 bg-slate-200/20 z-10">
                <span class="material-symbols-outlined pt-2">
                  delete
                </span>
              </button>
            </div>
        `
        
    }
    // let checkbox = Array.from(document.querySelectorAll('.hidden-checkbox')); // original checkbox hidden behind custom checkbox.
    // checkbox.forEach((item) => {
    //     item.addEventListener('click', checkboxStatusShift);
    // });
    
    // let trashBtn = Array.from(document.querySelectorAll('.trash-btn')); // trash or delete task button - one on each task.
    // trashBtn.forEach((item) => {
    // item.addEventListener('click', deleteTask);
    // });

    document.querySelectorAll('.add-click-listener').forEach(item => {
        item.addEventListener('click',  (event: any) => {
            const thisWasClicked = event.currentTarget;
            let trashBtn = Array.from(document.querySelectorAll('.trash-btn'));
            // let checkbox = Array.from(document.querySelectorAll('.hidden-checkbox'));
            const filterTrashBtn: any = trashBtn.find((btn) => btn.id === thisWasClicked.id);
            const findTask = trashBtn.indexOf(filterTrashBtn);

            // console.log(filterTrashBtn?.id);
            console.log(trashBtn);
            console.log(findTask);
            
            



            if (filterTrashBtn?.id == thisWasClicked.id) {
                todoDatabase.splice(findTask, 1);
                printTodoList();

                // deleteTask();
            }
            
            
            
        })
    })


} 

/** 
 * Change status on single task checkbox
*/

// function checkboxStatusShift(event: any) {
//     const index = event.currentTarget;
//     console.log(index);
    
// }

/** 
 *  Delete task, remove from taskDatabase, trashBtn
 */

// function deleteTask() {
        
    // const index = (event.currentTarget);
    // const buttonId = index.id?.replace('remove-', '');
    // const currentTask = todoDatabase.filter((object) => object.id === buttonId)[0];
    // const currentTaskId = currentTask.id;
  
    // console.log(buttonId);
    // console.log(currentTaskId);
    

    // if (buttonId == currentTaskId) {
    //     todoDatabase.splice(0, 1);
    //     printTodoList();
    // }

// }   

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

