import { useNavigate } from 'react-router-dom'
import './Landing.css'
import trophy from '../assets/trophy.png'
import { useState, useEffect } from 'react'
import { fetchRankings } from '../api/sheets'

function Landing() {
  const navigate = useNavigate()

const [standings, setStandings] = useState([])

useEffect(() => {
  fetchRankings().then(data => {
    console.log('Rankings data:', data)
    setStandings(data)
  }).catch(err => console.error('Fetch error:', err))
}, [])
/*
  const standings = [
    { rank: 1, name: 'Bosco', points: 24, delta: 0 },
    { rank: 2, name: 'Francesco', points: 23, delta: 0 },
    { rank: 3, name: 'Noah', points: 22, delta: 1 },
    { rank: 4, name: 'Stef', points: 22, delta: -1 },
    { rank: 5, name: 'Daniele', points: 17, delta: 2 },
    { rank: 6, name: 'Figgy', points: 17, delta: 0 },
    { rank: 7, name: 'Vince', points: 15, delta: -2 },
    { rank: 8, name: 'Naz', points: 14, delta: 0 },
  ]
*/
 return (
  <div className="landing">

    <nav className="navbar">
      <div className="nav-logo-area">
        <img src={trophy} alt="FIFA World Cup 2026" className="nav-logo" />
      </div>
      <div className="nav-links">
        {[
          /*{ title: 'Overview', path: '/overview' },*/
          { title: 'Matches', path: '/matches' },
          { title: 'Teams', path: '/teams' },
          { title: 'Trades', path: '/trades' },
        ].map(({ title, path }) => (
          <button key={title} className="nav-link" onClick={() => navigate(path)}>
            {title}
          </button>
        ))}
      </div>
    </nav>

    <div className="hero">
      <div className="badge">
        <img src={trophy} alt="trophy" className="badge-trophy-left" />
        <span className="badge-text">WORLD CUP 2026 POOL</span>
        <img src={trophy} alt="trophy" className="badge-trophy-right" />
      </div>
    </div>



    <div className="leaderboard">
      <div className="section-title">Current standings</div>
      {standings.map(({ rank, name, points, delta }) => (
        <div className="rank-row" key={name}>
          <div className={`rank-num rank-${rank}`}>{rank}</div>
          <div className="rank-name">
  {name}
  {rank === 1 && <img src={trophy} alt="trophy" className="rank-trophy" />}
</div>
          <div className="rank-pts">{points} pts</div>
          <div className={`rank-delta ${delta > 0 ? 'up' : delta < 0 ? 'down' : ''}`}>
            {delta > 0 ? `+${delta}` : delta < 0 ? delta : ''}
          </div>
        </div>
      ))}
    </div>

  </div>
)
}

export default Landing