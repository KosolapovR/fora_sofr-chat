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
    chatWrapper: {
        height: '100%',
        flexGrow: 1
    },
    chatHistory: {
        height: 'calc(100vh - 240px)',
        padding: '50px 30px 20px',
    }
}));

function Chat({handleSubmit, joinedUserName, showAlert, onChange, typingUsers, messages = []}) {

    const styles = useStyles();

    return (
        <Box className={styles.root} display="flex" flexDirection="column" justifyContent='space-between'>
            <TransitionAlert name={joinedUserName} show={showAlert}/>
            <Box className={styles.messages} flexGrow={1}>
                <Grid className={styles.chatWrapper} container justify='space-between' direction='column'>
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
            </Box>
            <Box>
                <ChatForm onSubmit={handleSubmit} onChange={onChange}/>
            </Box>
        </Box>
    );
}

export default Chat;