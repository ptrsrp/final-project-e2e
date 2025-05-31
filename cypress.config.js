const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    env: {
      amazonBaseUrl: process.env.CYPRESS_amazonBaseUrl,
      agodaBaseUrl: process.env.CYPRESS_agodaBaseUrl,
      youtubeBaseUrl: process.env.CYPRESS_youtubeBaseUrl,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    video: true,
    screenshotOnRunFailure: true,
    // reporter: 'mochawesome',
    // reporterOptions: {
    //   reportDir: 'cypress/reports',
    //   overwrite: false,
    //   html: true,
    //   json: true,
    // },
  },
});
