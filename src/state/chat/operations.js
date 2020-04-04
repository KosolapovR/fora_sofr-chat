import {
    createUserAC,
    createRoomAC,
    leaveRoomAC,
    saveMessageAC,
    savePrevUrlAC,
    sendMessageAC,
    resetNewMessageCountAC, exitAC
} from "./actions";

const createUser = (user) => {
    return (dispatch) => {
        //сохраняем созданного пользователя в текущую сессию
        sessionStorage.setItem('user', JSON.stringify(user));
        dispatch(createUserAC(user));
    }
};

const createRoom = (room) => {
    return (dispatch) => {
        //получаем комнаты пользователя
        let currentRooms = JSON.parse(sessionStorage.getItem('rooms'));

        if (!currentRooms) currentRooms = [];
        const newRooms = JSON.stringify([...currentRooms, room]);

        //сохраняем в сессию новое значение комнат
        sessionStorage.setItem('rooms', newRooms);
        dispatch(createRoomAC(room));
    }
};

const leaveRoom = (hash) => {
    return (dispatch) => {

        let currentRooms = JSON.parse(sessionStorage.getItem('rooms'));

        //удаляем из сессии комнату которую покинул пользователь
        const newRooms = currentRooms.filter(r => r.hash !== hash);

        sessionStorage.setItem('rooms', JSON.stringify(newRooms));
        dispatch(leaveRoomAC(newRooms));
    }
};

const sendMessage = (message) => {
    return (dispatch) => {
        dispatch(sendMessageAC(message))
    }
};

const savePrevUrl = (url) => {
    return (dispatch) => {
        dispatch(savePrevUrlAC(url))
    }
};

const saveMessage = (message) => {
    return (dispatch) => {
        dispatch(saveMessageAC(message))
    }
};

const resetNewMessageCount = (roomId) => {
    return (dispatch) => {
        dispatch(resetNewMessageCountAC(roomId))
    }
};

const exit = () => {
    return (dispatch) => {
        sessionStorage.clear();
        dispatch(exitAC())
    }
};

export {
    sendMessage,
    createUser,
    createRoom,
    leaveRoom,
    savePrevUrl,
    saveMessage,
    resetNewMessageCount,
    exit
}