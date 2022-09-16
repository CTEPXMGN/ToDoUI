import { UI_ELEMENTS } from "./view";

const taskTemplate = document.querySelector('#task-template').content;
const newItemTemplate = taskTemplate.querySelector('.todo-list-item');

// const UI_ELEMENTS = {
//     ADD_HIGH_TASK: document.querySelector('.new-task__button-high'),
//     INPUT_HIGH_TASK: document.querySelector('.new-task__input-high'),
//     HIGH_LIST: document.querySelector('.todo-list-high'),
//     ADD_LOW_TASK: document.querySelector('.new-task__button-low'),
//     INPUT_LOW_TASK: document.querySelector('.new-task__input-low'),
//     LOW_LIST: document.querySelector('.todo-list-low'),
// }

let taskList = [];

const STATUS = {
    TO_DO: 'to do',
    DONE: 'done',
};

const PRIORITY = {
    HIGH: 'high',
    LOW: 'low',
};
// Рисуем UI
function render() {
    UI_ELEMENTS.HIGH_LIST.innerHTML = '';
    UI_ELEMENTS.LOW_LIST.innerHTML = '';

    taskList.forEach(function(item) {
        for (let key in item) {
            if (key === 'name' && item.priority === PRIORITY.HIGH) {
                const task = newItemTemplate.cloneNode(true);
                const taskDescription = task.querySelector('span');
                taskDescription.textContent = item.name;

                const taskDeleteButton = task.querySelector('.todo-list-button');
                taskDeleteButton.addEventListener('click', function() {
                    deleteTask(taskDescription.textContent);
                });

                if (item.status === STATUS.DONE) {
                    const checkbox = task.querySelector('.todo-list-input');
                    checkbox.parentElement.parentElement.classList.add('checked');
                    checkbox.classList.add('checked');
                }

                const taskChangeStatus = task.querySelector('.todo-list-input');
                taskChangeStatus.addEventListener('click', function() {
                    changeStatus(taskDescription.textContent, STATUS.DONE);
                });
                
                UI_ELEMENTS.HIGH_LIST.appendChild(task);
            } else if (key === 'name' && item.priority === PRIORITY.LOW) {
                const task = newItemTemplate.cloneNode(true);
                const taskDescription = task.querySelector('span');
                taskDescription.textContent = item.name;

                const taskDeleteButton = task.querySelector('.todo-list-button');
                taskDeleteButton.addEventListener('click', function() {
                    deleteTask(taskDescription.textContent);
                });

                if (item.status === STATUS.DONE) {
                    const checkbox = task.querySelector('.todo-list-input');
                    checkbox.parentElement.parentElement.classList.add('checked');
                    checkbox.classList.add('checked');
                }

                const taskChangeStatus = task.querySelector('.todo-list-input');
                taskChangeStatus.addEventListener('click', function() {
                    changeStatus(taskDescription.textContent, STATUS.DONE);
                });
                UI_ELEMENTS.LOW_LIST.appendChild(task);
            };
        };
    });
};

render();
// Добавляем дело с высокой важностью
UI_ELEMENTS.ADD_HIGH_TASK.addEventListener('click', function(event) {
    event.preventDefault();

    let newTask = {};

    newTask.name = UI_ELEMENTS.INPUT_HIGH_TASK.value;
    newTask.status = STATUS.TO_DO;
    newTask.priority = PRIORITY.HIGH;
    
    taskList.push(newTask);
    UI_ELEMENTS.INPUT_HIGH_TASK.value = '';
    render();    
});
// Добавляем дело с низкой важностью
UI_ELEMENTS.ADD_LOW_TASK.addEventListener('click', function(event) {
    event.preventDefault();

    let newTask = {};

    newTask.name = UI_ELEMENTS.INPUT_LOW_TASK.value;
    newTask.status = STATUS.TO_DO;
    newTask.priority = PRIORITY.LOW;
    
    taskList.push(newTask);
    UI_ELEMENTS.INPUT_LOW_TASK.value = '';
    render(); 
});
// Удаляем таску
function deleteTask(task) {
    let resultIndex = taskList.findIndex(item => item.name === task)
    
        if (resultIndex === -1) {
            console.log('Такой задачи не существует.');
        } else {
            taskList.splice(resultIndex, 1);
            
        };
        render();
};
// Меняем статус таски
function changeStatus(task, status) {
    taskList.map(function(item) {
        if (item.name === task) {
            item.status = status;
        };
    });
    render();
};