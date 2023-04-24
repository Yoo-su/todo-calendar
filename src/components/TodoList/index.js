import TodoItem from "../TodoItem";
import empty from "../../assets/images/empty.png";
import "./style.css";

export default function TodoList(parent) {

    this.state = {
        todos: [],
        dateInfo: {}
    };

    this.setState = (nextState) => {
        this.state = { ...this.state, ...nextState }
    }

    const todoList = document.createElement('ul');

    /* 로컬스토리지 갱신 */
    const updateLocalStorage = (year, month, day, todos) => {
        const thisMonthTodos = JSON.parse(localStorage.getItem(`todo-${year}-${month}`));
        thisMonthTodos[day] = todos;
        localStorage.setItem(`todo-${year}-${month}`, JSON.stringify(thisMonthTodos));
    };

    /* todo 추가 */
    const addTodo = (newTodoContent) => {
        const { year, month, day } = this.state.dateInfo;

        const lastTodoId = this.state.todos.length ? this.state.todos.at(-1).id : 0;
        const newTodoId = lastTodoId + 1;

        const newTodo = {
            id: newTodoId,
            content: newTodoContent,
            cleared: false,
            createdAt: new Date().toLocaleString(),
        }

        const newTodos = [...this.state.todos, newTodo];

        if (newTodos.length > 1) {
            new TodoItem(todoList).attach(newTodo, deleteTodo, toggleTodocleared);
        } else {
            render(newTodos);
        }

        this.setState({ todos: newTodos });
        updateLocalStorage(year, month, day, newTodos);
    }

    /* todo 삭제 */
    const deleteTodo = (todoToDelete) => {
        const { year, month, day } = this.state.dateInfo;

        const newTodos = this.state.todos.filter(item => item.id != todoToDelete.id);

        let needToDelete;
        todoToDelete.cleared ?
            needToDelete = todoList.querySelector(`.todo-item-cleared-${todoToDelete.id}`) :
            needToDelete = todoList.querySelector(`.todo-item-${todoToDelete.id}`)

        needToDelete.remove();

        this.setState({ todos: newTodos });
        updateLocalStorage(year, month, day, newTodos);
    }

    /* todo cleared 값 토글 */
    const toggleTodocleared = (todo) => {
        const { year, month, day } = this.state.dateInfo;

        const newTodos = this.state.todos;

        newTodos.forEach((item, idx) => {
            if (item.id != todo.id) return;

            if (item.cleared === true) {
                const listItem = todoList.querySelector(`.todo-item-cleared-${todo.id}`);
                listItem.className = `todo-item-${todo.id}`;
            } else {
                const listItem = todoList.querySelector(`.todo-item-${todo.id}`);
                listItem.className = `todo-item-cleared-${todo.id}`;
            }
            newTodos[idx].cleared = !newTodos[idx].cleared;
        }
        );

        this.setState({ todos: newTodos });
        updateLocalStorage(year, month, day, newTodos);
    }

    // 초기화
    const init = () => {
        todoList.className = "todo-list";
    }

    // render
    const render = (todos) => {
        this.state.todos = todos;

        if (todos.length) {
            todoList.innerHTML = '';

            todos.map(todo => {
                new TodoItem(todoList).attach(todo, deleteTodo, toggleTodocleared)
            })
        }
        else {
            todoList.innerHTML = `
        <div class="empty-box">
          <img src=${empty} alt="list-empty-img" />
          <label>등록된 내용이 없습니다</label>
        </div>
      `
        }

        parent.appendChild(todoList);
    }

    init();

    return {
        addTodo,
        deleteTodo,
        toggleTodocleared,
        render,
        setState: this.setState
    }
}
