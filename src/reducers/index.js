import { combineReducers } from 'redux';
import { currentWeatherReducer } from './currentWeather';

export default combineReducers({ currentWeather: currentWeatherReducer });
