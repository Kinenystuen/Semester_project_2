import { logOut } from '../auth/logout.js';

const logOutBtn = document.getElementById('logOutBtn');

// Function to set up logout functionality
export async function setLogOut() {
  logOutBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      logOutBtn.classList.add('loading');
      logOut();
      window.location.href = '/index.html';
    } catch (error) {
      alert('There was a problem logging out', error);
    } finally {
      logOutBtn.classList.remove('loading');
    }
  });
}
