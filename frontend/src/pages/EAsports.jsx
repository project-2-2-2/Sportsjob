 
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const EAsports = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Countdown timer for featured tournament
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 14) // 2 weeks from now

    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })

      if (difference < 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Game categories
  const categories = [
    { id: "all", name: "All Games" },
    { id: "fps", name: "FPS" },
    { id: "moba", name: "MOBA" },
    { id: "battle-royale", name: "Battle Royale" },
    { id: "strategy", name: "Strategy" },
    { id: "sports", name: "Sports" },
    { id: "fighting", name: "Fighting" },
  ]

  // Tournament data
  const tournaments = [
    {
      id: 1,
      title: "Global Masters Championship",
      game: "Counter-Strike 2",
      category: "fps",
      date: "March 25-27, 2025",
      prizePool: "$250,000",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      registrationOpen: true,
      participants: 128,
      maxParticipants: 128,
      featured: true,
    },
    {
      id: 2,
      title: "League of Legends World Cup",
      game: "League of Legends",
      category: "moba",
      date: "April 10-15, 2025",
      prizePool: "$500,000",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
      registrationOpen: true,
      participants: 64,
      maxParticipants: 64,
      featured: false,
    },
    {
      id: 3,
      title: "Battle Royale Showdown",
      game: "Fortnite",
      category: "battle-royale",
      date: "March 18-20, 2025",
      prizePool: "$150,000",
      image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=2070&auto=format&fit=crop",
      registrationOpen: true,
      participants: 95,
      maxParticipants: 100,
      featured: false,
    },
    {
      id: 4,
      title: "FIFA World Championship",
      game: "EA FC 25",
      category: "sports",
      date: "April 5-7, 2025",
      prizePool: "$100,000",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop",
      registrationOpen: true,
      participants: 48,
      maxParticipants: 64,
      featured: false,
    },
    {
      id: 5,
      title: "StarCraft II Masters",
      game: "StarCraft II",
      category: "strategy",
      date: "March 30-31, 2025",
      prizePool: "$75,000",
      image: "https://images.unsplash.com/photo-1548686304-89d188a80029?q=80&w=2073&auto=format&fit=crop",
      registrationOpen: true,
      participants: 32,
      maxParticipants: 32,
      featured: false,
    },
    {
      id: 6,
      title: "Street Fighter Championship",
      game: "Street Fighter 6",
      category: "fighting",
      date: "April 12-13, 2025",
      prizePool: "$50,000",
      image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2070&auto=format&fit=crop",
      registrationOpen: false,
      participants: 64,
      maxParticipants: 64,
      featured: false,
    },
    {
      id: 7,
      title: "Valorant Invitational",
      game: "Valorant",
      category: "fps",
      date: "April 20-22, 2025",
      prizePool: "$200,000",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065&auto=format&fit=crop",
      registrationOpen: true,
      participants: 45,
      maxParticipants: 64,
      featured: false,
    },
    {
      id: 8,
      title: "Dota 2 International",
      game: "Dota 2",
      category: "moba",
      date: "May 1-10, 2025",
      prizePool: "$1,000,000",
      image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=2070&auto=format&fit=crop",
      registrationOpen: true,
      participants: 16,
      maxParticipants: 16,
      featured: true,
    },
  ]

  // Top players data
  const topPlayers = [
    { id: 1, name: "NinjaWarrior", game: "Fortnite", rank: 1, country: "USA", earnings: "$2.5M" },
    { id: 2, name: "FalconMaster", game: "Counter-Strike 2", rank: 2, country: "Sweden", earnings: "$1.8M" },
    { id: 3, name: "DragonSlayer", game: "League of Legends", rank: 3, country: "South Korea", earnings: "$1.7M" },
    { id: 4, name: "ShadowHunter", game: "Dota 2", rank: 4, country: "China", earnings: "$1.5M" },
    { id: 5, name: "PhoenixRising", game: "Valorant", rank: 5, country: "Canada", earnings: "$1.2M" },
  ]

  // Filter tournaments based on active tab
  const filteredTournaments =
    activeTab === "all" ? tournaments : tournaments.filter((tournament) => tournament.category === activeTab)

  // Featured tournaments
  const featuredTournaments = tournaments.filter((tournament) => tournament.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
         
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            COMPETE IN ESPORTS
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join the world's most prestigious tournaments, compete against elite players, and win incredible prizes
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="#tournaments"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block"
            >
              Browse Tournaments
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Tournament Countdown */}
      {featuredTournaments.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Featured Tournament</h2>
                <h3 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  {featuredTournaments[0].title}
                </h3>
                <p className="text-xl mb-2">{featuredTournaments[0].game}</p>
                <p className="text-gray-300 mb-4">{featuredTournaments[0].date}</p>
                <div className="flex items-center mb-6">
                  <span className="text-yellow-400 text-2xl font-bold mr-2">Prize Pool:</span>
                  <span className="text-2xl">{featuredTournaments[0].prizePool}</span>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                  Register Now
                </button>
              </div>

              <div className="md:w-1/2">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
                  <h3 className="text-2xl font-bold mb-6 text-center">Tournament Starts In</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(countdown).map(([unit, value]) => (
                      <div key={unit} className="flex flex-col items-center">
                        <div className="bg-gradient-to-b from-blue-600 to-purple-700 rounded-lg w-full py-4 px-2 mb-2">
                          <div className="text-4xl font-bold text-center">{value}</div>
                        </div>
                        <div className="text-gray-300 capitalize">{unit}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tournaments Section */}
      <section id="tournaments" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Upcoming Tournaments
            </span>
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Tournament Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTournaments.map((tournament) => (
              <motion.div
                key={tournament.id}
                className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tournament.image || "/placeholder.svg"}
                    alt={tournament.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">{tournament.game}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {tournament.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{tournament.date}</p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-yellow-400 font-medium">{tournament.prizePool}</span>
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        tournament.registrationOpen ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"
                      }`}
                    >
                      {tournament.registrationOpen ? "Registration Open" : "Registration Closed"}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Participants</span>
                      <span>
                        {tournament.participants}/{tournament.maxParticipants}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                      tournament.registrationOpen
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!tournament.registrationOpen}
                  >
                    {tournament.registrationOpen ? "Register Now" : "Registration Closed"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Popular Games
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              {
                name: "Counter-Strike 2",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Counter-Strike_2_icon_logo.svg/1200px-Counter-Strike_2_icon_logo.svg.png",
              },
              {
                name: "League of Legends",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/LoL_icon.svg/1200px-LoL_icon.svg.png",
              },
              { name: "Dota 2", logo: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg" },
              {
                name: "Valorant",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/1200px-Valorant_logo_-_pink_color_version.svg.png",
              },
              {
                name: "Fortnite",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Fortnite_-_Icon_%28transparent%29.png/1200px-Fortnite_-_Icon_%28transparent%29.png",
              },
              {
                name: "EA FC 25",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/EA_Sports_FC_logo.svg/1200px-EA_Sports_FC_logo.svg.png",
              },
            ].map((game, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }}
              >
                <img src={game.logo || "/placeholder.svg"} alt={game.name} className="h-16 w-16 object-contain mb-4" />
                <h3 className="text-center font-medium">{game.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Players Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Top Players
            </span>
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-900 to-purple-900">
                  <th className="py-4 px-6 text-left">Rank</th>
                  <th className="py-4 px-6 text-left">Player</th>
                  <th className="py-4 px-6 text-left">Game</th>
                  <th className="py-4 px-6 text-left">Country</th>
                  <th className="py-4 px-6 text-left">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {topPlayers.map((player) => (
                  <tr
                    key={player.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                        {player.rank}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">{player.name}</td>
                    <td className="py-4 px-6">{player.game}</td>
                    <td className="py-4 px-6">{player.country}</td>
                    <td className="py-4 px-6 text-yellow-400 font-medium">{player.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Participate Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              How to Participate
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Create an Account",
                description: "Sign up for a free account to access all tournaments and competitions.",
                icon: "👤",
              },
              {
                title: "Choose a Tournament",
                description: "Browse available tournaments and select the ones that match your skills.",
                icon: "🏆",
              },
              {
                title: "Register & Pay Fee",
                description: "Complete registration and pay any applicable entry fees.",
                icon: "💰",
              },
              {
                title: "Compete & Win",
                description: "Join the tournament, play your matches, and win amazing prizes!",
                icon: "🎮",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-300 mb-8">
                Subscribe to our newsletter to get the latest updates on tournaments, events, and exclusive offers.
              </p>

              <form className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">eSports Compete</h3>
              <p className="text-gray-400 mb-4">
                The ultimate platform for competitive gaming and eSports tournaments.
              </p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "youtube", "twitch"].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "Tournaments", "Games", "Leaderboards", "About Us", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Games</h3>
              <ul className="space-y-2">
                {["Counter-Strike 2", "League of Legends", "Dota 2", "Valorant", "Fortnite", "EA FC 25"].map((game) => (
                  <li key={game}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {game}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@esportscompete.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Gaming Street, Esports City, EC 12345</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} eSports Compete. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default EAsports;

