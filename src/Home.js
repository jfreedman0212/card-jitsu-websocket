import { useStateMachine } from "little-state-machine";
import { Link, useLocation } from 'react-router-dom';
import Alert from "./Alert";
import styled from 'styled-components';
import Button from './Button';

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

function Home({ serverStatus }) {
    const { state } = useStateMachine();

    let buttonTitle;
    if (serverStatus.loading) {
        buttonTitle = 'Checking server status...';
    }
    else if (!serverStatus.success) {
        buttonTitle = 'Server is down, try again later.';
    }
    else {
        buttonTitle = 'Fight against a random player';
    }

    return (
        <HomeContainer>
            <Heading>Welcome to Card Jitsu!</Heading>
            {!serverStatus.loading && !serverStatus.success ? <Alert message="The server is down. Please check back later." /> : null}
            <InfoSection>
                <b>Wins:</b>&nbsp;
                {state.wins}
            </InfoSection>
            <InfoSection>
                <b>Total Games:</b>&nbsp;
                {state.totalGames}
            </InfoSection>
            <Link to="/game" title={buttonTitle}>
                <Button disabled={!serverStatus.success}>Join a random game!</Button>
            </Link>
            <Link to="/lobbies" title="Creating and Joining lobbies will be added as a new feature later">
                <Button disabled>See Lobbies</Button>
            </Link>
        </HomeContainer>
    );
}

export default Home;
