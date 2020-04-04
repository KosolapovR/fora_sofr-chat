import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Tooltip, Paper, Avatar, Grid} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        padding: '10px',
        background: theme.palette.primary.main
    },
    avatar: {
        margin: '6px',
        width: '20px',
        height: '20px'
    }
}));

function UsersOnline({users}) {

    const styles = useStyles();

    return (
        <Paper className={styles.root}>
            <Grid container alignItems='center'>
                <Grid item>
                    В сети:
                </Grid>
                {users.map((u, i) => <Grid item key={i}>
                    <Tooltip title={u.name}>
                        <Avatar
                            className={styles.avatar}
                            src={u.icon}
                            alt='avatar'
                        />
                    </Tooltip>
                </Grid>)}

            </Grid>
        </Paper>
    );
}


export default UsersOnline;