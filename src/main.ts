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
 * Apply listerners to new task 
 */

function taskListerners() {
    document.querySelectorAll('.trash-btn').forEach(trashButton => {
        trashButton.addEventListener('click', deleteTask);
    });
    
    document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', checkboxStatusShift);
    });
}

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
              <input type="checkbox" id="task-${todoDatabase[i].id}" class="hidden-checkbox absolute opacity-1">
              <label title="Deadline at ${todoDatabase[i].deadline}" for="task-${todoDatabase[i].id}" class="flex-grow bg-slate-200/20 p-1 flex items-center">
                <span id="checkbox-${todoDatabase[i].id}" class="custom-checkbox"></span>
                ${todoDatabase[i].inputContent}
              </label>
              <button id="remove-${todoDatabase[i].id}" class="trash-btn p-1 bg-slate-200/20 z-10">
                <span class="material-symbols-outlined pt-2">
                  delete
                </span>
              </button>
            </div>
        `
        
    }

    taskListerners();

} 
   
    // let checkbox = Array.from(document.querySelectorAll('.hidden-checkbox'));
    // const findCheckbox: any = checkbox.find((box) => box.id === thisWasClicked.id);

/** 
 * Change status on single task checkbox
*/

function checkboxStatusShift(event: any): void {
    const clickedBox = event.currentTarget;
    console.log(clickedBox.id);
    console.log(event.currentTarget);
    console.log('hej');
    deleteTask(null, event.currentTarget.id);


    // const thisWasChecked = event.currentTarget;
    // console.log(thisWasChecked.id);
    // console.log(todoDatabase[0].completed);
    // const hiddenCheckbox: any= document.querySelectorAll('.hidden-checkbox');
    // console.log(hiddenCheckbox[0].checked);
    
    
}

/** 
 *  Delete task, remove from taskDatabase, trashBtn
 */
        
function deleteTask(event: any, id: HTMLElement): void {
    let thisWasClicked = event.currentTarget;
    if(id !== null) {
        thisWasClicked = id;
    }

    let trashBtn = Array.from(document.querySelectorAll('.trash-btn'));
                    
    const findTrashBtn: any = trashBtn.find((btn) => btn.id === thisWasClicked?.id);
    const indexOfTask = trashBtn.indexOf(findTrashBtn);
                                
    if (findTrashBtn?.id == thisWasClicked?.id) {
        todoDatabase.splice(indexOfTask, 1);
        printTodoList();

    }
                    
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



  
     

