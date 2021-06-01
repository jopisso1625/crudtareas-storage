var formTask = document.getElementById('formTask');

// var button = document.getElementsByClassName('btn btn-danger');
// button[0].addEventListener('click', deleteTask);

formTask.addEventListener('submit', addTask);



function addTask(e) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;


    const task = {
        title,
        description

    }

    if (title === "" || description === "") {
        alert("Complete los campos");

    }

    else {

        if (localStorage.getItem('tasks') === null) {
            let tasks = [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));

        }
        else {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            let encontrado = false;

            for (let i = 0; i < tasks.length; i++) {
                if (task.title === tasks[i].title) {
                    encontrado = true

                }
            }

            if (!encontrado) {
                tasks.push(task);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                console.log(tasks)
            }
            else alert("Tarea ya registrada");


        }

        getTasks();
        document.getElementById('formTask').reset();
    }
    e.preventDefault();

}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks')

    tasksView.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        tasksView.innerHTML +=
            `<div class="card">
                <div class="card-body">
                    <div class="row">
                    
                        <div class="col-md-7">
                            <p>${title}</p>
                            <p>${description}</p>
                        </div>
                

                        <div class="col-md-5">
                            <div class="d-flex gap-2">
                            <button type="button" class="btn btn-warning" onclick="updateTask('${title}')">Actualizar</button>
                            <button type="button" class="btn btn-danger" onclick="deleteTask('${title}')">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>`
    }


}
getTasks();

function updateTask() {

}
function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].title == title) {
            tasks.splice(i, 1);
        }

    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();

}

