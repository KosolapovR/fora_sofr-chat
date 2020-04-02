import {CREATE_NICKNAME, CREATE_ROOM, LEAVE_ROOM, SAVE_MESSAGE, SAVE_PREV_URL, SEND_MESSAGE} from "./types";

let rooms = JSON.parse(sessionStorage.getItem('rooms'));
if (!rooms) rooms = [];

const initialState = {
    user: sessionStorage.getItem('user'),
    rooms: rooms,
    prevUrl: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NICKNAME: {
            return {...state, user: action.nickname}
        }
        case CREATE_ROOM: {
            return {
                ...state,
                rooms:
                    [...state.rooms, {
                        name: action.payload.name,
                        hash: action.payload.hash
                    }]
            }
        }
        case LEAVE_ROOM: {
            debugger;
            return {...state, rooms: action.payload};
        }
        case SEND_MESSAGE: {
            const index = state.rooms.findIndex(r => r.hash === action.payload.roomId);
            const newRooms = [...state.rooms];


            newRooms[index].messages = newRooms[index].messages
                ?
                [...state.rooms[index].messages, {
                    author: action.payload.author,
                    text: action.payload.text,
                    date: action.payload.date,
                    isMyMessage: action.payload.isMyMessage
                }]
                :
                [{
                    author: action.payload.author,
                    text: action.payload.text,
                    date: action.payload.date,
                    isMyMessage: action.payload.isMyMessage
                }];

            return {...state, rooms: newRooms};
        }
        case SAVE_PREV_URL: {
            return {...state, prevUrl: action.payload.id};
        }
        case SAVE_MESSAGE: {
            const index = state.rooms.findIndex(r => r.hash === action.payload.roomId);
            const newRooms = [...state.rooms];


            newRooms[index].messages = newRooms[index].messages
                ?
                [...state.rooms[index].messages, {
                    author: action.payload.author,
                    text: action.payload.text,
                    date: action.payload.date
                }]
                :
                [{
                    author: action.payload.author,
                    text: action.payload.text,
                    date: action.payload.date
                }];

            return {...state, rooms: newRooms};
        }
        default: {
            return state
        }
    }
};

export default reducer;