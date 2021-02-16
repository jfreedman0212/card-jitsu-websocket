import styled from 'styled-components';
import Score from './Score';
import Card from './Card';
import { useCallback, useEffect, useState } from 'react';
import { RoundOutcome } from './enums';

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
    text-align: center;
    padding: 1rem;
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
    align-self: center;
    text-align: center;
    font-size: 3rem;
`;

const ScoreSectionHeader = styled.h2`
    
`;

function RoundOutcomeDisplay({ roundOutcome }) {
    let message;
    switch (roundOutcome) {
        case RoundOutcome.WIN_GAME:
            message = 'You won the game!';
            break;
        case RoundOutcome.LOSE_GAME:
            message = 'You lost the game...';
            break;
        case RoundOutcome.WIN_ROUND:
            message = 'You won the round!';
            break;
        case RoundOutcome.LOSE_ROUND:
            message = 'You lost the round...';
            break;
        case RoundOutcome.TIE:
            message = 'You tied';
            break;
        default:
            throw new Error(`Invalid Round Outcome value of ${roundOutcome}`);
    }
    return (
        <RoundOutcomeContainer>
            {message}
        </RoundOutcomeContainer>
    );
}

function GameWindow({ hand, yourScore, theirScore, roundOutcome, onPlayCard }) {
    const [activeCardId, setActiveCardId] = useState(null);
    const [showRoundOutcome, setShowRoundOutcome] = useState(false);

    const playCard = useCallback(index => {
        return () => {
            setActiveCardId(hand[index].id);
            onPlayCard && onPlayCard(index + 1);
        };
    }, [onPlayCard]);

    // when the hand changes (each new web socket call), reset the active card to null
    useEffect(() => {
        setActiveCardId(null);
        setShowRoundOutcome(true);
        const timeoutId = setTimeout(() => setShowRoundOutcome(false), 5000);
        return () => clearInterval(timeoutId);
    }, [hand]);

    const isGameOver = roundOutcome === RoundOutcome.LOSE_GAME || roundOutcome === RoundOutcome.WIN_GAME;

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
            {roundOutcome && showRoundOutcome && <RoundOutcomeDisplay roundOutcome={roundOutcome} />}
            <CardsContainer>
                {
                    hand.map((card, idx) => (
                        <Card  
                            {...card}
                            key={card.id}
                            onClick={playCard(idx)}
                            disabled={!!activeCardId || isGameOver}
                            active={card.id === activeCardId}
                        />
                    ))
                }
            </CardsContainer>
        </GameWindowWrapper>
    );
}

export default GameWindow;
