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

// const commandInputs = {
//   form: document.querySelector('.form'),
// };

// commandInputs.form.addEventListener('submit', getFormData);

// function getFormData(evt) {
//   evt.preventDefault();
//   const { delay, step, amount } = evt.currentTarget.elements;
//   const promisesArray = new Array(Number(amount.value)).fill().map(index => {
//     const position = index + 1;
//     const promiseDelay = Number(delay.value) + index * Number(step.value);

//     return createPromise(position, promiseDelay);
//   });

//   console.log(promisesArray); // ok

//   promisesArray.forEach(promise => {
//     promise
//       .then(({ position, delay }) => {
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   });
// }

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;

//       if (!shouldResolve) {
//         reject({ position, delay });
//       }
//       const result = { position, delay };
//       resolve(result);
//       const output = document.createElement('p');
//       output.textContent = JSON.stringify(result);
//       document.body.appendChild(output);
//     }, delay);
//   });
// }
