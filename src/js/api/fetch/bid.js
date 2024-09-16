import { clearHTML } from '../../utilitis/clearHTML.js';
import { loaderW } from '../../utilitis/loader.js';
import { headers } from '../headers.js';
import * as constants from './../constants.js';

export async function createBid(
  bidDetails,
  action,
  method,
  bidId,
  submitButton,
) {
  try {
    if (action !== `/auction/listings/${bidId}/bids`) {
      const actionURL = new URL(action);
      const createBidUrl = `${constants.apiHostUrl}${actionURL.pathname}`;

      if (submitButton) {
        clearHTML(submitButton);
        submitButton.appendChild(loaderW);
      }
      // Prepare headers
      const headersData = headers('application/json');

      const options = {
        method,
        headers: headersData,
        body: JSON.stringify(bidDetails),
      };

      const response = await fetch(`${createBidUrl}`, options);

      if (response.ok) {
        window.location.reload();
      } else {
        if (submitButton) {
          submitButton.innerHTML = 'Submit bid';
          submitButton.removeChild(loaderW);
        }
        throw new Error(`Failed to post bid: ${response.statusText}`);
      }
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}
