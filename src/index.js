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

ReactDOM.render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>,
    document.getElementById('root')
);
