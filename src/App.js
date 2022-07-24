
import { useState } from 'react';
import './App.css';
const api = {
  key:"YOUR_API_KEY",
  base:"https://api.openweathermap.org/data/2.5/weather?q=",
  nes:"&unit=metric&appid=7c7f99bc5ecf725337c54ad95b86de1e"
}

function App() {
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(api.base+query+api.nes)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Jan","Feb","Mar","April","Jun","july","Aug","Sep","Oct","Nov","Dec"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let datecard = date+' '+day+' '+month+'  '+year

     return datecard
  }
 
  return (
    <div className={(typeof weather.main !="undefined") ? ((weather.main.temp >16) ? 'app warm' : 'App'):'App'}>
      <main>
        <div className='search-box'>
          <input type="text" className='search-bar' placeholder='srarch...'
          onChange={e => setQuery(e.target.value)}
          value = {query}
          onKeyPress = {search}
          
          />            
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="Weather-box">
          <div className="temp">{330-Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
          </div>

        ): ('')}
      </main>
       
    </div>
  );
}

export default App;
