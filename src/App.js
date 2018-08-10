import React, { Component } from 'react';
import './App.css';

import Context from './context';
import CitiesList from './citieslist';
import AddCity from './addcity';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      currentcity: '',

      findCity: (event) => {
        const newcity=event.target.value;
        this.setState({
          currentcity: newcity,
        })        
      },

      addCity: () => {
        axios.get(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${this.state.currentcity}") and u="c" &format=json&env=store://datatables.org/alltableswithkeys`)
        .then((response) => {
          const data = response.data;           
          if(data.query.results) { 
            const cels = data.query.results.channel.item.condition.temp;
            const city = data.query.results.channel.location.city; 
            const text = data.query.results.channel.item.condition.text;         
            this.setState({
              cities: [...this.state.cities,{
                name: city,
                temperature: cels + ' C',
                text: text,
              }]
            })  
            const error=document.querySelector('.error');
            error.innerHTML='';
          } else {
            const error=document.querySelector('.error');
            error.innerHTML='City not found';
          }
        })             
      },

      deleteCity: (name) => {
        const array = [...this.state.cities];
        const index = array.indexOf(name)
        array.splice(index, 1);
        this.setState({cities: array});
      }
    }   
  }

  componentWillMount() {    
    axios.get(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Нижний Новгород") and u="c" &format=json&env=store://datatables.org/alltableswithkeys`)
    .then((response) => {
        const data = response.data;
        const cels = data.query.results.channel.item.condition.temp;
        const city = data.query.results.channel.location.city; 
        const text = data.query.results.channel.item.condition.text;           
        this.setState({
          cities: [...this.state.cities,{
            name: city,
            temperature: cels + ' C',
            text: text,
        }]
      })  
    })
  }

  render() {
    return (
      <div className='wrapper'>
        <Context.Provider value={this.state}>
          <AddCity/>
          <CitiesList />
        </Context.Provider>
      </div>
    );
  }
}

export default App;
