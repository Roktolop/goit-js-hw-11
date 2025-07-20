`use strict`;

import axios from 'axios';

export function getImagesByQuery(query) {
  axios.get(`https://pixabay.com/api/${query}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
}


