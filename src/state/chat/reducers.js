import {CREATE_NICKNAME, CREATE_ROOM, LEAVE_ROOM, SAVE_PREV_URL, SEND_MESSAGE} from "./types";

let rooms = JSON.parse(sessionStorage.getItem('rooms'));
if(!rooms) rooms = [];

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

            let index = state.findIndex((el) => el.hash === action.payload.hash);

            const newRooms = [...state.rooms];
            newRooms[index].messages = [...state.rooms[index].messages,
                {
                    author: action.payload.author,
                    text: action.payload.text,
                    date: action.payload.date
                }
            ];
            return {...state, rooms: newRooms};
        }

        case SAVE_PREV_URL: {
            console.log(SAVE_PREV_URL);
            return {...state, prevUrl: action.payload.id};
        }
        default: {
            return state
        }
    }
};

export default reducer;