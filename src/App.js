import { useCallback } from 'react';
import useWebSocket from 'react-use-websocket';
import GameWindow from './GameWindow';

function App() {
  const { sendMessage, lastJsonMessage } = useWebSocket('ws://localhost:8080/game');

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

export default App;
