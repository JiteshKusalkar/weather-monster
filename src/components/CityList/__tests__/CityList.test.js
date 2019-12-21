import { shallow } from 'enzyme';
import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import unroll from 'unroll';

import { emptyProps, validProps } from '../__mocks__/CityListMock';
import { Unit, WeatherIcon, WeatherCard } from '../CityList';
import CityList from '../';

const shallowInstance = props => shallow(<CityList {...props} />);
unroll.use(it);

describe('Snapshot: CityList', () => {
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

describe('Unit: CityList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowInstance(validProps);
  });

  it('should delete city on click of weather card', () => {
    wrapper.find(WeatherCard).simulate('click');

    expect(validProps.onDelete).toHaveBeenCalledWith(1283240);
  });
});

unroll(
  'should have font size #fontSize for #size size',
  (done, args) => {
    const tree = renderer.create(<Unit size={args.size} />).toJSON();
    expect(tree).toHaveStyleRule('font-size', args.fontSize);
    done();
  },
  [['size', 'fontSize'], ['lg', '40px'], ['sm', '20px']]
);

it('should render the image corresponding to icon', () => {
  const tree = renderer.create(<WeatherIcon icon='50d' />).toJSON();
  expect(tree).toHaveStyleRule(
    'background',
    'url(http://openweathermap.org/img/w/50d.png) repeat scroll 0% 0% transparent'
  );
});
