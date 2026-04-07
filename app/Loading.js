export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <div className="flex flex-col items-center gap-4">
        {/* Simple CSS Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-medium animate-pulse">Fetching weather data...</p>
      </div>
    </div>
  )
}