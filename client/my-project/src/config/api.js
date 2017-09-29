import Axios from 'axios'
import qs from 'qs'

Axios.defaults.baseURL = '/api';

const fetch = (url, params = {}) => {
  return Axios.get(url, {params: params}).then(response => {
    if (response.data && response.data.return_code == 0) {
      return Promise.resolve(response.data);
    }
    throw response;
  }).catch(error => {
    console.warn(error);
    return Promise.reject(error.data || error);
  });
};

const post = (url, params = {}) => {
  return Axios.post(url, qs.stringify({body: JSON.stringify(params)})).then(response => {
    if (response.data && response.data.return_code == 0) {
      return Promise.resolve(response.data);
    }
    throw response;
  }).catch(error => {
    console.warn(error);
    return Promise.reject(error.data || error);
  });
};


const fetchSuggestionPlace = params => fetch('/place/suggestion', params)
const transitDirection = params => post('/direction/transit', params)
const postJoke = params => post('/joke/rand', params)

export {
  fetchSuggestionPlace,
  transitDirection,
  postJoke
}
