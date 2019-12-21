import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import unroll from 'unroll';

import {
  addCity,
  ADD_CITY,
  deleteCity,
  fetchCurrentWeatherById,
  DELETE_CITY,
  fetchCurrentWeatherFailure
} from '../currentWeather';
import { response } from '../__mocks__/currentWeatherMocks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
unroll.use(it);

describe('current weather actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
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
  unroll(
    'should create an action to #actionName',
    (done, args) => {
      expect(args.actionToTest).toEqual(args.result);
      done();
    },
    [
      ['actionName', 'actionToTest', 'result'],
      ['add a city', addCity(city), { type: ADD_CITY, payload: city }],
      [
        'delete a city by id',
        deleteCity(1283240),
        { type: DELETE_CITY, payload: 1283240 }
      ]
    ]
  );

  it('should create action to fetch current weather by id', async done => {
    moxios.stubRequest('weather', {
      status: 200,
      response: response
    });
    const store = mockStore({});
    await store.dispatch(fetchCurrentWeatherById(1283240)).then(res => {
      expect(store.getActions()).toEqual([res]);
    });
    done();
  });
});
