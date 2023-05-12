module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'es2020',
  },
  plugins: [
    'jest',
    'import',
    'prettier',
    '@darraghor/nestjs-typed',
    'eslint-plugin-import-helpers',
    '@typescript-eslint/eslint-plugin',
  ],
  extends: [
    'prettier',
    'plugin:jest/style',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    jest: true,
    'jest/globals': true,
  },
  rules: {
    'prettier/prettier': 'error',
    'jest/expect-expect': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/node/',
          '/@nestjs/',
          'module',
          '/app/',
          '/^infra/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
