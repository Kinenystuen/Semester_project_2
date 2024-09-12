import * as handlers from './../api/handlers/index.js';

export function newBidSection(listData) {
  const bidSection = document.getElementById('bidSection');
  const bids = listData.bids;
  const bidId = listData.id;
  const lastBid = bids[bids.length - 1];
  let lastBidAmount = 0;
  if (bids.length > 0) {
    lastBidAmount = lastBid.amount;
  }

  const bidIncrement = 10;
  const maxBidOptions = 20;
  const nextBid = Math.ceil((lastBidAmount + 0.1) / 10) * 10;

  const bidForm = document.createElement('form');
  bidForm.id = 'bidForm';
  bidForm.action = `/auction/listings/${listData.id}/bids`;
  bidForm.method = 'POST';
  bidForm.classList.add('my-5');

  const bidLabel = document.createElement('label');
  bidLabel.innerText = 'Make a bid:';
  bidLabel.htmlFor = 'bidSelect';
  bidLabel.classList.add('h5');
  bidForm.appendChild(bidLabel);

  const bidDiv = document.createElement('div');
  bidDiv.classList.add('d-flex', 'align-items-center');

  // Create the dropdown
  const bidSelect = document.createElement('select');
  bidSelect.name = 'amount';
  bidSelect.id = 'bidSelect';
  bidSelect.classList.add('form-select', 'mx-2', 'fs-5');
  bidSelect.style.overflowY = 'auto';

  // Generate bid options starting from the next available whole number bid
  for (let i = 0; i < maxBidOptions; i++) {
    const bidOption = document.createElement('option');
    const bidValue = nextBid + bidIncrement * i;
    bidOption.value = bidValue;
    bidOption.innerText = `${bidValue} credit`;
    bidSelect.appendChild(bidOption);
  }
  bidDiv.appendChild(bidSelect);

  // Create the submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('btn', 'btn-primary', 'text-white', 'h5');
  submitButton.innerText = 'Submit bid';
  bidDiv.appendChild(submitButton);
  bidForm.appendChild(bidDiv);

  bidSection.appendChild(bidForm);

  handlers.setBiddingForm(bidForm, bidId, submitButton);
}
