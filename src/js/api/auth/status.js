import * as storage from '../storage/index.js';

export const isLoggedIn = () => {
  const token = storage.load('token');
  return token ? Boolean(token) : false;
};

export const getProfile = () => {
  const profileData = storage.load('profile');
  if (profileData) {
    return profileData;
  } else {
    // console.error("Profile data not found in local storage.");
    return null;
  }
};
