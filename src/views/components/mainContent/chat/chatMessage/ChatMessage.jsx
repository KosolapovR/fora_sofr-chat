import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Avatar, Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    msgLeft: {
        maxWidth: '660px',
        margin: '10px auto',
        padding: '8px, 16px',
        listStyle: 'none',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '500px',
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '96%',
        },
    },
    msgAuthor: {
        textAlign: 'center',
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
    myMsgTime: {
        textAlign: 'right'
    },
    msgText: {
        margin: '0 6px',
        width: 'fit-content',
        minWidth: '110px',
        padding: '14px',
        borderRadius: '8px',
        lineHeight: '20px',
        overflow: 'hidden',
        boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.3)',
        color: '#000',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '400px',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px',
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '230px',
        },
    },
    myMsg: {
        textAlign: 'right',
        background: theme.palette.primary.main,
    },
    otherMsg: {
        background: '#fff',
    },
    otherName: {
        textAlign: 'right'
    },
    root: {
        margin: '0'
    },
    avatarWrapper: {
        padding: '0 10px',
    }
}));

function ChatMessage({message}) {
    const {author, text, date} = message;

    //форматируем вывод даты
    const msgDate = (new Date(date)).toISOString().substring(0, 10);
    const msgTime = (new Date(date)).getHours() + ':' + (new Date(date)).getMinutes();
    const time = msgDate + ' ' + msgTime;
    const styles = useStyles();

    if (message.isMyMessage) {
        return (
            <Grid
                className={styles.msgLeft}
                container
                justify='flex-end'
                wrap='nowrap'
            >
                <Grid item>
                    <Box className={`${styles.msgText} ${styles.myMsg}`}>
                        {text}
                    </Box>
                    <span className={`${styles.msgTime} ${styles.myMsgTime}`}>{time}</span>
                </Grid>
                <Grid item>
                    <Typography
                        className={styles.msgAuthor}
                        variant='h6'>
                        {author}
                    </Typography>
                    <Box className={styles.avatarWrapper}>
                        <Avatar alt='avatar' src={message.icon}/>
                    </Box>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Grid
                className={styles.msgLeft}
                container
                wrap='nowrap'
            >
                <Grid item>
                    <Typography
                        className={styles.msgAuthor}
                        variant='h6'>
                        {author}
                    </Typography>
                    <Box className={styles.avatarWrapper}>
                        <Avatar alt='avatar' src={message.icon}/>
                    </Box>
                </Grid>
                <Grid item>
                    <Box className={`${styles.msgText} ${styles.otherMsg}`}>
                        {text}
                    </Box>
                    <span className={styles.msgTime}>{time}</span>
                </Grid>
            </Grid>
        );
    }
}

export default ChatMessage;
