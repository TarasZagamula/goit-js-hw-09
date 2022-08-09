import "notiflix/dist/notiflix-aio-3.2.5.min.js";
import Notiflix from 'notiflix';

const formEl = document.querySelector(`.form`);
const refs = {
  delay: 0,
  step: 0,
  amount: 0,
};

formEl.addEventListener(`input`, onInput);
formEl.addEventListener(`submit`, onSubmit);

function onInput(e) {
  if (e.target.value < 0) {
    e.target.value = ``;
    return Notiflix.Notify.failure(`${e.target.name} cannot be negative`) 
  }
  
  refs[e.target.name] = e.target.value;
};

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
     
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
       if (shouldResolve) {
         resolve({position, delay})
  } else {
    reject({position, delay})
  }
    }, delay)
    })
};

function onSubmit(e) {
  e.preventDefault() 
  let position = 0;
  let delay = Number(`${refs.delay}`);
  for (let i = 0; i < refs.amount; i += 1) {
    position += 1;
    delay += Number(`${refs.step}`);

 createPromise(position, delay)
  .then(({ position, delay }) => {
    let messageOnSuccess = `✅ Fulfilled promise ${position} in ${delay}ms`;
    onSuccess(messageOnSuccess)
  })
  .catch(({ position, delay }) => {
    let messageOnFailure = `❌ Rejected promise ${position} in ${delay}ms`;
    onFailure(messageOnFailure)
  }); 
  }      
};

function onSuccess(msg) {
  Notiflix.Notify.success(msg)
};

function onFailure(msg) {
  Notiflix.Notify.failure(msg)
};



  //  createPromise(position, delay)
  // .then(({ position, delay }) => {
  //   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  // })
  // .catch(({ position, delay }) => {
  //   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  // });