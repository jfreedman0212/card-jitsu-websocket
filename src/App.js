import { useStateMachine } from "little-state-machine";
import { Pages } from "./actions";
import Home from './Home';
import Game from './Game';

function App() {
    const { state } = useStateMachine();
    if (state.currentPage === Pages.HOME) {
        return <Home />;
    }
    else if (state.currentPage === Pages.GAME) {
        return <Game />;
    }
    throw new Error(`Unexpected currentPage value: ${state.currentPage}`);
}

export default App;
