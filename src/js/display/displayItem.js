import { getList } from '../api/listings/getListItem.js';
import { clearHTML } from '../utilitis/clearHTML.js';
import { errorMessage } from '../utilitis/errorMessage.js';
import { formatDateDDMMYYHT } from '../utilitis/formatDate.js';
import * as status from './../api/auth/index.js';
import * as display from './../display/index.js';

let currentIndex = 0;
let listData = [];
const listContainer = document.getElementById('listContainer');

export async function displayListingItem(url) {
  try {
    const data = await getList(url);
    if (data) {
      listData = data.data;
      // Set window title and breadcrums
      document.title = 'AuctionHub | ' + `${listData.title}`;
      const listingItemName = document.getElementById('listingItemName');
      listingItemName.innerText = listData.title;

      // display item page, get listContainer

      clearHTML(listContainer);
      const listDataContainer = document.createElement('div');
      listDataContainer.classList.add(
        'd-flex',
        'flex-wrap',
        'justify-content-center',
        'position-relative',
      );

      // image section
      const imageContainer = document.createElement('div');
      const largeImage = document.createElement('div');
      const largeImageImg = document.createElement('img');
      const thumbnailSlider = document.createElement('div');
      const thumbnailRBtn = document.createElement('button');
      const thumbnailLBtn = document.createElement('button');
      const thumbnailDiv = document.createElement('div');

      imageContainer.classList.add('container', 'mt-4', 'col-12', 'col-md-6');

      largeImage.classList.add('large-image-container', 'ratio', 'ratio-4x3');
      largeImageImg.classList.add('img-fluid');
      largeImageImg.id = 'largeImage';
      if (listData.media[0]) {
        largeImageImg.src = listData.media[0].url;
        largeImageImg.url = listData.media[0].url;
        largeImageImg.alt = listData.media[0].alt;
      } else {
        largeImageImg.src = '';
        largeImageImg.url = '';
        largeImageImg.alt = 'Media missing';
      }

      thumbnailSlider.classList.add(
        'thumbnail-slider',
        'd-flex',
        'align-items-center',
        'mt-3',
      );

      thumbnailLBtn.classList.add('arrow', 'left-arrow');
      thumbnailLBtn.id = 'leftArrow';
      thumbnailLBtn.innerHTML = '&#8249;';
      thumbnailLBtn.style.display = 'none';

      thumbnailRBtn.classList.add('arrow', 'right-arrow');
      thumbnailRBtn.id = 'rightArrow';
      thumbnailRBtn.innerHTML = '&#8250;';
      thumbnailRBtn.style.display = 'none';

      thumbnailDiv.classList.add('thumbnails', 'd-flex', 'overflow-hidden');

      listData.media.forEach((img, index) => {
        const thumbnail = document.createElement('div');
        const thumbnailImg = document.createElement('img');
        const overlayDiv = document.createElement('div');
        const zoomIcon = document.createElement('i');

        thumbnail.classList.add('thumbnail');
        thumbnailImg.classList.add('img-thumbnail');
        thumbnailImg.src = img.url;

        if (img.alt && img.alt.trim() !== '') {
          thumbnailImg.alt = img.alt;
        } else {
          thumbnailImg.alt = `Image ${index} of list item`;
          img.alt = `Image ${index + 1} of ${listData.title}`;
        }

        overlayDiv.classList.add('overlay');
        zoomIcon.classList.add(
          'fa-solid',
          'fa-up-right-and-down-left-from-center',
          'social-icon',
        );

        // Eventlisteners
        thumbnail.addEventListener('mouseenter', function () {
          largeImageImg.src = thumbnailImg.src;
          largeImageImg.alt = thumbnailImg.alt;
        });
        thumbnail.addEventListener('mouseleave', function () {
          largeImageImg.src = img.url;
          largeImageImg.alt = img.alt;
        });
        thumbnail.addEventListener('click', function () {
          largeImageImg.src = img.url;
          largeImageImg.alt = img.alt;
          updateArrowsVisibility();
        });
        // Evt listener to open thumbnail images in modal
        thumbnail.addEventListener('click', () => openModal(img, index));

        overlayDiv.appendChild(zoomIcon);
        thumbnail.appendChild(thumbnailImg);
        thumbnail.appendChild(overlayDiv);
        thumbnailDiv.appendChild(thumbnail);
      });

      thumbnailSlider.appendChild(thumbnailLBtn);
      thumbnailSlider.appendChild(thumbnailDiv);
      thumbnailSlider.appendChild(thumbnailRBtn);
      largeImage.appendChild(largeImageImg);
      imageContainer.appendChild(largeImage);
      imageContainer.appendChild(thumbnailSlider);
      // Evt listener to open largeimage in modal
      largeImage.addEventListener('click', () => {
        openModal(largeImageImg, currentIndex);
      });

      //
      const totalImages = listData.media.length;

      // Function to show hide arrows on thumbnail container
      function updateArrowsVisibility() {
        const thumbnailsContainerWidth = thumbnailDiv.clientWidth;
        const thumbnailsWidth = thumbnailDiv.scrollWidth;

        if (thumbnailsWidth <= thumbnailsContainerWidth) {
          thumbnailLBtn.style.display = 'none';
          thumbnailRBtn.style.display = 'none';
        } else {
          if (currentIndex === 0) {
            thumbnailLBtn.style.display = 'none';
          } else {
            thumbnailLBtn.style.display = 'block';
          }
          if (currentIndex === totalImages - 1) {
            thumbnailRBtn.style.display = 'none';
          } else {
            thumbnailRBtn.style.display = 'block';
          }
        }
      }
      // Arrow functionality
      thumbnailLBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
          currentIndex--;
          updateArrowsVisibility();
        }
      });

      thumbnailRBtn.addEventListener('click', function () {
        if (currentIndex < totalImages - 1) {
          currentIndex++;
          updateArrowsVisibility();
        }
      });

      // Initialize the first image
      if (listData.media[0]) {
        largeImageImg.src = listData.media[0].url;
        largeImageImg.url = listData.media[0].url;
        largeImageImg.alt = listData.media[0].alt;
      } else {
        largeImageImg.src = '';
        largeImageImg.title = 'Media missing';
        largeImageImg.url = '';
        largeImageImg.alt = 'Media missing';
      }

      // largeImageImg.src = listData.media[0].url;
      // largeImageImg.alt = listData.media[0].alt;

      // Open modal function, close modal, next image etc //////////////////////////////////
      function openModal(image, index) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const caption = document.getElementById('caption');
        const prev = document.getElementById('prev');
        const next = document.getElementById('next');
        if (listData.media.length <= 1) {
          prev.style.display = 'none';
          next.style.display = 'none';
        }

        modal.style.display = 'block';
        modalImg.src = image.url;
        currentIndex = index;
        caption.innerText = image.alt;
      }

      function closeModal() {
        const modal = document.getElementById('imageModal');
        modal.style.display = 'none';
      }

      function showNext() {
        currentIndex = (currentIndex + 1) % listData.media.length;
        document.getElementById('modalImage').src =
          listData.media[currentIndex].url;
        document.getElementById('caption').innerText =
          listData.media[currentIndex].alt;
      }

      function showPrev() {
        currentIndex =
          (currentIndex - 1 + listData.media.length) % listData.media.length;
        document.getElementById('modalImage').src =
          listData.media[currentIndex].url;
        document.getElementById('caption').innerText =
          listData.media[currentIndex].alt;
      }

      // Add event listeners to the arrows, close btn and outside image in modal
      document.getElementById('next').addEventListener('click', showNext);
      document.getElementById('prev').addEventListener('click', showPrev);
      document.querySelector('.close').addEventListener('click', closeModal);
      window.addEventListener('click', (event) => {
        const modal = document.getElementById('imageModal');
        if (event.target === modal) {
          closeModal();
        }
      });

      // Add keyboard navigation
      document.addEventListener('keydown', (event) => {
        const modal = document.getElementById('imageModal');
        if (modal.style.display === 'block') {
          if (event.key === 'ArrowRight') {
            showNext();
          } else if (event.key === 'ArrowLeft') {
            showPrev();
          } else if (event.key === 'Escape') {
            closeModal();
          }
        }
      });
      // Initialize arrow visibility
      updateArrowsVisibility();

      // Text info area /////////////////////////////////////////////////////////////
      const infoContainer = document.createElement('div');
      const sellerNameDiv = document.createElement('a');
      const sellerName = document.createElement('p');
      const sellerAvatarDiv = document.createElement('div');
      const sellerAvatar = document.createElement('img');
      sellerNameDiv.classList.add(
        'd-flex',
        'align-items-center',
        'link-body-emphasis',
        'text-decoration-none',
        'pointer',
      );
      sellerNameDiv.href = `/html/pages/profile.html?user=${listData.seller.name}`;
      sellerAvatarDiv.classList.add(
        'd-flex',
        'align-items-center',
        'link-body-emphasis',
        'text-decoration-none',
      );

      const badgeContainer = document.createElement('div');
      const listTitle = document.createElement('h1');
      const listDescription = document.createElement('p');
      infoContainer.classList.add('container', 'mt-4', 'col-12', 'col-md-6');
      badgeContainer.classList.add('mb-3');

      // Badge area
      // Create badges for item status
      // Check if the item is active or ending soon
      const endsAt = new Date(listData.endsAt);
      const now = new Date();

      // Check if auction is active
      if (now < endsAt) {
        const activeBadge = document.createElement('span');
        activeBadge.classList.add('badge', 'bg-success', 'me-2', 'text-dark');
        activeBadge.innerText = 'Active';
        badgeContainer.appendChild(activeBadge);
      }

      // Check if the auction is ending soon (next 72 hours)
      const hoursRemaining = (endsAt - now) / (1000 * 60 * 60); // Calculate remaining time in hours
      if (hoursRemaining > 0 && hoursRemaining <= 72) {
        const endingSoonBadge = document.createElement('span');
        endingSoonBadge.classList.add('badge', 'bg-warning', 'text-dark');
        endingSoonBadge.innerText = 'Ends soon!';
        badgeContainer.appendChild(endingSoonBadge);
      }
      // Check if auction is ended
      if (hoursRemaining < 0) {
        const endedBadge = document.createElement('span');
        endedBadge.classList.add('badge', 'text-bg-info');
        endedBadge.innerText = 'Auction ended';
        badgeContainer.appendChild(endedBadge);
      }

      sellerAvatar.classList.add('rounded-circle', 'me-2', 'object-fit-cover');
      sellerAvatar.setAttribute('width', '32');
      sellerAvatar.setAttribute('height', '32');
      sellerAvatar.alt = listData.seller.avatar.alt;
      sellerAvatar.src = listData.seller.avatar.url;
      sellerName.classList.add('my-1');
      sellerName.innerText = `Uploaded by - ${listData.seller.name}`;

      sellerAvatarDiv.appendChild(sellerAvatar);
      sellerNameDiv.appendChild(sellerAvatarDiv);
      sellerNameDiv.appendChild(sellerName);
      listTitle.classList.add('display-5');
      listTitle.innerText = listData.title;
      listDescription.innerText = listData.description;

      infoContainer.appendChild(badgeContainer);
      infoContainer.appendChild(sellerNameDiv);
      infoContainer.appendChild(listTitle);
      infoContainer.appendChild(listDescription);

      listDataContainer.appendChild(imageContainer);
      listDataContainer.appendChild(infoContainer);

      // Bids, ending time etc
      const endDate = document.getElementById('endDate');
      const formattedDate = formatDateDDMMYYHT(listData.endsAt);
      endDate.innerText = `Ends at: ${formattedDate}`;

      // Interval function (see countdownInterval)
      function startCountdown(endsAt) {
        const countdownEndDate = document.getElementById('countdownEndDate');
        const now2 = new Date().getTime();
        const timeRemaining = endsAt - now2;
        if (timeRemaining <= 0) {
          clearInterval(countdownInterval);
          countdownEndDate.innerText = 'Auction ended!';
          endDate.innerText = `Ended: ${formattedDate}`;
          return;
        }
        // Calculate days, hours, minutes, and seconds remaining
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        countdownEndDate.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      listContainer.appendChild(listDataContainer);

      // if logged in show bids section here
      const loggedIn = status.isLoggedIn();
      const ddMenuBtn = document.createElement('div');
      const yourUser = await status.getProfile();
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
        trashCan.id = `trashCanBtn-${listData.id}`;
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
            const listingData = { id: listData.id };
            fetch.deleteListing(listingData);
            deleteModal.hide();
          });
        });

        updateIcon.classList.add('fa-solid', 'fa-pen-to-square');
        updateIcon.id = `trashCanBtn-${listData.id}`;
        updateIcon.title = 'Edit listing';
        ddMenyLiUpdateA.appendChild(updateIcon);
        ddMenyLiUpdateA.innerHTML += 'Edit listing';
        // function to edit listing
        ddMenyLiUpdate.addEventListener('click', function () {
          display.editListing(listData);
        });

        ddMenuBtn.appendChild(ddMenuBtnI);
        ddMenuBtn.appendChild(ddMenuUl);
        const auctionIsActive = hoursRemaining > 0;
        const profileData = localStorage.getItem(`profile`);
        const profile = JSON.parse(profileData);
        if (auctionIsActive && profile.name === listData.seller.name) {
          listDataContainer.appendChild(ddMenuBtn);
        }
        const bidSection = document.getElementById('bidSection');
        bidSection.classList.add('d-flex', 'row', 'flex-wrap');
        clearHTML(bidSection);

        function displayLastBid(bids) {
          const lastBid = bids[bids.length - 1];
          // Display last bid
          const bidsContainer = document.createElement('div');
          const bidsCard = document.createElement('div');
          const bidsCardDiv = document.createElement('div');
          const leftareaDiv = document.createElement('div');
          const leftArea = document.createElement('div');
          const cardTitle = document.createElement('h5');
          const LBName = document.createElement('a');
          const LBDate = document.createElement('p');
          const rightArea = document.createElement('div');
          const LBAmount = document.createElement('p');

          bidsContainer.classList.add('container', 'p-2');
          bidsCard.classList.add('card', 'p-3');
          bidsCardDiv.classList.add(
            'd-flex',
            'justify-content-between',
            'align-items-center',
          );
          cardTitle.innerText = 'Last bid:';
          LBName.innerText = lastBid.bidder.name;
          LBName.title = `Go to ${lastBid.bidder.name} profile`;
          LBName.classList.add(
            'd-flex',
            'align-items-center',
            'link-body-emphasis',
            'text-decoration-none',
            'pointer',
            'mb-1',
          );
          LBName.href = `/html/pages/profile.html?user=${lastBid.bidder.name}`;
          LBDate.classList.add('text-muted');
          LBDate.innerText = formatDateDDMMYYHT(lastBid.created);
          LBAmount.classList.add('h4', 'text-end');
          LBAmount.innerText = `${lastBid.amount} credits`;

          const leftImgArea = document.createElement('div');
          leftImgArea.classList.add('d-none');
          const imgA = document.createElement('a');
          const img = document.createElement('img');
          leftArea.classList.add(
            'd-inline',
            'row',
            'justify-content-center',
            'align-content-center',
          );
          leftareaDiv.classList.add('d-flex', 'flex-wrap', 'gap-2');
          imgA.classList.add(
            'd-flex',
            'align-items-center',
            'link-body-emphasis',
            'text-decoration-none',
          );
          imgA.href = `/html/pages/profile.html?user=${lastBid.bidder.name}`;
          img.classList.add('rounded-circle', 'me-2', 'object-fit-cover');
          img.setAttribute('width', '120');
          img.setAttribute('height', '120');
          img.src = lastBid.bidder.avatar.url;
          imgA.appendChild(img);
          leftImgArea.appendChild(imgA);

          leftArea.appendChild(cardTitle);
          leftArea.appendChild(LBName);
          leftArea.appendChild(LBDate);
          leftareaDiv.appendChild(leftImgArea);
          leftareaDiv.appendChild(leftArea);
          rightArea.appendChild(LBAmount);
          bidsCardDiv.appendChild(leftareaDiv);
          bidsCardDiv.appendChild(rightArea);
          bidsCard.appendChild(bidsCardDiv);
          bidsContainer.appendChild(bidsCard);

          bidSection.appendChild(bidsContainer);
          if (hoursRemaining <= 0 && listData.bids.length >= 1) {
            cardTitle.innerText = 'Auction winner';
            LBName.classList.add('display-5');
            leftImgArea.classList.remove('d-none');
            leftImgArea.classList.add('d-block');
          }

          return;
        }
        function displayAllBids(bids) {
          const collapseContainer = document.createElement('div');
          collapseContainer.classList.add(
            'd-flex',
            'justify-content-center',
            'row',
          );

          // Button to show all bids
          const collapseBtn = document.createElement('button');
          collapseBtn.classList.add('btn', 'text-decoration-underline', 'mt-3');
          collapseBtn.type = 'button';
          collapseBtn.setAttribute('data-bs-toggle', 'collapse');
          collapseBtn.setAttribute('data-bs-target', '#bidsCollapse');
          collapseBtn.setAttribute('aria-expanded', 'false');
          collapseBtn.setAttribute('aria-controls', 'bidsCollapse');
          collapseBtn.innerText = `Show all biddings (${bids.length})`;

          // Collapse content
          const collapseDiv = document.createElement('div');
          collapseDiv.classList.add('collapse', 'mt-3');
          collapseDiv.id = 'bidsCollapse';

          const collapseCard = document.createElement('div');
          collapseCard.classList.add('card', 'card-body');

          const bidsList = document.createElement('ul');
          bidsList.classList.add('list-group');
          bidsList.id = 'bidsList';

          bids.forEach((bid) => {
            const bidItem = document.createElement('li');
            bidItem.classList.add(
              'list-group-item',
              'd-flex',
              'justify-content-between',
              'align-items-center',
            );

            const bidContent = `
              <div>
                <a class="link-body-emhasis text-black text-decoration-none" title="Go to ${bid.bidder.name} profile" href="/html/pages/profile.html?user=${bid.bidder.name}">${bid.bidder.name}</a>
                <p class="text-muted mb-0">${formatDateDDMMYYHT(bid.created)}</p>
              </div>
              <div><p class="text-end">${bid.amount} credits</p></div>
            `;

            bidItem.innerHTML = bidContent;
            bidsList.appendChild(bidItem);
          });

          collapseCard.appendChild(bidsList);
          collapseDiv.appendChild(collapseCard);

          collapseContainer.appendChild(collapseBtn);
          collapseContainer.appendChild(collapseDiv);

          // Event listener to change the button text when collapsed
          collapseDiv.addEventListener('shown.bs.collapse', function () {
            collapseBtn.innerText = `Hide biddings (${bids.length})`;
          });

          collapseDiv.addEventListener('hidden.bs.collapse', function () {
            collapseBtn.innerText = `Show all biddings (${bids.length})`;
          });

          bidSection.appendChild(collapseContainer);
          return collapseContainer;
        }

        // Determine if auction is active or ended
        if (hoursRemaining >= 0) {
          // Auction is still active
          if (listData.bids.length === 0) {
            bidSection.innerText = 'There are no bids made yet';
            if (listData.seller.name !== yourUser.name) {
              display.newBidSection(listData);
            }
          } else {
            displayLastBid(listData.bids);
            displayAllBids(listData.bids);
            if (listData.seller.name !== yourUser.name) {
              display.newBidSection(listData);
            }
          }
        } else {
          // Auction has ended
          if (listData.bids.length === 0) {
            bidSection.innerText = 'There were no bids made';
          } else {
            displayLastBid(listData.bids);
            displayAllBids(listData.bids);
          }
        }
      }

      // Set an interval to update the countdown every second
      const countdownInterval = setInterval(function () {
        const endsAt = new Date(listData.endsAt).getTime();
        startCountdown(endsAt);
      }, 1000);
    }
  } catch (error) {
    console.error('Error fetching and displaying lists:', error);

    errorMessage(listContainer);
  }
}
