import { getListsURL } from '../api/listings/getListings.js';
import { clearHTML } from '../utilitis/clearHTML.js';
import * as evtListener from './../evtListeners/index.js';
import { displayListings } from './displayListings.js';

// Function to display the dropdown menu with tags
export function displayTagsDropdown(tags) {
  const dropdownMenu = document.getElementById('tagsDD');
  const openListings = document.getElementById('openListings');

  if (dropdownMenu) {
    clearHTML(dropdownMenu);

    // Create and append "Clear tags" item
    const clearItem = document.createElement('li');
    const clearLink = document.createElement('a');
    clearLink.className = 'dropdown-item';
    clearLink.id = 'clearTags';
    clearLink.textContent = 'Clear tags';
    clearItem.appendChild(clearLink);
    dropdownMenu.appendChild(clearItem);

    tags.forEach((tag) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'dropdown-item';
      a.textContent = tag;

      a.addEventListener('click', () => evtListener.filterListingsByTag(tag));

      li.appendChild(a);
      dropdownMenu.appendChild(li);
    });
    document
      .getElementById('clearTags')
      .addEventListener('click', function (e) {
        e.preventDefault();

        const allTags = dropdownMenu.querySelectorAll('a.dropdown-item');
        allTags.forEach((item) => item.classList.remove('active-tag'));
        displayListings(getListsURL);
        clearHTML(openListings);
      });
  } else {
    console.error('Dropdown menu not found!');
  }
}
