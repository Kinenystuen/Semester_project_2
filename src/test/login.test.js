import { login } from './../js/api/auth/login.js';
import * as storage from './../js/api/storage/index.js';

jest.mock('./../js/api/constants.js', () => ({
  apiHostUrl: 'https://mock-api-host-url.com',
}));

jest.mock('./../js/api/storage/index.js', () => ({
  save: jest.fn(),
}));

global.fetch = jest.fn();

describe('login', () => {
  const profile = { username: 'test', password: '123456' };
  const action = '/auth/login';
  const method = 'POST';

  beforeEach(() => {
    fetch.mockClear();
    storage.save.mockClear();
    document.body.innerHTML =
      '<div id="regErrorMessage"></div><button id="loginBtn"></button>';

    global.message = document.getElementById('regErrorMessage');
    message.innerHTML = '';

    // Mock window.location
    delete window.location;
    window.location = { href: '' };
  });

  it('should call fetch and save token on successful login', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: {
          accessToken: 'fake-token',
          user: { id: 1, name: 'John Doe', password: 'password123' },
        },
      }),
    };
    fetch.mockResolvedValueOnce(mockResponse);

    const user = await login(profile, action, method);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(profile),
      }),
    );

    expect(storage.save).toHaveBeenCalledWith('token', 'fake-token');
    expect(storage.save).toHaveBeenCalledWith('profile', {
      user: { id: 1, name: 'John Doe', password: 'password123' },
    });
    expect(user).toEqual({
      user: { id: 1, name: 'John Doe', password: 'password123' },
    });
  });

  it('should display error message on failed login', async () => {
    const mockResponse = {
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({
        errors: [{ message: 'Invalid login' }],
      }),
    };
    fetch.mockResolvedValueOnce(mockResponse);

    const messageElement = document.getElementById('regErrorMessage');
    messageElement.innerHTML = '';

    await login(profile, action, method, messageElement);

    const errorMessage = document.getElementById('regErrorMessage').innerHTML;
    expect(errorMessage).toBe('Invalid login');
  });
});
