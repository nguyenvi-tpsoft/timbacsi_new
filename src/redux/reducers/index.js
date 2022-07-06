import { combineReducers } from "redux";
import modal from './modal';
import phongkham_info from './phongkham_info'
import giokham from './giokham'

export default combineReducers({
    modal, phongkham_info, giokham
})