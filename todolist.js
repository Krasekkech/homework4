window.addEventListener("DOMContentLoaded", loadtask)
// селекторы
const todoInput = document.getElementById('item');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list-container');

// создаем "слушателей" для наших действий
todoButton.addEventListener("click", createTodo)
todoList.addEventListener("click", CRUD)



// создание контейнера для наших задач
function createTodo(event){
    event.preventDefault();
    const newDiv = document.createElement('div');
    newDiv.classList.add('todo');

    // кнопка выполненной задачи
    const doneTaskButton = document.createElement('button');
    doneTaskButton.classList.add('todo_list-donetask');
    newDiv.appendChild(doneTaskButton);

    // сама задача
    const newList = document.createElement('li');
    newList.innerText = todoInput.value;
    newList.classList.add('todo_list');
    newDiv.appendChild(newList);
    if(todoInput.value === ""){
        return null;
    }
    todoList.appendChild(newDiv);
    // todoInput.value = ""

    // кнопка удаления задачи
    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.classList.add('todo_list-deletetask');
    deleteTaskButton.innerHTML = 'x';
    newDiv.appendChild(deleteTaskButton);

    saveTaskToLocalStorage(todoInput.value);
    todoInput.value = ""
}

// подключение действий для кнопок
function CRUD(e){
    const item = e.target;
    if (item.classList[0] === "todo_list-donetask"){
        const todo = item.parentElement;
        todo.classList.toggle("doneitem");
    }
    if (item.classList[0] === "todo_list-deletetask"){
        const todo = item.parentElement;
        localStorage.removeItem(todo.value);
        todo.remove();
    }
}

let tasks = [];

function saveTaskToLocalStorage(task) {
    tasks.push(task);
    localStorage.setItem('item', JSON.stringify(tasks));

}
function loadtask(event) {

    event.preventDefault();
    const todoList = document.querySelector('.todo_list-container')
    const data = JSON.parse(localStorage.getItem('item'));

    data.forEach(item => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('todo');

        // кнопка выполненной задачи
        const doneTaskButton = document.createElement('button');
        doneTaskButton.classList.add('todo_list-donetask');
        newDiv.appendChild(doneTaskButton);

        // сама задача
        const newList = document.createElement('li');
        newList.innerText = item;
        newList.classList.add('todo_list');
        newDiv.appendChild(newList);
        todoList.appendChild(newDiv);
        // todoInput.value = ""

        // кнопка удаления задачи
        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.classList.add('todo_list-deletetask');
        deleteTaskButton.innerHTML = 'x';
        newDiv.appendChild(deleteTaskButton);
        saveTaskToLocalStorage(item)
    });
}
// window.onload = loadTasks(tasks);
//
// function loadTasks(task){
//     for (let i = 0; i <= task.length-1; i++){
//         const newDiv = document.createElement('div');
//         newDiv.classList.add('todo');
//         const newList = document.createElement('li');
//         newList.innerText = localStorage.getItem(i);
//         newList.classList.add('todo_list');
//         newDiv.appendChild(newList);
//         todoList.appendChild(newDiv);
//     }
// }

// document.addEventListener('DOMContentLoaded', getTasks);

// const tasks = getTasks();
// tasks.forEach(function(task) {
//     // Создание DOM элементов для задач из localStorage и их отображение на странице
//     const newDiv = document.createElement('div');
//     newDiv.classList.add('todo');
//     const newList = document.createElement('li');
//     newList.innerText = task;
//
//     // ... (добавление остальных элементов и их размещение в новом div)
//
//     todoList.appendChild(newDiv);
// });



// function getTasks() {
//     tasks = localStorage.getItem(0);
//     return tasks;
//
// }