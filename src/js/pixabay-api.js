`use strict`;

import axios from 'axios';
import iziToast from "izitoast";

const API_KEY = "51409693-2d1545100387263aa5c533cc2";

export async function getImagesByQuery(query) {
  try {
    const response = await axios(`https://pixabay.com/api/`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
      }
    });

    const images = response.data.hits;

    if (!images || images.length === 0) {
      iziToast.error({
        message: 'Sorry, no images match your search query. Please try again.',
        position: 'topRight',
      });
      return []; 
    }

    return images; 
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight'
    });
    return []; 
  }
}



