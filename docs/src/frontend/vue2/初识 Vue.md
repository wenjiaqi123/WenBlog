# 初识 Vue [官网](https://cn.vuejs.org/v2/guide/index.html#%E8%B5%B7%E6%AD%A5)

## \<script> 引入 vue

[文档](https://v2.cn.vuejs.org/v2/guide/installation.html#%E7%9B%B4%E6%8E%A5%E7%94%A8-lt-script-gt-%E5%BC%95%E5%85%A5)

- 开发版本
	- 包含完整的警告和调试模式
- 生产版本
	- 删除了警告，33.46KB min+gzip

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>test</title>

        <!-- 引入 vue.js -->
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    </head>
    <body>

    </body>
</html>
```

- 因为这是学习阶段，所以使用 \<script> 引入，实际开发使用 npm 或者 yarn 等包管理工具安装



## 创建 Vue 实例

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>test</title>

        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    </head>
    <body>

        <!--声明要被 vue 控制的区域-->
        <div id="vue-app">
            {{name}}
        </div>
    </body>

    <script type="text/javascript">
        //实例化 vue 对象,内部传入一个对象
        var vue = new Vue({
            
            //el  element缩写, 是固定属性,#vue-app 是css选择器,表示 html 中 id="vue-app" 的元素
            el: "#vue-app",
            
            //存储数据,data里的数据可以使用双花括号 {{}} 在 html 中展示
            data: {
                name: "闻老C"
            }

        });
    </script>
</html>
```



查看页面，发现页面上展示了 name 的值

在控制台修改 name 的值，这里的 vue.name 是因为 var vue = new Vue() 这里的变量名为 vue

再次查看页面上的值

**或者使用 Vue-Devtools 插件**



![image-20210808032321364](https://attach.blog.wen7.online/20210808032321.png)



## 贴图

![image-20210808032752463](https://attach.blog.wen7.online/20210808032752.png)
