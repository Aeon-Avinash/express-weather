const weatherForm = document.querySelector('form');
const displayDataTop = document.querySelector('.displayDataTop');
const displayDataBottom = document.querySelector('.displayDataBottom');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const address = e.target.firstElementChild.value;
  displayDataTop.textContent = `Loading weather for ${address}...`;
  displayDataBottom.textContent = '';
  fetch(`http://localhost:8000/weather?address=${address}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        displayDataTop.textContent = data.error;
        displayDataBottom.textContent = '';
      } else {
        displayDataTop.textContent = data.location;
        displayDataBottom.textContent = data.weather.forecast;
      }
    })
    .catch(err => console.log(err));
});
