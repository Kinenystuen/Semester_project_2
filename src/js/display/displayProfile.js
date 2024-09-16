import { errorMessage } from '../utilitis/errorMessage.js';
import * as fetch from './../api/fetch/index.js';
import * as storage from './../api/storage/index.js';
import * as handlers from './../api/handlers/index.js';
import * as evtListeners from './../evtListeners/index.js';
import * as display from './displayBidWins.js';
import * as status from './../api/auth/index.js';
import { createListingForm } from '../api/handlers/createListing.js';

export async function displayProfile(url) {
  try {
    const data = await fetch.fetchProfile(url);
    const creditDiv = document.getElementById('creditDiv');
    const createListingBtn = document.getElementById('createListingBtn');
    const loggedIn = status.isLoggedIn();
    if (data) {
      const profileData = data.data;
      display.displayProfileListings(profileData);
      if (loggedIn) {
        const profileLink = document.querySelector('.profileLinkA');
        profileLink.href = '/html/pages/profiles.html';
        profileLink.classList.remove('disabled');
      }

      const username = storage.load('profile').name;

      document.title = 'AuctionHub | Profile - ' + `${profileData.name}`;
      const BCProfileName = document.getElementById('BCProfileName');
      const profileBio = document.getElementById('profileBio');
      const profileImg = document.getElementById('profileImg');
      const profileName = document.getElementById('profileName');
      if (profileData.bio !== null) {
        profileBio.innerText = profileData.bio;
      } else {
        profileBio.innerText = `${profileData.name} has been busy chasing squirrels around the neighborhood trying to convince them to ghostwrite their bio. `;
      }
      profileImg.src = profileData.avatar.url;
      profileImg.alt = `${profileData.name}'s avatar`;
      profileName.innerText = profileData.name;

      // ul menu
      // profile display
      const updBtn = document.getElementById('updBtn');
      const ddMenuBtn = document.createElement('div');
      const ddMenuBtnI = document.createElement('i');

      // dropdown with trashcan and update post buttons
      const ddMenuUl = document.createElement('ul');
      const ddMenyLiUpdate = document.createElement('li');
      const ddMenyLiUpdateA = document.createElement('a');
      const updateIcon = document.createElement('i');
      const ddHr = document.createElement('hr');

      // dropdown menu
      ddMenuBtn.classList.add(
        'd-flex',
        'p-3',
        'btn',
        'd-flex',
        'align-items-center',
        'align-self-start',
        'link-body-emphasis',
        'text-decoration-none',
      );
      ddMenuBtn.setAttribute('data-bs-toggle', 'dropdown');
      ddMenuBtn.setAttribute('type', 'button');
      ddMenuBtn.setAttribute('data-bs-placement', 'top');
      ddMenuBtn.title = `Update profile`;
      ddMenuBtnI.classList.add('fa-solid', 'fa-ellipsis');
      ddMenuBtnI.setAttribute('aria-expanded', 'true');
      ddMenuBtnI.id = 'ddMenuUlPro';

      new bootstrap.Tooltip(ddMenuBtn);

      ddMenuBtn.appendChild(ddMenuBtnI);

      // Ul menu
      ddMenuUl.classList.add('dropdown-menu', 'text-small', 'shadow');
      ddMenuUl.setAttribute('aria-labelledby', 'ddMenuUlPro');
      ddMenyLiUpdateA.classList.add(
        'dropdown-item',
        'dropdown-item-danger',
        'd-flex',
        'gap-2',
        'align-items-center',
      );
      ddMenyLiUpdate.setAttribute('data-bs-toggle', 'modal');
      ddMenyLiUpdate.setAttribute('data-bs-target', `#updateProfileModal`);
      ddHr.classList.add('m-1');

      const updateProfileModal = document.getElementById('updateProfileModal');
      ddMenyLiUpdate.addEventListener('click', function () {
        updateProfileModal.addEventListener('shown.bs.modal', function () {
          const updPostAvatarProfile = document.getElementById(
            'updPostAvatarProfile',
          );
          updPostAvatarProfile.src = profileData.avatar.url;
          const usernameInput = document.getElementById('usernameInput');
          usernameInput.value = profileData.name;
          const updBio = document.getElementById('updBioInput');
          updBio.value = profileData.bio;
          const updateAvatar = document.getElementById('updAvatarUrlInput');
          updateAvatar.value = profileData.avatar.url;

          handlers.setUpdateProfileForm();
        });
      });
      ddMenyLiUpdate.appendChild(ddMenyLiUpdateA);

      ddMenuUl.appendChild(ddMenyLiUpdate);

      updateIcon.classList.add('fa-solid', 'fa-pen-to-square');
      updateIcon.title = 'Edit profile';
      ddMenyLiUpdateA.appendChild(updateIcon);
      ddMenyLiUpdateA.innerHTML += 'Edit profile';

      ddMenuBtn.appendChild(ddMenuBtnI);
      ddMenuBtn.appendChild(ddMenuUl);

      // If visited profile is own profile, display credit, edit btns etc
      if (fetch.idProfile === null || profileData.name === username) {
        BCProfileName.innerText = `Your profile`;
        const credit = document.getElementById('credit');
        credit.innerText = profileData.credits;

        createListingBtn.classList.remove('d-none');
        createListingBtn.classList.add('d-block');
        creditDiv.classList.remove('d-none');
        creditDiv.classList.add('d-block');

        updBtn.appendChild(ddMenuBtn);
      } else {
        BCProfileName.innerText = `${profileData.name}'s profile`;
      }

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

    evtListeners.updImgLive('updAvatarUrlInput', 'updPostAvatarProfile');
  } catch (error) {
    console.error('Error fetching and displaying lists:', error);
    const profileDisplay = document.getElementById('profileDisplay');
    errorMessage(profileDisplay);
  }
}
