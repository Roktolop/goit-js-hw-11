`use strict`;

import SimpleLightbox from "simplelightbox";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm"
import {getImagesByQuery} from "./pixabay-api";

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

const galleryContainer = document.querySelector(".gallery");

//murkup create

export function createGallery(images) {
    const markup = images
        .map(({ webformatURL, largeImageURL, tags }) => `
        <a class="gallery__item" href="${largeImageURL}">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
      `
        )
        .join("");
    
    galleryContainer.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}

//clear gallery

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

//hide or show loader class

export function showLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.add('is-visible');
}

export function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.remove('');
}