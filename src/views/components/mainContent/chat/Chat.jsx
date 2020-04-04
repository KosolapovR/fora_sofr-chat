import React from 'react';
import {Box, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ChatMessage from "./chatMessage";
import ChatForm from "./chatForm";
import TransitionAlert from "./transitionAlert";
import TypingSpinner from "./typingSpinner";
import ScrollToBottom from 'react-scroll-to-bottom';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1)',
        background: '#efefef',
        position: 'relative',
        height: '100%'
    },
    form: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    input: {
        flexGrow: 1
    },
    chatWrapper: {
        height: '100%',
        flexGrow: 1
    },
    chatHistory: {
        height: `${window.innerHeight - 255}px`,
        padding: '5px 30px',
        [theme.breakpoints.down('sm')]: {
            padding: '5px 5px 20px',
            height: `${window.innerHeight - 215}px`,
        },
    }
}));

function Chat({handleSubmit, joinedUserName, showAlert, onChange, typingUsers, messages = []}) {

    const styles = useStyles();

    return (
        <Box
            className={styles.root}
            display="flex"
            flexDirection="column"
            justifyContent='space-between'
        >
            <TransitionAlert name={joinedUserName} show={showAlert}/>
            <Grid
                className={styles.chatWrapper}
                container
                justify='space-between'
                direction='column'
            >
                <Grid item>
                    <ScrollToBottom className={styles.chatHistory}>
                        {messages.map((m, i) => <ChatMessage key={i} message={m}/>)}
                    </ScrollToBottom>
                </Grid>
                <Grid item>
                    {typingUsers.length > 0 ? (typingUsers.map(u => <TypingSpinner name={u.name}/>)) :
                        <div style={{height: '34px'}}></div>}
                </Grid>
            </Grid>
            <Box>
                <ChatForm onSubmit={handleSubmit} onChange={onChange}/>
            </Box>
        </Box>
    );
}

export default Chat;