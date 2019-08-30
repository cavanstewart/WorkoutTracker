import axios from 'axios';
import { ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ITEMS_DAY } from './types';
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getItemsDay = (day, month, year, user_id) => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get(`/api/items/${day}/${month}/${year}/${user_id}`)
        .then(res =>
            dispatch({
                type: GET_ITEMS_DAY,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const deleteItem = id => (dispatch, getState) => {
    axios
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addItem = item => (dispatch, getState) => {
    axios
        .post('/api/items', item, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};