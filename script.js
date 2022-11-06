// Main page elements
const list = document.querySelector('.todo-list');
const addForm = document.querySelector('.add-entry');
const form = document.querySelector('.form');
const update = document.querySelector('.update');

// Form elements
const title = document.querySelector('#title');
const description = document.querySelector('#desc');
const dueDate = document.querySelector('#dueDate');
const priority = document.querySelector('#priority');
const profile = document.querySelector('#profile');
const xBtn = document.querySelector('.modal-close');
const closeBtn = document.querySelector('.close');
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

  const todo = new Todo(
    id,
    title.value,
    description.value,
    dueDate.value,
    priority.value,
    profile.value
  );
  database = [...database, todo];

  UI.displayTask();
  UI.closeForm();
  UI.showTaskDescription();
  UI.editIcon();
  UI.deleteElementFromUI();
});

closeBtn.addEventListener('click', () => {
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
  }
}

// Class to update UI elements
class UI {
  // Update the UI with the newly added element
  static displayTask() {
    let displayTask = database.map((item) => {
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
            `;
    });
    // Remove , from the array when appearing in UI
    list.innerHTML = displayTask.join('');
    UI.clearForm();
    UI.updatePriority();
  }

  static updatePriority() {
    database.map((item) => {
      switch (item.priority) {
        case 'Low':
          document.querySelector(
            `.todo-element[data-id="${item.id}"]`
          ).style.borderLeft = '1.5vw solid rgb(64,115,214)';
          break;
        case 'Medium':
          document.querySelector(
            `.todo-element[data-id="${item.id}"]`
          ).style.borderLeft = '1.5vw solid rgb(245,156,24)';
          break;
        case 'High':
          document.querySelector(
            `.todo-element[data-id="${item.id}"]`
          ).style.borderLeft = '1.5vw solid rgb(222,75,74)';
          break;
      }
    });
  }

  static showTaskDescription() {
    const allTasksArr = [...document.querySelectorAll('.todo-title')];
    allTasksArr.map((task) => {
      task.addEventListener('click', (e) => {
        let todoDetailsList =
          task.parentElement.parentElement.querySelectorAll(
            '.todo-details'
          );
        if (todoDetailsList.length > 0) {
          let detailsArr = [...todoDetailsList];
          detailsArr.map((item) => item.remove());
        } else {
          const details = document.createElement('div');
          details.classList.add('todo-details');
          task.parentElement.parentElement.append(details);

          database = database.filter(
            (item) =>
              item.id !==
              e.target.parentElement.parentElement.dataset.id
          );
          database.map((el) => {
            if (
              el.id ===
              +e.target.parentElement.parentElement.dataset.id
            ) {
              details.innerHTML = `
                            <div class="desc-left">
                                <div class="desc-desc">Description: </div>
                                <p class="desc-nl">${el.description}</p>
                            </div>
                            <div class="desc-right">
                                <div class="desc-date">Due Date: ${el.dueDate}</div>
                                <div class="desc-priority">Priority: ${el.priority}</div>
                            </div>
                            `;
            }
          });
        }
      });
    });
  }

  // test
  static editIcon() {
    const allEdits = document.querySelectorAll('.todo-edit');
    let editList = Array.from(allEdits);
    for (let i = 0; i < editList.length; i++) {
      editList[i].addEventListener('click', (e) => {
        console.log(
          e.target.parentElement.parentElement.parentElement.dataset
            .id
        );
        console.log(
          database[0].e.target.parentElement.parentElement
            .parentElement.dataset.id
        );
      });
      // editList.map((edit) => {
      //   edit.addEventListener('click', (e) => {
      //   });
      // });
      //   // Show form by removing .off class from .entry
      //   edit.addEventListener('click', () => {
      //     update.classList.remove('off');
      //     UI.lowerOpacity();

      //     // Show existing data in the form upon opening it
      //     let editID = edit.parentElement.parentElement.dataset.id;

      //     let updateDatabase = [];
      //     for (let obj of database) {
      //       updateDatabase.push(obj);
      //     }
      //     updateDatabase = updateDatabase.filter(
      //       (item) => item.id === +editID
      //     );
      //     document.querySelector('#update-title').innerHTML =
      //       updateDatabase[0].title;
      //     document.querySelector('#update-desc').innerHTML =
      //       updateDatabase[0].description;
      //     document.querySelector('#update-dueDate').value =
      //       updateDatabase[0].dueDate;
      //     document.querySelector('#update-priority').value =
      //       updateDatabase[0].priority;
      //     document.querySelector('#update-profile').value =
      //       updateDatabase[0].profile;
      //   });

      //   // Handle the update form when submitted
      //   document
      //     .querySelector('#update-update')
      //     .addEventListener('click', () => {
      //       let id = Math.random() * 100000;

      //       const todo = new Todo(
      //         id,
      //         title.value,
      //         description.value,
      //         dueDate.value,
      //         priority.value,
      //         profile.value
      //       );
      //       database = [...database, todo];
      //       UI.displayTask();
      //     });

      //   // Close update form
      //   document
      //     .querySelector('#update-close')
      //     .addEventListener('click', () => {
      //       update.classList.add('off');
      //       UI.increaseOpacity();
      //     });
      // });
    }
  }

  // Remove elment from the UI if the event.target contains the .delete class
  static deleteElementFromUI() {
    list.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
      }
      let btnId =
        e.target.parentNode.parentNode.parentNode.parentNode.dataset
          .id;
      UI.deleteElementFromDB(btnId);
    });
  }

  // Removes the element from the database.
  // Filters through the array and only returns the elements that do not have the id given as a parameter
  static deleteElementFromDB(id) {
    database = database.filter((item) => item.id !== +id);
  }

  // Clear the form values
  static clearForm() {
    title.value = '';
    description.value = '';
    dueDate.value = getCurrentDate;
    priority.value = 'Low';
    profile.value = 'Inbox';
  }

  static closeForm() {
    form.classList.add('off');
    update.classList.add('off');
    UI.increaseOpacity();
  }

  static lowerOpacity = () => {
    document.querySelector('.side-bar').style.opacity = '0.2';
    document.querySelector('.main-body').style.opacity = '0.2';
  };

  static increaseOpacity = () => {
    document.querySelector('.side-bar').style.opacity = '1';
    document.querySelector('.main-body').style.opacity = '1';
  };
}

// Update date to today
let getCurrentDate = new Date().toISOString().split('T')[0];
dueDate.value = getCurrentDate;
dueDate.min = getCurrentDate;
