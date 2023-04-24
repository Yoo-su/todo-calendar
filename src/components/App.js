import Calendar from "./Calendar";
import "../global.css"

export default function App(app) {
    const render = () => {
        new Calendar(app);
    }

    render();
}