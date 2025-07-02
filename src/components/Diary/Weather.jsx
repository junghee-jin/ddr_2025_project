import { useEffect, useState } from "react";
import './Weather.css'

export default function WeatherWithXML(){
    const city = 'seoul';
    const appid = '6697dfd4edd9fef36fbacda72b2ed455'
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchWeatherXML = async () => {
            try{
                const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=kr&mode=xml&appid=${appid}`;
                const response = await fetch(endPoint);
                if(!response.ok){throw new Error (`날씨 정보 검색 실패하였습니다.`, response.status)}

                const text = await response.text();
                const parser = new DOMParser();
                const xml = parser.parseFromString(text,'application/xml');

                const tempNode = xml.querySelector('temperature');
                const temp = tempNode?.getAttribute('value');

                const weather = xml.querySelector('weather')?.getAttribute('value');
                const icon = xml.querySelector('weather')?.getAttribute('icon');

                setWeather({temp, weather, icon});

            }catch(error){
                setError(error);
            }            
        }
        fetchWeatherXML();
    },[]); 

            if (error) return <div>오류발생: {error}</div>;
            if (!weather) return <div>날씨정보 로딩중....</div>;

    return (
        <div className="card">

            <p>오늘의 날씨: {weather.weather}</p>
            <p>{weather.temp}도</p>

            <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="" />
        </div>
    )
}