`use strict`;

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handlesubmit);


//submit

function handlesubmit(event) {
    event.preventDefault();

    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    createPromise(delay, state)
        .then(() => {
            iziToast.success({
                position: `topRight`,
                message: `Fulfilled promise in ${delay}ms`
            });
        })
        .catch(() => {
            iziToast.error({
                position: `topRight`,
                message: `Rejected promise in ${delay}ms`
            });
        });
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });
}