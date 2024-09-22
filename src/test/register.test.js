import { register } from './../js/api/auth/register.js';
import { clearHTML } from './../js/utilitis/clearHTML.js';

// Mock the constants module
jest.mock('./../js/api/constants.js', () => ({
  apiHostUrl: 'https://mock-api-host-url.com',
  apiAuth: '/auth',
  apiLogin: '/login',
}));

// Mock the clearHTML utility
jest.mock('./../js/utilitis/clearHTML.js', () => ({
  clearHTML: jest.fn(),
}));

// Mock the login function from the login module
jest.mock('./../js/api/auth/login.js', () => ({
  login: jest.fn(),
}));

global.fetch = jest.fn();

describe('register', () => {
  const profile = {
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
  };
  const action = 'https://mock-api-host-url.com/auth/register';
  const method = 'POST';

  beforeEach(() => {
    fetch.mockClear();
    clearHTML.mockClear();
    document.body.innerHTML =
      '<div id="regErrorMessage"></div><button id="registerBtn"></button>';

    global.loaderW = document.createElement('div');
  });

  it('should register successfully and log in', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        message: 'Registration successful',
      }),
    };
    fetch.mockResolvedValueOnce(mockResponse);

    const { login } = require('./../js/api/auth/login.js');
    const result = await register(profile, action, method);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://mock-api-host-url.com/auth/register'),
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(profile),
      }),
    );

    expect(clearHTML).toHaveBeenCalledWith(
      document.getElementById('registerBtn'),
    );
    expect(login).toHaveBeenCalledWith(profile, '/auth/login', method);
    expect(result).toEqual({ message: 'Registration successful' });
  });

  it('should display an error message on failed registration', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({
        errors: [{ message: 'Invalid data' }],
      }),
    };
    fetch.mockResolvedValueOnce(mockResponse);

    await register(profile, action, method);

    const message = document.getElementById('regErrorMessage').innerHTML;
    expect(message).toBe('Invalid data');
    expect(clearHTML).toHaveBeenCalledWith(
      document.getElementById('registerBtn'),
    );
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Network error';
    fetch.mockRejectedValueOnce(new Error(errorMessage));

    await register(profile, action, method);

    const message = document.getElementById('regErrorMessage').innerHTML;
    expect(message).toContain(`An error occured:Error: ${errorMessage}`);
  });
});
