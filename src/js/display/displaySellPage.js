import { createListingForm } from '../api/handlers/createListing.js';
import { errorMessage } from '../utilitis/errorMessage.js';
import * as status from './../api/auth/status.js';
import * as fetch from './../api/fetch/index.js';

export async function displaySellPage(url) {
  try {
    const loggedIn = status.isLoggedIn();
    const data = await fetch.fetchProfile(url);
    const profileData = data.data;
    if (loggedIn) {
      const createListingBtnSell = document.getElementById(
        'createListingBtnSell',
      );
      const registerUserBtnSell = document.getElementById(
        'registerUserBtnSell',
      );
      createListingBtnSell.classList.remove('d-none');
      registerUserBtnSell.classList.add('d-none');

      const createListingModal = document.getElementById('createListingModal');
      createListingModal.addEventListener('shown.bs.modal', function () {
        // Create listing form when modal is open
        const userImg = document.getElementById('userImgCL');
        const username = document.getElementById('usernameCL');

        userImg.src = profileData.avatar.url;
        username.innerText = profileData.name;

        createListingForm();
      });
    }
  } catch (error) {
    console.error('Error fetching and displaying lists:', error);
    const createListingModal = document.getElementById('createListingModal');
    errorMessage(createListingModal);
  }
}
