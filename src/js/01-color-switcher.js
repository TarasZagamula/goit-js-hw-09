let timerId = null;
const refs = {
    stopBtn: document.querySelector(`[data-stop]`),
    startBtn: document.querySelector(`[data-start]`),
    bodyEl: document.querySelector(`body`),
};

refs.startBtn.addEventListener(`click`, onStart,);
refs.stopBtn.disabled = true;

function onStart(e) {
    timerId = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    e.target.disabled = true;
    refs.stopBtn.disabled = false;
    refs.stopBtn.addEventListener(`click`, onStop, { once: true });
    console.log(`start`)
    return timerId;
};

function onStop(e) {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    console.log(`stop`)
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};