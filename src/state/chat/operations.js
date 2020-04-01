import {createNickNameAC, leaveRoomAC, savePrevUrlAC, sendMessageAC} from "./actions";
import {createRoomAC} from "./actions";
import axios from 'axios';

const createNickName = (nickname) => {
    return (dispatch) => {
        sessionStorage.setItem('user', nickname);
        dispatch(createNickNameAC(nickname));
    }
};

const createRoom = (room) => {
    return (dispatch) => {
        let currentRooms = JSON.parse(sessionStorage.getItem('rooms'));
        if(!currentRooms) currentRooms = [];
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

export {
    sendMessage,
    createNickName,
    createRoom,
    leaveRoom,
    savePrevUrl
}