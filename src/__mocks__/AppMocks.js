export const validProps = {
  cities: [
    {
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
    }
  ],
  deleteCity: jest.fn(),
  fetchCurrentWeatherById: jest.fn()
};

export const emptyProps = {
  cities: [],
  deleteCity: () => null,
  fetchCurrentWeatherById: () => null
};
