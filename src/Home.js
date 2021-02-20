import { useStateMachine } from "little-state-machine";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.main`
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    gap: 3rem;
    margin: 7rem;
    text-align: center;
    align-items: center;
`;

const Heading = styled.h1`
    grid-column: span 2;
    margin: 0;
`;

const InfoSection = styled.p`
    margin: 0;
`;

const Button = styled.button`
    padding: 1rem;
    font-size: inherit;
    width: max-content;
`;

function Home() {
    const { state } = useStateMachine();
    return (
        <HomeContainer>
            <Heading>Welcome to Card Jitsu!</Heading>
            <InfoSection>
                <b>Wins:</b>&nbsp;
                {state.wins}
            </InfoSection>
            <InfoSection>
                <b>Total Games:</b>&nbsp;
                {state.totalGames}
            </InfoSection>
            <Link to="/game" title="Fight against a random player">
                <Button>Join a random game!</Button>
            </Link>
            <Link to="/lobbies" title="Creating and Joining lobbies will be added as a new feature later">
                <Button disabled>See Lobbies</Button>
            </Link>
        </HomeContainer>
    );
}

export default Home;
