// @ts-check
import eslintPluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['.nuxt/**', '.output/**', 'node_modules/**', 'dist/**', 'coverage/**'],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    rules: {
      // The challenge explicitly forbids `any` — enforce it, don't just rely on discipline.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],

      // Nuxt's file-based routing requires literal filenames like index.vue / [id].vue,
      // which this rule (correctly, for a non-Nuxt-aware config) would otherwise flag.
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'error',
      'vue/block-order': ['error', { order: ['script', 'template'] }],

      // Formatting-only rules from the recommended preset — this project keeps short,
      // related attributes on one line rather than one-per-line, and self-closes void
      // elements. Both are valid, common styles; a Prettier setup would own this instead.
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
    },
  },
)
