# DOM 对象

[百度百科-DOM](https://baike.baidu.com/item/%E6%96%87%E6%A1%A3%E5%AF%B9%E8%B1%A1%E6%A8%A1%E5%9E%8B/1033822?fr=aladdin&fromtitle=DOM&fromid=50288)

[W3CSchool-DOM](https://www.w3school.com.cn/htmldom/index.asp)

```html
<!DOCTYPE html>
<html>
    <head>
    	<meta charset="utf-8">
    	<title>HelloWorld</title>
    </head>
    
    <body>
        
    </body>
</html>
```

初学可以简单理解成整个 HTML 组成的对象，但实际 DOM 对象是比 HTML 范围更大的



## DOM树

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>index</title>
    </head>
    <body>

        <div>
            <ul>
                <li>闻</li>
                <li>老</li>
                <li>C</li>
            </ul>
        </div>

        <div>
        </div>

        <p>
            <span></span>
        </p>

        <div>
            <p>
                <span></span>
                <span></span>
            </p>
        </div>
    </body>
</html>
```

![image-20210805135733918](https://attach.blog.wen7.online/image-20210805135733918.png)



## DOM节点

HTML 文档中的内容都看做是节点

- 整个文档是一个==文档节点==
- 每个 HTML 元素是==元素节点==，例如：\<div> \</div>
- 每个元素里的内容是==文本节点==，例如：闻
- 每个注释是==注释节点==，例如： <!--我是注释-->
- ......

所有节点都可以通过 JavaScript 来 **添加，删除，修改，访问**



## 节点关系

节点中按照书写顺序，具有层级关系

- 根节点 root        **\<html> \</html>**

- 父节点 parent
- 子节点 child
- 兄弟节点 sibling

