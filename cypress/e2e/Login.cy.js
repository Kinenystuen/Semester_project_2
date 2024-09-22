// login.cy.js

describe('Login Button Test', () => {
  beforeEach(() => {
    // Visit the homepage
    cy.visit('/');
  });

  it('should click the user button and navigate to the login page', () => {
    cy.openLoginForm();
  });

  it('should successfully log in and save the token and profile', function () {
    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));

    // Ensure localStorage is updated after login
    cy.wait(1000);
    cy.checkTokenProfile();
    cy.isLoggedIn();
  });

  it('should show an error when invalid userdata tries to log in', function () {
    cy.openLoginForm();
    cy.loginUser('User@stud.noroff.no', 'invalidPassword');

    // Assert that an alert was shown for invalid credentials
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Invalid username or password');
    });
  });

  it('should successfully log in and redirect to the last visited page', function () {
    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));

    // Wait to ensure redirection happens
    cy.wait(1000);

    // Check redirection to the homepage
    cy.url().should('eq', 'https://kinenystuen.github.io/Semester_project_2/');
  });

  it('should visit the sell page, then successfully log in and redirect to the last visited page', function () {
    cy.contains('a', 'Sell').click({ force: true });

    cy.url().should('include', '/html/pages/sell.html');

    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));

    cy.wait(1000);

    cy.url().should(
      'eq',
      'https://kinenystuen.github.io/Semester_project_2/html/pages/sell.html',
    );
  });
});
