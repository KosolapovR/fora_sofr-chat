import {CREATE_NICKNAME, CREATE_ROOM, LEAVE_ROOM, SAVE_PREV_URL, SEND_MESSAGE} from "./types";

const createNickNameAC = nickname => ({
    type: CREATE_NICKNAME,
    nickname
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

export {
    createNickNameAC,
    createRoomAC,
    leaveRoomAC,
    sendMessageAC,
    savePrevUrlAC
}