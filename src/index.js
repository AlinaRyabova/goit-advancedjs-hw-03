import { fetchBreeds, fetchCatByBreed } from './cat-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const errorElement = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.add(option);
      });

      loader.style.display = 'none';
      breedSelect.style.display = 'block';
    })
    .catch(error => {
      errorElement.style.display = 'block';
      loader.style.display = 'none';

      iziToast.error({
        title: 'Error',
        message: 'Unable to upload cat information',
      });
    });

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    loader.style.display = 'block';
    errorElement.style.display = 'none';

    catInfo.style.display = 'none';

    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        const cat = catData[0];

        catInfo.innerHTML = `
          <img src="${cat.url}" alt="Cat Image">
          <p class="text">Breed name: ${cat.breeds[0].name}</p>
          <p class="text">Description: ${cat.breeds[0].description}</p>
          <p class="text">Temperament: ${cat.breeds[0].temperament}</p>
        `;

        catInfo.style.display = 'block';
      })
      .catch(error => {
        errorElement.style.display = 'block';

        iziToast.error({
          title: 'Error',
          message: 'Unable to upload cat information',
        });
      })
      .finally(() => {
        loader.style.display = 'none';
      });
  });
});
