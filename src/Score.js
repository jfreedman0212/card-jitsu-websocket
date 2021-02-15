import { Element } from './enums';
import { cardColors } from './colors';
import styled from 'styled-components';
import ElementIcon from './ElementIcon';

const ScoreCardListsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row;
    gap: 1rem;
`;

const ScoreCardWrapper = styled.div`
    list-style: none;
    padding: 1rem;
    border: 2px solid black;
    border-radius: 5px;
    background-color: ${props => cardColors[props.color]};
    grid-column: ${props => {
        switch (props.element) {
            case Element.FIRE:
                return 1;
            case Element.WATER:
                return 2;
            case Element.SNOW:
                return 3;
        }
    }};
    grid-row: ${props => props.index + 1};
    text-align: center;
`;

function ScoreCard({ color, element, index }) {
    return (
        <ScoreCardWrapper color={color} element={element} index={index}>
            <ElementIcon element={element} size="lg" />
        </ScoreCardWrapper>
    );
}

function ScoreList({ listOfColors, element }) {
    return (
        <>
            {
                listOfColors.map((color, idx) => (
                    <ScoreCard key={idx} color={color} element={element} index={idx} />
                ))
            }
        </>
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
