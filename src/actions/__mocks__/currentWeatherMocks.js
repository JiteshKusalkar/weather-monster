import { FETCH_CURRENT_WEATHER_REQUEST } from "../currentWeather";

export const response = [
  { type: FETCH_CURRENT_WEATHER_REQUEST },
  {
    payload: {
      base: 'stations',
      clouds: { all: 75 },
      cod: 200,
      coord: { lat: 27.72, lon: 85.32 },
      dt: 1576927921,
      id: 1283240,
      main: {
        feels_like: 12.66,
        humidity: 62,
        pressure: 1016,
        temp: 15,
        temp_max: 15,
        temp_min: 15
      },
      name: 'Kathmandu',
      sys: {
        country: 'NP',
        id: 9201,
        sunrise: 1576890297,
        sunset: 1576927681,
        type: 1
      },
      timezone: 20700,
      visibility: 7000,
      weather: [
        { description: 'broken clouds', icon: '04n', id: 803, main: 'Clouds' }
      ],
      wind: { deg: 270, speed: 2.6 }
    },
    type: 'ADD_CITY'
  }
];
