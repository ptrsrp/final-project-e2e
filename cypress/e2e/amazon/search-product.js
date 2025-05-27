import amazonPage from '../../pages/amazon-page';

describe('Amazon Search - Validasi Nama dan Harga Produk', function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit(Cypress.env('amazonBaseUrl'));
    cy.fixture('amazon-data').as('amazonData');
  });
  it('Cari produk dan validasi nama serta harga item', function () {
    amazonPage.searchBox(this.amazonData.search.keyword);
    amazonPage.searchButton();
    cy.wait(3000);

    //sort by high to low
    amazonPage.sortByHighToLow();
    cy.wait(3000);

    //pilih produk paling kanan baris pertama yang non sponsor
    amazonPage.clickRightmostItemOnFirstRow();
    cy.get('@selectedProduct').then((selectedProduct) => {
      amazonPage.verifyProductDetails(selectedProduct);
    });
  });
});
