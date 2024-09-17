import * as evtListeners from './evtListeners/index.js';
import * as fetch from './api/fetch/index.js';
import * as handlers from './api/handlers/index.js';
import * as status from './api/auth/index.js';
import * as display from './display/index.js';
import { getListsURL } from './api/listings/getListings.js';
import { selUrl } from './api/listings/getListItem.js';
import { clearHTML } from './utilitis/clearHTML.js';
import { displayProfileListings } from './display/displayProfileListings.js';
import { tooltips } from './utilitis/tooltips.js';

const currentUrl = window.location.href;
const path = window.location.pathname;

// Check if the user is logged in
document.addEventListener('DOMContentLoaded', function () {
  const loggedIn = status.isLoggedIn();

  // If the current page is not an /auth page, toggle login visibility
  if (
    !currentUrl.includes('/Semester_project_2/html//auth/login') &&
    !currentUrl.includes('/Semester_project_2/html//auth/signup')
  ) {
    display.toggleLoginVisibility(loggedIn);
  }
  // If user is logged in, set logout functionality and update profile dropdown
  if (loggedIn) {
    handlers.setLogOut();
    display.updateProfileDD();
    const profileLink = document.getElementById('profileLink');
    profileLink.classList.remove('d-none');

    if (currentUrl.includes('/Semester_project_2/html/pages/profile.html')) {
      const profileLoggedOutContainer = document.getElementById(
        'profileLoggedOutContainer',
      );
      clearHTML(profileLoggedOutContainer);
      display.displayProfile(fetch.getProfileURL);
      displayProfileListings(fetch.getProfileListingsUrl);
    }
    if (currentUrl.includes('/Semester_project_2/html/pages/profiles.html')) {
      display.displayProfiles(fetch.getProfilesURL);
      evtListeners.searchProfiles();
      evtListeners.setupPagination('profiles');
    }
  } else {
    if (currentUrl.includes('/Semester_project_2/html/pages/profile.html')) {
      const profileContainerArea = document.getElementById(
        'profileContainerArea',
      );
      clearHTML(profileContainerArea);
    }
  }
  tooltips();
});

if (
  path === '/Semester_project_2/' ||
  path === '/Semester_project_2/index.html'
) {
  display.displaySlider(getListsURL);
  evtListeners.registerBtn();
}

if (currentUrl.includes('/Semester_project_2/html/pages/auctions.html')) {
  display.displayListings(getListsURL);
  evtListeners.searchListings();
  fetch.fetchAndPopulateTags(getListsURL);
  evtListeners.sortListings();
  evtListeners.setupPagination('listings');
}
if (currentUrl.includes('/Semester_project_2/html/pages/listingitem.html')) {
  display.displayListingItem(selUrl);
}

if (currentUrl.includes(`/auth/login`)) {
  handlers.setLoginForm();
  evtListeners.initFormValidation('loginForm');
  evtListeners.historyBack('loginContainer', 'bodyOverlay');
}
if (currentUrl.includes(`/auth/signup`) || path === `/html/auth/signup.html`) {
  handlers.setRegisterForm();
  evtListeners.initFormValidation('registerForm');
  evtListeners.historyBack('registerForm', 'bodyOverlay');
}
