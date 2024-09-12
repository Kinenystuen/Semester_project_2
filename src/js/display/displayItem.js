import { getList } from '../api/listings/getListItem.js';
import { clearHTML } from '../utilitis/clearHTML.js';

let currentIndex = 0;
let listData = [];

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
      const listContainer = document.getElementById('listContainer');
      clearHTML(listContainer);
      const listDataContainer = document.createElement('div');
      listDataContainer.classList.add('d-flex', 'flex-wrap');
      // image section
      const imageContainer = document.createElement('div');
      const largeImage = document.createElement('div');
      const largeImageImg = document.createElement('img');
      const thumbnailSlider = document.createElement('div');
      const thumbnailRBtn = document.createElement('button');
      const thumbnailLBtn = document.createElement('button');
      const thumbnailDiv = document.createElement('div');

      imageContainer.classList.add('container', 'mt-4', 'col-6');
      largeImage.classList.add('large-image-container', 'ratio', 'ratio-4x3');
      largeImageImg.classList.add('img-fluid');
      largeImageImg.id = 'largeImage';
      largeImageImg.src = listData.media[0].url;
      largeImageImg.url = listData.media[0].url;
      largeImageImg.alt = listData.media[0].alt;
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
        console.log(largeImage), openModal(largeImageImg, currentIndex);
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
      largeImageImg.src = listData.media[0].url;
      largeImageImg.alt = listData.media[0].alt;

      // Open modal function, close modal, next image etc //////////////////////////////////
      function openModal(image, index) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const caption = document.getElementById('caption');
        console.log(image.url);
        console.log(image.alt);

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

      // Add event listeners to the arrows
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

      // Text info area
      const infoContainer = document.createElement('div');
      const listTitle = document.createElement('h1');
      infoContainer.classList.add('container', 'mt-4', 'col-6');
      listTitle.classList.add('h5');
      listTitle.innerText = listData.title;

      infoContainer.appendChild(listTitle);

      listDataContainer.appendChild(imageContainer);
      listDataContainer.appendChild(infoContainer);
      listContainer.appendChild(listDataContainer);
    }
  } catch (error) {
    console.error('Error fetching and displaying lists:', error);
  }
}
