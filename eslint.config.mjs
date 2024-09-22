import globals from 'globals';
import pluginJs from '@eslint/js';
import jest from 'eslint-plugin-jest';
import cypress from 'eslint-plugin-cypress';

export default [
  {
    ignores: ['**/*test.js', '**/*.test.js', 'src/test/**'], // Top-level ignores
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        bootstrap: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
  // Recommended settings from the @eslint/js plugin
  pluginJs.configs.recommended,

  // Jest configuration for test files
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
        fetch: 'readonly',
        document: 'readonly',
        window: 'readonly',
        global: 'readonly',
        require: 'readonly',
        message: 'readonly',
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
  // Cypress configuration for Cypress files
  {
    files: ['cypress/**/*.[jt]s?(x)', '**/*.cy.js'],
    plugins: {
      cypress,
    },
    languageOptions: {
      globals: {
        ...globals.cypress,
        Cypress: 'readonly',
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
      'cypress/no-unnecessary-waiting': 'off',
    },
  },
  {
    files: ['src/js/api/constants.js'],
    languageOptions: {
      globals: {
        Cypress: 'readonly',
        process: 'readonly',
      },
    },
  },
];
