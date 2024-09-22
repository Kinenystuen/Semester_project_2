// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('openLoginForm', () => {
  // Capture the current page URL before the button click
  cy.url().then((currentUrl) => {
    // Click the login button and ensure that lastVisitedPage is updated
    cy.get('#userBtn').should('be.visible').click({ force: true });

    // After clicking the button, check that localStorage has stored the previous page
    cy.window().then((window) => {
      const lastVisitedPage = window.localStorage.getItem('lastVisitedPage');
      expect(lastVisitedPage).to.eq(currentUrl);
    });

    // Verify navigation to the login page
    cy.url().should('include', '/html/auth/login.html');
  });
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('#loginForm').find('input[name=email]').type(email, { force: true });
  cy.get('#loginForm')
    .find('input[name=password]')
    .type(password, { force: true });
  cy.get('#loginForm').find('button[type=submit]').click({ force: true });
});

Cypress.Commands.add('loginUser', (email, password) => {
  cy.login(email, password);
});

Cypress.Commands.add('isLoggedIn', () => {
  cy.window().its('localStorage.token').should('exist');
  cy.window().its('localStorage.profile').should('exist');
  cy.log('Logged in and token and profile is located in local storage');
});

Cypress.Commands.add('isLoggedOut', () => {
  cy.window().its('localStorage.token').should('not.exist');
  cy.window().its('localStorage.profile').should('not.exist');
  cy.log('Logged out and token and profile is removed from local storage');
});

Cypress.Commands.add('checkTokenProfile', () => {
  cy.window().then((window) => {
    const token = window.localStorage.getItem('token');
    const profile = window.localStorage.getItem('profile');

    // Debugging - output the token and profile to the console
    cy.log('Token:', token);
    cy.log('Profile:', profile);

    // Assertions
    expect(token).to.exist;
    expect(profile).to.exist;
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test due to the uncaught exception
  return false;
});
