import { shallow } from 'enzyme';
import React from 'react';
import unroll from 'unroll';

import CityList from '../components/CityList';
import { WeatherCard } from '../components/CityList/CityList';
import Searchbox from '../components/Searchbox';
import { emptyProps, validProps } from '../__mocks__/AppMocks';
import { App } from '../App';

const shallowInstance = props => shallow(<App {...props} />);
unroll.use(it);

describe('Snapshot: App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowInstance(emptyProps);
  });

  unroll(
    'should match the snapshot for #propType',
    (done, args) => {
      wrapper.setProps(args.value);
      expect(wrapper).toMatchSnapshot();
      done();
    },
    [
      ['propType', 'value'],
      ['valid props', validProps],
      ['empty props', emptyProps]
    ]
  );
});

// Unit tests
describe('Unit: App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowInstance(validProps);
  });

  it('should delete city by id', () => {
    wrapper
      .find(CityList)
      .dive()
      .find(WeatherCard)
      .simulate('click', 'evt');

    expect(validProps.deleteCity).toHaveBeenCalledWith(1283240);
  });

  it('should fetch current weather by id on suggestion select', () => {
    const suggestion = validProps.cities[0];
    wrapper.find(Searchbox).simulate('suggestionSelect', suggestion);

    expect(validProps.fetchCurrentWeatherById).toHaveBeenCalledWith(suggestion.id);
  });
});
