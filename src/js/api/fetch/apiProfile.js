import { isLoggedIn } from '../auth/status.js';
import { headers } from '../headers.js';
import * as constants from './../constants.js';

// Finds the id in the queryString
const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
export const idProfile = urlParams.get('user');

const params = '_listings=true&_wins=true';
const method = 'get';

let apiUrl;
let apiOwnUrl;
let apiProfileListingsUrl;
const loggedIn = isLoggedIn();
const profileData = localStorage.getItem(`profile`);
const profile = JSON.parse(profileData);
if (loggedIn === true) {
  apiOwnUrl = `${constants.apiHostUrl}${constants.apiProfiles}/${profile.name}?${params}`;
  if (currentUrl.includes('/Semester_project_2/html/pages/sell.html')) {
    apiUrl = `${constants.apiHostUrl}${constants.apiProfiles}/${profile.name}?${params}`;
  }
}
const currentUrl = window.location.href;
if (currentUrl.includes('/Semester_project_2/html/pages/profile.html')) {
  if (idProfile) {
    apiUrl = `${constants.apiHostUrl}${constants.apiProfiles}/${idProfile}?${params}`;
    apiProfileListingsUrl = `${constants.apiHostUrl}${constants.apiProfiles}/${idProfile}${constants.apiListings}?${params}`;
  } else {
    apiUrl = `${constants.apiHostUrl}${constants.apiProfiles}/${profile.name}?${params}`;
    apiProfileListingsUrl = `${constants.apiHostUrl}${constants.apiProfiles}/${profile.name}${constants.apiListings}?${params}`;
  }
}

export const getProfileURL = apiUrl;
export const getOwnProfileUrl = apiOwnUrl;
export const getProfileListingsUrl = apiProfileListingsUrl;

export async function fetchProfile(url) {
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
