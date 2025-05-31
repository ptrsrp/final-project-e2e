import youtubePage from '../../pages/youtube-page';

describe('Youtube Trending Movies - Validasi Movie Trending No. 3', function () {
  beforeEach(function () {
    cy.visit(Cypress.env('youtubeBaseUrl'));
  });
  it('Cari movie trending no. 3 dan validasi judul serta nama channel', function () {
    youtubePage.visit();
    cy.wait(5000);
    youtubePage.clickTrending();
    cy.wait(5000);
    youtubePage.selectCategoryTrending('Film');
    cy.wait(5000);
    youtubePage.getVideoInfo(2).then(({ title, channel }) => {
      // cy.log('Judul:', title);
      // cy.log('Channel:', channel);
      youtubePage.clickVideo(2);
      cy.wait(5000);
      youtubePage.getTitle().should('eq', title);
      youtubePage.getChannel().should('eq', channel);
    });
  });
});
