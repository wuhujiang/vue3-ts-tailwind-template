import antfu from '@antfu/eslint-config';

export default antfu({
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
  typeScript: true,
  formatters: {
    css: true,
    html: true,
    scss: true,
  },
  ignores: [
    'public/mockServiceWorker.js',
    '**/fixtures',
    '**/assets/images',
    '**/node_modules',
    '**/dist',
    '**/envs',
    '**/vite',
    '**/*.md', // 忽略所有 .md 文件
    '**/*.{png,jpg,jpeg,gif,svg,webp}', // 忽略图片文件
    '**/*.json', // 忽略 JSON 文件
    // 忽略ofetch文件夹下所有
    '**/ofetch/**/*.ts',
    // 忽略mocks文件夹下所有
    '**/mocks/**/*.ts',
  ],
  overrides: {
    jsonc: true,
    yaml: true,
    markdown: true,
  },
  rules: {
    'no-console': 'off',
    'style/brace-style': 'off',
  },
});
