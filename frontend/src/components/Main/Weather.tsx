import React from "react";

import styled from 'styled-components';

interface WeatherProps {
  data?: string;
  temp?: number;
  max_temp?: number;
  min_temp?: number;
  name?: string;
  icon?: string;
  direction?: string;
  speed?: number;
}

const Weather = ({ data, temp, max_temp, min_temp, name, icon, direction, speed }: WeatherProps) => {
  return (
    <Item>
      <p>Погода: {name}</p>
      <p>Дата: {data}</p>
      <p>Температура: {Math.round(temp || 1)}</p>
      <p>Максимальная температура: {Math.round(max_temp || 1)}</p>
      <p>Минимальная температура: {Math.round(min_temp || 1)}</p>
      <p>Скорость ветра: {Math.round(speed || 1)}</p>
      <p>Направление ветра ветра: {direction}</p>
      <p>
        <Img src={`https://www.metaweather.com/static/img/weather/${icon}.svg`} />
      </p>
    </Item>
  )
};

const Item = styled.div`
  font-size: 14px;
  padding: 0 15px;
  width: 13%;
  border-radius: 5px;
  position: relative;

  &:before {
    background: #fff;
    opacity: .2;
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

const Img = styled.img`
  display: inline-block;
  width: 50px;
  height: 50px;
`;

export { Weather }