# nodejs webpack npm vue-cli

[网络好文](https://zhuanlan.zhihu.com/p/163267718)



## vue





## [vue-cli](https://cli.vuejs.org/zh/)   →  	@vue/cli

- 创建 vue 项目工具
- 快速创建 vue 项目基本结构
- 以前是 vue-cli ,新版本 @vue/cli

我们创建 vue 项目，里面可能有很多文件，如果每次都是手动创建会很麻烦，所以使用脚手架 vue-cli 来快速创建 vue 项目所需要的基本目录结构

```c
npm install -g @vue/cli
```



## webpack

- 打包工具

我们写好的 vue 项目里可能有很多高级语法 ES 6，到浏览器里解析不了（浏览器只支持ES5），所以需要进行 babel 降级等，

我们写的 vue 项目里有很多 img，css，html，这些都不是 js 文件，webpack打包的时候会将这些内容都解析成 js 文件



## nodejs

- js 运行环境

 window 上不能直接运行 java，但是安装了 jdk 就能运行 java 程序了

window 上不能直接运行 javascript，但是安装了 nodejs 就可以运行 js 代码了，js 就可以当服务器语言来书写

因为用到 webpack 打包，但是 webpack 是基于 nodejs 的环境，所以需要安装 nodejs



## npm

- 包管理工具
- nodejs 环境安装好自带 npm

因为前端的项目可能用到很多第三方包，npm 用来管理这些包

```c
npm install -g webpack		//安装 webpack 包
npm install -g vue			//安装 vue 包
npm install -g vue-cli		//安装 vue-cli 包
npm install -g axios		//安装 axios 包
```

