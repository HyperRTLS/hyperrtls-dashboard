module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js', 'next-end.d.ts', 'next.config.js'],
  rules: {},
};
