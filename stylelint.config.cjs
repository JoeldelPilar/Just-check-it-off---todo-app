'use strict';

module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'color-function-notation': 'legacy',
    'hue-degree-notation': 'number',
  },
};
