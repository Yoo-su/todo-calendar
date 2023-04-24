import TodoInput from "../TodoInput";
import TodoList from "../TodoList";

import close from "../../assets/images/close.png";
import "./style.css";

export default function Modal(parent, renewCalendar) {
    this.state = {
        dateInfo: {
            year: null,
            month: null,
            day: null,
            dayName: null,
        },

        todos: []
    }

    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const header = document.createElement('div');
    const content = document.createElement('div');
    const todoList = new TodoList(content);
    const todoInput = new TodoInput(content, todoList.addTodo);

    this.setState = (nextState) => {
        this.state = { ...this.state, ...nextState };
        todoList.setState({ dateInfo: this.state.dateInfo });
        render();
    }

    /* modal close */
    const handleCloseBtnClick = () => {
        container.style.display = "none";
        todoInput.clearInput();
        renewCalendar();
    }

    /* modal open */
    const handleModalOpen = (data) => {
        this.setState(data);
        container.style.display = "flex"
    }

    /* 초기화 */
    const init = () => {
        container.className = "modal-container";
        wrapper.className = "modal-wrapper";
        header.className = "modal-header";
        content.className = "modal-content";

        header.onclick = (event) => {
            if (event.target.tagName === 'IMG') handleCloseBtnClick();
        }

        container.appendChild(wrapper);
        wrapper.appendChild(header);
        wrapper.appendChild(content);

        parent.appendChild(container);
    }

    /* render */
    const render = () => {
        const { year, month, day, dayName } = this.state.dateInfo;
        header.innerHTML = ` 
            <b>${year}.${month}.${day} ${dayName}</b>
            <button class="modal-close-btn"><img src=${close} alt="modal-close-btn" /></button>
        `;

        todoList.render(this.state.todos);
    }

    init();

    return {
        handleModalOpen,
        handleCloseBtnClick
    }
}
