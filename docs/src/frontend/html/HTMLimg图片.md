# HTML img图片

## 标签

```html
<img src="1.jpg" style="width:200px">
<img src="./1.jpg" style="width:200px">

<img src="../2.jpg" style="width:200px">

<img src="../pic/3.jpg" style="width:200px">
```

![image-20210730153546058](https://attach.blog.wen7.online/image-20210730153546058.png)

目录结构：

```markdown
demo

  |---- html

  |		 |----  1.jpg

  |		 |----  **index.html**     ← 当前 html

  |

  |---- pic

  |		 |---- 3.jpg

  |

  |---- 2.jpg

```



## ./ 和 ../

```markdown
# ./ 和 ../
./  	表示当前文件所在的目录，父目录
../ 	父目录的父目录
```

```markdown
<img src="1.jpg" style="width:200px">
<img src="./1.jpg" style="width:200px">
都是表示同一目录下，index.html 所在的 html 文件夹下
```

```markdown
<img src="../2.jpg" style="width:200px">
index.html 和 2.jpg 的位置,index.html 的父目录的父目录，demo 目录，
```

```markdown
<img src="../pic/3.jpg" style="width:200px">
../ 表示父目录的父目录 demo 目录，3.jpg 在 demo 下的 pic 下
```



## 属性

- title	 当鼠标移动到图片上，展示的话

- alt		当图片无法正常显示的时候，显示给用户看的文字

    ![image-20210730155135426](https://attach.blog.wen7.online/image-20210730155135426.png)