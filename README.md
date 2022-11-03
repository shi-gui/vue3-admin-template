# vue3-framework 企业级项目搭建

## 一、项目初始化

我们采用 vite + vue3 + ts 来作为模板

```js
npm init vite@latest my-vue-app -- --template vue-ts
```
![配置图](./public//img/vite.png)

---

## 二、Eslint + Prettier 规范你的代码

#### 1、安装 eslint 并初始化

```js
npm i eslint -D
npx eslint --init
```
![eslint](./public/img/eslint.png)

依赖安装完成后，会生成.eslintrc.js 配置文件

rules 规则可自行配置，此处配置开发常用的一些规则，至于这些规则的出处，可以去源码中查看或者去官网查看（node_modules 中.md 文件啥都有）
* [eslint规则](https://www.runoob.com)
* [@typescript-eslint/recommended规则](https://typescript-eslint.io/rules/)
* [vue/vue3-essential规则](https://eslint.vuejs.org/rules/)
```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    eqeqeq: 'warn', // 全等
    'no-unused-vars': 'off', // 禁止出现未使用过的变量
    '@typescript-eslint/no-unused-vars': 'off', // 禁止未使用的变量
    'space-before-function-paren': 'off', // 强制在 function的左括号之前使用一致的空格
    'no-empty-function': 'off', // 禁止出现空函数
    '@typescript-eslint/no-empty-function': 'off', // 禁止空函数
    'no-undef': 'off', // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    '@typescript-eslint/no-explicit-any': 'off', // 禁止any类型
    indent: 'off', // 强制使用一致的缩进
    '@typescript-eslint/no-var-requires': 'off', // 禁止require除导入语句外的语句
    '@typescript-eslint/ban-ts-comment': 'off', // 禁止@ts-<directive>评论或要求指令后的描述
    camelcase: 'off', // 强制使用骆驼拼写法命名约定
    'no-empty': 'off', // 禁止出现空语句块
    'no-new': 'off', // 禁止使用 new 以避免产生副作用
    '@typescript-eslint/no-non-null-assertion': 'off', // !使用后缀运算符禁止非空断言
    '@typescript-eslint/no-empty-interface': 'off', // 禁止声明空接口
    '@typescript-eslint/no-this-alias': 'off', // 禁止混叠this
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off', // 在可选链表达式之后禁止非空断言
    'no-useless-constructor': 'off', // 用不必要的构造函数
    'no-extra-semi': 'off', // 禁止不必要的分号
    '@typescript-eslint/no-extra-semi': 'off', // 禁止不必要的分号
    'vue/multi-word-component-names': 'off', // vue组件命名
    'no-debugger': 'off' // 禁用 debugger
  }
};
```

在 package.json 文件中的 script 中添加 lint 命令

```js
{
  "scripts": {
    // eslint . 为指定lint当前项目中的文件
    // --ext 为指定lint哪些后缀的文件
    // --fix 开启自动修复
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"
  }
}
```

执行 lint 命令

```js
npm lint
```

![eslint](./public/img/eslint_parse_error.png)

.vue 后缀的文件时候出现解析错误 parsing error；eslint 默认是不会解析.vue 后缀文件的，需要一个额外的解析器来解析.vue 后缀文件。<br>

**_原因：_**<br>

在.eslintrc.js 文件中的 extends 会发现已经有继承"plugin:vue/vue3-essential"的配置。然后在 node_modules 中可以找到 eslint-plugin-vue/lib/cinfigs/essential，里面配置了 extends 是继承于同级目录下的 base.js，在里面会发现 parser: require.resolve('vue-eslint-parser')这个配置，按道理来说应该是会解析.vue 后缀文件的。<br>

然后.eslintrc.js 文件中的 extends 会发现，extends 中还有一个"plugin:@typescript-eslint/recommended"，它是来自于/node_modules/@typescript-eslint/eslint-plugin/dist/configs/recommended.js，查看该文件会发现最终继承于同级目录下的 base.js 文件。从该文件中可以发现 parser: '@typescript-eslint/parser',配置。<br>

最终导致报错的原因就是@typescript-eslint/parser 把 vue-eslint-parser 覆盖了。
查看 eslint-plugin-vue 官方文档可知。如果已经使用了另外的解析器（例如"parser": "@typescript-eslint/parser"），则需要将其移至 parseOptions，这样才不会与 vue-eslint-parser 冲突。<br>

修改.eslintrc.js 文件

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    ...
  }
};
```

外面的 parser 用来解析.vue 后缀文件，使得 eslint 能解析 template 标签中的内容，而 parserOptions 中的 parser，即@typescript-eslint/parser 用来解析 vue 文件中 script>
标签中的代码。

此时，再执行 npm lint，就会发现校验通过了。

#### 2、配置 prettier

```js
npm i prettier -D
```
* [prettier规则选项](https://www.prettier.cn/docs/options.html)

在根目录下新建.prettierrc.js，并配置一些规则

```js
module.exports = {
  tabWidth: 2, // 一个tab代表几个空格数
  semi: true, // 行位是否使用分号，默认为true
  singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
  printWidth: 80, // 一行的字符数，如果超过会进行换行，默认为80
  trailingComma: 'none', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  arrowParens: 'avoid', // 箭头函数单个参数的情况是否省略括号
  htmlWhitespaceSensitivity: 'ignore' // html中的空格敏感性
};
```

在 package.json 中的 script 中添加以下命令

```js
{
    "scripts": {
        "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    }
}
```

#### 3、解决 eslint 与 prettier 的冲突

社区已经为我们提供了一个非常成熟的方案，即 eslint-config-prettier + eslint-plugin-prettier。

- eslint-plugin-prettier： 基于 prettier 代码风格的 eslint 规则，即 eslint 使用 pretter 规则来格式化代码。
- eslint-config-prettier： 禁用所有与格式相关的 eslint 规则，解决 prettier 与 eslint 规则冲突，确保将其放在 extends 队列最后，这样它将覆盖其他配置

```js
npm i eslint-config-prettier eslint-plugin-prettier -D
```

在 .eslintrc.json 中 extends 的最后添加一个配置

```js
{
    extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    // 新增，必须放在最后面
    'plugin:prettier/recommended'
  ],
}
```

最后重启 vscode，你会发现冲突消失了，eslint 与 prettier 也按照我们预想的各司其职了，在运行时也能看到 ❌ 了。
