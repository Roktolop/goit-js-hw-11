`use strict`;

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");


const lightbox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
});


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