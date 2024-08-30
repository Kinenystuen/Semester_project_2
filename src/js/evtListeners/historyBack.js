export function historyBack(containerId, overlayId) {
  document
    .getElementById(overlayId)
    .addEventListener('click', function (event) {
      const containerElement = document.getElementById(containerId);
      // Check if the click was outside the specified container
      if (!containerElement.contains(event.target)) {
        window.history.back(); // Go back to the previous page
      }
    });
}
