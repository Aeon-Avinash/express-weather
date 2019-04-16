const weatherForm = document.querySelector('form');
const displayDataTop = document.querySelector('.displayDataTop');
const displayDataMiddle = document.querySelector('.displayDataMiddle');
const displayDataBottom = document.querySelector('.displayDataBottom');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const address = e.target.firstElementChild.value;
  displayDataTop.textContent = `Loading weather for ${address}...`;
  displayDataMiddle.textContent = '';
  displayDataBottom.textContent = '';
  fetch(`/weather?address=${address}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        displayDataTop.textContent = data.error;
        displayDataMiddle.textContent = '';
        displayDataBottom.textContent = '';
      } else {
        displayDataTop.textContent = data.location;
        displayDataMiddle.textContent = data.weather.forecast.currently;
        displayDataBottom.innerHTML =
          data.weather.forecast.today +
          '<br/>' +
          data.weather.forecast.tomorrow;
      }
    })
    .catch(err => console.log(err));
});
