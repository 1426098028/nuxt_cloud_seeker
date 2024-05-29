module.exports = {
    semi: false,
    tabWidth: 2,
    //     htmlWhitespaceSensitivity有以下几个可选值：
    // "ignore"：忽略HTML中的空白，这是Prettier的默认行为。
    // "css"：遵循CSS的空白敏感性，这意味着在某些情况下，Prettier可能会删除多余的空白。
    // "strict"：严格保持HTML中的空白，包括换行。
    htmlWhitespaceSensitivity: "strict",
    useTabs: false,
    /*打印宽度，超过后，会将属性换行*/
    printWidth: 120,
    /*禁止使用尾随逗号,对象和数组最后一个逗号去掉*/
    trailingComma: "none",
    /*在对象字面量中的括号之间添加空格*/
    bracketSpacing: true,
    /*使用单引号而不是双引号来定义字符串*/
    singleQuote: true,
    /*当箭头函数只有一个参数时，省略参数前后的括号*/
    arrowParens: "avoid",
    /*script和style标签中间的内容缩进*/
    vueIndentScriptAndStyle: true,
    // 将>多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素
    bracketSameLine: false
}
   