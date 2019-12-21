import styled from 'styled-components';
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

import data from '../../data/weather.json';
import { escape } from '../../utils/common.js';

const Searchbox = ({ id, onSuggestionSelect }) => {
  const cities = data.map(cityData => ({
    name: cityData.city.name,
    id: cityData.city.id
  }));

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(cities);

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? cities
      : cities.filter(city => city.name.toLowerCase().includes(inputValue));
  };

  // To empty the input string on suggestion click
  const getSuggestionValue = suggestion => '';

  const renderSuggestion = suggestion => {
    let suggestionLabel = suggestion.name;
    const queryRegex = new RegExp(escape(value), 'ig');
    suggestionLabel = suggestionLabel.replace(queryRegex, '<b>$&</b>');

    return <Suggestion dangerouslySetInnerHTML={{ __html: suggestionLabel }} />;
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions(cities);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    onSuggestionSelect(suggestion);
  };

  const inputProps = {
    placeholder: 'Type the name of a city',
    value,
    onChange
  };

  return (
    <Wrapper>
      <Autosuggest
        id={id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        shouldRenderSuggestions={value => true}
        focusInputOnSuggestionClick={false}
        inputProps={inputProps}
      />
    </Wrapper>
  );
};

export default Searchbox;

const Wrapper = styled.div`
  padding: 10px;

  .react-autosuggest {
    &__container {
      width: 100%;
      margin: 0 auto;
      position: relative;
      padding-right: 20px;
      
      @media (min-width: 1024px) {
        width: 300px;
      }
    }

    &__suggestions-container {
      position: absolute;
      width: 100%;
      box-shadow: 0 6px 7px 0 rgba(0, 0, 0, 0.1);
      max-height: 200px;
      overflow: auto;
      background-color: #ffffff;
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      padding: 10px;
      border-top: 1px solid #e5e5e5;
      cursor: pointer;
    }
  }
`;

const Suggestion = styled.div``;
