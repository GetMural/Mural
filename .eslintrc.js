module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended'
    ],
    plugins: [
      'react'
    ],
    // add your custom rules here
    rules: {
        "react/prop-types": 1
    }
  }
