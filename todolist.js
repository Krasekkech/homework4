const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list-container')
todoButton.addEventListener("click", createTodo)
todoList.addEventListener("click", CRUD)

function createTodo(event){
    event.preventDefault();
    const newDiv = document.createElement('div');
    newDiv.classList.add('todo');
    const newList = document.createElement('li');
    newList.innerText = todoInput.value;

    const doneTaskButton = document.createElement('button');
    doneTaskButton.classList.add('todo_list-donetask');
    newDiv.appendChild(doneTaskButton);

    newList.classList.add('todo_list');
    newDiv.appendChild(newList);
    if(todoInput.value === ""){
        return null;
    }
    todoList.appendChild(newDiv);
    todoInput.value = ""

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.classList.add('todo_list-deletetask');
    newDiv.appendChild(deleteTaskButton);
}

function CRUD(e){
    const item = e.target;
    if (item.classList[0] === "todo_list-donetask"){
        const todo = item.parentElement;
        todo.classList.toggle("doneitem");
    }
    if (item.classList[0] === "todo_list-deletetask"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.remove();
    }
}