import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_6LTEfMyjdtxQAPtuNZNBnNjVQ5gfbd901k2uuyRZdsZ2YqQ5cubh0dPA1jwSPq5F';

export const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
