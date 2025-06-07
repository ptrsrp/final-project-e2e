class flightResultPage {
  filterByAirline(airline) {
    cy.get('body').then(($body) => {
      if ($body.text().includes('Tampilkan semua')) {
        cy.contains('Tampilkan semua').click();
      }
    });
    cy.scrollTo('top');
    cy.get(`label[data-element-value="${airline}"] input[type="checkbox"]`)
      .scrollIntoView()
      .check();

    cy.wait(1000);
  }

  sortFlight() {
    cy.get('p[id="sort-options-label"]')
      .click()
      .then(() => {
        cy.contains('Waktu Keberangkatan').click();
      });
  }
  chooseEarliestFlight() {
    cy.get('div[data-testid="flightCard-flight-detail"]')
      .first()
      .click()
      .then(() => {
        cy.contains('button[data-component="flight-card-bookButton"]', 'Pilih')
          .first()
          .click();
      });
  }
  storeFlightTimes() {
    cy.get('div[data-testid="web-refresh-flights-card"]')
      .first()
      .within(() => {
        cy.get('div[data-testid="departure-time"]')
          .invoke('text')
          .then((dep) => {
            Cypress.env('selectedDepartureTime', dep.trim());
          });

        cy.get('div[data-testid="arrival-time"]')
          .invoke('text')
          .then((arr) => {
            Cypress.env('selectedArrivalTime', arr.trim());
          });
      });
  }
}
export default new flightResultPage();
