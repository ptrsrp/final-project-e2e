import 'cypress-xpath';

class amazonPage {
  searchBox(keyword) {
    cy.get('#twotabsearchtextbox').type(keyword);
  }
  searchButton() {
    cy.get('#nav-search-submit-button').click();
  }

  clickSortBy() {
    return cy.get('span.a-dropdown-label').click();
  }

  sortByHighToLow() {
    this.clickSortBy().then(() => {
      cy.xpath('//*[@class="a-popover-inner"]').within(() => {
        cy.contains('li.a-dropdown-item', 'Price: High to Low').click();
      });
    });
  }

  getNonAdsProducts() {
    //ambil semua item hasil pencarian yang bukan iklan
    return cy
      .get('[data-component-type="s-search-result"]')
      .filter(':not(:has([aria-label="Sponsored"]))');
  }
  clickRightmostItemOnFirstRow() {
    this.getNonAdsProducts().then(($products) => {
      const firstRow = [];

      //ambil posisi vertikal (dari atas halaman) dari produk pertama
      const topY = Cypress.$($products[0]).offset().top;

      //looping ke semua product non sponsor untuk mengambil yang berada di baris pertama
      for (let i = 0; i < $products.length; i++) {
        const product = $products[i];

        //cek apakah posisi product sama dengan product pertama
        if (Cypress.$(product).offset().top === topY) {
          //simpan ke dalam array baris pertama
          firstRow.push(product);
        }
      }

      // ambil product paling kanan dari baris pertama
      const rightMost = firstRow[firstRow.length - 1];

      // ambil nama product
      const productName = Cypress.$(rightMost).find('h2').text().trim();

      // ambil harga product
      const productPrice = Cypress.$(rightMost)
        .find('.a-price-whole')
        .first()
        .text()
        .trim();

      // klik link product
      cy.wrap(rightMost).find('a h2').click();

      // simpan nama dan harga ke alias
      cy.wrap({ name: productName, price: productPrice }).as('selectedProduct');
    });
  }

  verifyProductDetails(expected) {
    cy.get('#productTitle')
      .invoke('text')
      .then((title) => {
        expect(title.trim()).to.include(expected.name.substring(0, 10));
      });

    cy.get('.a-price .a-price-whole')
      .first()
      .invoke('text')
      .then((price) => {
        expect(price.replace(/[^0-9]/g, '')).to.include(
          expected.price.replace(/[^0-9]/g, '')
        );
      });
  }
}
export default new amazonPage();
