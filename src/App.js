import React from 'react';
import Login from "./views/pages/login";
import ChatApp from "./views/pages/chatApp";
import './app.css';
import {
    Switch,
    Route
} from "react-router-dom";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

//здесь можно редактировать цветовю схему приложения
//https://material.io/resources/color/
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#e5ffff',
            main: '#b2ebf2',
            dark: '#707070',
            contrastText: '#000',
        },
        secondary: {
            light: '#b2fab4',
            main: '#81c784',
            dark: '#519657',
            contrastText: '#000',
        },
    },
});


function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Switch>
                    <Route exact path='/login' render={() => <Login/>}/>
                    <Route path='/room/:id' render={() => <ChatApp isJoined={true}/>}/>
                    <Route exact path='/' render={() => <ChatApp/>}/>
                </Switch>
            </div>
        </ThemeProvider>
    );
}

export default App;
