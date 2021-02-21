import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const AlertContainer = styled.div`
    border: 1px solid #870b1b;
    background: #F14C61;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    padding: 2rem;
`;

function Alert({ message }) {
    return (
        <AlertContainer role="alert">
            <FontAwesomeIcon icon={faExclamationCircle} fixedWidth />
            &nbsp;
            {message}
        </AlertContainer>
    );
}

export default Alert;