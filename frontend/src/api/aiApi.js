import axios from 'axios'

const API = 'http://localhost:5000/api/ai'

export const analyzeComplaint = async (data) => {
  return await axios.post(`${API}/analyze`, data)
}