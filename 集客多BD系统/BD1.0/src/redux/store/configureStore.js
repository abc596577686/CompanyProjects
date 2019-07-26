import { createStore } from 'redux';
import reducer from './../reducer';

const initialState = {
    menuName: ''
};

const configureStore = () => createStore(
  reducer,
  initialState
);

export default configureStore;