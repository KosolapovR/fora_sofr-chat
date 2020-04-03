import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        padding: '10px',
        borderRadius: '10px',
        width: '280px',
        margin: '20px auto',
        background: '#DDD'

    },
    avatar: {
        textAlign: 'center',
        margin: '10px auto',
        padding: '0 10px',
        height: '40px',
        width: '40px',
        borderRadius: '20px',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.1)',
            transition: 'all .2s ease-in-out'
        },
        '&:active': {
            transform: 'scale(1.1)',
        }
    },
    currentAvatar: {
        margin: '10px auto'
    }
});


function IconsList({handleChange, selectedIcon}) {

    const styles = useStyles();

    const handleSelect = (e) => {
        handleChange(e.target.src);
    };

    let avatars = new Array(12);
    avatars = avatars
        .fill(0)
        .map((a, i) =>
            <Grid className={styles.avatar} key={i} item xs={3}>
                <Avatar onClick={handleSelect} alt='avatar' src={`http://localhost:3000/icons/${i + 1}.svg`}/>
            </Grid>
        );

    return (
        <Paper className={styles.root}>
            <Typography variant='subtitle2'>
                Текущая аватарка:
            </Typography>
            <Avatar className={styles.currentAvatar} alt='avatar' src={selectedIcon}/>
            <Grid  container justify="space-around">
                {avatars}
            </Grid>
        </Paper>
    );
}

export default IconsList;