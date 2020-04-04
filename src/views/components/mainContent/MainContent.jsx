import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {reset} from 'redux-form';
import {debounce} from 'lodash';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Menu, MenuItem, Hidden, Typography, Tooltip, Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RoomsList from "../roomsList";
import Chat from "./chat";
import {createRoom, leaveRoom, resetNewMessageCount, saveMessage} from "../../../state/chat";
import {sendMessage} from "../../../state/chat/operations";
import WelcomePage from "./welcomePage";
import UsersOnline from "./usersOnline";
import {findRoom} from "../../../utils/findRoom";


const useStyle = makeStyles(theme => ({
    root: {
        minHeight: 'calc(100vh - 64px)',
    },
    head: {
        background: theme.palette.primary.light,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2px 32px',
        [theme.breakpoints.down('sm')]: {
            padding: '2px 16px',
        },
        [theme.breakpoints.up('md')]: {
            minHeight: '62px',
        },
    },
    leaveRoom: {
        cursor: 'pointer',
    },
    chatWrapper: {
        minHeight: 'calc(100vh - 127px)',
        [theme.breakpoints.down('sm')]: {
            minHeight: `${window.innerHeight - 96}px`,
        },
    },
    roomsList: {
        padding: '16px 32px',
        background: theme.palette.primary.light,
    },
    createRoomBtnWrapper: {
        width: '100%',
        padding: '0 15px',
        [theme.breakpoints.down('sm')]: {
            width: '30px',
        },
    }
}));

const MainContent = ({
                         socket,
                         createRoom,
                         rooms,
                         isJoined,
                         user,
                         leaveRoom,
                         resetForm,
                         sendMessage,
                         saveMessage,
                     }) => {
    const styles = useStyle();

    const [showAlert, setShowAlert] = useState(false);
    const [joinedUserName, setJoinedUserName] = useState(null);
    const [usersOnline, setUsersOnline] = useState([]);
    const [typing, setTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick = (event) => {

        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick2 = (event) => {
        console.log(event.currentTarget);
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    let {id} = useParams();

    const history = useHistory();

    const roomId = useRef(id);

    useEffect(() => {
        socket.on('room', room => {
            createRoom(room);
        });
    }, []);

    useEffect(() => {
        roomId.current = id;
    }, [id]);

    //уведомление о зашедшем пользователе
    useEffect(() => {
        socket.on('user_join_room', data => {
            if (roomId.current === data.room.hash) {
                setJoinedUserName(data.user.name);
                setShowAlert(true);
            }
        });
    }, []);

    //пользователь зашел в комнату по ссылке
    useEffect(() => {
        if (id) {
            //если комнаты нет в списке - добавляем
            if (!findRoom(id, rooms)) {
                socket.emit('get_room', id);
            }
            socket.emit('join_room', {user, room: {hash: id}});
        }
    }, []);

    useEffect(() => {
        console.log('сменился url')
        socket.emit('get_users_in_room', {id});
    }, [id]);

    useEffect(() => {
        socket.on('message', message => {
            saveMessage({...message, currentRoomId: roomId.current});
        });
    }, []);

    useEffect(() => {
        socket.on('users_in_room', data => {
            if (data.hash === roomId.current) {
                setUsersOnline(data.users);
            }
        });
    }, []);

    useEffect(() => {
        socket.on('typing_on', ({user, hash}) => {
            if (hash === roomId.current) {
                setTypingUsers([...typingUsers, {name: user.name}]);
            }
        });
    }, []);

    useEffect(() => {
        socket.on('typing_off', ({user, hash}) => {
            if (hash === roomId.current) {
                setTypingUsers(typingUsers.filter(u => u.id !== user.id));
            }
        });
    }, []);

    const handleCreateRoom = () => {
        socket.emit('create_room', {user})
    };

    const handleSubmit = ({message}) => {
        if (message) {
            socket.emit('send_message', {message, roomId: id});
            sendMessage({
                text: message,
                date: Date.now(),
                roomId: id,
                author: 'Я',
                icon: user.icon,
                isMyMessage: true
            });
            resetForm();
        }
    };

    const handleLeaveRoom = () => {
        socket.emit('leave_room', id);
        resetForm();
        leaveRoom(id);
        history.push({
            pathname: "/"
        });
    };

    const typingStart = () => {
        socket.emit('start_typing', {user, roomId: id});
    };

    const typingStop = debounce(() => {
        socket.emit('stop_typing', {user, roomId: id});
        setTyping(false);
    }, 1500);

    const handleTyping = () => {
        if (!typing) {
            typingStart();
            setTyping(true);
            typingStop();
        }

    };

    let currentRoom;

    if (rooms) {
        currentRoom = rooms.find(r => r.hash === id);
    }

    const roomName = currentRoom ? currentRoom.name : 'комната';
    const messages = currentRoom ? currentRoom.messages : [];

    return (
        <Box className={styles.root} display="flex" flexDirection='column' justifyContent='space-between'>

            <Box>
                <Grid container justify='space-between'>
                    <Grid
                        container
                        justify='space-between'
                        className={styles.head}
                        item
                        xs={false} md={3}
                    >
                        <Box className={styles.createRoomBtnWrapper}>
                            <Hidden smDown>
                                <Button
                                    className={styles.createRoomBtn}
                                    fullWidth
                                    size='small'
                                    variant="contained"
                                    onClick={handleCreateRoom}
                                    color='secondary'
                                >Создать комнату
                                </Button>
                            </Hidden>
                        </Box>
                    </Grid>
                    <Grid
                        className={styles.head}
                        item
                        xs={12} md={9}>
                        {isJoined && (
                            <>
                                <Box>
                                    <Hidden smDown>
                                        <Typography color="textSecondary">
                                            Текущая комната:
                                        </Typography>
                                    </Hidden>
                                    <Typography variant="h5" component="h2">
                                        {roomName.toUpperCase()}
                                    </Typography>
                                </Box>
                                <Hidden smDown>
                                    {usersOnline && <UsersOnline users={usersOnline}/>}
                                    <Tooltip title="Покинуть комнату">
                                        <ExitToAppIcon className={styles.leaveRoom} onClick={handleLeaveRoom}/>
                                    </Tooltip>
                                </Hidden>
                            </>
                        )}
                        <Hidden mdUp>
                            <MenuIcon onClick={handleClick}/>
                            <Menu id="head_menu"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}>
                                <MenuItem onClick={() => {
                                    handleClose();
                                }}>
                                    <Button
                                        className={styles.createRoomBtn}
                                        fullWidth
                                        size='small'
                                        variant="contained"
                                        onClick={handleCreateRoom}
                                        color='secondary'
                                    >
                                        <Tooltip title="Создать комнату">
                                            <AddIcon/>
                                        </Tooltip>
                                    </Button>
                                </MenuItem>
                                {rooms.length > 0 &&
                                <MenuItem>
                                    <Button variant='text' onClick={(e) => {
                                        handleClick2(e);
                                        handleClose(e);
                                    }}>Выбрать комнату</Button>
                                    <Menu id="nested_menu"
                                          anchorEl={anchorEl2}
                                          keepMounted
                                          open={Boolean(anchorEl2)}
                                          onClose={handleClose2}>
                                        <RoomsList handleClose={handleClose2} rooms={rooms}/>
                                    </Menu>
                                </MenuItem>
                                }
                                {rooms.length > 0 && isJoined &&
                                <MenuItem onClick={() => {
                                    handleClose();
                                }}>
                                    {usersOnline && <UsersOnline users={usersOnline}/>}
                                </MenuItem>}
                                {rooms.length > 0 && isJoined &&
                                < MenuItem
                                    onClick={() => {
                                        handleClose();
                                    }}
                                >
                                    <Button className={styles.leaveRoom} onClick={handleLeaveRoom}>
                                        Покинуть комнату
                                    </Button>
                                </MenuItem>}

                            </Menu>
                        </Hidden>
                    </Grid>
                </Grid>
            </Box>

            <Box flexGrow={1}>
                <Grid className={styles.chatWrapper} container>
                    <Hidden smDown>
                        <Grid
                            className={styles.roomsList}
                            item
                            xs={12} sm={3}>
                            {rooms.length > 0 &&
                            <Typography variant="subtitle2">
                                Ваши комнаты:
                            </Typography>}
                            <RoomsList rooms={rooms}/>
                        </Grid>
                    </Hidden>
                    <Grid
                        item
                        className={styles.chatWindow}
                        xs={12} md={9}>
                        {isJoined ? (
                            <Chat
                                handleSubmit={handleSubmit}
                                onChange={handleTyping}
                                showAlert={showAlert}
                                joinedUserName={joinedUserName}
                                messages={messages}
                                typingUsers={typingUsers}
                            />
                        ) : (<WelcomePage/>)}
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

function mapDispatchToProps(dispatch) {
    return {
        createRoom: (room) => dispatch(createRoom(room)),
        leaveRoom: (id) => dispatch(leaveRoom(id)),
        resetForm: () => dispatch(reset('messageForm')),
        saveMessage: (message) => dispatch(saveMessage(message)),
        sendMessage: (message) => dispatch(sendMessage(message)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);