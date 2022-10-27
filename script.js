// Stores all entries
const database = [];

// Factory function for creating entries and their properties
const CreateEntry = (title, description, dueDate) => {
    return { title, description, dueDate };
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
    <div class="title-form"><h5 id="model-Title">New Entry</h5></div>
    <div class="left-side-form">
        <textarea class="title-div" id="title" name="title" placeholder="Title:"></textarea>
        <textarea class="desc-div" id="desc" name="desc" placeholder="Description:"></textarea>
    </div>
    <div class="right-side-form">
        <div class="date-div">Date: <input type="text" id="dueDate" name="dueDate"></div>
        <div class="priority-div">
            <label for="taskPriority">Priority: </label>
            <select class="custom-select" id="taskPriority" required="">
                <option value="low" selected="">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
        <div class="project-div">
            <label for="taskProject">Profile: </label>
            <select class="custom-select" id="taskProject" required=""><option data-newtasktargetproject="_elx98r9i0">Inbox</option></select>
        </div>
        <div class="close-btn">Close></div>
        <div class="submit-btn">Submit Entry</div>
    </div>`

    container.prepend(createEntryDiv);

    updateEntryList();
});

// Updates the database and UI with the form data
const updateEntryList = () => {
    // Get form values after "Submit" is clicked and create a new "CreateEntry" object from them
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', () => {
        const title = document.querySelector('#title').value;
        const desc = document.querySelector('#desc').value;
        const dueDate = document.querySelector('#dueDate').value;

        const newEntry = CreateEntry(title, desc, dueDate);

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
};

const removeForm = () => {
    document.querySelector('.entry').remove();
};