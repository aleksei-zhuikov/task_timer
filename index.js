document.addEventListener('DOMContentLoaded', function () {

  const inputEl = document.querySelector('input');
  const buttonEl = document.querySelector('button');
  const buttonResetEl = document.querySelector('.reset');
  const timerEl = document.querySelector('span');

  const hoursTextEL = document.querySelector('.hours-text');
  const minutesTextEL = document.querySelector('.minutes-text');
  const hoursTextEl = document.querySelector('.secunds-text');

  let timerId = null;

  // Реализацию createTimerAnimator
  const createTimerAnimator = () => {

    return (seconds) => {
      console.log('SECONDS >>', seconds)

      function tic() {
        seconds--

        if (seconds <= 0) {
          clearInterval(timerId);
          resBtn()
        }

        let hours = Math.floor(seconds / 60 / 60);
        let minutes = Math.floor(seconds / 60) - (hours * 60);
        let sec = seconds % 60;

        let h = hoursTextEL.innerHTML = declOfNum(hours, ['час', 'часа', 'часов']);
        let m = minutesTextEL.innerHTML = declOfNum(minutes, ['минута', 'минуты', 'минут']);
        let s = hoursTextEl.innerHTML = declOfNum(sec, ['секунда', 'секунды', 'секунд']);


        timerEl.innerHTML = `${hours} ${h} : ${minutes} ${m} : ${sec} ${s}`


      }
      tic()

      timerId = setInterval(tic, 1000)
    };

  };

  const animateTimer = createTimerAnimator();


  // проверка инпут на числа
  inputEl.addEventListener('input', function () {

    this.value = this.value.replace(/[^\d]/g, "");

  });


  // button start timer
  buttonEl.addEventListener('click', () => {

    let condition = 0;
    if (inputEl.value <= condition) return

    const seconds = Number(inputEl.value);

    buttonEl.style.display = 'none';
    buttonResetEl.style.display = 'block';
    inputEl.disabled = true;

    animateTimer(seconds);

    inputEl.value = '';
  });


  // button reset timer
  function resBtn() {
    clearInterval(timerId)
    timerEl.innerHTML = `hh : mm : ss`;
    buttonEl.style.display = 'block';
    buttonResetEl.style.display = 'none';
    inputEl.disabled = false;
  }

  buttonResetEl.addEventListener('click', resBtn)

})

function declOfNum(number, titles) {
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
