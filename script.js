// Stores all entries
const database = [];

// Factory function for creating entries and their properties
const CreateEntry = (title, description, dueDate, priority, profile) => {
    return { title, description, dueDate, priority, profile };
};

// Query selectors
const container = document.querySelector('.container');
const addNewBtn = document.querySelector('.add-entry');

// Form to add new entries to the database and UI
addNewBtn.addEventListener('click', () => {
    // Reduces opacity of the background while form is present
    lowerOpacity();

    // Creates form
    const createEntryDiv = document.createElement('div');
    createEntryDiv.classList.add('entry');
    createEntryDiv.setAttribute('id', 'entry');
    createEntryDiv.innerHTML = `
    <div class="modal-header">
        <h3 class="modal-title">New Entry</h3>
        <button class="modal-close">X</button>
    </div>
    <div class="modal-body">
        <div class="left-side">
            <div class="form-textarea">
                <label for="taskTitle">Title: </label>
                <textarea class="taskTitle" id="title" name="taskTitle"></textarea>
            </div>
            <div class="form-textarea">
                <label for="taskDesc">Description: </label>
                <textarea class="taskDesc" id="desc" name="taskDesc"></textarea>
            </div>
        </div>
        <div class="right-side">
            <div class="date-div">
                <label for="dueDate">Date: </label>
                <input type="text" class="custom-select" id="dueDate" name="dueDate"></div>
            <div class="priority-div">
                <label for="taskPriority">Priority: </label>
                <select class="custom-select" id="taskPriority" required="">
                    <option value="Low" selected="">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div class="project-div">
                <label for="taskProject">Profile: </label>
                <select class="custom-select" id="taskProject" required="">
                    <option>Inbox</option>
                </select>
            </div>
        </div>
    </div>
    <div class="form-buttons">
        <div class="close btn">Close</div>
        <div class="submit btn">Submit Entry</div>
    </div>`

    container.prepend(createEntryDiv);

    updateEntryList();
});

// Updates the database and UI with the form data
const updateEntryList = () => {
    // Get form values after "Submit" is clicked and create a new "CreateEntry" object from them
    const submitBtn = document.querySelector('.submit');
    submitBtn.addEventListener('click', () => {
        const title = document.querySelector('#title').value;
        const desc = document.querySelector('#desc').value;
        const dueDate = document.querySelector('#dueDate').value;
        const priority = document.querySelector('#taskPriority').value;
        const profile = document.querySelector('#taskProject').value;

        const newEntry = CreateEntry(title, desc, dueDate, priority);

        // Update Database
        database.push(newEntry);

        // Update Display
        addNewEntryForm()

        // Hide form after submit is clicked
        removeForm()

        // Returns opacity of the background back to normal after form is closed
        increaseOpacity()
    });
};

const lowerOpacity = () => {
    document.querySelector('.side-bar').style.opacity = '0.2';
    document.querySelector('.container-header').style.opacity = '0.2';
}

const increaseOpacity = () => {
    document.querySelector('.side-bar').style.opacity = '1';
    document.querySelector('.container-header').style.opacity = '1';
}

const addNewEntryForm = () => {
    const newEntry = document.createElement('div');
    newEntry.classList.add('todo-element');
    newEntry.setAttribute('data-id', database.length-1);
    document.querySelector('.todo-list').appendChild(newEntry);
    document.body.querySelector('.todo-element[data-id="' + (database.length-1) + '"]').innerHTML = `
    <div class="todo-title">${database[database.length-1].title}
        <div class="todo-icons">
            <div class="todo-edit"><span class="material-icons">edit</span></div>
            <div class="todo-priority"><span class="material-icons">flag</span></div>
            <div class="todo-delete"><span class="material-icons">delete</span></div>
        </div>
    </div>
    `
    updatePriority(database[database.length-1].priority);
};

const removeForm = () => {
    document.querySelector('.entry').remove();
};

const updatePriority = (arg) => {
    switch(arg) {
        case 'Low':
            document.querySelector('.todo-element[data-id="' + (database.length-1) + '"]').style.borderLeft = "5px solid green";
            break;
        case 'Medium':
            document.querySelector('.todo-element[data-id="' + (database.length-1) + '"]').style.borderLeft = "5px solid orange";
            break;
        case 'High':
            document.querySelector('.todo-element[data-id="' + (database.length-1) + '"]').style.borderLeft = "5px solid red";
            break;
      }
}