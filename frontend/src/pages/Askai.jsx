"use client"

import { useEffect, useState } from "react"
import axios from "axios"

const Askai = () => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // API key should ideally be in an environment variable
  const API_KEY = "42b5fb2d-c4bb-4a0c-bf25-f1564ce0e623"

  // Updated API endpoint to use the current CricAPI format
  const API_URL = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(API_URL)

        // Check if the API returned a success status
        if (response.data.status === "success") {
          setMatches(response.data.data || [])
        } else {
          throw new Error(response.data.message || "Failed to fetch matches")
        }
        setLoading(false)
      } catch (err) {
        console.error("Cricket API Error:", err)
        setError(err.message || "Failed to fetch cricket matches")
        setLoading(false)
      }
    }

    fetchMatches()

    // Set up a refresh interval (every 2 minutes)
    const intervalId = setInterval(fetchMatches, 120000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [API_URL])

  return (
    <div className="App p-6 bg-gray-900 text-white min-h-screen">
      <h1><marquee>
        WELCOME TO LIVE CRICKET SCORE , MATCHES SOON  </marquee></h1>
      <h1 className="text-5xl font-bold text-center mb-6">Live Cricket Scores</h1>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <p className="text-xl mb-4">Unable to load live matches</p>
          <marquee className="text-blue-400">Live match updates will be coming soon</marquee>
          <p className="mt-4 text-gray-400 text-sm">Error: {error}</p>
        </div>
      ) : matches.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <p className="text-xl">No live matches currently in progress</p>
        </div>
      ) : (
        <div className="matches grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match) => (
            <div key={match.id} className="match bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-blue-600 text-xs px-2 py-1 rounded">{match.matchType || "Match"}</span>
                <span className="text-xs text-gray-400">{match.status}</span>
              </div>

              <h2 className="text-xl font-semibold mb-3">
                {match.teamInfo?.[0]?.name || match.teams?.[0]} vs {match.teamInfo?.[1]?.name || match.teams?.[1]}
              </h2>

              {match.score && (
                <div className="bg-gray-700 p-3 rounded mb-3">
                  {match.score.map((scoreInfo, index) => (
                    <div key={index} className="mb-1">
                      <span className="font-medium">{scoreInfo.inning}:</span> {scoreInfo.r}/{scoreInfo.w} (
                      {scoreInfo.o} overs)
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between text-sm text-gray-400">
                <span>{match.venue}</span>
                <span>{new Date(match.dateTimeGMT).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <h1 className="text-5xl font-bold text-center mt-10 mb-6">Compete in eSports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: "Chess.com",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Chess.com_logo.svg/2560px-Chess.com_logo.svg.png",
            link: "https://www.chess.com/",
          },
          {
            name: "Lichess",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Lichess_Logo.svg/1920px-Lichess_Logo.svg.png",
            link: "https://lichess.org/",
          },
          {
            name: "Faceit",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Faceit_logo.svg/2560px-Faceit_logo.svg.png",
            link: "https://www.faceit.com/",
          },
          {
            name: "ESL Play",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/ESL_logo_2019.svg/2560px-ESL_logo_2019.svg.png",
            link: "https://play.eslgaming.com/",
          },
        ].map((platform) => (
          <div key={platform.name} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
            <img
              src={platform.logo || "/placeholder.svg"}
              alt={platform.name}
              className="h-16 mb-4 rounded-md object-contain"
            />
            <h2 className="text-xl font-semibold">{platform.name}</h2>
            <a
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Askai