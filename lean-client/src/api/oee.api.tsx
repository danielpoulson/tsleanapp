import axios from 'axios'
import './default-header'

export function getOEEData() {
  const url = '/oee'
  return axios.get(url).catch(error => {})
}
