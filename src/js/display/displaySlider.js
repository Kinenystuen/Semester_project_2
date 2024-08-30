import { getLists } from '../api/listings/getListings.js';
import { clearHTML } from '../utilitis/clearHTML.js';

export async function displaySlider() {
  try {
    const data = await getLists();
    if (data) {
      const listData = data.data;

      // Get the 8 latest active listings of the data
      listData.sort((a, b) => new Date(b.date) - new Date(a.date));
      const sliceData = listData.slice(0, 8);
      // console.log('Fetched Lists:', sliceData);

      const activeListings = document.getElementById('activeListings');
      clearHTML(activeListings);

      // Create the slider container elements
      const container = document.createElement('div');
      const sliderContainer = document.createElement('div');
      const sliderInner = document.createElement('div');

      container.classList.add('container');
      sliderContainer.classList.add('slider-container');
      sliderInner.classList.add('slider-inner');

      sliceData.forEach((list) => {
        // console.log(list);

        // Create the slider items dynamically
        const sliderItem = document.createElement('a');
        const imageWrapper = document.createElement('div');
        const image = document.createElement('img');
        const titleList = document.createElement('h5');
        const descriptionOverlay = document.createElement('div'); // New div for description

        sliderItem.classList.add(
          'slider-item',
          'link-body-emphasis',
          'link-underline-opacity-0',
          'pointer',
        );
        imageWrapper.classList.add('image-wrapper');
        descriptionOverlay.classList.add('description-overlay'); // New class for description overlay

        sliderItem.href = '/html/pages/auctions.html';
        if (list.media[0]) {
          image.src = list.media[0].url;
          image.alt = list.media[0].alt;
        } else {
          image.src =
            'https://www.shutterstock.com/image-vector/computer-cat-animal-meme-pixel-260nw-2415076223.jpg';
          image.alt = 'List item does not have an image';
        }
        titleList.innerText = list.title;

        // Listing item description
        if (list.description) {
          descriptionOverlay.innerText = list.description;
        } else {
          descriptionOverlay.innerText = '';
        }

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(descriptionOverlay);
        sliderItem.appendChild(imageWrapper);
        sliderItem.appendChild(titleList);
        sliderInner.appendChild(sliderItem);
      });

      sliderContainer.appendChild(sliderInner);
      container.appendChild(sliderContainer);
      activeListings.appendChild(container);

      // Create the arrow controls dynamically
      const leftArrow = document.createElement('button');
      leftArrow.classList.add('carousel-control-prev', 'slider-arrow', 'left');
      leftArrow.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>`;
      sliderContainer.appendChild(leftArrow);

      const rightArrow = document.createElement('button');
      rightArrow.classList.add(
        'carousel-control-next',
        'slider-arrow',
        'right',
      );
      rightArrow.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>`;
      sliderContainer.appendChild(rightArrow);

      // Implement the slider functionality
      const sliderItems = document.querySelectorAll('.slider-item');
      let currentIndex = 0;
      let autoScrollInterval;

      // Clone the first few items to the end for seamless looping
      sliderItems.forEach((item) => {
        const clone = item.cloneNode(true);
        sliderInner.appendChild(clone);
      });

      function updateSlider() {
        const itemWidth = sliderItems[0].clientWidth + 20; // Include margin
        sliderInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        // When reaching the clones, reset to the original set without visible jump
        if (currentIndex >= sliderItems.length) {
          setTimeout(() => {
            sliderInner.style.transition = 'none';
            currentIndex = 0;
            sliderInner.style.transform = `translateX(0)`;
          }, 500);
        }

        setTimeout(() => {
          sliderInner.style.transition = 'transform 0.5s ease';
        }, 600);
      }

      leftArrow.addEventListener('click', function () {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = sliderItems.length - 1;
          sliderInner.style.transition = 'none';
          sliderInner.style.transform = `translateX(-${currentIndex * (sliderItems[0].clientWidth + 20)}px)`;
          setTimeout(() => {
            sliderInner.style.transition = 'transform 0.5s ease';
          }, 50);
        }
        updateSlider();
      });

      rightArrow.addEventListener('click', function () {
        currentIndex++;
        updateSlider();
      });

      // Automatically scroll through the items
      function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
          currentIndex++;
          updateSlider();
        }, 3000); // Adjust the speed
      }

      function stopAutoScroll() {
        clearInterval(autoScrollInterval);
      }

      // Start auto-scrolling on load
      startAutoScroll();

      // Stop auto-scrolling on user interaction
      sliderInner.addEventListener('mouseover', stopAutoScroll);
      sliderInner.addEventListener('mouseout', startAutoScroll);

      // Responsive resizing
      window.addEventListener('resize', function () {
        updateSlider();
      });

      updateSlider(); // Initialize slider on load
    }
  } catch (error) {
    console.error('Error fetching and displaying lists:', error);
  }
}
