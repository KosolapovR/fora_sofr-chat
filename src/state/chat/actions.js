import {
    CREATE_USER,
    CREATE_ROOM,
    LEAVE_ROOM,
    SAVE_MESSAGE,
    SAVE_PREV_URL,
    SEND_MESSAGE
} from "./types";

const createUserAC = payload => ({
    type: CREATE_USER,
    payload
});

const createRoomAC = payload => ({
    type: CREATE_ROOM,
    payload
});

const leaveRoomAC = payload => ({
    type: LEAVE_ROOM,
    payload
});

const sendMessageAC = payload => ({
    type: SEND_MESSAGE,
    payload
});

const savePrevUrlAC = payload => ({
    type: SAVE_PREV_URL,
    payload
});

const saveMessageAC = payload => ({
    type: SAVE_MESSAGE,
    payload
});

export {
    createUserAC,
    createRoomAC,
    leaveRoomAC,
    sendMessageAC,
    savePrevUrlAC,
    saveMessageAC
}