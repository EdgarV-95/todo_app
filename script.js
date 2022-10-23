const toDoArr = [];

const CreateTodo = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority }
};

const addNewTodo = (element) => {
    toDoArr.push(element)
    console.log(toDoArr)
    document.querySelector('.todo-list').innerHTML =
    `
    ${toDoArr[0].title}
    ${toDoArr[0].description}
    ${toDoArr[0].dueDate}
    ${toDoArr[0].priority}
    `
};

document.querySelector('.add-new').addEventListener('click', () => {
    const fill = document.createElement('div')
    fill.classList.add('addNew')
    fill.innerHTML =
    `<p>Title: <input type="text" id="title" name="title"></p>
    <p>Desc: <input type="text" id="desc" name="desc"></p>
    <p>Deadline: <input type="text" id="dueDate" name="dueDate"></p>
    <p>Priority: <input type="text" id="priority" name="priority"></p>
    <div class="submit-btn">Add ToDo</div>
    `
    document.querySelector('.container').appendChild(fill);
    appendNewToArr();

})

const appendNewToArr = () => {
    document.querySelector('.submit-btn').addEventListener('click', () => {
        const title = document.querySelector('#title').value
        const desc = document.querySelector('#desc').value
        const dueDate = document.querySelector('#dueDate').value
        const priority = document.querySelector('#priority').value

        const newTodo = CreateTodo(title, desc, dueDate, priority);
        addNewTodo(newTodo);
    })
}