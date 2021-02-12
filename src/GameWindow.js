import styled from 'styled-components';
import Score from './Score';
import Card from './Card';

const GameWindowWrapper = styled.main`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-areas:
        "yourScore .            theirScore"
        ".         roundOutcome .         "
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
    gap: 1rem;
    justify-content: center;
`;

const RoundOutcomeContainer = styled.section`
    grid-area: roundOutcome;
`;


function GameWindow({ hand, yourScore, theirScore, roundOutcome, onPlayCard }) {
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
                            onClick={() => onPlayCard && onPlayCard(idx + 1)}
                        />
                    ))
                }
            </CardsContainer>
        </GameWindowWrapper>
    );
}

export default GameWindow;
