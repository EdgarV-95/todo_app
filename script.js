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
const submit = document.querySelector('.submit');

// Database to store all objects
let database = [];

// Show form by removing .off class from .entry
addForm.addEventListener('click', () => {
    form.classList.remove('off');
});

// Handle the form when submitted
submit.addEventListener('click', () => {

    // First submit the values entered
    let id = Math.random() * 100000;

    // If the title or description is empty then throw error
    // Otherwise carry on adding it as an object
    if ( !(title.value === '')) {
        const todo = new Todo(id, title.value, description.value, dueDate.value, priority.value, profile.value);
        console.log(todo)
        database = [...database, todo];
        UI.displayTask();
        UI.clearForm();
        UI.deleteElementFromUI();
    } else alert('Title cannot be empty');

    // Hide form after Submit btn is pressed
    form.classList.add('off');
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
            <div class="todo-element" data-id=${item.id}>
                <div class="todo-title">${item.title}</div>
                <div class="todo-icons">
                    <div class="todo-date">${item.dueDate}</div>
                    <div class="todo-edit"><span class="material-icons edit">edit</span></div>
                    <div class="todo-priority"><span class="material-icons flag">flag</span></div>
                    <div class="todo-delete"><span class="material-icons delete">delete</span></div>
                </div>
            </div>
            `
        });
        list.innerHTML = displayTask.join('');
    };

    // Clear the form values
    static clearForm() {
        title.value = '';
        description.value = '';
        dueDate.value = getCurrentDate;
        priority.value = 'Low';
        profile.value = 'Inbox';
    };

    // Remove elment from the UI if the event.target contains the .delete class
    static deleteElementFromUI() {
        list.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete')) {
                e.target.parentNode.parentNode.parentNode.remove();
            }
            let btnId = e.target.parentNode.parentNode.parentNode.dataset.id;
            UI.deleteElementFromDB(btnId);
        })
    };

    // Removes the element from the database.
    // Filters through the array and only returns the elements that do not have the id given as a parameter
    static deleteElementFromDB(id) {
        database = database.filter(item => item.id !== +id);
    };
};

// Update date to today
let getCurrentDate = (new Date()).toISOString().split('T')[0];
dueDate.value = getCurrentDate;
dueDate.min = getCurrentDate;