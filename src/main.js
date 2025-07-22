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
  if (!query) return;

  showLoader();

  const images = await getImagesByQuery(query); 
  console.log(images);
  
  createGallery(images);
  hideLoader();
}
