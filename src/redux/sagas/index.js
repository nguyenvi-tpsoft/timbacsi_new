
import { takeEvery, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import phongkhamApi from '../../api/phongkhamApi';
function* createGiokhamSaga(action) {
    try {
        const giokham = yield call(phongkhamApi.getkhunggio, action.payload);
        yield put(actions.createGiokham.createGiokhamSuccess(giokham));
    } catch (err) {
        console.error(err);
    }
}
function* mySaga() {
    yield takeEvery(actions.createGiokham.createGiokhamRequest, createGiokhamSaga);
}


export default mySaga;