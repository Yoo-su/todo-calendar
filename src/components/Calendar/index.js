import DayBox from "../DayBox";
import Modal from "../Modal";

import leftArrow from "../../assets/images/leftArrow.png";
import rightArrow from "../../assets/images/rightArrow.png";
import "./style.css";

export default function Calendar(app) {
    const wrapper = document.createElement('div');
    const header = document.createElement('div');
    const daysWrapper = document.createElement('div');
    const dayNamesBar = document.createElement('ul');
    const boxList = document.createElement('ul');
    const modal = new Modal(wrapper, () => applyLocalTodos());

    this.state = {
        year: null,  /* 2023, 2024 .. */
        month: null,  /* 1 ~ 12 */
        days: null,  /* 28, 30, 31 */
        dayNames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        todos: {},

        startUtcDay: null,
        utcDateMap: {
            0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 0
        }
    }

    this.setState = (nextState) => {
        this.state = { ...this.state, ...nextState };
    }

    /* 로컬 스토리지 todos 적용 */
    const applyLocalTodos = () => {
        const { year, month } = this.state;

        const thisMonthTodos = JSON.parse(localStorage.getItem(`todo-${year}-${month}`));

        this.setState({ todos: thisMonthTodos });

        render();
    }

    /* 이전달 이동버튼 클릭 처리 */
    const handlePrevMonthClick = () => {
        const { year, month } = this.state;
        app.removeChild(wrapper)
        init(new Date(year, month - 2))
    }

    /* 다음달 이동버튼 클릭 처리 */
    const handleNextMonthClick = () => {
        const { year, month } = this.state;
        app.removeChild(wrapper)
        init(new Date(year, month))
    }

    /* 초기화 */
    const init = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const days = new Date(year, month, 0).getDate()

        // todo 초기화
        for (let i = 1; i <= days; i++) this.state.todos[i] = []

        const thisMonthTodos = JSON.parse(localStorage.getItem(`todo-${year}-${month}`));

        if (thisMonthTodos) this.state.todos = thisMonthTodos;
        else localStorage.setItem(`todo-${year}-${month}`, JSON.stringify(this.state.todos));

        this.setState({
            year,
            month,
            days,
            startUtcDay: this.state.utcDateMap[new Date(year, month - 1, 1).getUTCDay()]
        });

        wrapper.className = "calendar-wrapper";
        header.className = "calendar-header";
        daysWrapper.className = "calendar-days-wrapper"
        dayNamesBar.className = "calendar-daynames"
        boxList.className = "calendar-boxlist";

        daysWrapper.appendChild(dayNamesBar);
        daysWrapper.appendChild(boxList)
        wrapper.appendChild(header);
        wrapper.appendChild(daysWrapper);
        app.appendChild(wrapper);

        render();
    }


    /* render */
    const render = () => {
        boxList.innerHTML = '';

        header.innerHTML = `
            <img class="left-arrow-btn" src=${leftArrow} alt="left-arrow-btn" />
                <h1>${this.state.year}.${this.state.month}</h1>
            <img class="right-arrow-btn" src=${rightArrow} alt="right-arrow-btn" />
        `

        header.querySelector(".left-arrow-btn").onclick = handlePrevMonthClick;
        header.querySelector(".right-arrow-btn").onclick = handleNextMonthClick;

        dayNamesBar.innerHTML = `
            ${this.state.dayNames.map(item => `<li class=${item}>${item}</li>`).join("")}
        `

        let day = 1;
        const { startUtcDay, days, dayNames, year, month, todos } = this.state;
        const totalBoxCnt = (startUtcDay + days) > 35 ? 42 : 35;

        for (let i = 0; i < totalBoxCnt; i++) {
            if (i < startUtcDay || day > days) {
                new DayBox({
                    type: "empty"
                }, boxList, null);
                continue;
            }

            const dayName = dayNames[i % 7];

            const props = {
                dateInfo: {
                    year,
                    month,
                    dayName,
                    day,
                },
                type: "filled",
                todos: todos[day]
            }

            new DayBox(props, boxList, modal.handleOpen)
            day += 1;
        }
    }

    init(new Date());
}
