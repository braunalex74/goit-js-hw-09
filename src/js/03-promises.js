import Notiflix from 'notiflix';

function createPromise(position, delay, step) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shoulResolve = Math.random() > 0.3;
      if (shoulResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const delay = parseInt(formData.get('delay'));
  const step = parseInt(formData.get('step'));
  const amount = parseInt(formData.get('amount'));

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    createPromise(position, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌Rejected promise ${position} in ${delay}ms`);
      });
  }
});
