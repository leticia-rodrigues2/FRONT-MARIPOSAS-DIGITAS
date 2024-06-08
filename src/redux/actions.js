export const fetchDataRequest = () => ({
    type: 'FETCH_DATA_REQUEST'
});

export const fetchDataSuccess = data => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: data
});

export const fetchDataFailure = error => ({
    type: 'FETCH_DATA_FAILURE',
    payload: error
});

export const fetchData = () => async dispatch => {
    dispatch(fetchDataRequest());
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        dispatch(fetchDataSuccess(data));
    } catch (error) {
        dispatch(fetchDataFailure(error));
    }
};