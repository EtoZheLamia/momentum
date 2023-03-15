const todoButton = document.querySelector('.btn-todo');
const todoContainer = document.querySelector('.todo__container');
const todoButtonClose = todoContainer.querySelector('.popup-button');
const priorityChange = todoContainer.querySelector('.todo-priority');
const label = todoContainer.querySelector('.input-label');
const input = todoContainer.querySelector('.todo-input');
const form = todoContainer.querySelector('.todo__controls');
const todoList = todoContainer.querySelector('.todo__list');

let isImportant = false;

todoButton.addEventListener('click', ()=> {
  todoContainer.classList.toggle('todo__container--hide');
});

todoButtonClose.addEventListener('click', ()=> {
  todoContainer.classList.toggle('todo__container--hide');
});

priorityChange.addEventListener('click', ()=> {
  label.classList.toggle('is-important');
  input.classList.toggle('is-important');
  priorityChange.classList.toggle('is-important');
  if (label.classList.contains('is-important')) {
    label.textContent = 'Добавить важную задачу';
  }else {
    label.textContent = 'Добавить обычную задачу';
  }
  if (priorityChange.classList.contains('is-important')) {
    isImportant = true;
  } else {
    isImportant = false;
  }
});

const tasks = localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')) : [];

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newTask = document.createElement('li');
  const removeTask = document.createElement('button');
  removeTask.classList.add('remove-task');
  if (isImportant === true) {
    newTask.classList.add('is-important');
  }
  newTask.textContent = input.value;
  const task = {'task': input.value,
    'isImportant' : isImportant};
  tasks.push(task);
  newTask.append(removeTask);
  input.value = '';
  todoList.append(newTask);
});

todoList.addEventListener('click', (evt)=>{
  if (evt.target.matches('.remove-task')) {
    tasks.forEach((el,i)=>{
      if (el.task === evt.target.parentElement.textContent) {
        tasks.splice(i, 1);
      }
    });
    evt.target.parentElement.remove();
  }
});

function setLocalStorage() {
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load',()=>{
  tasks.forEach((el) => {
    const newTask = document.createElement('li');
    const removeTask = document.createElement('button');
    removeTask.classList.add('remove-task');
    if (el.isImportant === true) {
      newTask.classList.add('is-important');
    }
    newTask.textContent = el.task;

    newTask.append(removeTask);
    todoList.append(newTask);
  });
});
