module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": "off",
    quotes: "off",
    "react/jsx-one-expression-per-line": "off",
    "implicit-arrow-linebreak": "off",
    "no-confusing-arrow": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "linebreak-style": 0,
    "import/no-extraneous-dependencies": "off",
    "no-trailing-spaces": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-wrap-multilines": "off",
    "no-unused-vars": "off",
    "operator-linebreak": "off",
    "no-empty-function": "off",
  },
};
