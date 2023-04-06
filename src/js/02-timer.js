import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

const refs = {
  dateTimePicker: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.dateTimePicker, options);

refs.startBtn.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(
    refs.dateTimePicker.value,
    'Y-m-d H:i'
  );
  startCountdown(selectedDate);
});

function startCountdown(selectedDate) {
  const countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = selectedDate.getTime() - currentDate.getTime();

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      refs.daysEl.textContent = days.toString().padStart(2, '0');
      refs.hoursEl.textContent = hours.toString().padStart(2, '0');
      refs.minutesEl.textContent = minutes.toString().padStart(2, '0');
      refs.secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
  }, 1000);
}

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
