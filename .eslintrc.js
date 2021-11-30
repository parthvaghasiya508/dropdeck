module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  settings: {
    react: {
      pragma: "React",
      version: "15.6.1",
    }
  },
  rules: {

    // Two-space indents, switch statements should be pulled in by one indent block:
    "indent": ["error", 2, {
      "SwitchCase": 1,
      "ignoredNodes": [
        "TemplateLiteral"
      ]
    }
    ],
    "template-curly-spacing": "off",
    "no-console": "error",

    // Rules that are disabled (consider enabling these):
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "new-cap": "off",
    "no-case-declarations": "off",
    "no-cond-assign": "off",
    "no-continue": "off",
    "no-mixed-operators": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "object-curly-spacing": ["error"],
    "object-curly-newline": "off",
    "react/jsx-tag-spacing": "off",
    "no-trailing-spaces": "off",
    "react/display-name": "off",
    "padded-blocks": "off",
    "quotes": "off",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-indent-props": "off",
    "comma-spacing": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-fragments": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "operator-linebreak": "off",
    "react/jsx-curly-linebreak": "off",
    "react/jsx-one-expression-per-line": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "max-len": "off",
    "no-underscore-dangle": "off",
    "react/jsx-props-no-multi-spaces": "off",

    // Rules that generate warnings (consider increasing to error logging):
    "class-methods-use-this": "warn",
    "default-case": "warn",
    "import/extensions": "warn",
    "import/no-cycle": "warn",
    "import/no-extraneous-dependencies": "warn",
    "import/no-named-as-default": "warn",
    "import/no-unresolved": "warn",
    "max-classes-per-file": ["warn", 2],
    "no-nested-ternary": "warn",
    "no-prototype-builtins": "warn",
    "no-restricted-syntax": "warn",
    "no-return-await": "warn",
    "no-shadow": "warn",
    "no-unused-vars": "warn",
    "no-use-before-define": "warn",
    "react/no-unescaped-entities": "warn",
    "consistent-return": "warn",
    "no-useless-escape": "warn",
    "react/require-default-props": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
  },


};
