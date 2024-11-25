# Vue目录说明

![image-20210809215214371](https://attach.blog.wen7.online/20210809215214.png)



## node_modules

保存第三方包



## public

### favicon.ico

网站图标

### index.html

网站入口，vue是单页应用，就是这个 index.html



## src

保存源代码目录，我们正常也就在这里开发

### assets

图标，等静态资源

### components

组件

### router

存放路由文件

### store

存放vuex文件

### views

存放写好的页面

### App.vue

项目的根组件

### main.js

项目路口文件，项目运行从 main.js 开始



## .gitignore

git提交忽略



## babel.config.js

babel 配置文件，主要功能是将ES6转成ES5



## package.json

项目的配置文件



## package-lock.json

npm install的时候生成一份文件，用来记录当前状态下各个 npm 包的具体来源和版本号
