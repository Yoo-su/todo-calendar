import trash from "../../assets/images/trash.png";
import check from "../../assets/images/check.png";

export default function TodoItem(parent) {
    this.attach = (todo, deleteTodo, toggleTodoCleared) => {

        const li = document.createElement('li');
        const content = document.createElement('div');
        const todoBtns = document.createElement('div');
        const checkBtn = document.createElement('button');
        const trashBtn = document.createElement('button');

        li.className = todo.cleared ? `todo-item-cleared-${todo.id}` : `todo-item-${todo.id}`;
        content.className = 'todo-content'
        todoBtns.className = "todo-btns";
        checkBtn.className = "check-btn";
        trashBtn.className = "trash-btn";

        /* check 버튼 클릭 처리 */
        checkBtn.onclick = () => {
            toggleTodoCleared(todo);
        }

        /* trash 버튼 클릭 처리 */
        trashBtn.onclick = () => {
            deleteTodo(todo);
        }

        content.innerHTML = `
        <b>${todo.content}</b>
        <p>${todo.createdAt}에 생성됨</p>
      `
        checkBtn.innerHTML = `
        <img src=${check} />
      `;
        trashBtn.innerHTML = `
        <img src=${trash} />
      `
        todoBtns.appendChild(checkBtn);
        todoBtns.appendChild(trashBtn);

        li.appendChild(content);
        li.appendChild(todoBtns);
        parent.appendChild(li);
    }
}