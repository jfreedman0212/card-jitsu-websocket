import { useCallback } from 'react';
import useWebSocket from 'react-use-websocket';
import GameWindow from './GameWindow';

function Game() {
    const { sendMessage, lastJsonMessage } = useWebSocket(`wss://${process.env.REACT_APP_SERVER_URL}/game`);

    const playCard = useCallback(choice => {
      sendMessage(choice);
    }, [sendMessage]);

    if (!lastJsonMessage) {
        return <p>Waiting for a player to connect...</p>
    }

    return (
        <GameWindow {...lastJsonMessage} onPlayCard={playCard} />
    );
}

export default Game;
