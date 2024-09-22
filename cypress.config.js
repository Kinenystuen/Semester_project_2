const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://kinenystuen.github.io/Semester_project_2/',
    setupNodeEvents(on, config) {},
    defaultCommandTimeout: 20000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    pageLoadTimeout: 60000,
    retries: {
      runMode: 2,
    },
    env: {
      email: process.env.email,
      password: process.env.password,
      VITE_API_HOST_URL: process.env.VITE_API_HOST_URL,
      VITE_API_KEY: process.env.VITE_API_KEY,
    },
  },
});
