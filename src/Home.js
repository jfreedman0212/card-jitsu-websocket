import { useStateMachine } from "little-state-machine";
import { Link } from 'react-router-dom';

function Home() {
    const { state } = useStateMachine();
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
            <Link to="/game">
                <button>Join a random game!</button>
            </Link>
        </>
    );
}

export default Home;
