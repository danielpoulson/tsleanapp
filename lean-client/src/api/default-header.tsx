import axios from 'axios'
// import config from '../configEnv'

// export function setAuthorizationToken(token) {
//   if (token) {
//     axios.defaults.headers.common['authorization'] = `Bearer ${token}`
//   } else {
//     delete axios.defaults.headers.common['authorization']
//   }
// }

const config = {
  serverURL: 'http://localhost:3333/api'
  // serverURL: 'http://maintx.deltalabs.com.au:3333/api'
}
axios.defaults.baseURL = config.serverURL
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
