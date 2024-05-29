module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    rules: {
        // 在这里添加自定义的 ESLint 规则
        semi: 0,
    },
}
   