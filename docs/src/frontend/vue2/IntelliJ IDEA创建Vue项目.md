# IntelliJ IDEA创建Vue项目

## 步骤一：安装 vue 插件

![image-20210809165707303](https://attach.blog.wen7.online/image-20210809165707303.png)



## 步骤二：创建项目

### 创建项目

![image-20210809165955903](https://attach.blog.wen7.online/image-20210809165955903.png)

### 选择 Vue.js 项目

![image-20210809170038405](https://attach.blog.wen7.online/image-20210809170038405.png)

### 设置项目属性

- @vue/cli 选择自己本地的 @vue/cli
- 不要勾选 eslint

![image-20210809173606186](https://attach.blog.wen7.online/image-20210809173606186.png)

### 选择预设

- Default ([Vue 2] babel, eslint)
    - 创建 Vue2 的项目，创建 babel（ES6语法解析成ES5语法工具），eslint（代码格式检查工具）
- Default ([Vue 3] babel, eslint)
    - 创建 Vue3 的项目
- ==Manually select features==
    - 手动选择要素

![image-20210809171304980](https://attach.blog.wen7.online/image-20210809171304980.png)

### 检查项目所需的功能

- 上下箭头选择，空格勾选/取消，如果使用哪一个就在前面勾选，有 * 号表示勾选

- ```livecodeserver
     (*) Choose Vue version					//	版本选择
     (*) Babel                              //  代码编译
     ( ) TypeScript                         //  ts
     ( ) Progressive Web App (PWA) Support  //  支持渐进式网页应用程序
     (*) Router                             //  vue路由
     (*) Vuex                               //  状态管理模式
     (*) CSS Pre-processors                 //  css预处理
     ( ) Linter / Formatter                 //  代码风格、格式校验
     ( ) Unit Testing                       //  单元测试
     ( ) E2E Testing                        //  端对端测试
    ```

- 接下来的步骤会根据你勾选的来提示，如果你只勾选了2个，那就只有2个询问，

![image-20210809173751351](https://attach.blog.wen7.online/image-20210809173751351.png)

### 选择 Vue版本

![image-20210809171712212](https://attach.blog.wen7.online/image-20210809171712212.png)

### 路由是否使用历史模式

![image-20210809171959759](https://attach.blog.wen7.online/image-20210809171959759.png)

### 选择CSS预处理器

- 根据项目选择一个

![image-20210809174037102](https://attach.blog.wen7.online/image-20210809174037102.png)

### 选择格式检查

- ```awk
    ESLint with error prevention only     //  只进行报错提醒
    ESLint + Airbnb config                //  不严谨模式
    ESLint + Standard config              //  正常模式
    ESLint + Prettier                     //  严格模式
    TSLint (deprecated)                   //  TypeScript格式验证工具
    ```

![image-20210809172337931](https://attach.blog.wen7.online/image-20210809172337931.png)

### 选择校验时机

- ```vim
     ( ) Lint on save               // 保存时检测
     ( ) Lint and fix on commit     // 修复和提交时检测
    ```

![image-20210809172637225](https://attach.blog.wen7.online/image-20210809172637225.png)

### Babel，ESlint 放置位置

![image-20210809172826913](https://attach.blog.wen7.online/image-20210809172826913.png)

### 是否预设

- 是否将这一套配置作为你的一个预设模板
    - 如果选择 y，下一个提示让你给模板输入一个名称，以后再创建项目，就可以使用这一套模板
    - 如果选择 n，就不会作为模板

![image-20210809172922625](https://attach.blog.wen7.online/image-20210809172922625.png)

预设并取名为 myvue

![image-20210809213915033](https://attach.blog.wen7.online/20210809213915.png)



### 启动访问

- 默认端口 8080，如果 8080 被占用了，会自动端口号+1

https://localhost:8080

![image-20210809174458120](https://attach.blog.wen7.online/image-20210809174458120.png)

