'use client'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

const suggestions = ["New York", "Tokyo", "London", "Paris", "Ulaanbaatar"]

export default function Search() {
  const [city, setCity] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSearch = (e, override) => {
    e?.preventDefault()
    const val = override ?? city.trim()
    if (!val) return
    startTransition(() => {
      router.push(`/?city=${val}`)
    })
  }

  return (
    <div className="mb-8 flex flex-col gap-3">
      <form onSubmit={handleSearch} className="flex items-center border border-white/20 rounded-lg overflow-hidden backdrop-blur-md bg-white/10 focus-within:border-white/40 transition-all">
        <div className="pl-3 text-white/50">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="6.5" cy="6.5" r="4.5" />
            <line x1="10" y1="10" x2="14" y2="14" />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Enter city..."
          className="flex-1 h-11 px-3 text-sm bg-transparent text-white placeholder-white/40 outline-none disabled:text-white/30"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isPending}
        />

        <button
          type="submit"
          disabled={isPending}
          className="h-11 px-5 text-sm font-medium bg-white/20 text-white border-l border-white/20 hover:bg-white/30 active:bg-white/40 disabled:bg-transparent disabled:text-white/30 disabled:cursor-not-allowed transition-colors whitespace-nowrap flex items-center gap-2"
        >
          {isPending && (
            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {isPending ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="flex gap-2 flex-wrap">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleSearch(null, s)}
            className="text-xs text-white/70 bg-white/10 border border-white/20 rounded-full px-3 py-1 hover:bg-white/20 backdrop-blur-sm transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        <kbd className="text-xs bg-white/10 border border-white/20 rounded px-1.5 py-0.5 font-mono text-white/50">↵</kbd>
        <span className="text-xs text-white/40">to search</span>
      </div>
    </div>
  )
}