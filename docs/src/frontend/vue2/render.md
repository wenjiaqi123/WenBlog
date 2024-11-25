# 渲染函数 render [官网](https://cn.vuejs.org/v2/guide/render-function.html)

## 基础用法

```vue
<script>
export default {
  /**
   * render 函数域钩子函数同级别
   * @param createElement	名称任意,通过该函数创建虚拟节点
   * @param context			其他参数,可选
   * @returns {VNode}		返回虚拟节点
   */
  render(createElement, context) {
    return createElement("div", {class: 'test-container'}, 'Hello World');
  }
}
</script>
```

- createElement 函数有 3 个参数

    - 第一个参数必须，传入的可以是字符串的 html 元素标签

        - 本例中传入的是 div，相当于在页面创建了一个 `<div> </div>`

    - 第二个参数可选，传入的是该标签的属性

        - 本例中传入的是 `{class: 'test-container'}` 相当于在刚才的 div 上加上属性 `<div class="test-container"> </div>`

    - 第三个参数可选，传入的是该标签的内容

        - 本例传入的是 `'Hello World'`，相当于是在 div 里面加了一句话

        - ```html
            <div class="test-container">
                Hello World
            </div>
            ```

- render 函数代替了 template 的作用

![image-20210910152851300](https://attach.blog.wen7.online/image-20210910152851300.png)



## 可以嵌套

![image-20210910153945316](https://attach.blog.wen7.online/image-20210910153945316.png)

- render 函数的第三个参数是可以传入数组的，本例中传入了 3 个，相当于是在 div 里面创建了 3 个 标签

    - ```html
        <div class="test-container">
            <div class="d">内容</div>
        
            <span class="s">文字</span>
        
            <p class="p">可以嵌套</p>
        </div>
        ```
        
    - 注意下面的 style，设置的属性也都能应用到这些节点上

​        

## main.js

```js
new Vue({
    render: h => h(App)
}).$mount('#app')
```

- ```js
    // 将 render 函数赋值给属性 render
    render:render(createElement){
        return createElement();
    }
    ```

- ```js
    // 形参名称随便变化,可以叫 createElement，也可以叫 h
    render:render(h){
        return h();
    }
    ```

- ```js
    // 函数的简写,箭头函数
    render:(h)=>{
    	return h();
    }
    ```

- ```js
    // 参数只有1个,胜率括号，函数体只有一句话,可以省略括号和 return
    render:h => h();
    ```

    
