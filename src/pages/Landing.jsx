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
      setStandings(data)
    }).catch(err => console.error('Fetch error:', err))
  }, [])

  return (
    <div className="landing">
      <nav className="navbar">
        <div className="nav-logo-area">
          <img src={trophy} alt="FIFA World Cup 2026" className="nav-logo" />
        </div>
        <div className="nav-links">
          {[
            { title: 'Matches', path: '/matches' },
            { title: 'Teams', path: '/teams' },
          ].map(({ title, path }) => (
            <button key={title} className="nav-link" onClick={() => navigate(path)}>
              {title}
            </button>
          ))}
        </div>
      </nav>
      <div className="hero">
        <div className="badge-wrapper">
          <div className="badge">
            <img src={trophy} alt="trophy" className="badge-trophy-left" />
            <span className="badge-text">WORLD CUP 2026 POOL</span>
            <img src={trophy} alt="trophy" className="badge-trophy-right" />
          </div>
</div>
      </div>
      <div className="leaderboard">
        <div className="section-title">Current standings</div>
        {standings.map(({ rank, name, points }) => (
          <div className="rank-row" key={name}>
            <div className={`rank-num rank-${rank}`}>{rank}</div>
            <div className="rank-name">
              {name}
              {rank === 1 && <img src={trophy} alt="trophy" className="rank-trophy" />}
            </div>
            <div className="rank-pts">{points} pts</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Landing