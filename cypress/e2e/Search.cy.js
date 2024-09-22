// Search.cy.js

describe('Search tests', () => {
  beforeEach(() => {
    // Visit auction page
    cy.visit('html/pages/auctions.html');
  });
  it('Display "no listings found" when no listings is found when searching', () => {
    cy.get('input[type="search"]').type('no listings to be found:))');
    // Check that the error box appears
    cy.get('div.alert.alert-warning')
      .should('be.visible')
      .and('contain', 'No listings found');
  });
  it('Should display the correct listing items on search and click the "test" item', () => {
    cy.get('input[type="search"]').type('test');

    cy.get('a[id^="listingCard"]', { timeout: 20000 })
      .contains('test')
      .should('be.visible')
      .click({ force: true });

    cy.url().should('include', 'listingitem.html?id=');
  });
});
