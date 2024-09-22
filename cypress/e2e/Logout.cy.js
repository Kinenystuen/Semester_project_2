// Logout.cy.js

describe('Logout tests', () => {
  beforeEach(function () {
    cy.visit('/');
  });
  it('should successfully log in then log out and remove token and profile', function () {
    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));

    // find logout button and log out
    cy.get('#userDropdownContainer').click({ force: true });
    cy.get('#logOutBtn').click({ force: true });

    cy.isLoggedOut();
  });
  it('should remove token and profile from localStorage after logout', function () {
    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));

    // Log out
    cy.get('#userDropdownContainer').click({ force: true });
    cy.get('#logOutBtn').click({ force: true });

    // Verify that token and profile are removed from localStorage
    cy.window().then((window) => {
      const token = window.localStorage.getItem('authToken');
      const profile = window.localStorage.getItem('userProfile');
      expect(token).to.be.null;
      expect(profile).to.be.null;
    });
  });
  it('should display login button and hide user dropdown after logout', function () {
    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));

    // Log out
    cy.get('#userDropdownContainer').click({ force: true });
    cy.get('#logOutBtn').click({ force: true });

    // Verify that login button is visible and user dropdown is hidden
    cy.get('#userBtn').should('be.visible');
    cy.get('#userDropdownContainer').should('not.be.visible');
  });
});
