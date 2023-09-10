'use strict';

// selecting text input
const movieNameEL = document.getElementById('movie-name');

const resultEl = document.getElementById('result');

// selecting button
const btnSearch = document.getElementById('search-btn');

const isFieldEmpty = function () {
  if (movieNameEL.value !== '') {
    return false;
  }
  return true;
};

const printInvaildMessage = function () {
  resultEl.textContent = 'Movie not found!';
};

btnSearch.addEventListener('click', function () {
  if (!isFieldEmpty()) {
    console.log(movieNameEL.value);
  } else {
    console.log('please enter movie name');
    printInvaildMessage();
  }
});
