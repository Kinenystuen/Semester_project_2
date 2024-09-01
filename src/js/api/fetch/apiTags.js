import { displayTagsDropdown } from '../../display/displayTags.js';
import { getLists } from '../listings/getListings.js';

// Function to fetch data and extract unique tags
export async function fetchAndPopulateTags(url) {
  try {
    const data = await getLists(url);
    if (data) {
      const listData = data.data;

      const tagsSet = new Set();
      listData.forEach((item) => {
        item.tags.forEach((tag) => tagsSet.add(tag));
      });

      const uniqueTags = Array.from(tagsSet);

      displayTagsDropdown(uniqueTags);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
