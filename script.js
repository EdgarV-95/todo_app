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


    document.querySelector('.side-bar').style.opacity = '0.2';
    document.querySelector('.add-entry').style.opacity = '0.2';
    document.querySelector('.container-title').style.opacity = '0.2';
    document.querySelector('.todo-list').style.opacity = '0.2';


    const createEntryDiv = document.createElement('div');
    createEntryDiv.classList.add('entry');
    createEntryDiv.setAttribute('id', 'entry');
    createEntryDiv.innerHTML =
    `<div class="title-div">
    <p>Title: </p>
    <input type="text" id="title" name="title">
    </div>
    <div class="desc-div"><p>Description: </p><input type="text" id="desc" name="desc"></div>
    <div class="date-div"><p>Date: </p><input type="text" id="dueDate" name="dueDate"></div>
    <div class="submit-btn">Submit Entry</div>
    `
    // container.appendChild(createEntryDiv);
    document.querySelector('.test').before(createEntryDiv);
    updateEntryList();
});

// Updates the database and UI with the form data
const updateEntryList = () => {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', () => {
        const title = document.querySelector('#title').value;
        const desc = document.querySelector('#desc').value;
        const dueDate = document.querySelector('#dueDate').value;

        const newEntry = CreateEntry(title, desc, dueDate);

        // Update Database
        database.push(newEntry);

        // Update Display
        addNewEntry = (() => {
            const newEntry = document.createElement('div');
            newEntry.classList.add('todo-element');
            newEntry.setAttribute('data-id', database.length-1);
            document.querySelector('.todo-list').appendChild(newEntry);
            document.body.querySelector('.todo-element[data-id="' + (database.length-1) + '"]').innerHTML =
            `
            ${database[database.length-1].title}
            ${database[database.length-1].description}
            ${database[database.length-1].dueDate}
            `
        })();
        
        // Hide form after submit is clicked
        removeForm = (() => {
            document.querySelector('.entry').remove();
        })();

        document.querySelector('.side-bar').style.opacity = '1';
        document.querySelector('.add-entry').style.opacity = '1';
        document.querySelector('.container-title').style.opacity = '1';
        document.querySelector('.todo-list').style.opacity = '1';
    });
};

document.querySelector('.test').addEventListener('click', () => {
    console.log(database)
    console.log(document.querySelectorAll('.todo-element'))
})