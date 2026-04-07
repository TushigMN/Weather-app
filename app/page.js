import Search from "./Search";
import Image from "next/image";

export default async function WeatherPage({ searchParams }) {
  const params = await searchParams; 
  const city = params.city || 'London';
  const apiKey = process.env.WEATHER_API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
      
        <h1 className="text-2xl text-red-500">City not found or API error</h1>
        <p>Try searching for a different location.</p>
      </main>
    );
  }

  

  const data = await res.json();

  const emojiMap = {
    "clear sky": "☀️",
    "few clouds": "🌤️",
    "scattered clouds": "☁️",
    "broken clouds": "☁️",
    "overcast clouds": "☁️",
    "shower rain": "🌦️",
    "rain": "🌧️",
    "thunderstorm": "⛈️",
    "snow": "❄️",
    "mist": "🌫️",
  };
  const backgroundMap = {
    "Clear": "bg-gradient-to-br from-blue-400 to-blue-600",
    "Clouds": "bg-gradient-to-br from-slate-400 to-slate-600",
    "Rain": "bg-gradient-to-br from-indigo-800 to-slate-900",
    "Thunderstorm": "bg-gradient-to-br from-gray-900 to-black",
    "Snow": "bg-gradient-to-br from-blue-100 to-blue-300 text-slate-900",
    "Mist": "bg-gradient-to-br from-gray-300 to-gray-500",
  };
  const weatherMain = data.weather[0].main;
  const iconCode = data.weather[0].icon;

  const isNight = iconCode.endsWith('n');


  const weatherIcons = {
    "Clear": isNight ? "/icons/sunny-night.svg" : "/icons/sunny.svg", 
    "Clouds": isNight ? "/icons/wind-night.svg" : "/icons/wind.svg",
    "Rain": "/icons/rain.svg",
    "Thunderstorm": isNight ? "/icons/thunderstorm-night.svg" : "/icons/Thunderstorm.svg",
    "Snow": isNight ? "/icons/snow-night.svg" : "/icons/snow.svg",
  };

  const currentIcon = weatherIcons[weatherMain] || "/icons/sunny.svg";

  const isHeatingUp = data.main.temp > (data.main.temp_max + data.main.temp_min) / 2;
  const trendEmoji = isHeatingUp ? "📈" : "📉";
  const mainWeather = data.weather[0].main;
  const bgClass = backgroundMap[mainWeather] || "bg-slate-900";
  const weatherDescription = data.weather[0].description;
  const weatherEmoji = emojiMap[weatherDescription] || "🌍";

  return (
  <main className={`flex min-h-screen flex-col items-center justify-center p-6 md:p-24 transition-colors duration-1000 ${bgClass}`}>
    <Search />

    <Image src={currentIcon} alt={mainWeather} width={120} height={120} className="drop-shadow-xl animate-bounce-slow" />
    <p className="text-2xl capitalize text-white/90">{data.weather[0].description}</p>

    <div className="w-full max-w-sm md:max-w-md text-center p-6 md:p-10 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
      
      <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
        {data.name}
      </h1>
    
      <p className="text-6xl md:text-8xl my-4 font-black text-yellow-400 drop-shadow-lg">
        {Math.round(data.main.temp)}°C <span className="text-3xl">{trendEmoji}</span>
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mt-4">
        <p className="text-lg md:text-2xl capitalize text-white/90">
          {weatherEmoji} {weatherDescription}
        </p>
        <p className="text-sm md:text-lg text-white/60 italic">
          Feels like {Math.round(data.main.feels_like)}°C
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 border-t border-white/10 pt-6">
        <div>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">Humidity</p>
          <p className="text-xl md:text-2xl font-semibold text-white">{data.main.humidity}%</p>
        </div>
        
        <div>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">Wind Speed</p>
          <div className="flex flex-col items-center">
            <p className="text-xl md:text-2xl font-semibold text-white">{data.wind.speed} m/s</p>
            
            <div className="flex items-center gap-1 mt-1 bg-white/10 px-2 py-0.5 rounded-full">
              <span 
                className="inline-block transition-transform duration-1000 text-sm" 
                style={{ transform: `rotate(${data.wind.deg + 180}deg)` }}
              >
                ⬆️
              </span>
              <span className="text-[10px] text-white/70 font-medium">DIR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);
}