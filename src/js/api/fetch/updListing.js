import { clearHTML } from '../../utilitis/clearHTML.js';
import { loaderW } from '../../utilitis/loader.js';
import { headers } from '../headers.js';
import * as constants from './../constants.js';

const method = 'put';

export async function updateListing(id, listingData) {
  try {
    const apiUrl = `${constants.apiHostUrl}${constants.apiAction}/${id}`;
    const btnUpdateListing = document.getElementById('btnUpdateListing');
    if (btnUpdateListing) {
      clearHTML(btnUpdateListing);
      btnUpdateListing.appendChild(loaderW);
    }
    const headersData = headers('application/json');

    const options = {
      method,
      headers: headersData,
      body: JSON.stringify(listingData),
    };

    const response = await fetch(`${apiUrl}`, options);

    if (response.ok) {
      const profile = await response.json();
      window.location.reload();
      return profile;
    } else {
      if (btnUpdateListing) {
        btnUpdateListing.innerHTML = 'Update listing';
        btnUpdateListing.removeChild(loaderW);
      }
      throw new Error(`Failed to update listing: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating listing:', error);
  }
}
