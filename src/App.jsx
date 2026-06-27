import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Matches from './pages/Matches'
import Teams from './pages/Teams'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/teams" element={<Teams />} />
    </Routes>
  )
}

export default App