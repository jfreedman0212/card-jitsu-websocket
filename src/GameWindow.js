import styled from 'styled-components';
import Score from './Score';
import Card from './Card';
import { useCallback, useEffect, useState } from 'react';

const GameWindowWrapper = styled.main`
    display: grid;
    grid-template-areas:
        "yourScore roundOutcome theirScore"
        "hand      hand         hand      ";
    grid-template-rows: repeat(2, min-content);
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
`;

const BaseScoreSection = styled.div`
    /* background-color: gray; */
    text-align: center;
    padding: 1rem;
    /* border-radius: 10px;
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 0, 0.25); */
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

const ScoreSectionHeader = styled.h2`
    
`;

function GameWindow({ hand, yourScore, theirScore, roundOutcome, onPlayCard }) {
    const [activeCard, setActiveCard] = useState(null);
    const [showRoundOutcome, setShowRoundOutcome] = useState(false);

    const playCard = useCallback(index => {
        return () => {
            setActiveCard(hand[index]);
            onPlayCard && onPlayCard(index + 1);
        };
    }, [onPlayCard]);

    // when the hand changes (each new web socket call), reset the active card to null
    useEffect(() => {
        setActiveCard(null);
        setShowRoundOutcome(true);
        const timeoutId = setTimeout(() => setShowRoundOutcome(false), 10000);
        return () => clearInterval(timeoutId);
    }, [hand]);

    return (
        <GameWindowWrapper>
            <YourScoreSection>
                <ScoreSectionHeader>Your Score</ScoreSectionHeader>
                <Score {...yourScore} />
            </YourScoreSection>
            <TheirScoreSection>
                <ScoreSectionHeader>Their Score</ScoreSectionHeader>
                <Score {...theirScore} />
            </TheirScoreSection>
            {
                roundOutcome && showRoundOutcome &&
                    <RoundOutcomeContainer>
                        {roundOutcome}
                    </RoundOutcomeContainer>
            }
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
