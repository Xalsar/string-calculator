import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
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
