const KEY_STORAGE_LIST = 'listItems';

const saveListInLocalStorage = (list) => {
  localStorage.setItem(KEY_STORAGE_LIST, JSON.stringify(list))
};

const recoveryListItems = () => {
  const listStorage = localStorage.getItem(KEY_STORAGE_LIST);
  if (!listStorage) return [];
  return JSON.parse(listStorage);
};

const updateStorage = () => {
  const taskList = [];
  const listOfTasks = document.querySelector('#list-of-todo');

  for (let index = 0; index < listOfTasks.children.length; index += 1) {
    const listObject = {
      text: listOfTasks.children[index].innerText,
      completed: listOfTasks.children[index].classList.contains('completed'),
    };
    taskList.push(listObject);
  }
  saveListInLocalStorage(taskList);
};

const addEventsInCheckbox = (checkbox) => {
  checkbox.addEventListener('change', ({ target }) => {
    const liElement = target.parentNode;
    liElement.classList.toggle('completed');
    updateStorage();
  });
};

const createCheckbox = (completed) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  addEventsInCheckbox(checkbox);

  return checkbox;
};

const addTask = (task, completed) => {
  const listOfTodo = document.querySelector('#list-of-todo');
  const liTask = document.createElement('li');
  liTask.textContent = task;

  if (completed) liTask.classList.add('completed');

  liTask.appendChild(createCheckbox(completed));
  listOfTodo.appendChild(liTask);
};

const addEventInForm = () => {
  const formTodo = document.querySelector('#todo-form');

  formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    const todo = document.querySelector('#GET-todo');

    if (todo.value.trim() === '') {
      todo.value = ''; // reset todo value if user typed space
      todo.placeholder = 'type anything...'; // change placeholder
      return;
    }

    todo.placeholder = '';
    addTask(todo.value.trim());
    updateStorage();
    todo.value = '';
  });
};

const addItemsInList = () => {
  const listItems = recoveryListItems();

  listItems.forEach((task) => {
    addTask(task.text, task.completed);
  });
};

window.onload = () => {
  addItemsInList();
  addEventInForm();
};