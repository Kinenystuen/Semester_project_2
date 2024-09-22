// FindProfile.js

describe('Should find listingCard-7 and open the user profile and sign in to see profile', () => {
  beforeEach(() => {
    cy.visit('html/pages/auctions.html');
  });

  it('should find the 7th listing and open the associated user profile', () => {
    cy.get('a[id^="listingCard"]')
      .eq(6)
      .should('be.visible')
      .click({ force: true });

    cy.url().should('include', 'listingitem.html?id=');

    // Profile.html will show an alert messege that user needs to be logged in
    cy.contains('Uploaded by').should('be.visible').click({ force: true });
    // Click login button and log in user
    cy.get('#logInUser', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));
    cy.pause();

    // Verify the profile page URL
    cy.url().should('include', 'profile.html');
  });
});
