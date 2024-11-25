# NodeJS

## 初识

什么是 NodeJS？

- Node.js 是一个让 JavaScript 运行在服务端的开发平台
- Window是不能直接运行 Java 程序的，如果想运行 Java 程序就必须要有一个 JVM，同样，Window 也是不能运行 JavaScript 的，如果想运行 JavaScript 程序需要一个平台 NodeJS
- 为什么 JavaScript 能够运行在 Chrome 浏览器，因为 Chrome 浏览器内置了一个 JS 运行平台 V8 引擎

> [百度百科 - Node.js](https://baike.baidu.com/item/node.js/7567977?fr=aladdin)
>
> [Node.js 中文网](http://nodejs.cn/)
>
> [Node.js 官网](http://nodejs.cn/)
>
> [菜鸟教程 - Node.js](https://www.runoob.com/nodejs/nodejs-tutorial.html)



### 安装

下载地址：[NodeJS 官网](https://nodejs.org/en/)

下载 LTS 长期支持版本

简单的下一步，下一步即可

可以选择其他文件夹安装，建议不要安装在系统盘 C 盘

![image-20220526143021065](https://attach.blog.wen7.online/202312211511094.png)



- 查看版本

  - ```shell
    node -v			#查看版本
    node --version	
    ```

    ![image-20220526143452179](https://attach.blog.wen7.online/202312211511337.png)

### HelloWorld

1. 新建一个文本文档，并改名为 hello.js

   1. ```js
      console.log("HelloWorld");
      
      var a = 1;
      var b = 2;
      console.log("a+b的值为: " + (a+b));
      ```

2. 运行

   1. ```js
      node hello.js
      ```

      ![image-20220526144204434](https://attach.blog.wen7.online/202312211513892.png)

NodeJS 类似于 Java 的 JDK，让 js 代码可以脱离浏览器工作，js 代码独立运行，拥有后台能力

在 Java 中，我们得先编写一个 HelloWorld.java ，经过 `javac HelloWorld.java` 编译生成 HelloWorld.class，然后使用 `java HelloWorld` 来运行 .class 文件，只不过 JavaScript 是解释型的，不需要编译，直接 `node hello.js` 即可



## 模块化

![image-20220526145659296](https://attach.blog.wen7.online/202312211514200.png)























































