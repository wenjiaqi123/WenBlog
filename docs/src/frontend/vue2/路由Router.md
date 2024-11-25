# 路由 Router

## 简介

[Vue Router 官网 ](https://router.vuejs.org/zh/)

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌

功能：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为



## 路由工作模式

1. 页面元素被点击，地址栏 URL 发生了 Hash 变化
2. 路由对象监听到地址变化，window.onhashchange 事件，window.location.hash
3. 路由对象将对应的组件渲染到浏览器中



## 路由创建

![image-20210906103214167](https://attach.blog.wen7.online/image-20210906103214167.png)

### 创建 router/index.js 文件

```js
//引入 Vue 和 VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'

//注册为插件
Vue.use(VueRouter)


import Home from '../views/Home.vue'

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/about', name: 'About', component: () => import('../views/About.vue')}
]

//创建 VueRouter 对象
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//默认导出
export default router
```

### main.js 引入 router

```js
import Vue from 'vue'
import App from './App.vue'

//引入 ./router 目录下 index.js 文件,因为名称为 index.js 可以省略
import router from './router'

new Vue({
    //属性 router:router 因为名称和值相同,简写 router
    router,
    render: h => h(App)
}).$mount('#app')
```





## 原理

### TestA.vue   TestB.vue  TestC.vue

```vue
<template>
  <div class="test-a">
    <div>test-a</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
</style>
```

### App.vue

```vue
<template>
  <div id="app">

    <a href="#a">点我去a</a>
    <a href="#b">点我去b</a>
    <a href="#c">点我去c</a>

    <component :is="currentComponent"></component>

  </div>
</template>

<script>
import TestA from "@/components/TestA"
import TestB from "@/components/TestB"
import TestC from "@/components/TestC"

export default {
  components: {
    TestA, TestB, TestC
  },
  data() {
    return {
      currentComponent: "TestA"
    }
  },
  methods: {},
  // 组件创建时调用
  created() {
    //监听hash变化
    window.onhashchange = () => {
      //获取 Hash 值  
      let hash = window.location.hash;
      console.log(hash);

      if (hash == "#a") {
        this.currentComponent = "TestA"
      } else if (hash == "#b") {
        this.currentComponent = "TestB"
      } else if (hash == "#c") {
        this.currentComponent = "TestC"
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
```



## 初识

### router/index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入组件
import TestA from "@/components/TestA"
import TestB from "@/components/TestB"
import TestC from "@/components/TestC"

const routes = [
  //路由规则  
  {path: '/a', name: 'TestA', component: TestA},
  {path: '/b', name: 'TestB', component: TestB},
  {path: '/c', name: 'TestC', component: TestC},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

### App.vue

```vue
<template>
  <div id="app">

    <!-- F12审查元素,解析成a标签  -->
    <router-link to="/a">点我去a</router-link>
    <router-link to="/b">点我去b</router-link>
    <router-link to="/c">点我去c</router-link>

    <!--  占位,相当于 <componnet :is="currentComponent"> </componnet> -->
    <router-view></router-view>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>
```

