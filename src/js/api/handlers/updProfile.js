import { getUpdProfileURL, updateProfile } from '../fetch/updProfile.js';
const updateProfileForm = document.getElementById('updateProfileForm');

const profileData = localStorage.getItem(`profile`);
const userData = JSON.parse(profileData);

export function setUpdateProfileForm() {
  if (updateProfileForm) {
    updateProfileForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      const url = formData.get('avatarUrl');

      const profileData = {
        username: formData.get('usernameUpd'),
        bio: formData.get('bio'),
      };
      if (url.trim() !== '') {
        profileData.avatar = {
          url,
          alt: `Avatar img by ${userData.name}`,
        };
      }
      // Send new data to api
      updateProfile(getUpdProfileURL, profileData);
    });
  }
}
