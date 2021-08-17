

//Selectors


const todoInput = document.querySelector('.todo-input')
const todobtn = document.querySelector('.todo-btn')
const todolist = document.querySelector('.todo-list')
const filteroption = document.querySelector('.todo-filter')
//EventListener

document.addEventListener('DOMContentLoaded', gettodos)
todobtn.addEventListener('click', addtodo);
todolist.addEventListener('click', deleteCheck);
filteroption.addEventListener('input', filter)



//Functions 


function addtodo(e) {
    //prevent default
    e.preventDefault();
    //create todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newtodo = document.createElement('li');
    newtodo.innerText = todoInput.value;
    newtodo.classList.add('todo-item');
    //create checkbtn
    const checkbtn = document.createElement('button');
    checkbtn.innerHTML = '<i class="fas fa-check"></i>'
    checkbtn.classList.add('check-btn')
    //create deletebtn
    const delbtn = document.createElement('button');
    delbtn.innerHTML = '<i class="fas fa-trash"></i>'
    delbtn.classList.add('del-btn')
    //append all the created elements 
    todoDiv.append(newtodo, checkbtn, delbtn);
    todolist.append(todoDiv);
    //add todo to local storage
    savetolocal(todoInput.value)
    todoInput.value = '';
}
function deleteCheck(e) {
    let item = e.target;

    //delete todo
    if (item.classList.contains("del-btn")) {

        const todo = item.parentElement;
        todo.classList.add('fall')
        removefromlocal(todo)
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })


    }
    //check todo
    if (item.classList.contains("check-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle('completed')

    }

}

function filter(e) {
    const todos = todolist.children;


    for (let todo of todos) {



        switch (filteroption.value) {
            case "all":
                todo.style.display = 'flex';
                break;

            case "Checked":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = 'none';
                }
                break;
            case "Unchecked":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';

                } else {
                    todo.style.display = 'flex';
                }

        }

    }
}


function savetolocal(todo) {
    let todos;
    //check if todos already there
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}


function gettodos() {


    let todos;
    //check if todos already there
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    for (let todo of todos) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create li
        const newtodo = document.createElement('li');
        newtodo.innerText = todo;
        newtodo.classList.add('todo-item');
        //create checkbtn
        const checkbtn = document.createElement('button');
        checkbtn.innerHTML = '<i class="fas fa-check"></i>'
        checkbtn.classList.add('check-btn')

        //create deletebtn
        const delbtn = document.createElement('button');
        delbtn.innerHTML = '<i class="fas fa-trash"></i>'
        delbtn.classList.add('del-btn')
        //append all the created elements 
        todoDiv.append(newtodo, checkbtn, delbtn);
        todolist.append(todoDiv);

    }

}

function removefromlocal(todo) {
    let todos;
    //check if todos already there
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    let elem = todo.children[0].innerText;
    todos.splice(todos.indexOf(elem), 1)
    localStorage.setItem('todos', JSON.stringify(todos))

}