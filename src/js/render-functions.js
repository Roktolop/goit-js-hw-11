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

  showLoader();

  const images = await getImagesByQuery(query); 
  console.log(images);
  
  if (images.length > 0) {
    createGallery(images);
    hideLoader();
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
              <p class="text">Likes <span class="photo-item-span">${likes}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Views <span class="photo-item-span">${views}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Comments <span class="photo-item-span">${comments}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Downloads <span class="photo-item-span">${downloads}</span></p>
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