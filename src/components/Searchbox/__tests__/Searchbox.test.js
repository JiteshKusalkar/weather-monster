import { shallow } from 'enzyme';
import React from 'react';
import Autosuggest from 'react-autosuggest';
import unroll from 'unroll';

import Searchbox from '../';

const validProps = {
  id: 'city-search',
  onSuggestionSelect: jest.fn()
};

const emptyProps = {
  id: '',
  onSuggestionSelect: () => null
};

const shallowInstance = props => shallow(<Searchbox {...props} />);
unroll.use(it);

describe('Snapshot: Searchbox', () => {
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

describe('Unit: Searchbox', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowInstance(validProps);
  });

  it('should delete city on click of weather card', () => {
    const evt = {};
    const suggestion = {
      city: {
        id: 147059,
        name: 'Telmankend',
        findname: 'TELMANKEND',
        country: 'AZ',
        coord: { lon: 48.399021, lat: 39.87867 },
        zoom: 10
      }
    };
    wrapper.find(Autosuggest).simulate('suggestionSelected', evt, { suggestion });

    expect(validProps.onSuggestionSelect).toHaveBeenCalledWith(suggestion);
  });
});
