import { INIT_STATE } from '../../constant';
import { getType, createInfoPhongKham } from '../actions';

export default function phongkham_infoReducers(state = INIT_STATE.phongkham_info, action) {
    switch (action.type) {
        case getType(createInfoPhongKham):
            return state = action.payload;

        default:
            return state;
    }
}