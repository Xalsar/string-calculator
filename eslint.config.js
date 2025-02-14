import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: ['build/**/*', 'coverage/**/*', 'node_modules/**/*'],
  },
  {
    languageOptions: {
      globals: {},
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      semi: ['warn', 'always'],
      'quotes': ['warn', 'single', {'allowTemplateLiterals': true}],
      'no-useless-escape': 'warn',
      'no-console': 'error',
      'prefer-const': 'error',
    },
  },
];
