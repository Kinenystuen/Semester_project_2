// listings.js (refactored)
import { displayListings } from '../display/displayListings.js';
import * as constants from './../api/constants.js';
import { getListsURL } from '../api/listings/getListings.js';
import { clearHTML } from '../utilitis/clearHTML.js';

export async function searchListings() {
  const activeListings = document.getElementById('listings');

  // Search Functionality
  const searchInput = document.querySelector('#search-input');

  if (searchInput) {
    searchInput.addEventListener('keyup', function () {
      const searchInputTrim = searchInput.value.trim();
      if (searchInputTrim.length > 0) {
        const newUrl = `${constants.apiHostUrl}${constants.apiAction}/search?q=${encodeURIComponent(searchInputTrim)}`;
        clearHTML(activeListings);
        displayListings(newUrl);
      } else {
        displayListings(getListsURL);
      }
    });
  }
}
// Automatically initialize on window load
window.onload = searchListings;
