import { clearHTML } from '../../utilitis/clearHTML.js';
import { loaderW } from '../../utilitis/loader.js';
import { headers } from '../headers.js';
import * as constants from './../constants.js';

const method = 'post';

let apiUrl;
const currentUrl = window.location.href;
if (currentUrl.includes('/Semester_project_2/html/pages/profile.html')) {
  apiUrl = `${constants.apiHostUrl}${constants.apiAction}`;
}
export const getCreateListingURL = apiUrl;

export async function createListing(url, listingData) {
  const message = document.getElementById('errorMessageCreateListing');
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

    const response = await fetch(`${url}`, options);

    if (response.ok) {
      const listing = await response.json();
      window.location.reload();
      return listing;
    } else {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.errors[0].message;
      message.innerHTML = errorMessage;
      if (btnCreateListing) {
        btnCreateListing.innerHTML = 'Create listing';
        btnCreateListing.removeChild(loaderW);
      }
      throw new Error(`Failed to create listing: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error creating listing:', error);
  }
}
