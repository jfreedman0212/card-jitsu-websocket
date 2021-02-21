import { useStateMachine } from 'little-state-machine';
import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import GameWindow from './GameWindow';
import { startGame } from './actions';
import { RoundOutcome } from './enums';

function Game() {
    const { actions } = useStateMachine({ startGame });
    const { sendMessage, lastJsonMessage, readyState } = useWebSocket(`wss://${process.env.REACT_APP_SERVER_URL}/game`);

    // runs the startGame action to modify global state
    useEffect(() => actions.startGame(), []);

    if (readyState === ReadyState.CONNECTING) {
        return <p>Connecting, please wait...</p>
    }

    if (readyState === ReadyState.OPEN && !lastJsonMessage) {
        return <p>Waiting for a player to connect...</p>
    }

    if (
        lastJsonMessage.roundOutcome !== RoundOutcome.LOSE_GAME 
            && lastJsonMessage.roundOutcome !== RoundOutcome.WIN_GAME 
            && (readyState === ReadyState.UNINSTANTIATED 
                || readyState === ReadyState.CLOSING 
                || readyState === ReadyState.CLOSED)
    ) {
        return <p>There was a communication error with the server. Please try again later.</p>
    }

    return (
        <GameWindow {...lastJsonMessage} onPlayCard={sendMessage} />
    );
}

export default Game;
