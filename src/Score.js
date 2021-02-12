import { Element } from './enums';
import { cardColors } from './colors';
import styled from 'styled-components';

const ScoreCardListsContainer = styled.div`
    display: flex;
    gap: 2rem;
`;

const ScoreCardList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ScoreCard = styled.li`
    list-style: none;
    padding: 2rem;
    border: 2px solid white;
    border-radius: 5px;
    background-color: ${props => cardColors[props.color]};
`;

function ScoreList({ listOfColors, element }) {
    return (
        <ScoreCardList>
            {
                listOfColors.map((color, idx) => (
                    <ScoreCard key={idx} color={color}>
                        {element[0]}
                    </ScoreCard>
                ))
            }
        </ScoreCardList>
    );
}

function Score({ fireList, waterList, snowList }) {
    return (
        <ScoreCardListsContainer>
            <ScoreList listOfColors={fireList} element={Element.FIRE} />
            <ScoreList listOfColors={waterList} element={Element.WATER} />
            <ScoreList listOfColors={snowList} element={Element.SNOW} />
        </ScoreCardListsContainer>
    );
}

export default Score;
