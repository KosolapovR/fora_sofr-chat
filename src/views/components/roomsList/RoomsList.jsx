import React, {Fragment, useEffect, useRef} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {reset} from "redux-form";
import {connect} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import {List, ListItem, Divider, Badge, MenuItem, ListItemText, Button, Hidden} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import {resetNewMessageCount} from "../../../state/chat";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
    },
    inline: {
        display: 'inline',
    },
    selectRoomBtn: {
        background: theme.palette.secondary.light,
    },
    mailIcon: {
        margin: `0 5px`,
    }
}));

const RoomsList = ({rooms, resetForm, resetMsgCount, handleClose}) => {
    const classes = useStyles();

    let {id} = useParams();

    const roomId = useRef(id);
    useEffect(() => {
        if (roomId.current)
            resetMsgCount(roomId.current);
    }, [resetMsgCount]);

    const history = useHistory();

    const handleSelectRoom = (room) => {
        resetForm();
        history.push({
            pathname: `/room/${room.hash}`
        });
        resetMsgCount(room.hash);
    };

    return (
        <>
            <Hidden xsDown>
                <List className={classes.root}>
                    {rooms && rooms.map((r, index) => <Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={
                                    <Button
                                        className={classes.selectRoomBtn}
                                        variant='contained'
                                        fullWidth
                                        onClick={() => {
                                            handleSelectRoom(r)
                                        }}
                                    >
                                        {r.name}
                                        {r.newMessagesCount &&
                                        <Badge badgeContent={r.newMessagesCount} color="primary">
                                            <MailIcon className={classes.mailIcon}/>
                                        </Badge>}
                                    </Button>
                                }
                            />
                        </ListItem>
                        <Divider component="li"/>
                    </Fragment>)}
                </List>
            </Hidden>
            <Hidden smUp>
                {rooms && rooms.map((r, index) =>
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleClose();
                            handleSelectRoom(r);
                        }}
                    >
                        {r.name}
                    </MenuItem>
                )}
            </Hidden></>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        resetForm: () => dispatch(reset('messageForm')),
        resetMsgCount: (id) => dispatch(resetNewMessageCount(id))
    }
}

export default connect(null, mapDispatchToProps)(RoomsList);