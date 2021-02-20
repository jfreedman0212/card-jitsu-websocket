import { useStateMachine } from 'little-state-machine';
import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import GameWindow from './GameWindow';
import { startGame } from './actions';

function Game() {
    const { actions } = useStateMachine({ startGame });
    const { sendMessage, lastJsonMessage } = useWebSocket(`wss://${process.env.REACT_APP_SERVER_URL}/game`);

    // runs the startGame action to modify global state
    useEffect(() => actions.startGame(), []);

    if (!lastJsonMessage) {
        return <p>Waiting for a player to connect...</p>
    }

    return (
        <GameWindow {...lastJsonMessage} onPlayCard={sendMessage} />
    );
}

export default Game;
