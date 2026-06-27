import './ComingSoon.css'
import { useNavigate, useLocation } from 'react-router-dom'

function ComingSoon() {
  const navigate = useNavigate()
  const location = useLocation()
  const page = location.pathname.replace('/', '')

  return (
    <div className="coming-soon">
      <div className="coming-soon-card">
        <h1>{page.toUpperCase()}</h1>
        <p>This page is coming soon.</p>
        <button onClick={() => navigate('/')}>← Back to home</button>
      </div>
    </div>
  )
}

export default ComingSoon