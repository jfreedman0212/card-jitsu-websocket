import { useState } from "react";
import styled from "styled-components";
import { cardColors } from './colors';
import ElementIcon from './ElementIcon';

import penguin1 from './penguin1.svg';
import penguin2 from './penguin2.svg';
import penguin3 from './penguin3.svg';
import penguin4 from './penguin4.svg';

const penguinIcons = [
    penguin1,
    penguin2,
    penguin3,
    penguin4,
];

const ValueItem = styled.div`
    font-size: 2rem;
`;

const CornerLabel = styled.div`
    grid-column: 1;
    grid-row: 1;
    font-size: unset;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-left: -0.5rem;
    padding: 0 0.5rem;
    font-weight: bolder;
`;

const CardWrapper = styled.button`
    border: 10px solid ${props => cardColors[props.color]};
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    background-color: #0280cc;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    background-position: center;
    background-size: auto 50%;
    background-repeat: no-repeat;
    font-family: inherit;
    cursor: pointer;
    color: black;
    padding: 0;
    background-image: url(${props => props.iconImage});

    &:hover:not(:disabled) {
        transform: translateY(-30px);
    }

    & ${CornerLabel} {
        background-color: ${props => cardColors[props.color]};
        border-bottom-right-radius: 10px;
    }

    &:disabled {
        cursor: wait;
    }
`;

function Card({ color, element, value, onClick, disabled }) {
    const [iconNumber,] = useState(() => Math.floor(Math.random() * 4));
    return (
        <CardWrapper onClick={onClick} color={color} disabled={disabled} iconImage={penguinIcons[iconNumber]}>
            <CornerLabel>
                <ElementIcon element={element} size="2x" />
                <ValueItem>{value}</ValueItem>
            </CornerLabel>
        </CardWrapper>
    );
}

export default Card;
