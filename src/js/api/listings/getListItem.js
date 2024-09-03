import * as constants from './../constants.js';

// Finds the id in the queryString
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const idSelectedItem = params.get('id');

export const selUrl =
  constants.apiHostUrl + constants.apiAction + '/' + idSelectedItem;
console.log(selUrl);

export async function getList(url) {
  try {
    const responseLI = await fetch(url);
    if (responseLI.ok) {
      const list = await responseLI.json();
      console.log(list);
      return list;
    } else {
      throw new Error(`Failed to fetch post: ${responseLI.status}`);
    }
  } catch (error) {
    console.log('Error selectedMovie: ' + error);
  }
}
