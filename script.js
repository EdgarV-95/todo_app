// Stores all entries
const database = [];

// Factory function for creating entries and their properties
const CreateEntry = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority };
};

// Query selectors
const container = document.querySelector('.container');
const addNewBtn = document.querySelector('.add-new');

// Form to add new entries to the database and UI
addNewBtn.addEventListener('click', () => {
    const createEntryDiv = document.createElement('div');
    createEntryDiv.classList.add('entry');
    createEntryDiv.setAttribute('id', 'entry');
    createEntryDiv.innerHTML =
    `<p>Title: <input type="text" id="title" name="title"></p>
    <p>Desc: <input type="text" id="desc" name="desc"></p>
    <p>Deadline: <input type="text" id="dueDate" name="dueDate"></p>
    <p>Priority: <input type="text" id="priority" name="priority"></p>
    <button class="submit-btn">Submit Entry</button>
    `
    container.appendChild(createEntryDiv);

    updateEntryList();
});

// Updates the database and UI with the form data
const updateEntryList = () => {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', () => {
        const title = document.querySelector('#title').value;
        const desc = document.querySelector('#desc').value;
        const dueDate = document.querySelector('#dueDate').value;
        const priority = document.querySelector('#priority').value;

        const newEntry = CreateEntry(title, desc, dueDate, priority);

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
            ${database[database.length-1].priority}
            `
        })();
        
        // Hide form after submit is clicked
        removeForm = (() => {
            document.querySelector('.entry').remove();
        })();
    });
};

document.querySelector('.test').addEventListener('click', () => {
    console.log(database)
    console.log(document.querySelectorAll('.todo-element'))
})