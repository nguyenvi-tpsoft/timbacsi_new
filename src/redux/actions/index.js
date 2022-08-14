import { createActions, createAction } from 'redux-actions';


export const getType = (reduxAction) => {
    return reduxAction().type;
}

export const createInfoPhongKham = createAction('PUSH_INFO_PHONGKHAM');


export const showModal = createAction('SHOW_MODAL');
export const hideModal = createAction('HIDE_MODAL');

//todo giờ khám
export const createGiokham = createActions({
    createGiokhamRequest: (payload) => payload,
    createGiokhamSuccess: (payload) => payload,
    createGiokhamFailure: (err) => err,
});