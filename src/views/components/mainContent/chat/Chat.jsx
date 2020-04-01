import React from 'react';
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ChatMessage from "./chatMessage";
import ChatForm from "./chatForm";
import TransitionAlert from "./transitionAlert";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        height: '100%'
    },
    messages: {},
    form: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    input: {
        flexGrow: 1
    },
}));

function Chat({handleSubmit, joinedUserName, showAlert}) {

    const styles = useStyles();

    const messages = [{author: 'Жанна', text: 'Привет всем', date: Date.now()},
        {author: 'Никита', text: 'Хай', date: Date.now()},
        {author: 'Я', text: 'Салют', date: Date.now()}];

    console.log('render Chat');

    return (
        <Box className={styles.root} display="flex" flexDirection="column" justifyContent='space-between'>
            <TransitionAlert name={joinedUserName} show={showAlert}/>
            <Box className={styles.messages} flexGrow={1}>
                <ul>
                    {messages.map((m, i) => <ChatMessage key={i} message={m}/>)}
                </ul>
            </Box>
            <Box>
                <ChatForm onSubmit={handleSubmit} />
            </Box>
        </Box>
    );
}

export default Chat;