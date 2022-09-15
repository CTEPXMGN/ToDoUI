const addHighTask = document.querySelector('.new-task__button-high');
const inputHighTask = document.querySelector('.new-task__input-high');
const highList = document.querySelector('.todo-list-high');
const addLowTask = document.querySelector('.new-task__button-low');
const inputLowTask = document.querySelector('.new-task__input-low');
const lowList = document.querySelector('.todo-list-low');
let deleteButtons = document.querySelectorAll('.todo-list-button');

const taskTemplate = document.querySelector('#task-template').content;
const newItemTemplate = taskTemplate.querySelector('.todo-list-item');

let taskList = [];

const STATUS = {
    TO_DO: 'to do',
    DONE: 'done',
};

const PRIORITY = {
    HIGH: 'high',
    LOW: 'low',
};

function render() {
    highList.innerHTML = '';
    lowList.innerHTML = '';

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

                const taskChangeStatus = task.querySelector('.todo-list-input');
                taskChangeStatus.addEventListener('click', function() {
                    this.classList.add('checked');
                    this.parentElement.parentElement.classList.add('checked');
                    changeStatus(taskDescription.textContent, STATUS.DONE);
                });
                highList.appendChild(task);
            } else if (key === 'name' && item.priority === PRIORITY.LOW) {
                const task = newItemTemplate.cloneNode(true);
                const taskDescription = task.querySelector('span');
                taskDescription.textContent = item.name;

                const taskDeleteButton = task.querySelector('.todo-list-button');
                taskDeleteButton.addEventListener('click', function() {
                    deleteTask(taskDescription.textContent);
                });

                const taskChangeStatus = task.querySelector('.todo-list-input');
                taskChangeStatus.addEventListener('click', function() {
                    this.classList.add('checked');
                    this.parentElement.parentElement.classList.add('checked');
                    changeStatus(taskDescription.textContent, STATUS.DONE);
                });
                lowList.appendChild(task);
            };
        };
    });
};

render();

addHighTask.addEventListener('click', function(event) {
    event.preventDefault();

    let newTask = {};

    newTask.name = inputHighTask.value;
    newTask.status = STATUS.TO_DO;
    newTask.priority = PRIORITY.HIGH;
    
    taskList.push(newTask);
    inputHighTask.value = '';
    render();
    deleteButtons = document.querySelectorAll('.todo-list-button');
    console.log(taskList);
});

addLowTask.addEventListener('click', function(event) {
    event.preventDefault();

    let newTask = {};

    newTask.name = inputLowTask.value;
    newTask.status = STATUS.TO_DO;
    newTask.priority = PRIORITY.LOW;
    
    taskList.push(newTask);
    inputLowTask.value = '';
    render();
    deleteButtons = document.querySelectorAll('.todo-list-button');
    console.log(taskList);
});

function deleteTask(task) {
    let resultIndex = taskList.findIndex(item => item.name === task)
    
        if (resultIndex === -1) {
            console.log('Такой задачи не существует.');
        } else {
            taskList.splice(resultIndex, 1);
            console.log(taskList);
        };
        render();
};

function changeStatus(task, status) {
    taskList.map(function(item) {
        if (item.name === task) {
            item.status = status;
        };
    });
    console.log(taskList);
    render();
};