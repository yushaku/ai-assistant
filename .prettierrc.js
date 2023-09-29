module.exports = {
  singleQuote: true,
  endOfLine: 'auto',
  trailingComma: 'none',
  semi: false,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  importOrder: ['^react$', '^components/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ]
}
