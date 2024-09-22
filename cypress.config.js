const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://kinenystuen.github.io/Semester_project_2/',
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 20000,
    pageLoadTimeout: 30000,
    env: {
      email: process.env.email,
      password: process.env.password,
      apiHostUrl: process.env.VITE_API_HOST_URL,
      apiKey: process.env.VITE_API_KEY,
    },
  },
});
