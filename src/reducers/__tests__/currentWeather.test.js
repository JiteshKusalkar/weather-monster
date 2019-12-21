import unroll from 'unroll';
import { currentWeatherReducer } from '../currentWeather';
import {
  FETCH_CURRENT_WEATHER_FAILURE,
  ADD_CITY,
  DELETE_CITY
} from '../../actions/currentWeather';

const city = {
  id: 1283240,
  name: 'Kathmandu',
  main: {
    temp: 57.2,
    temp_max: 57.2,
    temp_min: 57.2
  },
  weather: [
    {
      description: 'mist',
      icon: '50d',
      id: 701,
      main: 'Mist'
    }
  ]
};

const initialState = {
  cities: [city],
  isFetching: false,
  error: null
};

unroll.use(it);

describe('Current weather reducer', () => {
  unroll(
    'should #action',
    (done, args) => {
      expect(
        currentWeatherReducer(initialState, args.type)
      ).toEqual(args.result);
      done();
    },
    [
      ['action', 'type', 'result'],
      [
        'register error',
        {
          type: FETCH_CURRENT_WEATHER_FAILURE,
          error: 'FETCH_CURRENT_WEATHER_FAILURE'
        },
        {
          ...initialState,
          isFetching: true,
          error: 'FETCH_CURRENT_WEATHER_FAILURE'
        }
      ],
      [
        'add city ordered by max temperature',
        {
          type: ADD_CITY,
          payload: city
        },
        { ...initialState, isFetching: true, cities: [city] }
      ],
      [
        'delete city by id',
        {
          type: DELETE_CITY,
          payload: 1283240
        },
        { ...initialState, cities: [] }
      ]
    ]
  );
});
