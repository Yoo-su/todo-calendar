import "./style.css";

export default function TodoInput(parent, addTodo) {
    const inputDiv = document.createElement('div');
    const input = document.createElement('input');
    const addTodoBtn = document.createElement('button');

    this.state = {
        currentInput: '',
    }

    const setState = (nextState) => {
        this.state = { ...this.state, ...nextState };
    }

    /* 초기화 */
    const init = () => {
        inputDiv.className = "todo-input-wrapper"
        input.placeholder = "Add a task."
        input.className = "todo-input-input"
        addTodoBtn.className = "todo-input-btn"
        addTodoBtn.textContent = "+"

        input.onchange = (e) => { handleInputChange(e) }
        addTodoBtn.onclick = () => { handleAddBtnClick(); }
        inputDiv.appendChild(input)
        inputDiv.appendChild(addTodoBtn)
        parent.appendChild(inputDiv);
    }

    /* input 값 초기화 */
    const clearInput = () => {
        this.state.currentInput = '';
        input.value = '';
    }

    /* input change 처리 */
    const handleInputChange = (event) => {
        this.state.currentInput = event.target.value;
    }

    /* 추가 버튼 클릭 처리 */
    const handleAddBtnClick = () => {
        if (!this.state.currentInput.length) return;

        addTodo(this.state.currentInput);
        clearInput();
    }

    init();

    return {
        clearInput,
        setState
    }
}