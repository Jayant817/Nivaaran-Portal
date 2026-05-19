import axios from 'axios'

const API = 'http://localhost:5000/api/complaints'

export const addComplaint = async (data, token) => {
  return await axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const getComplaints = async (category = '') => {
  const params = category ? { category } : {}
  return await axios.get(API, { params })
}

export const searchComplaints = async (location) => {
  return await axios.get(`${API}/search`, { params: { location } })
}

export const updateComplaintStatus = async (id, status, token) => {
  return await axios.put(
    `${API}/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export const deleteComplaint = async (id, token) => {
  return await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}