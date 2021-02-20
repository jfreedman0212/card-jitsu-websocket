import { createStore, StateMachineProvider } from 'little-state-machine';
import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Lucida Console", Monaco, monospace;
        padding: 2rem;
        margin: 0;
        background: #a99173;
    }
`;

function log(state) {
    console.debug(state);
    return state;
}

// TODO: if we ever want to persist this data, can have a middleware that sends data to
// the server.
createStore(
    {
        wins: 0,
        totalGames: 0,
    }, 
    {
        name: '__CardJitsu_LSM__',
        middleWares: [log],
        storageType: localStorage,
    }
);

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle />
        <StateMachineProvider>
            <App />
        </StateMachineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
