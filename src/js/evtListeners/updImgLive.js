// Function to update image live
export function updImgLive(inputId, imageId) {
  const imgInput = document.getElementById(inputId);
  const newImg = document.getElementById(imageId);

  if (imgInput && newImg) {
    imgInput.addEventListener('keyup', function () {
      const newUrl = imgInput.value.trim();
      newImg.src = newUrl;
    });
  } else {
    console.error(
      'Elements with the provided IDs were not found:',
      inputId,
      imageId,
    );
  }
}
