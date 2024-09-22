// FindProfile.js

describe('Should find listingCard-7 and open the user profile and sign in to see profile', () => {
  beforeEach(() => {
    // Visit the auctions page
    cy.visit('html/pages/auctions.html');
  });

  it('should find listingCard-7 and open the associated user profile', () => {
    cy.get('a#listingCard-7').should('be.visible').click({ force: true });

    cy.url().should('include', 'listingitem.html?id=');

    cy.contains('Uploaded by').should('be.visible').click({ force: true });

    cy.get('#logInUser', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));

    cy.pause();

    cy.url().should('include', 'profile.html');
  });
});
