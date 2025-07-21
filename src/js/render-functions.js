`use strict`;

import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./pixabay-api.js";

const form = document.querySelector(".form");
const input = document.querySelector('input[name="search-text"]');
const gallery = document.querySelector(".gallery");


const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

form.addEventListener("submit", onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  clearGallery();
  
  const query = input.value.trim();;
  if (!query) return;

  const images = await getImagesByQuery(query); 
  console.log(images);
  
  if (images.length > 0) {
    createGallery(images); 
  }


}

//murkup create

export function createGallery(images) {
    const markup = images
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <a class="gallery-item" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          <ul class="photo-list">
            <li class="photo-item">
              <p>Likes ${likes}</p>
            </li>
            <li class="photo-item">
              <p>Views ${views}</p>
            </li>
            <li class="photo-item">
              <p>Comments ${comments}</p>
            </li>
            <li class="photo-item">
              <p>Downloads ${downloads}</p>
            </li>
          </ul>
        </a>
      `
        )
        .join("");
    
    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}

//clear gallery

export function clearGallery() {
  gallery.innerHTML = '';
}

//hide or show loader class

export function showLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.add('is-visible');
}

export function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.remove('is-visible');
}