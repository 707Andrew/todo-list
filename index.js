const addTasksBtn = document.querySelector('.btn-create-task-btn');
const addTaskInput = document.querySelector('.task-input');
const todosWrapper = document.querySelector('.list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemsElements = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="btn-todo-item">
               <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
               <button class="btn-delete">Delete</button>
            </div>
        </div>
    `
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = '';
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        })
        todoItemsElements = document.querySelector('.todo-item')
    }
}

fillHtmlList();

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemsElements[index].classList.add('checked');
    } else {
        todoItemsElements[index].classList.remove('checked');
    }
    updateLocalStorage();
    fillHtmlList();
}

addTasksBtn.addEventListener('click', () => {
    tasks.push(new Task(addTaskInput.value));
    updateLocalStorage();
    fillHtmlList();
    addTaskInput.value = '';
})