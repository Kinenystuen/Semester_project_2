import { createListing, getCreateListingURL } from '../fetch/createListing.js';
import * as evtListeners from './../../evtListeners/index.js';

export function setCreateListingForm() {
  const createListingForm = document.getElementById('createListingForm');
  if (createListingForm) {
    createListingForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(createListingForm);

      // Collect all media inputs into an array
      const media = [];
      const urls = formData.getAll('listingMedia');
      const alts = formData.getAll('listingAlt');

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
      // Get end date and tags
      const endDate = document.getElementById('listingEndDate').value;
      const tags = document
        .getElementById('listingTags')
        .value.split(',')
        .map((tag) => tag.trim());

      const listingData = {
        title: formData.get('title'),
        description: formData.get('description'),
        endsAt: new Date(endDate).toISOString(),
        tags: tags,
        media: media,
      };
      // Send listingData to your API
      createListing(getCreateListingURL, listingData);
    });
  }
}

export function createListingForm() {
  const mediaInputsContainer = document.getElementById('mediaInputsContainer');
  const addMediaButton = document.getElementById('addMediaButton');

  let mediaCount = 1;

  // Function to add new media inputs
  addMediaButton.addEventListener('click', function () {
    mediaCount++;

    const mediaInputGroup = document.createElement('div');
    mediaInputGroup.classList.add('d-flex', 'align-items-center', 'gap-2');

    const img = document.createElement('img');
    img.id = `media${mediaCount}`;
    img.src =
      'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400';
    img.alt = 'A blurry multi-colored rainbow background';
    img.width = 32;
    img.height = 32;
    img.classList.add('listing-media', 'rounded-1', 'object-fit-cover');

    const urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.id = `urlInput${mediaCount}`;
    urlInput.name = 'listingMedia';
    urlInput.classList.add('form-control');
    urlInput.placeholder = 'Image URL';
    urlInput.required = true;

    const altInput = document.createElement('input');
    altInput.type = 'text';
    altInput.name = 'listingAlt';
    altInput.classList.add('form-control');
    altInput.placeholder = 'Alt text';
    altInput.required = true;

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-trash', 'text-danger', 'pointer');
    trashIcon.style.cursor = 'pointer';
    trashIcon.addEventListener('click', function () {
      mediaInputGroup.remove();
    });

    mediaInputGroup.appendChild(img);
    mediaInputGroup.appendChild(urlInput);
    mediaInputGroup.appendChild(altInput);
    mediaInputGroup.appendChild(trashIcon);

    mediaInputsContainer.appendChild(mediaInputGroup);

    evtListeners.updImgLive(`urlInput${mediaCount}`, `media${mediaCount}`);
  });

  evtListeners.updImgLive(`urlInput${mediaCount}`, `media${mediaCount}`);
  setCreateListingForm();
}
