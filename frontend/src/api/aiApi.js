import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API = `${BASE_URL}/api/ai`

export const analyzeComplaint = async (data) => {
  return await axios.post(`${API}/analyze`, data)
}