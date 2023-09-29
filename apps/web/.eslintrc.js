module.exports = {
  extends: ["custom/next", "stylelint-scss"],
  rules: {
    "css/unknown-at-rules": "off",
  },
  overrides: [
    {
      files: ["*.css"],
      rules: {
        "css/unknown-at-rules": "off",
      },
    },
  ],
};
