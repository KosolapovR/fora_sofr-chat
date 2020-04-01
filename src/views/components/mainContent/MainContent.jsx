import React, {useEffect, useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import RoomsList from "../roomsList";
import Chat from "./chat";
import Button from "@material-ui/core/Button";
import shortHash from 'short-hash';
import {connect} from "react-redux";
import {createRoom, leaveRoom} from "../../../state/chat";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {findRoom} from "../../../utils/findRoom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyle = makeStyles({
    root: {
        minHeight: 'calc(100vh - 64px)',
    },
    head: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        borderBottom: '1px solid #CCC',
        borderRight: '1px solid #CCC',
        '&:first-child': {
            borderLeft: '1px solid #CCC'
        }
    },
    leaveRoom: {
        cursor: 'pointer',
    },
    chatWrapper: {
        minHeight: 'calc(100vh - 116px)',
    },
    roomsList: {
        borderRight: '1px solid #CCC',
        borderLeft: '1px solid #CCC',
        padding: '16px 32px',
    },
    chatWindow: {
        borderRight: '1px solid #CCC',
    }
});

const MainContent = ({
                         socket,
                         createRoom,
                         rooms,
                         isJoined,
                         user,
                         leaveRoom
                     }) => {

    const styles = useStyle();

    const [showAlert, setShowAlert] = useState(false);
    const [joinedUserName, setJoinedUserName] = useState(null);
    const [usersOnline, setUsersOnline] = useState([]);

    let {id} = useParams();

    const history = useHistory();

    const roomId = useRef(id);

    useEffect(() => {
        socket.on('room', room => {
            createRoom(room);
        });
    }, []);

    useEffect(
        () => {
            roomId.current = id
        },
        [id]
    );


    //уведомление о зашедшем пользователе
    useEffect(() => {
        socket.on('user_join_room', data => {
            if (roomId.current === data.room.hash) {
                setJoinedUserName(data.user.name);
                setShowAlert(true);
            }
        });
    }, []);

    //Юзер зашел в комнату по ссылке
    useEffect(() => {
        if (id) {
            //если комнаты нет в списке - добавляем
            if (!findRoom(id, rooms)) {
                socket.emit('get_room', id);
            }

            socket.emit('join_room', {user: {name: user}, room: {hash: id}});
        }
    }, []);

    useEffect(() => {
        socket.emit('get_users_in_room', {id});

    }, [id]);

    useEffect(() => {
        socket.on('users_in_room', users => {
            console.log('Пересчет онлайн юзеров');
            setUsersOnline(users);
        });
    }, []);

    const handleCreateRoom = () => {
        socket.emit('create_room', {user: {name: user}})
    };

    const handleSubmit = ({message}) => {
        socket.emit('send_message', {message, roomId: id});
    };

    const handleLeaveRoom = () => {
        socket.emit('leave_room', id);
        leaveRoom(id);
        history.push({
            pathname: "/"
        });
    };

    const currentRoom = rooms.find(r => r.hash === id);
    const roomName = currentRoom ? currentRoom.name : 'комната';
    return (
        <Box className={styles.root} display="flex" flexDirection='column' justifyContent='space-between'>

            <Box>
                <Grid container justify='space-between'>
                    <Grid
                        className={styles.head}
                        item
                        xs={3}
                    >
                        Выберите комату:
                    </Grid>
                    <Grid
                        className={styles.head}
                        item
                        xs={9}>
                        {isJoined && (
                            <>
                                <Button>{roomName}</Button>
                                {usersOnline && usersOnline.map(u => <span>{u.name}</span>)}
                                <ExitToAppIcon className={styles.leaveRoom} onClick={handleLeaveRoom}/>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>

            <Box flexGrow={1}>
                <Grid className={styles.chatWrapper} container>
                    <Grid
                        className={styles.roomsList}
                        item
                        xs={3}>
                        <RoomsList rooms={rooms}/>
                        <Button
                            color='secondary'
                            variant="contained"
                            onClick={handleCreateRoom}
                        >
                            Создать новую комнату
                        </Button>
                    </Grid>
                    <Grid
                        className={styles.chatWindow}
                        item xs={9}>
                        {isJoined && (
                            <Chat handleSubmit={handleSubmit} showAlert={showAlert} joinedUserName={joinedUserName}/>)}
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
};

const mapStateToProps = state => ({
    rooms: state.chat.rooms,
    user: state.chat.user
});

export default connect(mapStateToProps, {createRoom, leaveRoom})(MainContent);