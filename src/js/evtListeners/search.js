import * as display from './../display/index.js';
import * as constants from './../api/constants.js';
import { getListsURL } from '../api/listings/getListings.js';
import { clearHTML } from '../utilitis/clearHTML.js';
import { getProfilesURL } from '../api/fetch/apiProfiles.js';

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
        display.displayListings(newUrl);
      } else {
        display.displayListings(getListsURL);
      }
    });
  }
}
export async function searchProfiles() {
  const profilesDisplay = document.getElementById('profilesDisplay');

  // Search Functionality
  const searchInputP = document.querySelector('#search-input');

  if (searchInputP) {
    searchInputP.addEventListener('keyup', function () {
      const searchInputTrim = searchInputP.value.trim();
      if (searchInputTrim.length > 0) {
        const newUrl = `${constants.apiHostUrl}${constants.apiProfiles}/search?q=${encodeURIComponent(searchInputTrim)}`;
        console.log(newUrl);
        clearHTML(profilesDisplay);
        display.displayProfiles(newUrl);
      } else {
        display.displayProfiles(getProfilesURL);
      }
    });
  }
}
