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
                  <td>{m.matchDate}</td>
                  <td><span className={`phase-badge phase-${m.phase}`}>{m.phase}</span></td>
                  <td className="team-name">{m.home}</td>
                  <td className="result">
                    {m.result === 'H' ? '🏠 H' : m.result === 'A' ? 'A ✈️' : m.result === 'D' ? 'D' : '-'}
                  </td>
                  <td className="team-name">{m.away}</td>
                  <td>{m.homePlayer}</td>
                  <td>{m.awayPlayer}</td>
                  <td className="pts">{m.result ? m.homePoints : '-'}</td>
                  <td className="pts">{m.result ? m.awayPoints : '-'}</td>
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