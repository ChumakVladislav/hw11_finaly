import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

const URL = 'https://pixabay.com/api/';
const optionsFetch = {
  key: '41293253-42a55b268bdac57d89d3cc200',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

form.addEventListener('submit', onFormSuccess);

async function onFormSuccess(e) {
  try {
    e.preventDefault();

    const searchWord = e.currentTarget.searchQuery.value;
    const fetchResponse = await fetch(
      `${URL}?key=${optionsFetch.key}&q=${searchWord}&image_type=${optionsFetch.image_type}&orientation=${optionsFetch.orientation}&safesearch=${optionsFetch.safesearch}`
    )
      .then(r => {
        return r.json();
      })
      .then(r => {
        if (r.hits.length === 0) {
          throw new Error();
        }
        htmlMarkup(r.hits);
      });
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function makeMarkup(arr) {
  return arr
    .map(
      photo => `<div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${photo.views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${photo.downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}

async function htmlMarkup(arr) {
  gallery.innerHTML = await makeMarkup(arr);
}
