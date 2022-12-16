let subscriber: () => void | null = null;
const todoDatabase: Task[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)!) || [];

export function add(text: String, deadline: Date) {
    // add to local todoDatabase variable
    // call save() to update LS
}

// add exported remove function

export function getTodos() {
    return todoDatabase.concat([]);
}

function save() {
    // save to LS
    // call subscriber fn if it exists with the todoDatabase
    
}

export function subscribe(fn: () => void) {
    subscriber = fn;
}


// move over db logic from main.ts to db.ts
// modify printTodoList to print todoDatabase provided as a function argument