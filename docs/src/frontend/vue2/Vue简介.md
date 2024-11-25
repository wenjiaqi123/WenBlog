# Vue简介

[百度百科-Vue](https://baike.baidu.com/item/Vue.js/19884851?fr=aladdin)

[官网-Vue](https://cn.vuejs.org/)

[菜鸟教程-Vue](https://www.runoob.com/vue2/vue-tutorial.html)



## 简介

Vue (读音 /vjuː/，类似于 view) 是一套用于==构建用户界面==的==渐进式==的 JavaScript 框架。

[尤雨溪](https://baike.baidu.com/item/%E5%B0%A4%E9%9B%A8%E6%BA%AA/2281470)



## 版本

1.x 废弃

2.x 目前主流

3.x 推广阶段

```markdown
因为很多公司是2.x 版本的系统，所以先学 2.x，然后再学 3.x
2.x 中的【绝大部分】 API和特性在 3.x 中同样支持,3.x 新增了部分功能,废弃了部分功能
新增：
	组合API
	多根节点组件 
	TypeScript
	...
废弃:
	过滤器
	$on,$off,$once 等实例方法
	...
```

[Vue2 迁移 Vue3 官方迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)

## 相关

[Vue](https://baike.baidu.com/item/Vue.js/19884851?fr=aladdin)

[React](https://baike.baidu.com/item/react/18077599?fr=aladdin)

[Angular](https://baike.baidu.com/item/AngularJS/7140293?fr=aladdin)

```markdown

```



## 特点

- ==渐进式==
	- 有点类似于 Spring，Vue只提供最核心的 ==数据驱动视图== 和 ==双向数据绑定==
	- 如果你想使用有关路由的功能，可以接入 vue-router
	- 如果你想使用有关存储的功能，可以接入 vuex
	- 如果你想使用有关网络通信的功能，可以接入 ~~vue-resource~~（2.0以后被废弃，使用axios）
	- vue-router、vuex 等都是围绕 vue 开发的组件库，想用一个什么功能就加一个组件库
- 易用
	- 熟悉 HTML，CSS，JavaScript 即可使用 Vue
- 灵活
	- 不断繁荣的生态系统，可以在一个库和一套完整框架之间自如伸缩
- 高效
	- 超快的虚拟 DOM，20KB的大小
- 单页面应用
    - 一个 Web 网站只有一个 HTML 页面



## 数据驱动视图

![image-20210808021625831](https://attach.blog.wen7.online/20210808021632.png)

当数据变化的时候，页面会自动渲染，数据驱动视图是==单向数据绑定==

![image-20210808023407217](https://attach.blog.wen7.online/20210808023407.png)





## 双向数据绑定

![image-20210808022058762](https://attach.blog.wen7.online/20210808022058.png)

当页面上的值变化，Vue自动同步数据，



## MVVM

M：Model	对象，当前页面所需要的对象

V：View	视图，当前页面 DOM 结构

VM：ViewModel	vue实例，连接视图和对象
