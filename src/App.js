import React from 'react';
import MyD3Component from './bar';
import GDP from './gdp-data';


export default class App extends React.Component {
  render() {
    console.log(GDP.data[0][0].slice(0, 4));
    return  <div className="App">
    <h1 id='title'>United States GDP</h1>
    <MyD3Component data={GDP}/>
  </div>;
  }
}