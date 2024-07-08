module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'off',
    semi: 'off',
    'comma-dangle': 'off',
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'max-classes-per-file': 'off',
    'default-param-last': 'off',
    'no-undef': 'off',
    camelcase: 'off',
  },
}
