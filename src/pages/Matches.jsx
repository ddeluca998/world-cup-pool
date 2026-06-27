import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMatches } from '../api/sheets'
import './Matches.css'

function Matches() {
  const navigate = useNavigate()
  const [matches, setMatches] = useState([])

  useEffect(() => {
    fetchMatches().then(setMatches)
  }, [])

  return (
    <div className="matches-page">
      <nav className="navbar">
        <div className="nav-logo-area">
          <img src="/trophy.png" alt="trophy" className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        </div>
        <div className="nav-links">
          {[
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

      <div className="matches-container">
        <h1 className="matches-title">MATCHES</h1>
        <div className="matches-table-wrapper">
          <table className="matches-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Phase</th>
                <th>Home</th>
                <th>Result</th>
                <th>Away</th>
                <th>Home Player</th>
                <th>Away Player</th>
                <th>Home Pts</th>
                <th>Away Pts</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m, i) => (
                <tr key={i} className={m.result === '' ? 'upcoming' : 'finished'}>
                    <td data-label="Date">{m.matchDate}</td>
                    <td data-label="Phase"><span className={`phase-badge phase-${m.phase}`}>{m.phase}</span></td>
                    <td data-label="Home" className="team-name">{m.home}</td>
                    <td data-label="Result" className="result">{m.result === 'H' ? '🏠 H' : m.result === 'A' ? 'A ✈️' : m.result === 'D' ? 'D' : '-'}</td>
                    <td data-label="Away" className="team-name">{m.away}</td>
                    <td data-label="Home Player">{m.homePlayer}</td>
                    <td data-label="Away Player">{m.awayPlayer}</td>
                    <td data-label="Home Pts" className="pts">{m.result ? m.homePoints : '-'}</td>
                    <td data-label="Away Pts" className="pts">{m.result ? m.awayPoints : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Matches