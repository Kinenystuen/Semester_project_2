import { clearHTML } from '../../utilitis/clearHTML.js';
import { loaderW } from '../../utilitis/loader.js';
import { headers } from '../headers.js';
import * as constants from './../constants.js';

const method = 'delete';

export async function deleteListing(listingData) {
  const apiUrl = `${constants.apiHostUrl}${constants.apiAction}/${listingData.id}`;
  try {
    const btnCreateListing = document.getElementById('btnCreateListing');
    if (btnCreateListing) {
      clearHTML(btnCreateListing);
      btnCreateListing.appendChild(loaderW);
    }
    // Prepare headers
    const headersData = headers('application/json');

    const options = {
      method,
      headers: headersData,
      body: JSON.stringify(listingData),
    };

    const response = await fetch(`${apiUrl}`, options);

    if (response.ok) {
      window.location.reload();
    } else {
      if (btnCreateListing) {
        btnCreateListing.innerHTML = 'Delete listing';
        btnCreateListing.removeChild(loaderW);
      }
      throw new Error(`Failed to delete listing: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting listing:', error);
  }
}
