window.addEventListener("DOMContentLoaded", loadTask);

// Селекторы
const todoInput = document.getElementById('item') as HTMLInputElement;
const todoButton = document.querySelector('.todo_add_button') as HTMLElement;
const todoList = document.querySelector('.todo_list-container') as HTMLElement;

// Создаем "слушателей" для наших действий
todoButton.addEventListener("click", createTodo);
todoList.addEventListener("click", CRUD);

// Создание контейнера для наших задач
function createTodo(event: Event) {
    event.preventDefault();
    todoBody(todoInput.value);
    todoInput.value = "";
}

// Подключение действий для кнопок
function CRUD(e: MouseEvent) {
    const item = e.target as HTMLElement;
    const todo = item.parentElement as HTMLElement;

    if (item.classList[0] === "todo_list-donetask") {
        todo.classList.toggle("doneitem");
    }

    if (item.classList[0] === "todo_list-deletetask") {
        todo.classList.toggle("fall");
        const a = document.getElementsByClassName('fall')[0].innerHTML;
        let f = tasks.indexOf(a);
        tasks.splice(f, 1);
        localStorage.setItem('item', JSON.stringify(tasks));
        todo.remove();
    }
}

let tasks: string[] = [];

function saveTaskToLocalStorage(task: string) {
    tasks.push(task);
    localStorage.setItem('item', JSON.stringify(tasks));
}

function loadTask(event: Event) {
    event.preventDefault();
    const data = JSON.parse(localStorage.getItem('item')) as string[] | null;
    if (data) {
        data.forEach(item => {
            todoBody(item)
        });
    }
}

function todoBody(d: string) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('todo');

    // Кнопка выполненной задачи
    const doneTaskButton = document.createElement('button');
    doneTaskButton.classList.add('todo_list-donetask');
    newDiv.appendChild(doneTaskButton);

    // Сама задача
    const newList = document.createElement('li');
    newList.innerText = todoInput.value;
    newList.classList.add('todo_list');
    newDiv.appendChild(newList);
    if (d === "") {
        return null;
    }
    todoList.appendChild(newDiv);

    // Кнопка удаления задачи
    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.classList.add('todo_list-deletetask');
    newDiv.appendChild(deleteTaskButton);

    saveTaskToLocalStorage(d);
}