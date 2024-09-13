import { getLists } from '../api/listings/getListings.js';
import { clearHTML } from '../utilitis/clearHTML.js';
import { returnMessage } from '../utilitis/errorMessage.js';
import { truncateText } from '../utilitis/truncateText.js';

export async function displayListings(url) {
  try {
    const data = await getLists(url);
    if (data) {
      const listData = data.data;
      makeListings(listData);
    }
  } catch (error) {
    console.error('Error fetching and displaying lists:', error);
  }
}

export async function makeListings(listData) {
  const listings = document.getElementById('listings');
  listings.classList.add('mb-5');
  const listingNumber = document.getElementById('listingNumber');
  clearHTML(listings);

  // Create the grid container element
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('container', 'mt-3');
  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row', 'g-2', 'justify-content-start');
  listingNumber.innerText = `${listData.length} listings`;

  if (listData.length === 0) {
    const message = `No listings found`;
    returnMessage(listings, message);
    return;
  }
  listData.forEach((list) => {
    const col = document.createElement('div');
    col.classList.add('col', 'col-sm-6', 'col-md-4', 'col-lg-3');

    const card = document.createElement('a');
    card.classList.add(
      'card',
      'd-flex',
      'h-100',
      'flex-column',
      'slider-item-2',
      'link-body-emphasis',
      'link-underline-opacity-0',
      'pointer',
      'bg-white',
      'm-0',
    );
    card.id = 'listingCard';
    card.href = `/html/pages/listingitem.html?id=${list.id}`;

    const imageWrapper = document.createElement('div');
    const image = document.createElement('img');
    const cardBody = document.createElement('div');
    const titleList = document.createElement('h5');
    const descriptionText = document.createElement('p');
    const badgeContainer = document.createElement('div');

    imageWrapper.classList.add('ratio', 'ratio-1x1');
    imageWrapper.id = 'listImage';
    cardBody.classList.add(
      'card-body',
      'd-flex',
      'flex-column',
      'justify-content-between',
      'flex-grow-1',
      'pt-1',
    );
    descriptionText.classList.add(
      'card-text',
      'description-text',
      'h-100',
      'text-start',
      'm-0',
    );
    badgeContainer.classList.add(
      'd-flex',
      'justify-content-end',
      'align-items-center',
      'mt-2',
    );

    if (list.media[0]) {
      image.src = list.media[0].url;
      image.alt = list.media[0].alt;
      image.classList.add('card-img-top');
    } else {
      image.src =
        'https://www.shutterstock.com/image-vector/computer-cat-animal-meme-pixel-260nw-2415076223.jpg';
      image.alt = 'List item does not have an image';
      image.classList.add('card-img-top');
    }

    titleList.innerText = list.title;
    titleList.classList.add('card-title', 'text-start', 'h-6');

    // Listing item description
    descriptionText.innerText = list.description
      ? truncateText(list.description, 50)
      : '';

    // Create badges for item status
    // Check if the item is active or ending soon
    const endsAt = new Date(list.endsAt);
    const now = new Date();

    if (now < endsAt) {
      // If item is active, a active badge will occur
      const activeBadge = document.createElement('span');
      activeBadge.classList.add('badge', 'bg-success', 'me-2', 'text-dark');
      activeBadge.innerText = 'Active';
      badgeContainer.appendChild(activeBadge);
    }

    // Check if the item is ending soon (next 72 hours)
    const hoursRemaining = (endsAt - now) / (1000 * 60 * 60); // Calculate remaining time in hours
    if (hoursRemaining > 0 && hoursRemaining <= 72) {
      const endingSoonBadge = document.createElement('span');
      endingSoonBadge.classList.add('badge', 'bg-warning', 'text-dark');
      endingSoonBadge.innerText = 'Ends soon!';
      badgeContainer.appendChild(endingSoonBadge);
    }

    imageWrapper.appendChild(image);
    cardBody.appendChild(titleList);
    cardBody.appendChild(descriptionText);
    cardBody.appendChild(badgeContainer);
    card.appendChild(imageWrapper);
    card.appendChild(cardBody);
    col.appendChild(card);
    rowContainer.appendChild(col);
  });

  gridContainer.appendChild(rowContainer);
  listings.appendChild(gridContainer);
}
