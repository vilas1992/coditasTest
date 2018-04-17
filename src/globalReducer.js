// global data for application.

import {combineReducers} from 'redux';
import UserReducer from './githubUserContainer/Reducer/index';


const allReducers = combineReducers({
    users: UserReducer
});

export default allReducers