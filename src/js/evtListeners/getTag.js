import { getListsURL } from '../api/listings/getListings.js';
import { displayListings } from '../display/displayListings.js';
import { clearHTML } from '../utilitis/clearHTML.js';

// Function to filter listings by selected tag
export function filterListingsByTag(selectedTag) {
  const listingsContainer = document.getElementById('listings');
  if (selectedTag) {
    const newUrl = getListsURL + `?_tag=${selectedTag}`;
    clearHTML(listingsContainer);
    displayListings(newUrl);
  } else {
    displayListings(getListsURL);
  }
}
