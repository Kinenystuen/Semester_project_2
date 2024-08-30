import * as constants from '../constants.js';
import { clearHTML } from '../../utilitis/clearHTML.js';
import { loaderW } from '../../utilitis/loader.js';
import { login } from './login.js';

const registerBtn = document.getElementById('registerBtn');
/**
 * Function to register a new profile using form entries from another function
 * If success it will then run the login function with the register data to log in
 * @param {object} profile Containing entries from form inputs with name,email and password
 * @param {string} action String value of type of action to use
 * @param {string} method  String value of type of method to use
 * @returns
 */
export async function register(profile, action, method) {
  const actionURL = new URL(action);
  const registerURL = `${constants.apiHostUrl}${actionURL.pathname}`;
  const message = document.getElementById('regErrorMessage');
  const body = JSON.stringify(profile);
  const loginAction = `${constants.apiAuth}${constants.apiLogin}`;

  clearHTML(registerBtn);
  registerBtn.appendChild(loaderW);

  try {
    const response = await fetch(registerURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      body,
    });

    if (response.ok) {
      const result = await response.json();
      clearHTML(message);
      login(profile, loginAction, method);
      return result;
    } else {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.errors[0].message;
      message.innerHTML = errorMessage;
      registerBtn.innerHTML = 'Register';
      registerBtn.removeChild(loaderW);
      throw new Error(`Server responded with status ${response.status}`);
    }
  } catch (error) {
    // Display the error message to the user
    if (message.innerHTML === '') {
      message.innerHTML = `An error occured:${error}`;
    }
  }
}
