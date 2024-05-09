const globals = require('globals');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: { globals: globals.node },
    /**
     * @TODO: разобраться почему не работает "ignores"
     * @Note: Пришлось прокидывать через cli "--ignore-pattern dist", чтобы eslint не зависал
     */
    ignores: ['dist'],
    rules: {},
  },
];
