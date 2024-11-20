# HTML列表

## 有序列表

### 标签

```html
<ol>
    <li>我是第 1 名</li>
    <li>我是第 2 名</li>
    <li>我是第 3 名</li>
    <li>我是第 4 名</li>
    <li>我是第 5 名</li>
</ol>
```

### 效果

![image-20210730142337453](https://attach.blog.wen7.online/image-20210730142337453.png)

### 知识点

- ol 是 ordered list 的缩写

- 属性 type 可以选择哪种标号
    - 1  （默认）
    - A
    - a
    - I
    - i
    
- 属性 start 选择从哪个数值开始

    

## 无序列表

### 标签

```html
<ul>
    <li>北京</li>
    <li>上海</li>
    <li>广州</li>
    <li>深圳</li>
</ul>
```

### 效果

![image-20210730143046047](https://attach.blog.wen7.online/image-20210730143046047.png)

### 知识点

- ul 是 unordered list 缩写

- 属性 type 可以选择哪种样式
    - disc  实心小圆点（默认）
    - circle 空心小圆点
    - square  实心小方块
    
- 企业中使用无序列表更多一点

    - ```css
        ul li{
            
        }
        ```

        