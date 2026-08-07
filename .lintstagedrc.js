module.exports = {
  '**/*.{ts,tsx}': (filenames) => [
    'pnpm typecheck',
    `eslint --fix --max-warnings=0 ${filenames.map((f) => `"${f}"`).join(' ')}`,
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],

  // Format root tooling JS without forcing eslint on CJS configs
  '*.{js,mjs,cjs}': (filenames) =>
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,

  '**/*.{md,json}': (filenames) =>
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
};
