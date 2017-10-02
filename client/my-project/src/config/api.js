import Axios from 'axios'
import qs from 'qs'

Axios.defaults.baseURL = '/api'

const fetch = (url, params = {}) => {
  return Axios.get(url, {params: params})
    .then(response => {
      if (response.data && response.data.return_code == 0) {
        return response.data
      }
      throw response
    }).catch(error => {
      console.warn(error)
      return Promise.reject(error.data || error)
    })
}

const post = (url, params = {}) => {
  return Axios.post(url, qs.stringify({body: JSON.stringify(params)}))
    .then(response => {
      if (response.data && response.data.return_code == 0) {
        return response.data
      }
      throw response
    }).catch(error => {
      console.warn(error)
      return Promise.reject(error.data || error)
    })
}


export default {
  fetchSuggestionPlace: fetch.bind(null, '/place/suggestion'),
  transitDirection: fetch.bind(null, '/direction/transit'),
  postJoke: post.bind(null, '/joke/rand')
}
