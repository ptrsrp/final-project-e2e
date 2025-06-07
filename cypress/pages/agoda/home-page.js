import 'cypress-xpath';

class homePage {
  visit() {
    cy.visit(Cypress.env('agodaBaseUrl'));
  }
  chooseFlightTab() {
    cy.get('#tab-flight-tab').scrollIntoView().click();
  }
  enterOrigin(origin) {
    cy.xpath('//*[@id="flight-origin-search-input"]')
      .clear()
      .type(origin)
      .wait(1000);
    cy.get('.Suggestion.Suggestion--flight.Suggestion__categoryName')
      .first()
      .click();
  }
  enterDestination(destination) {
    cy.xpath('//*[@id="flight-destination-search-input"]')
      .clear()
      .type(destination)
      .wait(1000);
    cy.get('.Suggestion.Suggestion--flight.Suggestion__categoryName')
      .first()
      .click();
  }
  selectDate(dateObj) {
    const formattedAriaLabel = dateObj.toDateString() + ' ';

    cy.xpath('//*[@id="flight-departure"]/div')
      .scrollIntoView()
      .click()
      .wait(500)
      .click();

    cy.get(`div[aria-label="${formattedAriaLabel}"]`)
      .should('exist')
      .click({ force: true });
  }
  searchFlight() {
    cy.get('button[data-selenium="searchButton"]').click();
  }
}
export default new homePage();
