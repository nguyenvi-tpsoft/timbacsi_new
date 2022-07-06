import { createActions, createAction } from 'redux-actions';


export const getType = (reduxAction) => {
    return reduxAction().type;
}

export const createInfoPhongKham = createAction('PUSH_INFO_PHONGKHAM');


export const showModal = createAction('SHOW_CREATE_POST_MODAL');
export const hideModal = createAction('HIDE_CREATE_POST_MODAL');

//todo giờ khám
export const createGiokham = createActions({
    createGiokhamRequest: (payload) => payload,
    createGiokhamSuccess: (payload) => payload,
    createGiokhamFailure: (err) => err,
});