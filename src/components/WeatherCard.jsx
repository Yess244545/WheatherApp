import { useState } from 'react'
const WeatherCard =( {weather, temperature,changeUnitTemperature,isCelsius,newCallAPISearch}) =>{
    
    const [place, setPlace] = useState("")

    const handleChangePlace=(e)=>{
        setPlace(e.target.value)
        console.log(e.target.value)
        
    }
    
    return (
        <article className="weatherCard">
            
            <h1>Weather App</h1>
            <input className='input' type="text" value={place} onChange={handleChangePlace}/>
            <button className="button1" onClick={()=>newCallAPISearch(place)}>Buscar</button>
            
            <div className="name">
            <h1>{`${weather.name}, ${weather.sys.country}`}</h1>
            <h1 className='clima' >{weather.weather[0].description}</h1>
            </div>
            
            <section className="weatherCard-body">
                <div className="img">
                    <img  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
                    
                    <p className='p'>{isCelsius?`${temperature.celsius} ºC `: `${temperature.fahrenheit} ºF`} </p>
                    
                </div>
                <button className="button2" onClick={changeUnitTemperature}>Degrees ºF/ºC</button>
                <ul>
                    <li> Wind: <br></br> {weather.wind.speed} m/s</li>
                    <li> Clouds:<br></br> {weather.clouds.all} %</li>
                    <li> Pressure: <br></br>{weather.main.pressure} hPa</li>
                    <li> Humidity: <br></br>{weather.main.humidity} %</li>
                    
                </ul>
                
            </section>
            
        </article>
    )
}
export default WeatherCard