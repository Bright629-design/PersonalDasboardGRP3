// todo.js — To-do list with localStorage persistence

const STORAGE_KEY = 'dashboard_todos';

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  const todos = loadTodos();
  const list  = document.getElementById('todo-list');
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const checkbox = document.createElement('input');
    checkbox.type    = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => toggleTodo(index));

    const span = document.createElement('span');
    span.className   = 'task-text';
    span.textContent = todo.text;

    const delBtn = document.createElement('button');
    delBtn.className   = 'del-btn';
    delBtn.textContent = '✕';
    delBtn.title       = 'Delete task';
    delBtn.addEventListener('click', () => deleteTodo(index));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById('todo-input');
  const text  = input.value.trim();
  if (!text) return;

  const todos = loadTodos();
  todos.push({ text, done: false });
  saveTodos(todos);
  renderTodos();
  input.value = '';
}

function toggleTodo(index) {
  const todos    = loadTodos();
  todos[index].done = !todos[index].done;
  saveTodos(todos);
  renderTodos();
}

function deleteTodo(index) {
  const todos = loadTodos();
  todos.splice(index, 1);
  saveTodos(todos);
  renderTodos();
}

// Add on button click
document.getElementById('todo-add-btn').addEventListener('click', addTodo);

// Add on Enter key
document.getElementById('todo-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Initial render
renderTodos();