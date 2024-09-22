// Search.cy.js

describe('Search tests', () => {
  beforeEach(() => {
    // Visit auction page before each test
    cy.visit('html/pages/auctions.html');
  });

  it('Displays "No listings found" when no listings match the search', () => {
    // Type a search term that won't match any listings
    cy.get('input[type="search"]').type('no listings to be found:))');

    // Wait for the error box to appear
    cy.get('div.alert.alert-warning', { timeout: 20000 })
      .should('be.visible')
      .and('contain', 'No listings found');
  });

  it('Should display the correct listing items on search and click the "test" item', () => {
    cy.get('input[type="search"]').type('test');

    // Wait for the search results and ensure the correct item is found
    cy.get('a[id^="listingCard"]', { timeout: 20000 })
      .contains('test')
      .should('be.visible')
      .click({ force: true });

    cy.url().should('include', 'listingitem.html?id=');
  });
});
