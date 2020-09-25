import axios from 'axios'
const baseURL = '/api/persons'

// extracted request methods take the http request object return response data

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseURL, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(baseURL + '/' + id)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject)
  return request.then(response => response.data)
}

// import as noteService object with these properties on it
export default { getAll, create, remove, update }
