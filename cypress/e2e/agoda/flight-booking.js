import homePage from '../../pages/agoda/home-page';
import flightResultPage from '../../pages/agoda/flight-result-page';
import passengerDetailPage from '../../pages/agoda/passenger-detail-page';
import paymentPage from '../../pages/agoda/payment-page';

describe('Agoda Flight Booking', function () {
  before(function () {
    cy.viewport(1920, 1080);
    cy.fixture('agoda-data').as('agodaData');
  });
  it('Booking penerbangan dari Jakarta ke Singapore dengan Malaysia Air', function () {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    homePage.visit();
    homePage.chooseFlightTab();
    homePage.enterOrigin(this.agodaData.flight.origin);
    homePage.enterDestination(this.agodaData.flight.destination);
    homePage.selectDate(tomorrow);
    homePage.searchFlight();
    cy.wait(5000);

    flightResultPage.filterByAirline(this.agodaData.flight.airline);
    cy.wait(5000);
    flightResultPage.sortFlight();
    cy.wait(5000);
    flightResultPage.storeFlightTimes();
    flightResultPage.chooseEarliestFlight();

    passengerDetailPage.fillPassengerDetails(this.agodaData.dataPassenger);
    passengerDetailPage.storeTotalPrice();
    passengerDetailPage.continueToPayment();
    cy.get('body').then(($body) => {
      if (
        $body.find('.aec39-items-baseline > .aec39-bg-generic-base-transparent')
          .length > 0
      ) {
        cy.get(
          '.aec39-items-baseline > .aec39-bg-generic-base-transparent'
        ).click();
      }
    });

    paymentPage.validateFlightTimesOnPaymentPage();
    const fullName = `${this.agodaData.dataPassenger.firstName} ${this.agodaData.dataPassenger.lastName}`;
    paymentPage.validatePassengerName(fullName);
    paymentPage.validateTotalPrice();
  });
});
