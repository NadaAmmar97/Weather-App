import React, {Component} from 'react'
import Weather from './components/Weather'
import Form from './components/Form';

const API_KEY ="e36ed364400282e43250b6c4c0274d44";

//http://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44
class App extends Component {
  state ={
    temprature: '',
    city:'',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }
  
  getWeather = async (e) =>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    console.log(city, country)
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${API_KEY}`)
    const data = await api.json();
    console.log(data);

    if (city && country){

      this.setState({
        temprature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    }else{
      this.setState({
        temprature: '',
        city:'',
        country: '',
        humidity: '',
        description: '',
        error: 'please Enter City'
      })
    }
  }

  render() {
    
    return (
      <div className="wrapper">
        <div className='form-container'>

        <Form getWeather={this.getWeather} />
        <Weather 
          temprature = {this.state.temprature}
          city = {this.state.city}
          country = {this.state.country}
          humidity = {this.state.humidity}
          description = {this.state.description}
          error = {this.state.error}
          />
          </div>
    </div>
  );
}
}

export default App;
