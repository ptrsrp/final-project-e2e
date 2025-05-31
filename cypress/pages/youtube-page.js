import 'cypress-xpath';

class youtubePage {
  visit() {
    cy.visit(Cypress.env('youtubeBaseUrl'));
  }
  openSidebarMenu() {
    return cy
      .xpath('//*[@id="guide-button"][@class="style-scope ytd-masthead"]', {
        timeout: 5000,
      })
      .click();
  }
  clickTrending() {
    this.openSidebarMenu();
    cy.xpath('//*[@title="Trending" and contains(@href, "/feed/trending")]', {
      timeout: 5000,
    }).click();
  }
  selectCategoryTrending(category) {
    cy.get('.yt-tab-group-shape-wiz__tabs', { timeout: 5000 }).within(() => {
      cy.contains('.yt-tab-shape-wiz--host-clickable', category).click();
    });
  }
  getVideoInfo(index) {
    return cy
      .get('[id="dismissible"][class="style-scope ytd-video-renderer"]')
      .eq(index)
      .then(($element) => {
        const title = $element.find('#video-title').text().trim();
        const channel = $element
          .find('.ytd-channel-name yt-formatted-string a')
          .first()
          .text()
          .trim();
        return { title, channel };
      });
  }
  clickVideo(index) {
    cy.get('[id="dismissible"][class="style-scope ytd-video-renderer"]')
      .eq(index)
      .click();
  }
  getTitle() {
    return cy
      .get('h1.title')
      .invoke('text')
      .then((text) => text.trim());
  }

  getChannel() {
    return cy
      .get('#upload-info ytd-channel-name a')
      .invoke('text')
      .then((text) => text.trim());
  }
}
export default new youtubePage();
