// Main page elements
const list = document.querySelector('.todo-list');
const addForm = document.querySelector('.add-entry');
const form = document.querySelector('.form');

// Form elements
const title = document.querySelector('#title');
const description = document.querySelector('#desc');
const dueDate = document.querySelector('#dueDate');
const priority = document.querySelector('#priority');
const profile = document.querySelector('#profile');
const xBtn = document.querySelector('.modal-close');
const close = document.querySelector('.close');
const submit = document.querySelector('.submit');

// Database to store all objects
let database = [];

// Show form by removing .off class from .entry
addForm.addEventListener('click', () => {
    form.classList.remove('off');
    UI.lowerOpacity();
});

// Handle the form when submitted
submit.addEventListener('click', () => {

    // First submit the values entered
    let id = Math.random() * 100000;

    const todo = new Todo(id, title.value, description.value, dueDate.value, priority.value, profile.value);
    database = [...database, todo];

    UI.displayTask();
    UI.closeForm();
    UI.showTaskDescription();
    UI.deleteElementFromUI();
});

close.addEventListener('click', () => {
    UI.closeForm();
});
xBtn.addEventListener('click', () => {
    UI.closeForm();
});

// Todo class
class Todo {
    constructor(id, title, description, dueDate, priority, profile) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.profile = profile;
    };
};

// Class to update UI elements
class UI {

    // Update the UI with the newly added element
    static displayTask() {
        let displayTask = database.map(item => {
            return `
            <div class="todo-task-container" data-id=${item.id}>
                <div class="todo-element" data-id=${item.id}>
                <div class="todo-title">${item.title}</div>
                <div class="todo-icons">
                    <div class="todo-date">${item.dueDate}</div>
                    <div class="todo-edit"><span class="material-icons edit">edit</span></div>
                    <div class="todo-delete"><span class="material-icons delete">delete</span></div>
                </div>
                </div>
            </div>
            `
        });
        // Remove , from the array when appearing in UI
        list.innerHTML = displayTask.join('');
        UI.clearForm();
        UI.updatePriority();
    };

    static updatePriority() {
        database.map(item => {
            switch (item.priority) {
                case 'Low':
                    document.querySelector(`.todo-element[data-id="${item.id}"]`).style.borderLeft = '1.5vw solid yellow';
                    break;
                case 'Medium':
                    document.querySelector(`.todo-element[data-id="${item.id}"]`).style.borderLeft = '1.5vw solid orange';
                    break;
                case 'High':
                    document.querySelector(`.todo-element[data-id="${item.id}"]`).style.borderLeft = '1.5vw solid red';
                    break;
            };
        });
    };

    static showTaskDescription() {
        const allTasksArr = Array.from(document.querySelectorAll('.todo-task-container'));
        allTasksArr.map(task => {
            task.addEventListener('click', (e) => {
                const details = document.createElement('div');
                details.classList.add('todo-details');
                details.setAttribute('data-id', e.target.dataset.id)
                task.append(details);

                database = database.filter(item => item.id !== e.target.dataset.id);
                database.map(el => {
                    if(el.id === +(e.target.dataset.id)) {
                        details.innerHTML = `${el.description}`;
                    };
                });
            });
        });

        allTasksArr.map(task => {
            task.addEventListener('click', () => {
                let nodeList = task.querySelectorAll('.todo-details');
                if (nodeList.length > 1) {
                    let test = document.querySelectorAll(`.todo-details[data-id="${task.dataset.id}"]`);
                    test.forEach(el => el.remove());
                };
            });
        });
    };

    // Remove elment from the UI if the event.target contains the .delete class
    static deleteElementFromUI() {
        list.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete')) {
                e.target.parentNode.parentNode.parentNode.remove();
            };
            let btnId = e.target.parentNode.parentNode.parentNode.dataset.id;
            UI.deleteElementFromDB(btnId);
        })
    };

    // Removes the element from the database.
    // Filters through the array and only returns the elements that do not have the id given as a parameter
    static deleteElementFromDB(id) {
        database = database.filter(item => item.id !== +id);
    };

    // Clear the form values
    static clearForm() {
        title.value = '';
        description.value = '';
        dueDate.value = getCurrentDate;
        priority.value = 'Low';
        profile.value = 'Inbox';
    };

    static closeForm() {
        form.classList.add('off');
        UI.increaseOpacity();
    };

    static lowerOpacity = () => {
        document.querySelector('.side-bar').style.opacity = '0.2';
        document.querySelector('.main-body').style.opacity = '0.2';
    };
    
    static increaseOpacity = () => {
        document.querySelector('.side-bar').style.opacity = '1';
        document.querySelector('.main-body').style.opacity = '1';
    };
};

// Update date to today
let getCurrentDate = (new Date()).toISOString().split('T')[0];
dueDate.value = getCurrentDate;
dueDate.min = getCurrentDate;