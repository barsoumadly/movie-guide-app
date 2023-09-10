'use strict';

// selecting text input
const movieNameEL = document.getElementById('movie-name');

// selecting result field
const resultEl = document.getElementById('result');

// selecting button
const btnSearch = document.getElementById('search-btn');

const isFieldEmpty = function () {
  if (movieNameEL.value !== '') {
    return false;
  }
  return true;
};

const printInvaildMessage = function (message) {
  resultEl.textContent = message;
  resultEl.style.textAlign = 'center';
};

const getMovie = async function (movieName) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?t=${movieName}
    &apikey=ac560ee`
    );

    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error('Movie not found!');
    }
    // console.log(data);
    printMovieData(data);
  } catch (error) {
    console.error(error.message);
    printInvaildMessage(error.message);
  }
};

const printMovieData = function (data) {
  resultEl.innerHTML = '';
  const html = `
  <div class="info">
   <img src="${data.Poster}" class="poster" />
   <div>
    <h2>${data.Title}</h2>
    <div class="rating">
    <h4>⭐ ${data.imdbRating}</h4>
   </div>
   <div class="details">
    <span>${data.Rated}</span>
    <span>${data.Year}</span>
    <span>${data.Runtime}</span>
   </div>
   <div class="genre">
    <div>
    ${data.Genre.split(',').join('</div><div>')}
    </div>
   </div>
   </div>
  </div>
  <h3>Plot:</h3>
  <p>${data.Plot}</p>
  <h3>Cast:</h3>  
  <p>${data.Actors}</p>`;
  resultEl.insertAdjacentHTML('afterbegin', html);
  resultEl.style.textAlign = 'left';
};

btnSearch.addEventListener('click', function () {
  if (!isFieldEmpty()) {
    getMovie(movieNameEL.value);
  } else {
    printInvaildMessage(`Please! Enter movie name`);
  }
  movieNameEL.value = '';
});
