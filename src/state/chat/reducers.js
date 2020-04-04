import {
    CREATE_USER,
    CREATE_ROOM,
    LEAVE_ROOM,
    SAVE_MESSAGE,
    SAVE_PREV_URL,
    SEND_MESSAGE,
    RESET_NEW_MESSAGE_COUNT, EXIT
} from "./types";

let rooms = JSON.parse(sessionStorage.getItem('rooms'));
if (!rooms) rooms = [];

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')),
    rooms: rooms,
    prevUrl: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER: {
            return {...state, user: {name: action.payload.name, icon: action.payload.icon}}
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
                    icon: action.payload.icon,
                    isMyMessage: action.payload.isMyMessage
                }]
                :
                [{
                    author: action.payload.author,
                    text: action.payload.text,
                    date: action.payload.date,
                    icon: action.payload.icon,
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
                    date: action.payload.date,
                    icon: action.payload.icon
                }]
                :
                [{
                    author: action.payload.author,
                    text: action.payload.text,
                    date: action.payload.date,
                    icon: action.payload.icon,
                }];

            if (action.payload.roomId !== action.payload.currentRoomId) {
                newRooms[index].newMessagesCount = newRooms[index].newMessagesCount ? newRooms[index].newMessagesCount + 1 : 1;
            }

            return {...state, rooms: newRooms};
        }
        case RESET_NEW_MESSAGE_COUNT: {
            const index = state.rooms.findIndex(r => r.hash === action.payload);

            if (index >= 0) {
                const newRooms = [...state.rooms];
                newRooms[index].newMessagesCount = null;
                return {...state, rooms: newRooms};
            }
            return state
        }
        case EXIT: {
            return {...state, user: null, rooms: null}
        }
        default: {
            return state
        }
    }
};

export default reducer;