import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    msgLeft: {
        padding: '8px, 16px',
        listStyle: 'none',
        maxWidth: '80%',
    },
    msgAuthor: {
        padding: '5px 10px',
        fontStyle: 'italic',
        color: '#888',
        fontWeight: '600'
    },
     root: {
        margin: '0px'
     }
}));

function ChatMessage({message}) {

    const {author, text, date} = message;
    const msgDate = (new Date(date)).toISOString().substring(0, 10)
    const msgTime = (new Date(date)).getHours() + ':' + (new Date(date)).getMinutes();
    const time = msgDate + ' ' + msgTime;
    const styles = useStyles();

    return (
        <li className={styles.msgLeft}>
            <Grid className={styles.root} container spacing={3}>
                <Grid item>
                    <Typography
                        className={styles.msgAuthor}
                        component='span'>
                        {author}
                    </Typography>
                </Grid>
                <Grid item>
                    <div>
                        <div>
                            {text}
                        </div>
                        <span>{time}</span>
                    </div>
                </Grid>
            </Grid>
        </li>
    );
}

export default ChatMessage;