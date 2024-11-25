# HTML a标签

## 超链接 *

### 标签

```html
<a href="">刷新页面</a>
<a href="#">跳转页头</a>
<a href="https://www.baidu.com" target="_self">百度</a>
```

### 效果

![image-20210730144034379](https://attach.blog.wen7.online/image-20210730144034379.png)

### 知识点

- 点击之前是蓝色的，点击过后紫色的

- herf 填写的是新页面的 URL
    - 如果什么都不写，刷新页面
    - 如果只写一个 #，跳转页面开头
- target 选择哪里打开新页面
    - _self  在本页打开（默认）
    - _blank 在新的标签页打开
    - _parent
    - _search
    - _top



## 锚点 *

```html
快捷生成	div#${我是第 $ 行}*300
```

### 标签

```html
<a href="#300">跳转</a>
```

### 效果

节省篇幅

```html
<a href="#300">跳转末尾</a>			【跳转】

<div id="1">我是第 1 行</div>
...
<div id="99">我是第 99 行</div>

<a href="#1">跳转第 1 行</a>		【跳转】

<div id="100">我是第 100 行</div>
....
<div id="199">我是第 199 行</div>

<a href="#100">跳转第 100 行</a>	【跳转】

<div id="200">我是第 200 行</div>
...
<div id="300">我是第 300 行</div>

<a href="#1">跳转最上方</a>			【跳转】
```



## 扩展

### 标签

```html
<a href="tel:152****2665">打电话</a>

<a href="sms:152****2665">发短信</a>

<a href="mailto:939***949@qq.com">发邮件</a>

<a href="geopoint:116.281469,39.866035">我的位置</a>
```

### 效果

![image-20210730151037530](https://attach.blog.wen7.online/image-20210730151037530.png)

### 知识点

- 网页可能实现不了，可以将代码 index.html 发送到微信或者QQ，使用手机上的浏览器打开
- 注意替换 herf 后面的手机号，邮箱



## 协议限定符

### 标签

```html
<a href="">刷新页面</a>
<a href="#">跳转页头</a>
<a href="javascript:alert('Hello')">执行 js 代码</a>
```

### 知识点

- 不写刷新页面
- 只写 # ，跳转页头

- 一般不会在这里写 js 代码



## 工作实践

```html
<!-- 对网站全局设定，跳转链接都是打开新页面 -->
<head>
    <base target="_blank">
</head>
```

```css
// a 标签一般会将下划线去掉
display: inline-block
text-decoration: none
```

