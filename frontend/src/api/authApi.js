import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API = `${BASE_URL}/api/auth`

export const signupUser = async (userData) => {
  return await axios.post(`${API}/signup`, userData)
}

export const loginUser = async (userData) => {
  return await axios.post(`${API}/login`, userData)
}