window.addEventListener("DOMContentLoaded", loadtask)
// селекторы
const todoInput = document.getElementById('item');
const todoButton = document.querySelector('.todo_add_button');
const todoList = document.querySelector('.todo_list-container');

// создаем "слушателей" для наших действий
todoButton.addEventListener("click", createTodo)
todoList.addEventListener("click", CRUD)

// создание контейнера для наших задач
function createTodo(event){
    event.preventDefault();
    todoBody(todoInput.value)
    todoInput.value = ""

}


// подключение действий для кнопок
function CRUD(e){
    const item = e.target;
    const todo = item.parentElement;

    if (item.classList[0] === "todo_list-donetask"){
        todo.classList.toggle("doneitem");
    }

    if (item.classList[0] === "todo_list-deletetask"){
        todo.classList.toggle("fall")
        const a = document.getElementsByClassName('fall')[0].innerText;
        let f = tasks.indexOf(a)
        tasks.splice(f, 1);
        localStorage.setItem('item', JSON.stringify(tasks));
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
    const data = JSON.parse(localStorage.getItem('item'));
    data.forEach(item => {
            todoBody(item)
        });
}

function todoBody(d){
    const newDiv = document.createElement('div');
    newDiv.classList.add('todo');

    // кнопка выполненной задачи
    const doneTaskButton = document.createElement('button');
    doneTaskButton.classList.add('todo_list-donetask');
    newDiv.appendChild(doneTaskButton);

    // сама задача
    const newList = document.createElement('li');
    newList.innerText = d;
    newList.classList.add('todo_list');
    newDiv.appendChild(newList);
    if(d === ""){
        return null;
    }
    todoList.appendChild(newDiv);

    // кнопка удаления задачи
    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.classList.add('todo_list-deletetask');
    newDiv.appendChild(deleteTaskButton);

    saveTaskToLocalStorage(d);
    d = ""
}