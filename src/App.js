import Home from './Home';
import Game from './Game';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/game" component={Game} />
                <Route path="/lobbies">
                    <h1>This is a work in progress!</h1>
                    <p>Come back at a later date to see this feature.</p>
                </Route>
                <Route path="*">
                    <h2>404 Page Not Found</h2>
                    <Link to="/">Go Home</Link>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
