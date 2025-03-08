import React from 'react';
import Routes from './Routes';
import axios from 'axios';
import data from './data.json';

axios.defaults.baseURL = data.backend;

function App() {
    return (
        <div>
            <Routes />
        </div>
    );
}

export default App;