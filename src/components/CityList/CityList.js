import styled from 'styled-components';
import React from 'react';

const unit = process.env.REACT_APP_UNITS === 'imperial' ? 'C' : 'F';

const CityList = ({ cities, onDelete }) => {
  const renderWeatherCard = city => {
    const {
      name,
      main: { temp, temp_min: min, temp_max: max },
      weather
    } = city;

    return (
      <WeatherCard key={city.id} onClick={onDelete(city.id)}>
        <CityName>{name}</CityName>
        <TemperatureSummary>
          {weather.map(elem => (
            <WeatherIcon key={`icon-${name}-${elem.id}`} icon={elem.icon} />
          ))}
          <CurrentTemperature>{temp}</CurrentTemperature>
          <Unit size='lg'>{unit}</Unit>
        </TemperatureSummary>
        <Divider />
        <Temperature>
          <Label>Min.</Label>
          <Value>{min}</Value>
          <Unit size='sm'>{unit}</Unit>
        </Temperature>
        <Temperature>
          <Label>Max.</Label>
          <Value>{max}</Value>
          <Unit size='sm'>{unit}</Unit>
        </Temperature>
      </WeatherCard>
    );
  };

  return cities && <Wrapper>{cities.map(renderWeatherCard)}</Wrapper>;
};

export default CityList;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px;
`;

const WeatherCard = styled.div`
  box-shadow: 0 6px 7px 0 rgba(0, 151, 182, 0.3);
  padding: 20px;
  background-color: #0097b6;
  color: #ffffff;
  width: 100%;
  margin: 0 20px 20px 0;
  border-radius: 5px;
  cursor: pointer;

  @media (min-width: 1024px) {
    width: calc((100% / 3) - 60px);
  }
`;

const TemperatureSummary = styled.div`
  display: flex;
  justify-content: center;
`;

const CurrentTemperature = styled.div`
  font-size: 60px;
  margin: 0;

  &:after {
    content: '°';
  }
`;

const Unit = styled.span`
  font-size: ${props => `${props.size === 'lg' ? '40px' : '20px'}`};
  margin: 0;
  vertical-align: top;
`;

const WeatherIcon = styled.div`
  width: 45px;
  height: 45px;
  background: ${props => `
    url(http://openweathermap.org/img/w/${props.icon}.png)
    repeat scroll 0% 0%
    transparent`};
`;

const CityName = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 20px;
`;

const Divider = styled.div`
  width: 30px;
  border: 2px solid #ffffff;
  margin: 20px auto;
`;

const Temperature = styled.div`
  width: 50%;
  display: inline-block;
  text-align: center;
`;

const Value = styled.span`
  font-size: 30px;
  margin: 0;

  &:after {
    content: '°';
  }
`;

const Label = styled.div``;
