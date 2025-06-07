class passengerDetailPage {
  fillPassengerDetails(data) {
    cy.get('input[id="contact.contactFirstName"]', { timeout: 2000 }).type(
      data.firstName
    );
    cy.get('input[id="contact.contactLastName"]', { timeout: 2000 }).type(
      data.lastName
    );
    cy.get('input[id="contact.contactEmail"]', { timeout: 2000 }).type(
      data.email
    );
    cy.get('input[id="contact.contactPhoneNumber"]', { timeout: 2000 }).type(
      data.phone
    );
    cy.get('input[id="flight.forms.i0.units.i0.passengerFirstName"]', {
      timeout: 2000,
    }).type(data.firstName);
    cy.get('input[id="flight.forms.i0.units.i0.passengerLastName"]', {
      timeout: 2000,
    }).type(data.lastName);
    cy.get('input[autocomplete="bday-day"]', { timeout: 2000 }).type(
      data.birthDate.day
    );
    cy.get('input[autocomplete="bday-year"]', { timeout: 2000 }).type(
      data.birthDate.year
    );
    cy.get('input[id="flight.forms.i0.units.i0.passportNumber"]', {
      timeout: 2000,
    }).type(data.passport.number);
    cy.get('input[type="radio"][autocomplete="sex"]', { timeout: 2000 })
      .eq(1)
      .click();

    //pilih negara
    cy.get('button[aria-haspopup="listbox"]', { timeout: 2000 }).eq(0).click();
    cy.get(
      'li[class="aec39-box aec39-fill-inherit aec39-text-inherit      "]',
      { timeout: 2000 }
    )
      .contains(data.country)
      .click();

    //pilih bulan lahir
    cy.get('button[aria-haspopup="listbox"]', { timeout: 2000 }).eq(2).click();
    cy.get(
      'li[class="aec39-box aec39-fill-inherit aec39-text-inherit      "]',
      { timeout: 2000 }
    )
      .contains(data.birthDate.month)
      .click();

    //pilih kewarganegaraan
    cy.get('button[aria-haspopup="listbox"]').eq(3).click();
    cy.get(
      'li[class="aec39-box aec39-fill-inherit aec39-text-inherit      "]',
      { timeout: 2000 }
    )
      .contains(data.nationality)
      .click();

    //pilih negara paspor
    cy.get('button[aria-haspopup="listbox"]').eq(5).click();
    cy.get(
      'li[class="aec39-box aec39-fill-inherit aec39-text-inherit      "]',
      { timeout: 2000 }
    )
      .contains(data.passport.expiry.month)
      .click();

    //pilih negara paspor
    cy.get('button[aria-haspopup="listbox"]').eq(4).click();
    cy.get(
      'li[class="aec39-box aec39-fill-inherit aec39-text-inherit      "]',
      { timeout: 2000 }
    )
      .contains(data.passport.country)
      .click();

    cy.get(
      'input[datatestid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]',
      { timeout: 2000 }
    ).type(data.passport.expiry.day);
    cy.get(
      'input[datatestid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]',
      { timeout: 2000 }
    ).type(data.passport.expiry.year);
  }
  continueToPayment() {
    cy.get('button[data-component="flight-continue-to-addOns-button"]')
      .click()
      .click();
    cy.wait(5000);
    cy.get(
      'button[type="submit"][data-testid="continue-to-payment-button"]'
    ).click();
  }

  storeTotalPrice() {
    cy.get('dd[data-component="mob-flight-price-total-desc"]', {
      timeout: 2000,
    })
      .invoke('text')
      .then((priceText) => {
        const cleaned = priceText.replace(/[^\d]/g, '');
        Cypress.env({ totalPrice: cleaned });
        cy.log(`Stored totalPrice: ${cleaned}`);
      });
  }
}
export default new passengerDetailPage();
