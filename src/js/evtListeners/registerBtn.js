import { isLoggedIn } from '../api/auth/status.js';
import * as handlers from '../api/handlers/index.js';

export async function registerBtn() {
  const registerButton = document.getElementById('regUserBtnHP');

  if (registerButton) {
    registerButton.addEventListener('click', function (e) {
      e.preventDefault();

      if (isLoggedIn()) {
        const myModal = new bootstrap.Modal(
          document.getElementById('alreadyLoggedInModal'),
        );
        myModal.show();
      } else {
        window.location.href = '/html/auth/signup.html';
      }
    });
  }

  // Handle the sign out and register button in the modal
  const logoutAndRegisterBtn = document.getElementById('logoutAndRegisterBtn');
  if (logoutAndRegisterBtn) {
    logoutAndRegisterBtn.addEventListener('click', function () {
      handlers.setLogOut();
      window.location.href = '/html/auth/signup.html';
    });
  }
}
