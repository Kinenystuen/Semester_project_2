// ApiHostUrl and apiKey as secrets hidden in .env file
export const apiHostUrl =
  typeof Cypress !== 'undefined'
    ? Cypress.env('VITE_API_HOST_URL')
    : import.meta.env.VITE_API_HOST_URL;
export const apiKey =
  typeof Cypress !== 'undefined'
    ? Cypress.env('VITE_API_KEY')
    : import.meta.env.VITE_API_KEY;

export const apiAuth = '/auth';
export const apiLogin = '/login';
export const apiRegister = '/register';
export const apiAction = '/auction/listings';
export const apiProfiles = '/auction/profiles';
export const apiListings = '/listings';
