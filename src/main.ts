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
const LOCAL_STORAGE_TASK_KEY = 'task.todoDatabase';
const todoDatabase: Task[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)!) || [];


/************************************************************************************************************
 * -------------------------------------> Variables and Selectors <------------------------------------------
 ************************************************************************************************************/
enum SortOrder {
    All = 'all',
    AtoZ = 'atoz',
    Date = 'date',
    Undone = 'undone',
}

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

const categoryDropdown: any = document.querySelector<HTMLInputElement>('#category');

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
        const regExNoSpace: RegExp = /^\s*$/;
    if (regExNoSpace.test(taskInput.value)) {
        alert('Don\'t forget to specify your task'); // alert the user that he or she needs to type in a task and not a empty string.
        return;
    }
    
    const newTask = {
        id: uuidV4(),
        inputContent: taskInput.value,
        createdAt: date,
        deadline: dateDropdown.value,
        completed: false,
    }
        addToTodoDatabase(newTask);
        taskInput.value = '';            // clear input field when current task is added.
    //  dateDropdown.value = '';
});



/**
 * Apply listerners to new task 
 */

function taskListerners() {
    document.querySelectorAll('.trash-btn').forEach(trashButton => {
        trashButton.addEventListener('click', deleteTask);
    });
    
    document.querySelectorAll('.hidden-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', checkboxStatusShift);
    });

    
}

/** 
 * Checkbox changed status
*/

/************************************************************************************************************
 * -------------------------------------> Functions <--------------------------------------------------------
 ************************************************************************************************************/

function save() {
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(todoDatabase));
}


/**
 * Add input field value and date drop down value to "todoDatabase"
 */

function addToTodoDatabase(task: Task) {

    const found = todoDatabase.find((object) => object.inputContent === taskInput.value);
    if (found?.inputContent === taskInput.value) {
        alert('Task is already on your list, work smarter not harder!'); // prevent user from adding the same task twice.
    } else {
        todoDatabase.push(task);
        todoDatabase.sort((completedTrue, completedFalse) => Number(completedTrue.completed) - Number(completedFalse.completed));
        save();
        printTodoList();
    }
  
}
        

categoryDropdown.addEventListener('change', printTodoList);

function sortOrder(sortOrder: SortOrder) {
    switch (sortOrder) {
        case SortOrder.All:
            todoDatabase.sort((completedTrue, completedFalse) => Number(completedTrue.completed) - Number(completedFalse.completed));
            break;
        case SortOrder.AtoZ:
            todoDatabase.sort((a, z) => {
                let contentA = a.inputContent.toLowerCase(), contentZ = z.inputContent.toLowerCase();
                if (contentA < contentZ) {
                    return -1
                }
                if (contentA > contentZ) {
                    return 1
                }
                return 0
            });
            todoDatabase.sort((completedTrue, completedFalse) => Number(completedTrue.completed) - Number(completedFalse.completed));
            console.log(todoDatabase);
            break;
        case SortOrder.Date:
            todoDatabase.sort((createdA, createdb) => {
                let da: any = new Date(createdA.createdAt),
                    db: any = new Date(createdb.createdAt);
                return (db - da);         
            });
            todoDatabase.sort((completedTrue, completedFalse) => Number(completedTrue.completed) - Number(completedFalse.completed));
            break;
        case SortOrder.Undone:
            todoDatabase.sort((deadlineA, deadlineB) => {
                let deadA: any = new Date(deadlineA.deadline),
                    deadB: any = new Date(deadlineB.deadline);
                return (deadA - deadB);
            });
            todoDatabase.sort((completedTrue, completedFalse) => Number(completedTrue.completed) - Number(completedFalse.completed));
            break;

    }

}

 /**
  * Print database of task to DOM
  */

function printTodoList() {
    sortOrder(categoryDropdown.value);
   
    if(allTasks)
    allTasks.innerHTML = '';
    for (var i = 0; i <todoDatabase.length; i++) {
        const checked = todoDatabase[i].completed ? 'checked' : '';
       
    
        if (allTasks)
        allTasks.innerHTML += 
        `
            <div class="task p-1 text-slate-800 flex">
              <input type="checkbox" ${checked} id="task-${todoDatabase[i].id}" class="hidden-checkbox absolute opacity-1">
              <label title="Deadline at ${todoDatabase[i].deadline}" for="task-${todoDatabase[i].id}" class="gap-2 flex-grow bg-slate-200/20 p-1 flex items-center font-semibold">
                <span id="checkbox-${todoDatabase[i].id}" class="custom-checkbox"></span>
                <p>${todoDatabase[i].inputContent}</p>
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

/** 
 * Change status on single task checkbox
*/

function checkboxStatusShift(event: any): void {

    const thisWasChecked = event.target;  
    const findClickedTask: any = todoDatabase.find((task) => task.id == thisWasChecked.id.replace('task-', ''));
    findClickedTask.completed = !findClickedTask.completed;
    if(findClickedTask.completed == true) {
        thisWasChecked.checked = true;
    } else {
        thisWasChecked.checked = false;    
    }
    todoDatabase.sort((completedTrue, completedFalse) => Number(completedTrue.completed) - Number(completedFalse.completed));
    thisWasChecked.removeEventListener('click', save);

    save();
    printTodoList();
   
     
}

/** 
 *  Delete task, remove from taskDatabase, trashBtn
 */
        
function deleteTask(event: any): void {
    let thisWasClicked = event.currentTarget;

    let trashBtn = Array.from(document.querySelectorAll('.trash-btn'));
                    
    const findTrashBtn: any = trashBtn.find((btn) => btn.id === thisWasClicked?.id);
    const indexOfTask = trashBtn.indexOf(findTrashBtn);
                                
    if (findTrashBtn?.id == thisWasClicked?.id) {
        todoDatabase.splice(indexOfTask, 1);
        save();
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


printTodoList();
