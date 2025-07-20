`use strict`;

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const fieldDays = document.querySelector("[data-days]");
const fieldHours = document.querySelector("[data-hours]");
const fieldMinutes = document.querySelector("[data-minutes]");
const fieldSeconds = document.querySelector("[data-seconds]");



//choose date

startBtn.disabled = true;

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        userSelectedDate = selectedDate;
        console.log("Обрана дата:", userSelectedDate);

        if (selectedDate <= currentDate) {
            iziToast.show({
                position: `topRight`,
                iconUrl: `../img/cancel-circle.svg`,
                color: `red`,
                message: "Please choose a date in the future"
            });
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
};
  
flatpickr(input, options);

//-------------------------------------------------------

//time calculator

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.padStart(2, "0");
}

//-------------------------------------------------------

let timerId = null;

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    input.disabled = true;

    timerId = setInterval(() => {
        const now = new Date();
        const diff = userSelectedDate - now;

        if (diff <= 0) {
            clearInterval(timerId);
            updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            input.disabled = false;
            return;
        } 

        const currentTime = convertMs(diff);
        updateTimerUI(currentTime);

    }, 1000);
});

function updateTimerUI({ days, hours, minutes, seconds }) {
    fieldDays.textContent = addLeadingZero(days.toString());
    fieldHours.textContent = addLeadingZero(hours.toString());
    fieldMinutes.textContent = addLeadingZero(minutes.toString());
    fieldSeconds.textContent = addLeadingZero(seconds.toString());
}

