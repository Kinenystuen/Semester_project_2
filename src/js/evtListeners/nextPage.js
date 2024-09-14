import { getLists } from '../api/listings/getListings.js';
import * as display from './../display/index.js';
import * as constants from './../api/constants.js';
let currentPage = 1;
let isLastPage = false;
let isFirstPage = true;

const nextPageBtn = document.getElementById('nextPage');
const previousPageBtn = document.getElementById('previousPage');
const visibleListings = document.getElementById('visibleListings');
if (previousPageBtn) {
  previousPageBtn.disabled = true;
}

// Function to fetch the next page
async function fetchNextPage(baseUrl) {
  if (isLastPage) {
    console.log('No more pages to load');
    return;
  }

  try {
    const url = `${baseUrl}?page=${currentPage + 1}`;
    const data = await getLists(url);

    if (data && data.data) {
      display.makeListings(data);
      currentPage = data.meta.currentPage;
      isLastPage = data.meta.isLastPage;
      isFirstPage = data.meta.isFirstPage;
      visibleListings.innerText = `Page ${currentPage} / ${data.meta.pageCount}`;

      // Toggle button visibility
      if (isLastPage) {
        nextPageBtn.disabled = true;
      } else {
        nextPageBtn.disabled = false;
      }

      previousPageBtn.disabled = false;
      previousPageBtn.classList.remove('d-none');
    } else {
      console.error('Error fetching listings:', data);
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
}

// Function to fetch the previous page
async function fetchPreviousPage(baseUrl) {
  if (isFirstPage) {
    console.log('You are on the first page');
    return;
  }

  try {
    const url = `${baseUrl}?page=${currentPage - 1}`;
    const data = await getLists(url);

    if (data && data.data) {
      display.makeListings(data);

      currentPage = data.meta.currentPage;
      isFirstPage = data.meta.isFirstPage;
      isLastPage = data.meta.isLastPage;
      visibleListings.innerText = `Page ${currentPage} /${data.meta.pageCount}`;

      if (isFirstPage) {
        previousPageBtn.disabled = true;
      } else {
        previousPageBtn.disabled = false;
      }

      nextPageBtn.disabled = false;
      nextPageBtn.classList.remove('d-none');
    } else {
      console.error('Error fetching listings:', data);
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
}

export function nextPageBtns() {
  nextPageBtn.addEventListener('click', function () {
    const baseUrl = `${constants.apiHostUrl}${constants.apiAction}`;
    fetchNextPage(baseUrl);
  });

  previousPageBtn.addEventListener('click', function () {
    const baseUrl = `${constants.apiHostUrl}${constants.apiAction}`;
    fetchPreviousPage(baseUrl);
  });
}
