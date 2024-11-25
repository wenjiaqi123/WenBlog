Flex 布局
===

简介
---

### 适用范围

**任何一种元素都可以指定为 flex 布局**

- ```css
    span{
        display:flex;			/* 将行级元素指定成 flex 元素*/
    }
    ```

    <img src="https://attach.blog.wen7.online/202212151458416.png" style="zoom: 80%;" />

- ```css
    div{
        display:inline-flex;	/* 将块级元素指定成 inline-flex 元素*/
    }
    ```

    <img src="https://attach.blog.wen7.online/202212151459304.png" alt="image-20221215145924255" style="zoom:80%;" />

- ```css
    div{
        display:-webkit-flex;		/*webkit内核的浏览器必须加上 -webkit 前缀*/
        display:flex;
    }
    ```



### 术语

容器（container）：【父元素、父盒子】采用 flex 布局的元素叫做容器

项目（items）：【子元素、子盒子】在 flex 布局内部的子元素叫做项目

主轴（main axis）：【横轴，水平轴】默认水平方向，从左向右，默认按照主轴的方向排列

交叉轴（cross axis）：【竖轴，垂直方向】默认垂直方向，从上向下

主轴开始方向（main start）：

主轴结束方向（main end）：

纵轴开始方向（cross start）：

纵轴结束方向（cross end）：

单个项目占据主轴空间（main size）：

单个项目占据纵轴空间（cross size）：

![image-20221215153554942](https://attach.blog.wen7.online/202212151535024.png)

准备工作
---

```css
div.container>div.item{我是元素$}*5  + Tab 键
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>demo</title>

    <style>

        * {
            margin: 0px;
            padding: 0px;
        }

        .container {
            width: 100%;
            height: 100vh;
            background-color: #CCFFE6;
        }
        .item {
            border: 1px solid #000000;
            width: 150px;
            height: 100px;
            background-color: #CCE5FF;
            text-align: center;
            line-height: 100px;
            font-weight: bold;
            color: #F00;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="item">我是元素1</div>
        <div class="item">我是元素2</div>
        <div class="item">我是元素3</div>
        <div class="item">我是元素4</div>
        <div class="item">我是元素5</div>
    </div>

</body>
</html>
```

<img src="https://attach.blog.wen7.online/202212151553691.png" alt="image-20210908102153399" style="zoom: 67%;" />





容器属性
---

| 属性名称        | 属性值                                                       | 作用                                   |
| --------------- | ------------------------------------------------------------ | -------------------------------------- |
| display         | flex                                                         | 标识为 flex 布局                       |
| flex-direction  | row \| row-reverse \| column \| column-reverse               | 子元素排列方向                         |
| flex-wrap       | nowrap \| wrap \| wrap-reverse                               | 子元素多行排列策略                     |
| flex-flow       | <u>flex-direction</u>  <u>flex-wrap</u>;                     | flex-direction 和 flex-wrap 一起指定   |
|                 |                                                              |                                        |
| justify-content | flex-start \| flex-end \| center \| space-between \| space-around | 水平对齐方式                           |
| align-items     | stretch \| flex-start \| flex-end \| center                  | 垂直对齐方式                           |
| align-content   | stretch \| flex-start \| flex-end \| center \| space-between \| space-around | 多行对齐，需要开启 **flex-wrap:wrap;** |



### display

```css
/*开启弹性盒子模型*/
display:flex;
```

<img src="https://attach.blog.wen7.online/202212151555888.png" alt="image-20210908102220383" style="zoom: 67%;" />



### flex-direction

- 子项目 行排列方向

- ```css
    flex-direction: row | row-reverse | column | column-reverse
    ```

    - **row【默认】行排列**
        - row-reverse   行倒序排列

    - **column  列排列**
        - column-reverse  列倒序排列


#### row 默认

- ```css
    .container {
        display: flex;
        flex-direction: row;
    }
    ```

<img src="https://attach.blog.wen7.online/202212151556589.png" alt="image-20210908102329077" style="zoom: 80%;" />



#### row-reverse

- 倒序排序

- ```css
    .container {
        display: flex;
        flex-direction: row-reverse;
    }
    ```

<img src="https://attach.blog.wen7.online/202212151556570.png" alt="image-20210908102356149" style="zoom: 80%;" />



#### column

- 列排序

- ```css
    .container {
        display: flex;
        flex-direction: column;
    }
    ```

<img src="https://attach.blog.wen7.online/202212151556602.png" alt="image-20210908102631031" style="zoom: 80%;" />



#### column-reverse

- 列倒排

- ```css
    .container {
        display: flex;
        flex-direction: column-reverse;
    }
    ```

<img src="https://attach.blog.wen7.online/202212151556608.png" alt="image-20210908102710213" style="zoom: 80%;" />



### flex-wrap

- 子元素多行

- ```css
    flex-wrap: nowrap | wrap | wrap-reverse
    ```

    - **nowrap【默认】不切换行，挤在一行**

    - **wrap 换行**
        - wrap-reverse 换行倒排




#### nowrap 默认

- 默认，不切换行，挤在一起，width 宽度失效

- ```css
    .container {
        display: flex;
        flex-wrap: nowrap;
    }
    ```

    ![image-20210908103259863](https://attach.blog.wen7.online/202212151601576.png)



#### wrap

- 多行，宽度不够就挤到下一行

- ```css
    .container {
        display: flex;
        flex-wrap: wrap;
    }
    ```

<img src="https://attach.blog.wen7.online/202212151601592.png" alt="image-20210908103331779" style="zoom:80%;" />



#### wrap-reverse

- 多行，倒排

- ```css
    .container {
        display: flex;
        flex-wrap: wrap-reverse;
    }
    ```

    ![image-20210908103421663](https://attach.blog.wen7.online/202212151601587.png)



### flex-flow

- 两个值，第一个指定的是 flex-direction，第二个指定的是 flex-wrap

```css
flex-flow: flex-direction  flex-wrap;
```

```css
/*示例*/
.container{
    flex-flow: row wrap;
	flex-flow: column wrap-reverse;
}
```



### justify-content

- 水平对齐

- ```css
    justify-content: flex-start | flex-end | center | space-between | space-around
    ```

- 这里没有左右之分，只有开始结束的方向之分

    - 比如 row，其实是从左向右的，那么 start 就是左边，end 是右边
    - 比如 row-reverse ，行倒排，其实是从右向左的，那么 start 就是右边，end 就是左边

- flex-start 【默认】靠开始方向对齐

- flex-end  靠结束方向对齐

- center 靠中间对齐

- space-between  分散对齐，左右不留空

- space-around 分散对齐，左右留空



#### flex-start 默认

- 【默认】靠开始方向对齐

- ```css
    .container {
        display: flex;
        justify-content: flex-start;
    }
    ```

<img src="https://attach.blog.wen7.online/202212151604763.png" alt="image-20210908104228789" style="zoom: 80%;" />

<img src="https://attach.blog.wen7.online/202212151604857.png" alt="image-20210908104626645" style="zoom:80%;" />



#### flex-end

- 靠结束方向对齐

- ```css
    .container {
        display: flex;
        justify-content: flex-end;
    }
    ```

    <img src="https://attach.blog.wen7.online/202212151604772.png" alt="image-20210908104643696" style="zoom:80%;" />

    

#### center

- 靠中间对齐

- ```css
    .container {
        display: flex;
        justify-content: center;
    }
    ```

    <img src="https://attach.blog.wen7.online/202212151604807.png" alt="image-20210908104658180" style="zoom:80%;" />

    

#### space-between

- 分散对齐，左右不留空

- ```css
    .container {
        display: flex;
        justify-content: flex-start;
    }
    ```

    <img src="https://attach.blog.wen7.online/202212151604805.png" alt="image-20210908104714335" style="zoom:80%;" />

    

#### space-around

- 分散对齐，左右留空

- ```css
    .container {
        display: flex;
        justify-content: flex-start;
    }
    ```

    <img src="https://attach.blog.wen7.online/202212151604839.png" alt="image-20210908104805119"  />



### align-items

- 垂直对齐

- ```css
    align-items: stretch | flex-start | flex-end | center;
    ```

    - stretch 【默认值】填充（如果子盒子没有设置高度的话）

    - flex-start 靠开始的一边对齐

    - flex-end 靠结束的一边对齐

    - center 居中




#### stretch 默认

- 【默认值】填充（如果子盒子没有设置高度的话）如果子盒子设置了高度，那么就还是使用子元素的高度

- ```css
    .container {
        display: flex;
        align-items: stretch;
    }
    .item {
        /*height: 100px;*/
    }
    ```

<img src="https://attach.blog.wen7.online/202212151608727.png" alt="image-20210908105309212" style="zoom:50%;" />



#### flex-start

- 靠开始的一边对齐

- 如果子盒子设置了高度，使用子盒子高度，子盒子没有高度，会使用子盒子 line-height 文字行高，都没有设置，会压缩到只包含文字

- ```css
    .container {
        display: flex;
        align-items: flex-start;
    }
    .item {
        /*height: 100px;*/			【修改 height 为 200px 查看效果,注释掉 height 查看效果】
        /*line-height: 100px;*/		【注释掉 line-height 查看效果】
    }
    ```

    <img src="https://attach.blog.wen7.online/202212151608714.png" alt="image-20210908105553179" style="zoom:80%;" />

    

#### flex-end

- 靠结束的一边对齐

- ```css
    .container {
        display: flex;
        align-items: flex-end;
    }
    ```

<img src="https://attach.blog.wen7.online/202212151608718.png" alt="image-20210908105850824" style="zoom:80%;" />



#### center

- 居中

- ```css
    .container {
        display: flex;
        align-items: center;
    }
    ```

    <img src="https://attach.blog.wen7.online/202212151608725.png" alt="image-20210908105907854" style="zoom:80%;" />

    

### align-content

- 多行对齐，需要开启 `flex-wrap:wrap`

- ```css
    align-content: stretch | flex-start | flex-end | center | space-between | space-around;
    ```

    - stretch 【默认】

    - flex-start 靠开始的一边对齐

    - flex-end 靠结束的一边对齐

    - space-between 垂直方向，分散对齐，上下不留空

    - space-around 垂直方向，分散对齐，上下留空




#### stretch 默认

- 【默认】填充，按照行对高度切分，切分完之后再填充

- ```css
    .container {
        display: flex;
        flex-wrap: wrap;		【开启换行】
        align-content: stretch;
    }
    
    .item {
        /*height: 100px;*/		【释放注释，查看效果】
    }
    ```

    ![image-20210908110338024](https://attach.blog.wen7.online/202212151611816.png)

    ![image-20210908110433302](https://attach.blog.wen7.online/202212151611861.png)



#### flex-start 

- 靠开始的一边对齐

- ```css
    .container {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    ```

    <img src="https://attach.blog.wen7.online/202212151611855.png" alt="image-20210908110909097" style="zoom:67%;" />

    

#### flex-end

- 靠结束的一边对齐

- ```css
    .container {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-end;
    }
    ```

<img src="https://attach.blog.wen7.online/202212151611852.png" alt="image-20210908111006156" style="zoom:67%;" />



#### space-between 

- 垂直方向，分散对齐，上下不留空

- ```css
    .container {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
    }
    ```

![image-20210908111041974](https://attach.blog.wen7.online/202212151611849.png)



#### space-around 

- 垂直方向，分散对齐，上下留空

- ```css
    .container {
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
    }
    ```

![](https://attach.blog.wen7.online/202212151611845.png)





项目属性
---

| 属性名称    | 属性值                                                   | 作用                                              |
| ----------- | -------------------------------------------------------- | ------------------------------------------------- |
| order       | 数值                                                     | 指定顺序排序，默认都是 0 级，order 数值越高越往后 |
| flex-grow   | 数值                                                     | 子元素延伸比例（占用剩余空间比例）                |
| flex-shrink |                                                          | 子元素收缩率                                      |
| flex-basis  |                                                          | 宽度，类似 width，优先级比 width 高               |
| flex        | <u>flex-grow</u>  <u>flex-shrink</u>  <u>flex-basis</u>; | flex-grow 和 flex-shrink 和 flex-basis 一起指定   |
|             |                                                          |                                                   |
| align-self  | auto \| flex-start \| flex-end \| center \| stretch      | 子元素自身高度                                    |



### order

- 指定顺序排序，默认都是 0 级

- 从小到大，order 数值越高越在后面

- ```css
    order: 数值;
    ```

```css
.tmp {
    order: -1;
    color: #FFF;
    font-weight: bolder;
    background-color: #ee5c5c;
}
```

```html
<div class="container">
    <!-- 在5号元素上添加一个 tmp -->
    <div class="item tmp">我是元素 5</div>
</div>
```

![image-20210908111807055](https://attach.blog.wen7.online/202212151613940.png)

![image-20210908112024303](https://attach.blog.wen7.online/202212151613960.png)



### flex-grow

- 子元素延伸比例，准确的叫占用剩余空间比例

- ```css
    flex-grow: 数值
    ```

- 准备：父盒子宽度设置为 1000px，4个子元素宽度分别 100px，对其中2个子盒子添加 flex-grow 属性

- 父盒子

    - ```css
        .container {
            width: 1000px;	【取1000方便计算】
            height: 100vh;
            background-color: #CCFFE6;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        ```

- 子元素

    - ```css
        .item {
            border: 1px solid #000000;
            width: 100px;	【取100方便计算】
            height: 60px;
            background-color: #CCE5FF;
            text-align: center;
            line-height: 60px;
            font-weight: bold;
            color: #F00;
        }
        ```

- 临时元素

    - ```css
        .tmp {
            color: #FFF;
            font-weight: bolder;
            background-color: #ee5c5c;
            flex-grow: 1;	【剩余空间占用比 1】
        }
        ```

- 对比元素

    - ```css
        .compare{
            color: #FFF;
            font-weight: bolder;
            background-color: #5cd1ee;
            flex-grow: 5;	【剩余空间占用比 5】
        }
        ```

- html

    - ```css
        <div class="container">
            <div class="item">我是元素 1</div>
            <div class="item">我是元素 2</div>
            <div class="item">我是元素 3</div>
            <div class="item">我是元素 4</div>
        </div>
        ```

    测试步骤：

1. 不添加任何内容，原来 4 个子元素的排列

    ![image-20210908113314099](https://attach.blog.wen7.online/202212151613985.png)

    

2. 在 元素2 上添加 tmp

    ```html
    <div class="item tmp">我是元素 2</div>
    ```

![image-20210908113509438](https://attach.blog.wen7.online/202212151613956.png)

父盒子 1000px，减去 4 个子盒子各 100px，还有 600px 剩余宽度，此时因为没有其他盒子和 元素2 抢占剩余宽度，元素2占用剩余宽度全部



3. 在 元素3 上添加 compare

    ```html
    <div class="item compare">我是元素 3</div>
    ```

![image-20210908113720309](https://attach.blog.wen7.online/202212151613945.png)

总共 1000px ，4个子盒子各 100px，剩余 600px，因为 tmp 的 flex-grow 为 1，compare 的 flex-grow 为5，所以他们按照 1:5 的比例瓜分这 600px，其中 tmp 瓜分到的为 $\frac{1}{1+5} $ 得到 100px，compare 瓜分到的为 $\frac{5}{1+5} $ 得到 500px，分别加上自身原始的 100px，

元素2的宽度为 100+100 = 200px，元素3的宽度为 100+500=600px，所以元素3是元素2大概3倍的宽度，可以自己拿手指头量一量。

修改 tmp 的 flex-grow 为 2 ，修改 compare 的 flex-grow 为 4 再次查看效果。

![image-20210908114337055](https://attach.blog.wen7.online/202212151613976.png)



### flex-basis

- 和 width 有点类似，但是 flex-basis 优先级比 width 更高，会干掉 width



### flex-shrink

- 子元素收缩率
- 当父盒子设置的不让换行 `flex-wrap: nowrap;`  
- 假设父盒子宽度 100%，子元素每个都是 500 px，当界面宽度不够的时候，即子元素的宽度总和大于父盒子的宽度，子盒子开始收缩
- 默认值为0，flex-shrink 设为1 表示不收缩，值越大收缩的越厉害



### flex

- 同时表示 `flex-grow`  `flex-shrink`  `flex-basis` 三种属性

- ```css
    flex: flex-grow flex-shrink flex-basis
    ```

    

### align-self

- 设置子元素自身

- ```css
    align-self: auto | flex-start | flex-end | center | stretch;
    ```

    - auto 【默认】

    - flex-start 靠开始的一边对齐

    - flex-end 靠结束的一边对齐

    - center

    - stretch

    - ```css
        /*自身不要设置高度*/
        ```


    


#### auto

<img src="https://attach.blog.wen7.online/202212151613324.png" alt="image-20210908125017866" style="zoom: 50%;" />



#### flex-start

<img src="https://attach.blog.wen7.online/202212151613391.png" alt="image-20210908125036423" style="zoom:80%;" />



#### flex-end

<img src="https://attach.blog.wen7.online/202212151613328.png" alt="image-20210908125127417" style="zoom: 50%;" />



#### center

<img src="https://attach.blog.wen7.online/202212151613346.png" alt="image-20210908125142851" style="zoom:50%;" />



#### stretch

<img src="https://attach.blog.wen7.online/202212151613355.png" alt="image-20210908125202260" style="zoom:50%;" />































