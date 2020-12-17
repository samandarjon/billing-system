import {GET_FILE} from "../actions/types";

const initialState = {};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FILE: {
            return action.payload
        }
        default: {
            return state
        }
    }
}