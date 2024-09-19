import { clearHTML } from '../../utilitis/clearHTML.js';
import { loaderW } from '../../utilitis/loader.js';
import { headers } from '../headers.js';
import * as constants from './../constants.js';
import * as status from './../auth/index.js';

const method = 'put';

export async function updateProfile(profileData) {
  const message = document.getElementById('regErrorMessage');
  try {
    let apiUrl;
    const loggedIn = status.isLoggedIn();
    if (loggedIn === true) {
      const profileData = localStorage.getItem(`profile`);
      const profile = JSON.parse(profileData);
      apiUrl = `${constants.apiHostUrl}${constants.apiProfiles}/${profile.name}`;
    }
    // Prepare headers
    const btnUpdateProfile = document.getElementById('btnUpdateProfile');
    if (btnUpdateProfile) {
      clearHTML(btnUpdateProfile);
      btnUpdateProfile.appendChild(loaderW);
    }
    const headersData = headers('application/json');

    const options = {
      method,
      headers: headersData,
      body: JSON.stringify(profileData),
    };

    const response = await fetch(`${apiUrl}`, options);

    if (response.ok) {
      const profile = await response.json();
      window.location.reload();
      return profile;
    } else {
      if (btnUpdateProfile) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.errors[0].message;
        message.innerHTML = errorMessage;
        btnUpdateProfile.innerHTML = 'Update profile';
        btnUpdateProfile.removeChild(loaderW);
      }
      throw new Error(`Failed to edit profile: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}
