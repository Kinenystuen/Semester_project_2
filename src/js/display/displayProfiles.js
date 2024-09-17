import { clearHTML } from '../utilitis/clearHTML.js';
import { errorMessage, returnMessage } from '../utilitis/errorMessage.js';
import * as fetch from './../api/fetch/index.js';

export async function displayProfiles(url) {
  try {
    const data = await fetch.fetchProfiles(url);
    makeProfileCards(data);
  } catch (error) {
    console.error('Error fetching and displaying profiles:', error);
    const profilesDisplay = document.getElementById('profilesDisplay');
    errorMessage(profilesDisplay);
  }
}

export function makeProfileCards(data) {
  const profilesDisplay = document.getElementById('profilesDisplay');
  const profilesNumber = document.getElementById('profilesNumber');
  const profileData = data.data;
  clearHTML(profilesDisplay);

  // Create the grid container for the cards
  const profileContainer = document.createElement('div');
  profileContainer.classList.add('container', 'mt-3');
  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row', 'g-2', 'justify-content-start');
  profilesNumber.innerText = `${profileData.length} / ${data.meta.totalCount}  profiles`;

  if (profileData.length === 0) {
    const message = `No profiles found`;
    returnMessage(profilesDisplay, message);
    return;
  }

  profileData.forEach((profile) => {
    const profileCardCol = document.createElement('div');
    const profileCard = document.createElement('a');
    const profileImgDiv = document.createElement('div');
    const profileAvatar = document.createElement('img');
    const profileInfoDiv = document.createElement('div');
    const profileInfoName = document.createElement('h2');
    const profileBadgeDiv = document.createElement('div');

    profileCardCol.classList.add(
      'col-12',
      'col-sm-12',
      'col-md-12',
      'col-lg-6',
      'flex-wrap',
    );
    profileCard.classList.add(
      'card',
      'm-1',
      'p-2',
      'd-flex',
      'flex-row',
      'gap-2',
      'link-body-emphasis',
      'link-underline-opacity-0',
      'profileCard',
    );
    profileCard.id = `profileCard-${profile.name}`;
    profileCard.href = `html/pages/profile.html?user=${profile.name}`;

    profileImgDiv.classList.add(
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );
    profileImgDiv.setAttribute('width', '50');
    profileImgDiv.setAttribute('height', '50');

    profileAvatar.classList.add('rounded-circle', 'object-fit-cover');
    profileAvatar.setAttribute('width', '50');
    profileAvatar.setAttribute('height', '50');
    profileAvatar.alt = `${profile.name}'s avatar`;

    profileAvatar.src = profile.avatar.url;

    profileInfoDiv.classList.add('d-flex', 'w-100', 'justify-content-between');
    profileBadgeDiv.classList.add('m-2');

    // Find profiles with listings
    if (profile.listings && profile.listings.length >= 1) {
      const profileListingsBadge = document.createElement('span');
      const profileListingsActiveBadge = document.createElement('span');
      profileBadgeDiv.appendChild(profileListingsBadge);
      profileListingsBadge.classList.add(
        'badge',
        'bg-primary',
        'me-2',
        'text-dark',
      );
      let activeListingCount = 0;
      // For each listing, find out how many active ones
      profile.listings.forEach((listing) => {
        activeListingCount += 1;
        const endsAt = new Date(listing.endsAt);
        const now = new Date();

        if (now < endsAt) {
          profileListingsActiveBadge.classList.add(
            'badge',
            'bg-success',
            'me-2',
            'text-dark',
          );
          profileListingsActiveBadge.innerText = `${activeListingCount} active`;
          profileBadgeDiv.appendChild(profileListingsActiveBadge);
        }
      });
      profileListingsActiveBadge.classList.add(
        'badge',
        'bg-success',
        'me-2',
        'text-dark',
      );
      profileListingsBadge.innerText = `${profile.listings.length} listings`;
    }

    profileInfoName.innerText = profile.name;
    profileInfoName.classList.add(
      'card-title',
      'h6',
      'text-capitalize',
      'my-auto',
    );

    profileImgDiv.appendChild(profileAvatar);
    profileInfoDiv.appendChild(profileInfoName);
    profileInfoDiv.appendChild(profileBadgeDiv);

    profileCard.appendChild(profileImgDiv);
    profileCard.appendChild(profileInfoDiv);

    profileCardCol.appendChild(profileCard);
    rowContainer.appendChild(profileCardCol);
  });

  profileContainer.appendChild(rowContainer);
  profilesDisplay.appendChild(profileContainer);
}
