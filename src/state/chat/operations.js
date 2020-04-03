import {createUserAC, createRoomAC, leaveRoomAC, saveMessageAC, savePrevUrlAC, sendMessageAC} from "./actions";

const createUser = (user) => {
    return (dispatch) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        dispatch(createUserAC(user));
    }
};

const createRoom = (room) => {
    return (dispatch) => {
        let currentRooms = JSON.parse(sessionStorage.getItem('rooms'));
        if (!currentRooms) currentRooms = [];
        const newRooms = JSON.stringify([...currentRooms, room]);
        sessionStorage.setItem('rooms', newRooms);
        dispatch(createRoomAC(room));
    }
};

const leaveRoom = (hash) => {
    return (dispatch) => {
        let currentRooms = JSON.parse(sessionStorage.getItem('rooms'));
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

export {
    sendMessage,
    createUser,
    createRoom,
    leaveRoom,
    savePrevUrl,
    saveMessage
}