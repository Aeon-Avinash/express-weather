const toggleBtn = document.querySelector('#toggleBtn');
const shuffleBtn = document.querySelector('#shuffleBtn');
const imageDiv = document.querySelector('.imageDiv');

toggleBtn.addEventListener('click', () => {
  toggleBtn.textContent = imageDiv.style.display === 'none' ? 'Hide Image' : 'Show Image';
  imageDiv.style.display = imageDiv.style.display === 'none' ? 'block' : 'none';
});

shuffleBtn.addEventListener('click', () => {
  const image = document.querySelector('.image');
  image.parentNode.removeChild(image);

  const weatherArr = ['rain', 'snow', 'sunny', 'clouds', 'sunny', 'weather'];
  const rnd = Math.floor(Math.random() * weatherArr.length);
  const rndWeather = weatherArr[rnd]; 

  const img = document.createElement('img');
  img.setAttribute('src', `https://source.unsplash.com/400x300/?${rndWeather}`);
  img.setAttribute('alt', 'weather image');
  img.setAttribute('class', 'image');
  img.setAttribute('width', '400px');
  img.setAttribute('height', '300px');
  imageDiv.appendChild(img);
});
