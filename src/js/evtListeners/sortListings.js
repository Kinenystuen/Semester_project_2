import { getLists, getListsURL } from '../api/listings/getListings.js';
import { clearHTML } from '../utilitis/clearHTML.js';
import { displayListings, makeListings } from './../display/displayListings.js';
import * as constants from './../api/constants.js';

const listings = document.getElementById('listings');
// Sort listings by date
export function sortListingsByDate(listings, order = 'newest') {
  return listings.sort((a, b) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);

    if (order === 'newest') {
      return dateB - dateA; // Newest to oldest
    } else {
      return dateA - dateB; // Oldest to newest
    }
  });
}

// Fetch and display sorted listings
async function fetchAndDisplaySortedListings(url, order) {
  try {
    const data = await getLists(url);
    if (data && data.data) {
      const sortedListings = sortListingsByDate(data.data, order);
      clearHTML(listings);
      makeListings(sortedListings);
    }
  } catch (error) {
    console.error('Error fetching and displaying lists:', error);
  }
}

// Filter by listings ending soon (within 72 hours)
function getEndingSoonListings(listings) {
  return listings.filter((listing) => {
    const endsAt = new Date(listing.endsAt);
    const now = new Date();

    const hoursRemaining = (endsAt - now) / (1000 * 60 * 60);

    return hoursRemaining > 0 && hoursRemaining <= 72;
  });
}

// Filter by ended listings
function getEndedListings(listings) {
  return listings.filter((listing) => {
    const endsAt = new Date(listing.endsAt);
    const now = new Date();

    return endsAt < now;
  });
}

// Fetch listings and apply filter (ending soon, or ended)
async function fetchAndDisplayListings(url, filter = 'endingSoon') {
  try {
    const data = await getLists(url);
    if (data && data.data) {
      let filteredListings;

      if (filter === 'endingSoon') {
        filteredListings = getEndingSoonListings(data.data);
      } else if (filter === 'ended') {
        filteredListings = getEndedListings(data.data);
      }
      clearHTML(listings);
      makeListings(filteredListings);
    }
  } catch (error) {
    console.error('Error fetching and displaying lists:', error);
  }
}

export async function sortListings() {
  // Sort active listings
  document
    .getElementById('activeListings')
    .addEventListener('click', function () {
      const apiListUrl = `${constants.apiHostUrl}${constants.apiAction}`;
      const paramsTrue = '?_active=true';
      const newUrl = `${apiListUrl}${paramsTrue}`;
      clearHTML(listings);
      displayListings(newUrl);
    });

  // Sort by newest
  document.getElementById('newListings').addEventListener('click', function () {
    fetchAndDisplaySortedListings(getListsURL, 'newest');
  });
  // Sort by oldest
  document.getElementById('oldListings').addEventListener('click', function () {
    fetchAndDisplaySortedListings(getListsURL, 'oldest');
  });
  // Sort ended listings
  document
    .getElementById('endedListings')
    .addEventListener('click', function () {
      fetchAndDisplayListings(getListsURL, 'ended');
    });
  // Sort by ending soon listings
  document.getElementById('endingSoon').addEventListener('click', function () {
    fetchAndDisplayListings(getListsURL, 'endingSoon');
  });
  // Clear sorting
  document.getElementById('clearSort').addEventListener('click', function () {
    displayListings(getListsURL);
  });
}
// Automatically initialize on window load
window.onload = sortListings;
