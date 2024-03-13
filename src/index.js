import axios from 'axios';

const API_KEY = 'live_gGQR3Hya5HBCcamloJU6I5g01n96ZYH9c70my1q1bDzf7aR4Du57N14PO5ySnfpB';
axios.defaults.headers.common['x-api-key'] = API_KEY;

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.style.display = 'none';
error.style.display = 'none';

async function fetchBreeds() {
    try {
        loader.style.display = 'block';
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        loader.style.display = 'none';
        response.data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });
    } catch (err) {
        loader.style.display = 'none';
        error.style.display = 'block';
    }
}

async function fetchCatByBreed(breedId) {
    try {
        loader.style.display = 'block';
        catInfo.innerHTML = '';
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        loader.style.display = 'none';
        const cat = response.data[0];
        const img = document.createElement('img');
        img.src = cat.url;
        img.alt = cat.breeds[0].name;
        img.classList.add('img-fluid');
        catInfo.appendChild(img);
        const info = document.createElement('div');
        info.innerHTML = `
      <h3>${cat.breeds[0].name}</h3>
      <p>${cat.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    `;
        catInfo.appendChild(info);
    } catch (err) {
        loader.style.display = 'none';
        error.style.display = 'block';
    }
}

breedSelect.addEventListener('change', () => {
    const breedId = breedSelect.value;
    fetchCatByBreed(breedId);
});

fetchBreeds();