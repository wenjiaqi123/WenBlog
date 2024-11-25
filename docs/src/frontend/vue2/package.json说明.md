# package.json说明

[官网文档](https://webpack.docschina.org/concepts/)

示例文档

```json
{
  "name": "demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    "view-design": "^4.6.1",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "less": "^3.0.4",
    "less-loader": "^5.0.0",
    "vue-template-compiler": "^2.6.11"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
```



## name

项目名称



## version

版本号



## private

是否私有



## scripts

```json
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
}
```

- 取一个别名
- npm run serve 能够启动项目，实际上就是执行后面的指令
- npm run build 能够将项目打包，打包后会生成一个 dist 文件夹



## dependencies

```json
"dependencies": {
    "core-js": "^3.6.5",
    "view-design": "^4.6.1",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0"
}
```

- 项目上线需要用到的第三方依赖



## devDependencies

```json
"devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "less": "^3.0.4",
    "less-loader": "^5.0.0",
    "vue-template-compiler": "^2.6.11"
}
```

- 开发环境需要用到的第三方依赖

