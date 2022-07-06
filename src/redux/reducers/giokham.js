import { INIT_STATE } from '../../constant';
import { createGiokham, getType } from '../actions';

export default function giokhamReducers(state = INIT_STATE.giokham, action) {

    switch (action.type) {
        case getType(createGiokham.createGiokhamSuccess):
            return state = action.payload
        default:
            return state;
    }
}