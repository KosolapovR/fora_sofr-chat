import React from 'react';
import Login from "./views/pages/login";
import ChatApp from "./views/pages/chatApp";
import './app.css';
import {
    Switch,
    Route
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/login' render={Login}/>
                <Route path='/' render={ChatApp}/>
            </Switch>
        </div>
    );
}

export default App;
