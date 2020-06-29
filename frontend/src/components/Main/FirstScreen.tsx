import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import { Button, CircularProgress} from '@material-ui/core';
import { Weather } from './Weather';
import img from './img/norw.jpg';

type WeatherState = [{
  applicable_date?: string;
  the_temp?: number;
  max_temp?: number;
  min_temp?: number;
  weather_state_name?: string;
  weather_state_abbr?: string;
}]

const FirstScreen = () => {
  const [city, setCity] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ weather, setWeather ] = useState<WeatherState>();

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get('/weather/latest', {
        headers: { 
          'content-type': 'application/json',
        }
      });
      
      console.log('DATA front: ', data);

      setWeather(data.consolidated_weather);
      setCity(data.title);
      setIsLoading(false);
    } catch(e) {
      throw e;
    }
  }

  return (
    <MainScreen>
      <GlobalStyle />
      <WeatherWrap>
      <h1>{city}</h1> 
      <Items>
      {
        isLoading ?
          <Loader><CircularProgress color="secondary" /></Loader>
          : weather && weather.map((item: any, index: number) => {
            return (
                <Weather
                  key={`${item.weather_state_name}-${index}`}
                  data={item.applicable_date}
                  temp={item.the_temp}
                  max_temp={item.max_temp}
                  min_temp={item.min_temp}
                  name={item.weather_state_name}
                  icon={item.weather_state_abbr}
              />
            )
          })
      }
      </Items>

      <ButtonWrap>
        <Button 
          onClick={handleClick}
          color="primary"
          variant="contained"  
        >
         Получить прогноз погоды
        </Button>
      </ButtonWrap>
      </WeatherWrap>
    </MainScreen>
  )
};


const MainScreen = styled.div`
  background-image: url(${img});
  background-size: cover;
  height: 100vh;
  position: relative;
  z-index: 6;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before {
    background: #000;
    opacity: .6;
    content: ' ';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -6;
  }
`;

const Loader = styled.div`
  margin: 0 auto;
`;

const Items = styled.div`
  display: flex;
  justify-content: space-around;
`;

const WeatherWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrap = styled.div`
  display: block;
  margin-top: 50px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`

export { FirstScreen };