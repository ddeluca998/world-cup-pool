import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchOwnership } from '../api/sheets'
import trophy from '../assets/trophy.png'
import './Teams.css'

function Teams() {
  const navigate = useNavigate()
  const [ownerCards, setOwnerCards] = useState([])

  useEffect(() => {
    fetchOwnership().then(data => {
        console.log('ownership data:', data)
        const parseDate = (dateStr) => new Date(dateStr)

      const latestOwnership = {}
      data.forEach(row => {
        const team = row.name
        if (!latestOwnership[team] || parseDate(row.effectiveDate) > parseDate(latestOwnership[team].effectiveDate)) {
          latestOwnership[team] = row
        }
      })

      const byOwner = {}
      Object.values(latestOwnership).forEach(({ name, owner }) => {
        if (!byOwner[owner]) byOwner[owner] = []
        byOwner[owner].push(name)
      })

      const cards = Object.entries(byOwner)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([owner, teams]) => ({
          owner,
          teams: teams.sort()
        }))

      setOwnerCards(cards)
    })
  }, [])

  return (
    <div className="teams-page">
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

      <div className="teams-container">
        <h1 className="teams-title">TEAMS</h1>
        <div className="owner-grid">
          {ownerCards.map(({ owner, teams }) => (
            <div className="owner-card" key={owner}>
              <div className="owner-name">{owner}</div>
              <div className="team-count">{teams.length} teams</div>
              <ul className="team-list">
                {teams.map(team => (
                  <li key={team} className="team-item">{team}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Teams