// formValidation.js

export function initFormValidation(formId) {
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById(formId);

    if (!form) {
      console.warn(`Form with ID '${formId}' not found.`);
      return;
    }

    form.addEventListener('input', function (event) {
      const input = event.target;
      if (input.checkValidity()) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
      } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
      }
    });

    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });
}
