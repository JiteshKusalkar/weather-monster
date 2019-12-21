import produce from 'immer';
import {
  FETCH_CURRENT_WEATHER_FAILURE,
  ADD_CITY,
  DELETE_CITY
} from '../actions/currentWeather';
import { sortByMaxTemperature } from '../utils/common';

const initialState = {
  isFetching: false,
  cities: [],
  error: null
};

export const currentWeatherReducer = (state = initialState, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case FETCH_CURRENT_WEATHER_FAILURE:
        draftState.isFetching = true;
        draftState.error = action.error;
        return;

      case ADD_CITY:
        const isExist = draftState.cities.find(
          city => action.payload.id === city.id
        );
        draftState.isFetching = true;
        if (!isExist) {
          draftState.cities = draftState.cities
            .concat(action.payload)
            .sort(sortByMaxTemperature);
        }
        return;

      case DELETE_CITY:
        draftState.cities = draftState.cities.filter(
          cityDetails => action.payload !== cityDetails.id
        );
        return;

      default:
        return;
    }
  });
