import * as constants from '../constants.js';

const params = '?_active=true';
const currentUrl = window.location.href;

let apiListUrl = `${constants.apiHostUrl}${constants.apiAction}`;
// Change the url to only have active listings in data
if (currentUrl.includes('index.html')) {
  apiListUrl += params;
}

export const getListsURL = apiListUrl;

export async function getLists(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const lists = await response.json();
      return lists;
    } else {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}
