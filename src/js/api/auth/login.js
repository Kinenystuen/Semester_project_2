import * as storage from '../storage/index.js';
import * as constants from '../constants.js';
import { clearHTML } from '../../utilitis/clearHTML.js';
import { loaderW } from '../../utilitis/loader.js';

// const method = "post";

export async function login(profile, action, method) {
  const message = document.getElementById('regErrorMessage');
  const loginBtn = document.getElementById('loginBtn');
  let loginURL;
  if (action !== '/auth/login') {
    const actionURL = new URL(action);
    loginURL = `${constants.apiHostUrl}${actionURL.pathname}`;
  } else {
    loginURL = `${constants.apiHostUrl}${action}`;
  }

  if (loginBtn) {
    clearHTML(loginBtn);
    loginBtn.appendChild(loaderW);
  }

  const body = JSON.stringify(profile);

  try {
    const response = await fetch(loginURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      body,
    });
    if (response.ok) {
      const data = await response.json();
      const { accessToken, ...user } = data.data;
      // Save token and user profile to local storage
      storage.save('token', accessToken);
      storage.save('profile', user);
      clearHTML(message);
      const lastVisitedPage = localStorage.getItem('lastVisitedPage');
      if (lastVisitedPage) {
        window.location.href = lastVisitedPage;
      } else {
        window.location.href = 'html/pages/auctions.html';
      }

      return user;
    } else {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.errors[0].message;
      message.innerHTML = errorMessage;
      if (loginBtn) {
        loginBtn.innerHTML = 'Log in';
        loginBtn.removeChild(loaderW);
      }

      throw new Error(`Server responded with status ${response.status}`);
    }
  } catch (error) {
    // display the error to the user
    if (message.innerHTML === '') {
      message.innerHTML = error;
    }
    console.error(error);
  }
}
