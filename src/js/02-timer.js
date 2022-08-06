import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";

const currentTime = Date.now()
let deadline = {};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const flatPic = flatpickr("#datetime-picker", options);
const refs = {
    timeInpt: document.querySelector(`#datetime-picer`),
    startBtn: document.querySelector(`[data-start]`),
    days: document.querySelector(`[data-days]`),
    hours: document.querySelector(`[data-hours]`),
    minutes: document.querySelector(`[data-minutes]`),
    seconds: document.querySelector(`[data-seconds]`),
};

refs.startBtn.addEventListener(`click`, onStart)

function onStart() {
    console.log(`click`);
    console.log(currentTime)
    console.log(deadline)
}




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
}

console.log(convertMs(currentTime))