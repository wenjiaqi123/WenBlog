# JS 基础

## 分号结尾

```javascript
console.log("HelloWorld");
```
可以省略


## 注释

```javascript
// 单行注释

/*
 多行注释
*/
```



## 其他

- 一个 html 引入多个 js 文件，一个 js 文件报错，不会影响到其他 js 文件
- alert("HelloWorld"); 弹出框
- console.log("HelloWorld");  控制台打印
- document.write("HelloWorld"); 输出到网页



## 变量

```javascript
var a = 1;
```

- 使用 var 来申明

- 变量需要先申明，再使用，可以不赋值 undefined。

- ```javascript
    function f(){
        var a = 1;
        b = 2;
    }
    
    f();
    console.log(b);
    console.log(a)
    // var 声明的 a 是局部变量
    // 不加 b 是全局变量 
    ```

    



## 命名规则

- 以 $ _ a 开头，可以使用 $ _ a 1
- 不可以使用保留字和关键字

### 关键字

![image-20210803214717537](https://attach.blog.wen7.online/20210803214717.png)

### 保留字

![image-20210803214745491](https://attach.blog.wen7.online/20210803214745.png)







































