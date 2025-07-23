'use strict';

import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { createGallery, clearGallery, hideLoader, showLoader } from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';

const form = document.querySelector(".form");
const input = document.querySelector('input[name="search-text"]');

form.addEventListener("submit", onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  const query = input.value.trim();
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
    console.log(images);

    createGallery(images);
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
}
