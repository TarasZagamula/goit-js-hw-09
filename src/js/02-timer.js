import "flatpickr/dist/flatpickr.min.css";
import "notiflix/dist/notiflix-aio-3.2.5.min.js";
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

const currentTime = Date.now()
let deadline = 0;
let interval = 0;
let valueToRe = {};
let disabledBtn = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < currentTime) {
      return Notiflix.Notify.failure('do not look to the past');
    }
    deadline = selectedDates[0].getTime();
    refs.startBtn.disabled = false;
    refs.startBtn.style.backgroundColor = `#212121`;
  },
};

const refs = {
    timeInpt: document.querySelector(`#datetime-picer`),
    startBtn: document.querySelector(`[data-start]`),
    days: document.querySelector(`[data-days]`),
    hours: document.querySelector(`[data-hours]`),
    minutes: document.querySelector(`[data-minutes]`),
  seconds: document.querySelector(`[data-seconds]`),
};

flatpickr("#datetime-picker", options);
refs.startBtn.addEventListener(`click`, onStart);
refs.startBtn.disabled = disabledBtn;

function onStart() {
  refs.startBtn.disabled = true;
  refs.startBtn.style.backgroundColor = `red`
  downCounterStart();
};

function pad(v) {
  return String(v).padStart(2, `0`);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function downCounterStart() {
  interval = deadline - currentTime;
  const timerOn = setInterval(() => {
    if(interval <= 1000){return clearInterval(timerOn)}
    interval -= 1000;
    console.log(interval);
    valueToRe = convertMs(interval);
    valueRecorder(valueToRe);
  }, 1000); 
};

function valueRecorder(arr) {
  refs.seconds.textContent = pad(arr.seconds);
  refs.minutes.textContent = pad(arr.minutes);
  refs.hours.textContent = pad(arr.hours);
  refs.days.textContent = pad(arr.days);
}

