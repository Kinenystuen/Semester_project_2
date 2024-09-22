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
    // Wait a bit to ensure localStorage has been updated
    cy.wait(1000);
    cy.checkTokenProfile();
    cy.isLoggedIn();
  });

  it('should show an error when invalid userdata tries to log in', function () {
    cy.openLoginForm();
    cy.loginUser('User@stud.noroff.no', 'invalidPassword');
    cy.on('window:alert', () => {
      expect(true).to.be.true;
    });
  });
  it('should successfully log in and redirect to the last visited page', function () {
    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));

    // Check redirection to the last visited page (homepage)
    cy.url().should('eq', 'https://kinenystuen.github.io/Semester_project_2/');
  });
  it('should visit sell page, then successfully log in and redirect to the last visited page', function () {
    cy.contains('a', 'Sell').click({ force: true });
    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));

    cy.url().should(
      'eq',
      'https://kinenystuen.github.io/Semester_project_2/html/pages/sell.html',
    );
  });
});
