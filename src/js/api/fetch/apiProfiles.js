import { isLoggedIn } from '../auth/status.js';
import { headers } from '../headers.js';
import * as constants from './../constants.js';

const params = '_listings=true&_wins=true';
const method = 'get';

let apiUrl;
const loggedIn = isLoggedIn();
if (loggedIn === true) {
  apiUrl = `${constants.apiHostUrl}${constants.apiProfiles}?${params}`;
}

export const getProfilesURL = apiUrl;

export async function fetchProfiles(url) {
  try {
    const headersData = headers('application/json');
    const options = {
      method,
      headers: headersData,
      body: JSON.stringify(),
    };
    const response = await fetch(`${url}`, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
  } catch (error) {
    console.log('Error: ' + error);
  }
}
