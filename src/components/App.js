// main component and the source of truth
import React, { Component } from 'react';
import Form from './Form'
import ResultList from './ResultList'
import '../static/css/main.css';
import WeatherIcon from './WeatherIcon';

const APIKey = process.env.REACT_APP_API_KEY
const API = `http://api.openweathermap.org/data/2.5/group?id=756135,3081368,7530858,3099434,3085151,3099424,3083829,858785,3094802,772621,757718,3337495,753866,757026,3080866,3095795,3085450,760778,769250,763166&appid=${APIKey}&units=metric`;

class App extends Component {
  state = {
    cities: [],
    citiesLength: 0,
    focusedCity: 2,
    sortAttr: "name",
    weather: "",
    err: ""
  }
  // supporting class for converting city data from API
  city = class City {
    constructor(name, id, temperature, weather, pressure, wind) {
      this.name = name;
      this.id = id;
      this.temperature = temperature;
      this.weather = weather;
      this.pressure = pressure;
      this.winddir = wind[0];
      this.windforce = wind[1]
    }
  }

  // change names of ciies to Polish
  handleCityClass = (data, attribute) => {
    const cities = data.map(item => {
      let cityName;
      switch (item.name) {
        case "Lublin Voivodeship":
          cityName = "Lublin";
          break;
        case "Opole Voivodeship":
          cityName = "Opole";
          break;
        case "Warsaw":
          cityName = "Warszawa";
          break;
        default:
          cityName = item.name
      };
      return new this.city(
        cityName,
        item.id,
        item.main.temp_max,
        item.weather[0].main,
        item.main.pressure,
        [item.wind.deg, item.wind.speed]
      );
    })
    const sortedCities = this.handleCitySort(cities, attribute)
    return sortedCities
  }

  handleCitySort = (cities, sortAttr) => {
    const sorted = cities.sort((a, b) => (a[sortAttr] > b[sortAttr]) ? 1 : -1)
    return sorted
  }


  handleCitySortForm = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      cities: this.handleCitySort(prevState.cities, value)
    }))
  }

  handleCityChange = (e) => {
    if (e.target.classList.contains('right') && this.state.focusedCity > 0) {
      this.setState(prevState => ({ focusedCity: prevState.focusedCity - 1 }))
    } else if (e.target.classList.contains('left') && this.state.focusedCity < this.state.cities.length - 1) {
      this.setState(prevState => ({ focusedCity: prevState.focusedCity + 1 }))
    }
  }

  handleCitySwipe = (direction) => {
    if (direction === 'right' && this.state.focusedCity > 0) {
      this.setState(prevState => ({ focusedCity: prevState.focusedCity - 1 }))
    } else if (direction === 'left' && this.state.focusedCity < this.state.cities.length - 1) {
      this.setState(prevState => ({ focusedCity: prevState.focusedCity + 1 }))
    }
  }

  handleIndexChange = (e) => {
    let cityIndex;
    cityIndex = this.state.cities.findIndex(city => city.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
    this.setState({
      focusedCity: cityIndex
    })
  }

  // collect data from API
  componentDidMount() {
    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        }
        throw Error("Nie udało się")
      })
      .then(response => response.json())
      .then((response) => {
        // console.log(response)
        this.setState({
          cities: this.handleCityClass(response.list, this.state.sortAttr),
          citiesLength: response.list.length
        })
      })
      .catch(err => {
        this.setState(prevState => ({ err }));
      })
  }

  render() {
    return (
      <div className="App" >
        <header className="App__header">
          <div className="title__bar">
            <h2 className="main__title">Polish Weather App</h2>
            <div className="react__logo"><i className="fab fa-react fa-4x"></i></div>
          </div>
          <WeatherIcon
            selection={this.state.focusedCity}
            cities={this.state.cities}
          />
        </header>
        <Form
          change={this.handleIndexChange}
          citySort={this.handleCitySortForm}
        />
        <ResultList
          cities={this.state.cities}
          current={this.state.focusedCity}
          moveCity={this.handleCityChange}
          swipeCity={this.handleCitySwipe}
        />
      </div>
    );
  }
}

export default App;

