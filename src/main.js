`use strict`;

import { createGallery, clearGallery, hideLoader, showLoader } from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';

const form = document.querySelector(".form");
const input = document.querySelector('input[name="search-text"]');

form.addEventListener("submit", onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  clearGallery();
  
  const query = input.value.trim();;
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight'
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const images = await getImagesByQuery(query);

    if (!images || images.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'No images found for your search.',
        position: 'topRight'
      });
      return;
    }

    createGallery(images);
  } catch (error) {
    console.error("Error loading images:", error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again later.',
      position: 'topRight'
    });
  } finally {
    hideLoader();
  }
}
