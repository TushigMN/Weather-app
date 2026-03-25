

// app/page.js
export default async function WeatherPage({ searchParams }) {
  const city = searchParams.city || 'London';
  const apiKey = process.env.WEATHER_API_KEY;
  
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    { cache: 'no-store' } // Ensure fresh data
  );

  // If the API call failed (e.g., city not found or bad API key)
  if (!res.ok) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-2xl text-red-500">City not found or API error</h1>
        <p>Try searching for a different location.</p>
      </main>
    );
  }

  const data = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">{data.name}</h1>
      <p className="text-6xl">{Math.round(data.main.temp)}°C</p>
      <p className="capitalize">{data.weather[0].description}</p>
    </main>
  );
}