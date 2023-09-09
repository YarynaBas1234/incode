module.exports = {
    env: {
      browser: true, es2021: true, node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest', sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'object-curly-newline': ['error', { multiline: true, consistent: true }],
      'react-hooks/exhaustive-deps': 'off'
    },
};
