import { USER_LIST } from '../constants';

const initialState = [];
   


export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LIST:
          return action.payload  // return array of responce
        default:
          return state
      }
}