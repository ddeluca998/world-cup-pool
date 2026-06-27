import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMatches } from '../api/sheets'
import trophy from '../assets/trophy.png'
import './Matches.css'

const PHASES = ['All', 'group', 'r32', 'r16', 'qf', 'sf', 'third', 'final']
const PHASE_LABELS = {
  All: 'All',
  group: 'Group Stage',
  r32: 'Round of 32',
  r16: 'Round of 16',
  qf: 'Quarter Finals',
  sf: 'Semi Finals',
  third: 'Third Place',
  final: 'Final'
}

function Matches() {
  const navigate = useNavigate()
  const [matches, setMatches] = useState([])
  const [activePhase, setActivePhase] = useState('All')

  useEffect(() => {
    fetchMatches().then(data => {
      console.log('sample match:', data[0])
      setMatches(data)
    })
  }, [])

  const filtered = activePhase === 'All' ? matches : matches.filter(m => m.phase === activePhase)

  return (
    <div className="matches-page">
      <nav className="navbar">
        <div className="nav-logo-area">
          <img src={trophy} alt="trophy" className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
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

        <div className="phase-tabs">
          {PHASES.map(phase => (
            <button
              key={phase}
              className={`phase-tab ${activePhase === phase ? 'active' : ''}`}
              onClick={() => setActivePhase(phase)}
            >
              {PHASE_LABELS[phase]}
            </button>
          ))}
        </div>

        <div className="matches-table-wrapper">
          <table className="matches-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Phase</th>
                <th>Home</th>
                <th>Away</th>
                <th>Home Player</th>
                <th>Away Player</th>
                <th>Result</th>
                <th>Home Pts</th>
                <th>Away Pts</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={i} className={m.result === '' ? 'upcoming' : 'finished'}>
                  <td data-label="Date">{m.matchDate}</td>
                  <td data-label="Phase">
                    <span className={`phase-badge phase-${m.phase}`}>{m.phase}</span>
                  </td>
                  <td data-label="Home" className="team-name">
                    <span className={m.result === 'H' ? 'winner' : m.result === 'A' ? 'loser' : m.result === 'D' ? 'draw' : ''}>{m.home}</span>
                  </td>
                  <td data-label="Away" className="team-name">
                    <span className={m.result === 'A' ? 'winner' : m.result === 'H' ? 'loser' : m.result === 'D' ? 'draw' : ''}>{m.away}</span>
                  </td>
                  <td data-label="Home Player"><span className="player-name">{m.homePlayer}</span></td>
                  <td data-label="Away Player"><span className="player-name">{m.awayPlayer}</span></td>
                  <td data-label="Result" className="result">
                    {m.result === 'H' ? 'H' : m.result === 'A' ? 'A' : m.result === 'D' ? 'D' : '-'}
                  </td>
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