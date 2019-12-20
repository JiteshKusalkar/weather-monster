import { getParams, instance } from '../api';

export const FETCH_CURRENT_WEATHER_REQUEST = 'FETCH_CURRENT_WEATHER_REQUEST';
export const FETCH_CURRENT_WEATHER_FAILURE = 'FETCH_CURRENT_WEATHER_FAILURE';

export const ADD_CITY = 'ADD_CITY';
export const DELETE_CITY = 'DELETE_CITY';

const fetchCurrentWeatherRequest = () => ({
  type: FETCH_CURRENT_WEATHER_REQUEST
});

const fetchCurrentWeatherFailure = error => ({
  type: FETCH_CURRENT_WEATHER_REQUEST,
  error
});

export const deleteCity = id => ({
  type: DELETE_CITY,
  payload: id
});

export const addCity = city => ({
  type: ADD_CITY,
  payload: city
});

export const fetchCurrentWeatherById = id => dispatch => {
  dispatch(fetchCurrentWeatherRequest());
  const params = getParams({ id });

  instance
    .get('weather', { params })
    .then(response => dispatch(addCity(response.data)))
    .catch(error => dispatch(fetchCurrentWeatherFailure(error)));
};
