import { login } from '../auth/login.js';

const loginForm = document.getElementById('loginForm');

export function setLoginForm() {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    const action = form.action;
    const method = form.method;

    // Send data to api
    login(profile, action, method);
  });
}
