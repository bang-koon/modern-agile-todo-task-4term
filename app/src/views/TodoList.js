const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo-list-box");

function handleTodoSubmit(e) {
    e.preventDefault();
    let inputValue = todoInput.value;

    if (inputValue){
        paintTodo(inputValue);
        todoInput.value = "";
    }
}

function paintTodo(inputValue) {
    const list = document.createElement("li");
    const span = document.createElement("span");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    // const img = document.createElement("img");

    // img.src = "./x-mark.png";
    // img.alt ="delete";
    // img.width = 9;
    // img.height = 10;  // "10px"으로 해서 안 들어감
    // deleteBtn.append(img);

    deleteBtn.innerText = "❌";
    deleteBtn.classList.add("delete-btn");

    list.classList.add("todo-list");
    list.id = "list";

    span.classList.add("todo-span");
    span.innerText = inputValue;
    
    editBtn.classList.add("edit-btn");
    editBtn.innerText = "수정"; 
    
    todoList.append(list);
    list.append(deleteBtn);
    list.append(span);
    list.append(editBtn);

    editBtn.addEventListener("click", listChangeToInput);
};

function listChangeToInput(e) {
    // input으로 바꾸고 다시 리스트로 

    let list = e.target.parentNode;
    let span = list.children[1];
    let inputValue = span.innerText;
    
    list.innerHTML =`<form>
                        <input class="edit-input" type="text"  value=${inputValue}>
                        <button class="edit-btn">완료</button>`;

    list.addEventListener("submit", updateTodo);
}

function updateTodo(e) {
    e.preventDefault();
    let list = e.target.parentNode;
    let form = list.childNodes[0];
    let inputValue = form.children[0].value; // [0]에 이상한 #text가 있음, 공백 때문임
    
    list.innerHTML =`<button class="delete-btn">❌</button>
                    <span class="todo-span">${inputValue}</span>
                    <button class="edit-btn">수정</button<`;

    let btn = list.children[2];

    btn.addEventListener("click", listChangeToInput);
}

function deleteList(e) {
    if (!e.target.classList.contains("delete-btn")) return;
    e.target.parentNode.remove();
    console.log(e.target);
}

function visitedSpan(e) {
    if(!e.target.classList.contains("todo-span")) return;
    e.target.classList.toggle("visited");
}

todoForm.addEventListener("submit", handleTodoSubmit);
document.addEventListener("click", deleteList);
document.addEventListener("click", visitedSpan);
