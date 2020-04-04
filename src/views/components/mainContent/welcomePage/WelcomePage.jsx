import React from 'react';
import {connect} from "react-redux";
import {Typography, Avatar, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1)',
        background: '#efefef',
        height: '100%'
    },
    header: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px',
            textAlign: 'center'
        },
    },
    avatar: {
        marginTop: '20px',
        width: '60px',
        height: '60px',
    }
}));

function WelcomePage({user}) {

    const styles = useStyles();

    return (
        <Grid
            container
            direction='column'
            className={styles.root}
            justify='center'
            alignItems='center'
        >
            <Grid item>
                <Typography
                    className={styles.header}
                    component='h1'
                    variant='h4'
                >
                    Добро пожаловать, {user.name}
                </Typography>
            </Grid>
            <Grid item>
                <Avatar
                    alt='avatar'
                    className={styles.avatar}
                    src={user.icon}
                />
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => ({
    user: state.chat.user
});

export default connect(mapStateToProps, {})(WelcomePage);