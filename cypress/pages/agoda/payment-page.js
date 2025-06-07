import 'cypress-xpath';

class paymentPage {
  validateFlightTimesOnPaymentPage() {
    cy.get(
      'div[class="aec39-box aec39-fill-inherit aec39-text-inherit aec39-flex      "]'
    )
      .eq(0)
      .invoke('text')
      .then((text) => {
        const cleanedText = text.replace(/[^\d:\-]/g, '').trim();

        const [departureText, arrivalText] = cleanedText
          .split('-')
          .map((t) => t.trim());

        const expectedDeparture = Cypress.env('selectedDepartureTime');
        const expectedArrival = Cypress.env('selectedArrivalTime');

        expect(departureText).to.eq(expectedDeparture);
        expect(arrivalText).to.eq(expectedArrival);
      });
  }

  validatePassengerName(name) {
    cy.contains(name).should('exist');
  }
  validateTotalPrice() {
    cy.get('dd[data-component="mob-flight-price-total-desc"]')
      .invoke('text')
      .then((paymentPriceText) => {
        const expectedTotal = Cypress.env('totalPrice');
        const cleaned = paymentPriceText.replace(/[^\d]/g, '');

        expect(cleaned).to.eq(expectedTotal);
      });
  }
}

export default new paymentPage();
