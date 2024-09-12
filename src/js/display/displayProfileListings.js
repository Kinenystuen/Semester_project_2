import { clearHTML } from '../utilitis/clearHTML.js';
import { errorMessage } from '../utilitis/errorMessage.js';
import { truncateText } from '../utilitis/truncateText.js';
import * as fetch from './../api/fetch/index.js';
import * as display from './index.js';
import * as status from './../api/auth/index.js';
import * as storage from './../api/storage/index.js';

export async function displayProfileListings(url) {
  const profileYourListings = document.getElementById('profileYourListings');
  try {
    const data = await fetch.fetchProfile(url);
    const listData = data.data;
    console.log(listData);
    const listingNumber = document.getElementById('yourListings');
    clearHTML(profileYourListings);

    if (listData.length === 0) {
      const containerDiv = document.createElement('div');
      const containerCard = document.createElement('div');
      const containerTitle = document.createElement('p');

      containerDiv.classList.add(
        'd-flex',
        'justify-content-center',
        'align-content-center',
        'my-3',
        'px-4',
      );
      containerCard.classList.add(
        'd-flex',
        'justify-content-center',
        'align-content-center',
        'col-md-8',
        'alert',
        'alert-secondary',
        'border',
        'rounded-2',
      );
      containerTitle.classList.add('me-fs-5');
      containerTitle.innerText = 'No listings uploaded';

      containerCard.appendChild(containerTitle);
      containerDiv.appendChild(containerCard);
      profileYourListings.appendChild(containerDiv);
      return;
    }

    // Create the grid container element
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('container', 'mt-3');
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row', 'g-2', 'justify-content-start');
    listingNumber.innerText = `${listData.length}`;

    listData.forEach((list) => {
      const col = document.createElement('div');
      col.classList.add(
        'col',
        'col-sm-6',
        'col-md-4',
        'col-lg-3',
        'position-relative',
      );

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

      // Edit and delete listing dropdown menu
      const loggedIn = status.isLoggedIn();
      const ddMenuBtn = document.createElement('div');
      if (loggedIn === true) {
        // dropdown menu
        const ddMenuBtnI = document.createElement('i');

        // dropdown with trashcan and update post buttons
        const ddMenuUl = document.createElement('ul');
        const ddMenyLiTrash = document.createElement('li');
        const ddMenyLiTrashA = document.createElement('a');
        const trashCan = document.createElement('i');
        const ddMenyLiUpdate = document.createElement('li');
        const ddMenyLiUpdateA = document.createElement('a');
        const updateIcon = document.createElement('i');
        const ddHr = document.createElement('hr');
        ddMenuBtn.classList.add(
          'btn',
          'btn-primary',
          'text-white',
          'shadow',
          'me-fs-5',
          'd-flex',
          'justify-content-center',
          'align-content-center',
          'position-absolute',
          'top-0',
          'end-0',
          'me-3',
          'mt-2',
        );
        ddMenuBtn.setAttribute('data-bs-toggle', 'dropdown');

        ddMenuBtnI.classList.add('fa-solid', 'fa-ellipsis');
        ddMenuBtnI.setAttribute('aria-expanded', 'true');
        ddMenuBtnI.id = 'ddMenuUl';

        ddMenuUl.classList.add('dropdown-menu', 'text-small', 'shadow');
        ddMenuUl.setAttribute('aria-labelledby', 'ddMenuUl');
        ddMenyLiTrashA.classList.add(
          'dropdown-item',
          'dropdown-item-danger',
          'd-flex',
          'gap-2',
          'align-items-center',
        );
        ddMenyLiUpdateA.classList.add(
          'dropdown-item',
          'dropdown-item-danger',
          'd-flex',
          'gap-2',
          'align-items-center',
        );
        ddMenyLiUpdate.setAttribute('data-bs-toggle', 'modal');
        ddMenyLiUpdate.setAttribute('data-bs-target', `#updListingModal`);

        ddHr.classList.add('m-1');
        ddMenyLiUpdate.appendChild(ddMenyLiUpdateA);
        ddMenyLiTrash.appendChild(ddMenyLiTrashA);

        ddMenuUl.appendChild(ddMenyLiUpdate);
        ddMenuUl.appendChild(ddHr);
        ddMenuUl.appendChild(ddMenyLiTrash);

        trashCan.classList.add('fa-solid', 'fa-trash');
        trashCan.id = `trashCanBtn-${list.id}`;
        trashCan.title = 'Trash listing';
        ddMenyLiTrashA.appendChild(trashCan);
        ddMenyLiTrashA.innerHTML += 'Trash listing';
        // function to delete listing with confirmation
        ddMenyLiTrashA.addEventListener('click', function () {
          const deleteModal = new bootstrap.Modal(
            document.getElementById('deleteConfirmationModal'),
          );
          deleteModal.show();

          const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

          confirmDeleteBtn.addEventListener('click', function () {
            console.log('deleted');
            const listingData = { id: list.id };
            fetch.deleteListing(listingData);
            deleteModal.hide();
          });
        });

        updateIcon.classList.add('fa-solid', 'fa-pen-to-square');
        updateIcon.id = `trashCanBtn-${list.id}`;
        updateIcon.title = 'Edit listing';
        ddMenyLiUpdateA.appendChild(updateIcon);
        ddMenyLiUpdateA.innerHTML += 'Edit listing';
        // function to edit listing
        ddMenyLiUpdate.addEventListener('click', function () {
          display.editListing(list);
        });

        ddMenuBtn.appendChild(ddMenuBtnI);
        ddMenuBtn.appendChild(ddMenuUl);
      }

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
      const auctionIsActive = hoursRemaining > 0;

      imageWrapper.appendChild(image);
      cardBody.appendChild(titleList);
      cardBody.appendChild(descriptionText);
      cardBody.appendChild(badgeContainer);
      card.appendChild(imageWrapper);
      card.appendChild(cardBody);
      col.appendChild(card);
      console.log(listData);
      if (auctionIsActive) {
        const username = storage.load('profile').name;
        if (fetch.idProfile === null || fetch.idProfile === username) {
          col.appendChild(ddMenuBtn);
        }
      }
      rowContainer.appendChild(col);
    });

    gridContainer.appendChild(rowContainer);
    profileYourListings.appendChild(gridContainer);
  } catch (error) {
    console.error('Error fetching and displaying lists:', error);
    errorMessage(profileYourListings);
  }
}
