# HTML基础标签

## 标题

### 标签

```html
<h1> </h1>
<h2> </h2>
<h3> </h3>
<h4> </h4>
<h5> </h5>
<h6> </h6>
```

### 效果

![image-20210730131147464](https://attach.blog.wen7.online/image-20210730131147464.png)

### 知识点

- 标签只有 h1- h6，依次减小
- 加粗
- 换行，段落标签



## 注释 *

### 标签

```html
<!--我是注释-->
```

### 效果

![image-20210730134819738](https://attach.blog.wen7.online/image-20210730134819738.png)

### 知识点

- IDEA 快捷键，Ctrl + /
- 转义字符
- 文字在 body 里换行，但是在页面上是不会换行的



## 换行符

### 标签

```html
<br>
<br/>
```

### 效果

![image-20210730135210169](https://attach.blog.wen7.online/image-20210730135210169.png)

### 知识点

- 是个单标签

    

## 水平线

### 标签

```html
<hr>
<hr/>
```

### 效果

![image-20210730135354056](https://attach.blog.wen7.online/image-20210730135354056.png)

### 知识点

- 是个单标签



## 字体标签

### 标签

```html
<b>加粗</b>
<strong>加粗</strong>

<i>斜体</i>
<em>斜体</em>

<del>删除线</del>

<u>下划线</u>
```

### 效果

![image-20210730135852378](https://attach.blog.wen7.online/image-20210730135852378.png)

### 知识点

写两遍玩玩，知道有这东西即可，这些样式都可以通过 CSS 实现，自由度更高



## 格式化

### 标签

```html
<sub> </sub>	下标
<sup> </sup>	上标
```

### 效果

![image-20210730144619743](https://attach.blog.wen7.online/image-20210730144619743.png)



## 段落标签

### 标签

```html
<p> <p>
<pre> <pre>
```

### 效果

![image-20210730141504286](https://attach.blog.wen7.online/image-20210730141504286.png)

### 知识点

- p 和 pre 都是段落标签

- p 标签内部当成一个段落，
- pre 标签会原样显示



## 转义符号

### 标签

| 符号 | 符号名称 |     实体名称      |      |
| :--: | :------: | :---------------: | :--: |
|      |   空格   |      \&nbsp;      | 常用 |
|  <   |  小于号  |       \&lt;       | 常用 |
|  >   |  大于号  |       \&gt;       | 常用 |
|  &   |   和号   |      \&amp;       |      |
|  "   |   引号   |      \&quot;      |      |
|  '   |   撇号   | &apos; (IE不支持) |      |
|  ￠  |    分    |      \&cent;      |      |
|  ￡  |    镑    |     \&pound;      |      |
|  ￥  |   日元   |      \&yen;       |      |
|  €   |   欧元   |      \&euro;      |      |
|  §   |   小节   |      \&sect;      |      |
|  ©   |   版权   |      \&copy;      |  ©   |
|  ®   | 注册商标 |      \&reg;       |      |
|  ™   |   商标   |     \&trade;      |      |

### 效果

![image-20210730140805896](https://attach.blog.wen7.online/image-20210730140805896.png)

### 知识点

- \&lt;        less then 的缩写
- \&gt;       great then 的缩写



## 标签分类

- 行级标签：不换行	
    - \<span>   \</span>

- 块级标签/段落标签：换行
    - \<div>   \</div>