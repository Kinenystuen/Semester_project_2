import { getListsURL } from '../api/listings/getListings.js';
import { displayListings } from '../display/displayListings.js';

// Function to filter listings by selected tag
export function filterListingsByTag(selectedTag) {
  const listingsContainer = document.getElementById('listings');
  if (selectedTag) {
    const newUrl = getListsURL + `?_tag=${selectedTag}`;
    listingsContainer.innerHTML = '';
    displayListings(newUrl);
  } else {
    displayListings(getListsURL);
  }
}
