import { getProfile } from '../api/auth/status.js';

// Function to update profile dropdown
export function updateProfileDD() {
  const profileData = getProfile();

  const userName = document.getElementById('username');
  const userImg = document.getElementById('userImg');

  if (profileData && profileData.avatar) {
    userImg.src = profileData.avatar.url;
  } else {
    userImg.src =
      'https://plus.unsplash.com/premium_photo-1670426502067-99395cc491c2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  } // fallback img

  if (userName) {
    userName.innerText = profileData.name;
  }
}

// function to hide and show right element when logged in/out
export function toggleLoginVisibility(loggedIn) {
  const loginBtnContainer = document.getElementById('userBtn');
  const userDropdownContainer = document.getElementById(
    'userDropdownContainer',
  );

  if (!loginBtnContainer || !userDropdownContainer) {
    console.error('Elements not found:', {
      loginBtnContainer,
      userDropdownContainer,
    });
    return;
  }
  // User is logged in/logged out, show/not show the dropdown and the login button
  if (loggedIn) {
    loginBtnContainer.setAttribute('data-visible', 'false');
    loginBtnContainer.style.display = 'none';

    userDropdownContainer.setAttribute('data-visible', 'true');
    userDropdownContainer.style.display = 'block';
  } else {
    loginBtnContainer.setAttribute('data-visible', 'true');
    loginBtnContainer.style.display = 'block';

    userDropdownContainer.setAttribute('data-visible', 'false');
    userDropdownContainer.style.display = 'none';
  }
}
