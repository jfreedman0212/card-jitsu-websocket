import styled from 'styled-components';
import Score from './Score';
import Card from './Card';
import { useCallback, useEffect, useState } from 'react';

const GameWindowWrapper = styled.main`
    display: grid;
    grid-template-areas:
        "yourScore roundOutcome theirScore"
        ".         active       .         "
        "hand      hand         hand      ";
    grid-template-rows: 1fr 1fr 1.25fr;
    grid-template-columns: repeat(3, 1fr);
`;

const BaseScoreSection = styled.div`
    background-color: gray;
    display: flex;
    justify-content: center;
`;

const YourScoreSection = styled(BaseScoreSection)`
    grid-area: yourScore;
`;

const TheirScoreSection = styled(BaseScoreSection)`
    grid-area: theirScore;
`;

const CardsContainer = styled.section`
    grid-area: hand;
    display: flex;
    gap: 2rem;
    justify-content: center;
`;

const RoundOutcomeContainer = styled.section`
    grid-area: roundOutcome;
`;

function GameWindow({ hand, yourScore, theirScore, roundOutcome, onPlayCard }) {
    const [activeCard, setActiveCard] = useState(null);

    const playCard = useCallback(index => {
        return () => {
            setActiveCard(hand[index]);
            onPlayCard && onPlayCard(index + 1);
        };
    }, [onPlayCard]);

    // when the hand changes (each new web socket call), reset the active card to null
    useEffect(() => setActiveCard(null), [hand]);

    return (
        <GameWindowWrapper>
            <YourScoreSection>
                <Score {...yourScore} />
            </YourScoreSection>
            <TheirScoreSection>
                <Score {...theirScore} />
            </TheirScoreSection>
            {roundOutcome && <RoundOutcomeContainer>{roundOutcome}</RoundOutcomeContainer>}
            <CardsContainer>
                {
                    hand.map((card, idx) => (
                        <Card  
                            {...card}
                            key={`${card.element}-${card.value}-${card.color}`}
                            onClick={playCard(idx)}
                            disabled={!!activeCard}
                        />
                    ))
                }
            </CardsContainer>
        </GameWindowWrapper>
    );
}

export default GameWindow;
