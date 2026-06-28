const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/16UQ6qIKjdg8hkX6-Jh7GnPlpZGfgvsFYNBhP9afQF-A/values'

export async function fetchRange(range) {
  const url = `${BASE_URL}/${range}?key=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()
  return data.values || []
}

export async function fetchRankings() {
  const rows = await fetchRange('Rank!D2:F9')
  return rows.map((row, i) => ({
    rank: i + 1,
    name: row[1] || '',
    points: Number(row[2]) || 0,
  }))
}

export async function fetchMatches() {
  const rows = await fetchRange('Matches!A2:I105')
  return rows.map(row => ({
    home: row[0] || '',
    away: row[1] || '',
    result: row[2] || '',
    homePlayer: row[3] || '',
    awayPlayer: row[4] || '',
    homePoints: Number(row[5]) || 0,
    awayPoints: Number(row[6]) || 0,
    matchDate: row[7] || '',
    phase: row[8] || '',
  }))
}

export async function fetchTeams() {
  const rows = await fetchRange('Teams!A2:A49')
  return rows.map(row => ({ name: row[0] || '' }))
}

export async function fetchOwnership() {
  const rows = await fetchRange('Ownership!A2:C200')
  return rows.map(row => ({
    name: row[0] || '',
    owner: row[1] || '',
    effectiveDate: row[2] || '',
  }))
}

export async function fetchEliminated() {
  const rows = await fetchRange('Rank!A13:A100')
  return rows.map(row => row[0] || '').filter(name => name !== '')
}