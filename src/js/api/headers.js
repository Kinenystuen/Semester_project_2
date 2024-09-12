import * as constants from './constants.js';
import * as storage from './storage/index.js';

export const headers = (contentType = false) => {
  const headers = new Headers();
  const token = storage.load('token');

  if (contentType) {
    headers.append('Content-Type', contentType);
  }
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  if (constants.apiKey) {
    headers.append('X-Noroff-API-Key', constants.apiKey);
  }
  return headers;
};
