import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    msgLeft: {
        margin: '10px 0',
        padding: '8px, 16px',
        listStyle: 'none'
    },
    msgAuthor: {
        fontSize: '14px',
        padding: '5px 10px',
        color: '#888',
        fontWeight: '600'
    },
    msgTime: {
        color: 'gray',
        margin: '6px',
        display: 'block',
        fontSize: '12px'
    },
    msgText: {
        width: 'fit-content',
        minWidth: '110px',
        padding: '14px',
        borderRadius: '8px',
        color: '#FFF',
        lineHeight: '20px',
    },
    myMsg: {
        textAlign: 'right',
        background: '#86BB71',
    },
    otherMsg: {
        background: '#94C2ED',
    },
    otherName: {
        textAlign: 'right'
    },
    root: {
        margin: '0'
    }
}));


function ChatMessage({message}) {
    console.log(message);
    const {author, text, date} = message;
    const msgDate = (new Date(date)).toISOString().substring(0, 10)
    const msgTime = (new Date(date)).getHours() + ':' + (new Date(date)).getMinutes();
    const time = msgDate + ' ' + msgTime;
    const styles = useStyles();

    if (message.isMyMessage) {
        return (
            <Grid className={styles.msgLeft} container>
                <Grid item xs={12} sm={3}>
                </Grid>
                <Grid container item xs={12} md={6} justify='flex-end'>
                    <Grid item>
                        <Box className={`${styles.msgText} ${styles.myMsg}`}>
                            {text}
                        </Box>
                        <span className={styles.msgTime}>{time}</span>
                    </Grid>

                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography
                        className={styles.msgAuthor}
                        variant='h6'>
                        {author}
                    </Typography>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Grid container className={styles.msgLeft}>
                <Grid item xs={12} sm={3}>
                    <Typography
                        className={`${styles.msgAuthor} ${styles.otherName}`}
                        variant='h6'>
                        {author}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className={`${styles.msgText} ${styles.otherMsg}`}>
                        {text}
                    </div>
                    <span className={styles.msgTime}>{time}</span>
                </Grid>
                <Grid item xs={12} sm={3}>

                </Grid>
            </Grid>
        );
    }
}

export default ChatMessage;
