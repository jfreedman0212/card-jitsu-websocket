import styled from "styled-components";
import { cardColors } from './colors';

const ValueItem = styled.div`
    grid-column: 2;
    grid-row: 2;
    align-self: center;
`;

const ElementItem = styled.div`
    grid-column: 1;
    grid-row: 1;
    padding: 0.5rem;
`;

const CardWrapper = styled.button`
    border: 10px solid ${props => cardColors[props.color]};
    border-radius: 10px;
    background-color: #0280cc;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    font-family: inherit;
    font-size: 3rem;
    cursor: pointer;
    color: white;
    padding: 0;

    & ${ElementItem} {
        background-color: ${props => cardColors[props.color]};
        border-bottom-right-radius: 10px;
    }
`;

function Card({ color, element, value, onClick }) {
    return (
        <CardWrapper onClick={onClick} color={color}>
            <ElementItem>{element[0]}</ElementItem>
            <ValueItem>{value}</ValueItem>
        </CardWrapper>
    );
}

export default Card;
