import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { createElements } from './js/markup';
import { searchQuery } from './js/pixabay';

const formEl = document.querySelector('form');
const galleryEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.btn-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  CaptionDelay: 250,
  captions: true,
  captionsData: 'alt',
});

formEl.addEventListener('submit', searchInformation);
buttonEl.addEventListener('click', onButtonClick);

async function searchInformation(event) {
  event.preventDefault();
  buttonEl.classList.add('is-hidden');
  searchQuery.page = 1;

  const query = event.target.elements.searchQuery.value.trim();

  const response = await searchQuery.searchPictures(query);
  console.log(response);
  const galleryItem = response.hits;

  try {
    galleryEl.innerHTML = '';
    if (galleryItem.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (!query) {
      Notiflix.Notify.info('Please, enter key word for search!');

      return;
    } else {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      renderingMarkup(response.hits);
      buttonEl.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function onButtonClick() {
  searchQuery.page += 1;

  const response = await searchQuery.searchPictures();
  if (searchQuery.page > response.totalHits / searchQuery.per_page) {
    buttonEl.classList.add('visually-hidden');
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  renderingMarkup(response.hits);

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function renderingMarkup(array) {
  galleryEl.insertAdjacentHTML('beforeend', createElements(array));
  lightbox.refresh();
}
