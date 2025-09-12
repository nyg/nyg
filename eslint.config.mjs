import { defineConfig } from 'eslint/config'

export default defineConfig([{
   rules: {
      indent: ['error', 3, {
         SwitchCase: 1,
      }],

      semi: ['error', 'never'],
      quotes: ['error', 'single'],

      'sort-imports': ['error', {
         ignoreCase: true,
      }],
   },
}])
