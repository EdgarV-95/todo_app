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
    <textarea class="title-div" id="title" name="title" placeholder="Title: "></textarea>
    <textarea class="desc-div" id="desc" name="desc" placeholder="Description: "></textarea>
    <div class="date-div"><p>Date: </p><input type="text" id="dueDate" name="dueDate"></div>
    <div class="submit-btn">Submit Entry</div>
    `
    container.appendChild(createEntryDiv);

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
    document.querySelector('.add-entry').style.opacity = '0.2';
    document.querySelector('.container-title').style.opacity = '0.2';
    document.querySelector('.todo-list').style.opacity = '0.2';
}

const increaseOpacity = () => {
    document.querySelector('.side-bar').style.opacity = '1';
    document.querySelector('.add-entry').style.opacity = '1';
    document.querySelector('.container-title').style.opacity = '1';
    document.querySelector('.todo-list').style.opacity = '1';
}

const addNewEntryForm = () => {
    const newEntry = document.createElement('div');
    newEntry.classList.add('todo-element');
    newEntry.setAttribute('data-id', database.length-1);
    document.querySelector('.todo-list').appendChild(newEntry);
    document.body.querySelector('.todo-element[data-id="' + (database.length-1) + '"]').innerHTML =
    `<div class="todo-title">${database[database.length-1].title}</div>
    <div class="todo-desc">${database[database.length-1].description}</div>
    <div class="todo-dueDate">${database[database.length-1].dueDate}</div>
    `
};

const removeForm = () => {
    document.querySelector('.entry').remove();
};

// document.querySelector('.test').addEventListener('click', () => {
//     console.log(database)
//     console.log(document.querySelectorAll('.todo-element'))
// })