import { createBid } from '../fetch/bid';

export function setBiddingForm(bidForm, bidId, submitButton) {
  const confirmSubmitModal = new bootstrap.Modal(
    document.getElementById('confirmSubmitModal'),
  );
  const confirmSubmitBtn = document.getElementById('confirmSubmitBtn');

  // Handle form submission
  bidForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const bidDetails = Object.fromEntries(formData.entries());
    bidDetails.amount = Number(bidDetails.amount);

    const action = form.action;
    const method = form.method;

    // Show the confirmation modal before submitting
    confirmSubmitModal.show();

    // If user confirms the submission
    confirmSubmitBtn.addEventListener('click', () => {
      confirmSubmitModal.hide();

      // Send data to api
      createBid(bidDetails, action, method, bidId, submitButton);
    });
  });
}
