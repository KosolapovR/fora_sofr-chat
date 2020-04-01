import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";

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

const RoomsList = ({rooms}) => {
    const classes = useStyles();

    const history = useHistory();

    const handleSelectRoom = (room) => {
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
                                variant="contained"
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

export default RoomsList;