import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()

  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  
  //Se obtiene las coordenadas de la API y la montamos en un estado

  const success=(pos)=>{
    console.log(pos)
    const newCoords={
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords)
    
  }
 
  

  const newCallAPISearch=(cityName) =>{
    const API_KEY="8ba416a33dc3da24b50e430b23a3608a"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    axios.get(URL)
    .then(res=>setWeather(res.data))
    .catch(err=>alert("not found this place"))
  }

  const changeUnitTemperature=() => {
    setIsCelsius(!isCelsius)
  }


  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(success)
  },[])
  //Peticion de datos a la API del clima

  useEffect(() => {
    if(coords){
      const API_KEY="8ba416a33dc3da24b50e430b23a3608a"
    const URL= `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    axios.get(URL)
    .then(res =>{
      const tempKelvin=res.data.main.temp
      const tempCelsius=(tempKelvin-273.15).toFixed(2)
      const tempFahrenheit=((tempCelsius*9/5)+32).toFixed(2)
      const newTemperature={
        celsius:tempCelsius,
        fahrenheit: tempFahrenheit

      }
      setTemperature(newTemperature)
      setWeather(res.data)
    })

    .catch(err=>console.log(err))
    }    
  }, [coords])
  console.log(weather);
  

  

  return (
    <div className="App">
      {
        weather ? (<WeatherCard 
          weather={weather} 
          temperature={temperature} 
          changeUnitTemperature={changeUnitTemperature}
          isCelsius={isCelsius}
          newCallAPISearch={newCallAPISearch}
          />):
        <p>Loading</p>
        
        }
      
    </div>
  )
}

export default App
