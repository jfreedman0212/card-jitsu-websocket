import { useStateMachine } from "little-state-machine";
import { startGame } from './actions';

function Home() {
    const { actions, state } = useStateMachine({ startGame });
    return (
        <>
            <h1>Welcome to Card Jitsu!</h1>
            <p>
                <b>Wins:</b>
                {state.wins}
            </p>
            <p>
                <b>Total Games:</b>
                {state.totalGames}
            </p>
            <button onClick={actions.startGame}>Join a random game!</button>
        </>
    );
}

export default Home;
