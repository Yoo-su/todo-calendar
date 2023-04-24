import "./style.css";

export default function DayBox(data, parent, openModal) {

  const box = document.createElement('li');

  const IS_EMPTY_BOX = data.type == 'empty' ? true : false;

  // 초기화 
  const init = () => {
    box.className = `day-box-${data.type}`

    if (!IS_EMPTY_BOX) {
      box.onclick = () => { openModal(data) };
    }

    parent.appendChild(box);
  }

  /* render */
  const render = (data) => {
    if (IS_EMPTY_BOX) return;

    const { dateInfo, todos } = data;

    const showAllTodos = `${todos.map(todo =>
      `<label class="day-box-todo">- ${todo.content}</label>`).join("")}`;

    const showSummaryTodos = `${todos.slice(0, 2).map(todo =>
      `<label class="day-box-todo">- ${todo.content}</label>`).join("")}` +
      `<p class="extra-todo-cnt">+ ${data.todos.length - 2}개</p>`;

    box.innerHTML = `
        <div class="day-box-title">
          <b>${dateInfo.day}</b>
        </div>
        
        <div class="day-box-todos">
          ${todos.length > 2 ? showSummaryTodos : showAllTodos}
        </div>
      `
  }

  init();
  render(data);
}