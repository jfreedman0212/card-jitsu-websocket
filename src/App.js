import Home from './Home';
import Game from './Game';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Button from './Button';
import { useReducer, useEffect } from 'react';
import Alert from './Alert';

function reducer(_state, action) {
    switch (action) {
        case 'success':
            return {
                loading: false,
                success: true,
            };
        case 'failure':
            return {
                loading: false,
                success: false,
            };
        default:
            throw new Error(`Expected 'success' or 'failure', got '${action}'`);
    }
}

function App() {
    const [loadingState, dispatch] = useReducer(reducer, { loading: true, success: false });

    useEffect(async () => {
        try {
            await fetch(`https://${process.env.REACT_APP_SERVER_URL}/heart-beat`);
            dispatch('success');
        } 
        catch (e) {
            dispatch('failure');
        }
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home serverStatus={loadingState} />
                </Route>
                {
                    !loadingState.loading && loadingState.success 
                        // when the server is up
                        ? (
                            <>
                                <Route path="/game" component={Game} />
                                <Route path="/lobbies">
                                    <h1>This is a work in progress!</h1>
                                    <p>Come back at a later date to see this feature.</p>
                                    <Link to="/">
                                        <Button>Go Home</Button>
                                    </Link>
                                </Route>
                            </>
                        )
                        // when the server is down
                        : (
                            <>
                                <Route path="/game">
                                    <Alert message="The server is down. Please check back later." />
                                    <Link to="/">
                                        <Button>Go Home</Button>
                                    </Link>
                                </Route>
                                <Route path="/lobbies">
                                    <Alert message="The server is down. Please check back later." />
                                    <Link to="/">
                                        <Button>Go Home</Button>
                                    </Link>
                                </Route>
                            </>
                        )
                }
                <Route path="*">
                    <h2>404 Page Not Found</h2>
                    <Link to="/">
                        <Button>Go Home</Button>
                    </Link>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
