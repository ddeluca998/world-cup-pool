import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import ComingSoon from './pages/ComingSoon'
import Matches from './pages/Matches'
import Teams from './pages/Teams'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/trades" element={<ComingSoon />} />
    </Routes>
  )
}

export default App