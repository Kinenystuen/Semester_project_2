import * as constants from '../constants.js';

const params = '?_active=true';
const path = window.location.pathname;

let apiListUrl = `${constants.apiHostUrl}${constants.apiAction}`;
if (
  path === '/Semester_project_2/' ||
  path === '/Semester_project_2/index.html'
) {
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
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
