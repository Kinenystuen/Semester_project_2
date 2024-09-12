import { clearHTML } from './clearHTML.js';

export function errorMessage(parentElement) {
  if (parentElement) {
    clearHTML(parentElement);
    const containerDiv = document.createElement('div');
    const container = document.createElement('div');
    const infoDiv = document.createElement('div');
    const textInfo = document.createElement('p');

    containerDiv.classList.add(
      'd-flex',
      'justify-content-center',
      'align-content-center',
      'm-5',
    );
    container.classList.add('col-md-8');
    infoDiv.classList.add(
      'p-5',
      'alert',
      'alert-warning',
      'border',
      'rounded-2',
    );
    textInfo.classList.add('text-center');
    textInfo.innerText = 'Ohh no! There is a problem loading the data :/';

    infoDiv.appendChild(textInfo);
    container.appendChild(infoDiv);
    containerDiv.appendChild(container);
    parentElement.appendChild(containerDiv);
  } else {
    console.log(`Parent element is null or undefined.`);
  }
}

export function returnMessage(parentElement, message) {
  if (parentElement) {
    clearHTML(parentElement);
    const containerDiv = document.createElement('div');
    const container = document.createElement('div');
    const infoDiv = document.createElement('div');
    const textInfo = document.createElement('p');

    containerDiv.classList.add(
      'd-flex',
      'justify-content-center',
      'align-content-center',
      'm-5',
    );
    container.classList.add('col-md-8');
    infoDiv.classList.add(
      'p-5',
      'alert',
      'alert-warning',
      'border',
      'rounded-2',
    );
    textInfo.classList.add('text-center');
    // textInfo.innerText = 'Ohh no! There is a problem loading the data :/';
    textInfo.innerText = message;
    infoDiv.appendChild(textInfo);
    container.appendChild(infoDiv);
    containerDiv.appendChild(container);
    parentElement.appendChild(containerDiv);
  } else {
    console.log(`Parent element is null or undefined.`);
  }
}
