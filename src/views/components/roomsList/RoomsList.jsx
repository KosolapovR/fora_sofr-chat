import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {useHistory, useParams} from "react-router-dom";
import {reset} from "redux-form";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

const RoomsList = ({rooms, resetForm}) => {
    const classes = useStyles();

    let {id} = useParams();

    const roomId = useRef(id);

    const history = useHistory();

    const handleSelectRoom = (room) => {
        resetForm();
        history.push({
            pathname: `/room/${room.hash}`
        });
    };


    return (
        <List className={classes.root}>
            {rooms && rooms.map((r, index) => <>
                <ListItem key={index} alignItems="flex-start">
                    <ListItemText
                        primary={
                            <Button
                                color='primary'
                                style={{color: r.name, background: '#DEDEDE', fontWeight: 600, width:'100%'}}
                                onClick={() => {handleSelectRoom(r)}}
                            >
                                {r.name}
                            </Button>
                        }
                    />
                </ListItem>
                <Divider component="li"/>
            </>)}
        </List>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        resetForm: () => dispatch(reset('messageForm'))
    }
}

export default connect(null, mapDispatchToProps)(RoomsList);