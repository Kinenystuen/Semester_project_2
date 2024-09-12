import * as constants from './../constants.js';

// Finds the id in the queryString
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const idSelectedItem = params.get('id');

export const selUrl =
  constants.apiHostUrl +
  constants.apiAction +
  '/' +
  idSelectedItem +
  '?_seller=true&_bids=true';

export async function getList(url) {
  try {
    const responseLI = await fetch(url);
    if (responseLI.ok) {
      const list = await responseLI.json();
      return list;
    } else {
      throw new Error(`Failed to fetch data: ${responseLI.status}`);
    }
  } catch (error) {
    console.log('Error: ' + error);
  }
}
