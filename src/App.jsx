import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import ComingSoon from './pages/ComingSoon'
import Matches from './pages/Matches'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/teams" element={<ComingSoon />} />
      <Route path="/trades" element={<ComingSoon />} />
    </Routes>
  )
}

export default App