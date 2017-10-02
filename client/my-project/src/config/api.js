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


const curry = function (fn) {
  const args = Array.prototype.slice.call(arguments, 1)
  return function () {
    args.push(...Array.from(arguments))
    return fn.apply(null, args)
  }
}

export default {
  fetchSuggestionPlace: curry(fetch, '/place/suggestion'),
  transitDirection: curry(post, '/direction/transit'),
  postJoke: curry(post, '/joke/rand')
}
