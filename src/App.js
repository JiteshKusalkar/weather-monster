import styled from 'styled-components';
import React from 'react';
import { connect } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import { deleteCity, fetchCurrentWeatherById } from './actions/currentWeather';
import Searchbox from './components/Searchbox';
import CityList from './components/CityList';

const App = props => {
  const onSuggestionSelect = suggestion => {
    props.fetchCurrentWeatherById(suggestion.id);
  };

  const onDeleteCity = id => e => props.deleteCity(id);

  return (
    <Wrapper>
      <GlobalStyle />
      <Header>Weather Monster</Header>
      <Searchbox id='city-search' onSuggestionSelect={onSuggestionSelect} />
      <CityList cities={props.cities} onDelete={onDeleteCity} />
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  cities: state.currentWeather.cities
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentWeatherById: id => dispatch(fetchCurrentWeatherById(id)),
  deleteCity: id => dispatch(deleteCity(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input {
    width: 100%;
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 10px;
    line-height: 1;
  }
`;

const Header = styled.h1`
  font-size: 40px;
  font-weight: 400;
  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: 10%;
`;
