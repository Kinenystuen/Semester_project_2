import * as handlers from './../api/handlers/index.js';
import * as evtListeners from './../evtListeners/index.js';

export function editListing(list) {
  const updListingModal = document.getElementById('updListingModal');

  function addMediaInput(container, url = '', alt = '', index) {
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('d-flex', 'align-items-center', 'gap-2');

    const mediaImg = document.createElement('img');
    mediaImg.src = url || '';
    mediaImg.alt = alt || `Image for ${list.title}`;
    mediaImg.id = `mediaImg${index + 1}`;
    mediaImg.width = 32;
    mediaImg.height = 32;
    mediaImg.classList.add('listing-media', 'rounded-1', 'object-fit-cover');

    // URL input
    const urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.name = `updListingMedia`;
    urlInput.classList.add('form-control');
    urlInput.id = `urlInput${index + 1}`;
    urlInput.value = url || '';
    urlInput.placeholder = 'Image URL';
    urlInput.required = true;

    // Alt text input
    const altInput = document.createElement('input');
    altInput.type = 'text';
    altInput.name = `updListingAlt`;
    altInput.classList.add('form-control');
    altInput.value = alt || '';
    altInput.placeholder = 'Alt text';
    altInput.required = true;

    mediaDiv.appendChild(mediaImg);
    mediaDiv.appendChild(urlInput);
    mediaDiv.appendChild(altInput);

    // Add the trash icon for all items except the first
    if (index !== 0) {
      const trashIcon = document.createElement('i');
      trashIcon.classList.add('fa', 'fa-trash', 'text-danger', 'pointer');
      trashIcon.style.cursor = 'pointer';
      trashIcon.setAttribute('aria-hidden', 'true');
      trashIcon.title = 'Remove image';
      trashIcon.setAttribute('type', 'button');
      trashIcon.setAttribute('data-bs-placement', 'top');
      new bootstrap.Tooltip(trashIcon);

      trashIcon.onclick = function () {
        removeMediaInput(trashIcon);
      };

      mediaDiv.appendChild(trashIcon);
    }

    container.appendChild(mediaDiv);

    evtListeners.updImgLive(`urlInput${index + 1}`, `mediaImg${index + 1}`);
  }

  // Function to remove media input
  function removeMediaInput(element) {
    element.parentElement.remove();
  }

  updListingModal.addEventListener('shown.bs.modal', function () {
    // Populate title, description, and end date
    const updateTitle = document.getElementById('updTitleInput');
    updateTitle.value = list.title;

    const updateDescription = document.getElementById(
      'updListingDescriptionInput',
    );
    updateDescription.value = list.description;

    const updateTags = document.getElementById('updListingTags');
    updateTags.value = list.tags;

    // Clear media inputs
    const mediaContainer = document.getElementById('updMediaInputsContainer');
    mediaContainer.innerHTML = '';

    // Add existing media
    list.media.forEach((media, index) => {
      addMediaInput(mediaContainer, media.url, media.alt, index);
    });

    // Evt listener - Add Media button
    const addMediaButton = document.getElementById('updAddMediaButton');
    addMediaButton.addEventListener('click', function () {
      addMediaInput(mediaContainer, '', '', mediaContainer.children.length);
    });

    handlers.setUpdateListingForm(list.id);
  });
}
