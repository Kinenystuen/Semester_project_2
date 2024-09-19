import { updateProfile } from '../fetch/updProfile.js';
const updateProfileForm = document.getElementById('updateProfileForm');

const profileData = localStorage.getItem(`profile`);
const userData = JSON.parse(profileData);

export function setUpdateProfileForm() {
  if (updateProfileForm) {
    updateProfileForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      const avatarUrl = formData.get('avatarUrl');
      const bannerUrl = formData.get('bannerUrl');

      const profileData = {
        username: formData.get('usernameUpd'),
        bio: formData.get('bio'),
      };

      if (avatarUrl && avatarUrl.trim() !== '') {
        profileData.avatar = {
          url: avatarUrl,
          alt: `Avatar img by ${userData.name || 'User'}`,
        };
      }

      if (bannerUrl && bannerUrl.trim() !== '') {
        profileData.banner = {
          url: bannerUrl,
          alt: `Banner img by ${userData.name || 'User'}`,
        };
      }

      // Send new data to API
      updateProfile(profileData);
    });
  }
}
