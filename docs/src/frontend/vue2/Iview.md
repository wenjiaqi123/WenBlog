# iView

原名 iView 现在叫 View UI，基于 Vue.js 开源 UI 组件库

[iView 官网](https://www.iviewui.com/)

同类产品 [ElementUI 官网](https://element.eleme.cn/#/zh-CN) ：饿了么出品



## 安装

```js
npm install view-design --save
```

main.js 配置

```js
import Vue from 'vue';

//引入 ViewUI
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

//注册成为插件
Vue.use(ViewUI);

new Vue({
    el: '#app',
    render: h => h(App)
});
```



## 使用

[树形控件](https://www.iviewui.com/components/pro/tree-select)

[抽屉](https://www.iviewui.com/components/drawer)

