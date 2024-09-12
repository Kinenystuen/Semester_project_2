import * as fetch from './../fetch/index.js';

export function setUpdateListingForm(dataId) {
  const updListingForm = document.getElementById('updListingForm');
  if (updListingForm) {
    updListingForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(updListingForm);

      // Collect all media inputs into an array
      const media = [];
      const urls = formData.getAll('updListingMedia');
      const alts = formData.getAll('updListingAlt');

      for (let i = 0; i < urls.length; i++) {
        if (urls[i].trim() !== '') {
          media.push({
            url: urls[i],
            alt: alts[i]
              ? alts[i]
              : `Media image for ${formData.get('title')} listing`,
          });
        }
      }
      // Get tags
      const tags = document
        .getElementById('updListingTags')
        .value.split(',')
        .map((tag) => tag.trim());

      const listingData = {
        title: formData.get('title'),
        description: formData.get('description'),
        tags: tags,
        media: media,
      };
      // Send listingData to your API
      fetch.updateListing(dataId, listingData);
    });
  }
}
