import { getLists } from '../api/listings/getListings.js';
import * as display from './../display/index.js';
import * as constants from './../api/constants.js';
import { fetchProfiles } from '../api/fetch/apiProfiles.js';

let currentPage = 1;
let isLastPage = false;
let isFirstPage = true;
const visibleData = document.querySelectorAll('.visibleData');

// Function to fetch data and update pagination
async function fetchData(baseUrl, fetchFunction, renderFunction, params) {
  try {
    const url = `${baseUrl}?page=${currentPage}${params}`;
    const data = await fetchFunction(url);

    if (data && data.data) {
      renderFunction(data);

      currentPage = data.meta.currentPage;
      isLastPage = data.meta.isLastPage;
      isFirstPage = data.meta.isFirstPage;
      visibleData.forEach((btn) => {
        btn.innerText = `Page ${currentPage} / ${data.meta.pageCount}`;
      });

      // Enable/disable buttons
      updatePaginationButtons();
    } else {
      console.error('Error fetching data:', data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to update button states
function updatePaginationButtons() {
  const nextPageBtns = document.querySelectorAll('.nextPageBtn');
  const previousPageBtns = document.querySelectorAll('.previousPageBtn');

  nextPageBtns.forEach((btn) => {
    btn.disabled = isLastPage;
  });

  previousPageBtns.forEach((btn) => {
    btn.disabled = isFirstPage;
  });
}

// Function to handle next and previous page clicks
export function setupPagination(pageType) {
  let baseUrl;
  let fetchFunction;
  let renderFunction;
  let params = '';

  // Determine if we're dealing with listings or profiles
  if (pageType === 'listings') {
    baseUrl = `${constants.apiHostUrl}${constants.apiAction}`;
    fetchFunction = getLists;
    renderFunction = display.makeListings;
  } else if (pageType === 'profiles') {
    baseUrl = `${constants.apiHostUrl}${constants.apiProfiles}`;
    fetchFunction = fetchProfiles;
    renderFunction = display.makeProfileCards;
    params = '&_listings=true&_wins=true';
  } else {
    console.error('Invalid page type specified.');
    return;
  }

  // Add event listeners for all instances of the "Next" buttons
  document.querySelectorAll('.nextPageBtn').forEach((btn) => {
    btn.addEventListener('click', function () {
      currentPage += 1;
      fetchData(baseUrl, fetchFunction, renderFunction, params);
    });
  });

  // Add event listeners for all instances of the "Previous" buttons
  document.querySelectorAll('.previousPageBtn').forEach((btn) => {
    btn.addEventListener('click', function () {
      currentPage -= 1;
      fetchData(baseUrl, fetchFunction, renderFunction, params);
    });
  });

  // Initial data fetch
  fetchData(baseUrl, fetchFunction, renderFunction, params);
}
