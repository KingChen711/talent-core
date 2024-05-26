module.exports = {
  extends: [
    'standard',
    'plugin:tailwindcss/recommended',
    'eslint-config-prettier',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react', '@typescript-eslint'],
  settings: { react: { version: 'detect' } },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  ignorePatterns: ['vite.config.ts'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
