const elForm = document.querySelector(".form");
const elList = document.querySelector(".list");
const elInput = document.querySelector(".input");
const all = document.querySelector(".all");
const completed = document.querySelector(".completed");
const unCompleted = document.querySelector(".uncompleted");

let todos = [];

elList.addEventListener("click", function (evt) {
  const deleteBtnId = evt.target.dataset.deleteBtnId * 1;
  const foundIndex = todos.findIndex((todo) => todo.id === deleteBtnId);
  if (evt.target.matches(".delete-btn")) {
    todos.splice(foundIndex, 1);
    elList.innerHTML = null;
    all.textContent = todos.length;
    renderTodo(todos, elList);
  } else if (evt.target.matches(".check-box-btn")) {
    const checkId = evt.target.dataset.checkBoxBtnId * 1;

    const foundTodo = todos.find((todo) => todo.id === checkId);
    foundTodo.isComplated = !foundTodo.isComplated;
    elList.innerHTML = null;

    renderTodo(todos, elList);
  }
});

const renderTodo = function (arr, htmlElement) {
  arr.forEach((todo) => {
    all.textContent = todos.length;
    completed.textContent = todos.filter((todo) => todo.isComplated === true).length
    unCompleted.textContent = todos.filter((todo) => todo.isComplated === false).length
    const newLi = document.createElement("li");
    const newInput = document.createElement("input");
    const newBtn = document.createElement("button");

    newLi.textContent = todo.title;
    elList.style.add = ".list";
    newLi.setAttribute("class", "mt-2 w-25");
    newInput.type = "checkbox";
    newBtn.textContent = "Delete";
    newBtn.setAttribute("class", "btn btn-danger ms-3");
    newBtn.classList.add("delete-btn");
    newInput.classList.add("check-box-btn");
    

    newBtn.dataset.deleteBtnId = todo.id;
    newInput.dataset.checkBoxBtnId = todo.id;

    if (todo.isComplated) {
      newInput.checked = true;
      newLi.style.textDecoration = "line-through";
    }

    htmlElement.appendChild(newLi);
    newLi.appendChild(newInput);
    newLi.appendChild(newBtn);
  });
};

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const inputValue = elInput.value;

  let newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isComplated: false,
  };
  todos.push(newTodo);
  elInput.value = null;
  elList.innerHTML = null;

  renderTodo(todos, elList);
});
