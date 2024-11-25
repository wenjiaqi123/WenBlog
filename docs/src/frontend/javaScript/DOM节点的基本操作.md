# DOM节点的基本操作

## 新增节点

```javascript
document.createElement("div");		//创建元素节点
document.createTextNode("文本");	  //创建文本节点
document.createComment("注释");	  //创建注释节点
......

```

![image-20210805145417864](https://attach.blog.wen7.online/image-20210805145417864.png)

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>index</title>
    </head>
    <body>

    </body>

    <script type="text/javascript">
        //创建元素节点，<span></span> 此时还只是在 js 中
        var mySpan = document.createElement("span");
        //在body里添加子节点,将 js 里的 span 插入到 html 中
        document.body.appendChild(mySpan);

        //创建文本节点，"闻老C"
        var text = document.createTextNode("闻老C");
        //在 span 节点里添加子节点，将 "闻老C" 的文本节点追加到 span 节点下
        mySpan.appendChild(text);

        //创建注释节点，"我是注释"
        var comment = document.createComment("我是注释")
        //在 span 节点里添加子节点，将注释 <!--我是注释--> 追加到 span 节点下
        mySpan.appendChild(comment);
    </script>
</html>
```



## 插入节点

```javascript
父节点.appendChild(子节点);		//在父节点下追加一个子节点
父节点.insertBefore(A节点，B节点); //在父节点下,	把A节点插入到B节点前
兄弟节点.before(新节点);			//在兄弟节点前插入新节点
```



```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>index</title>
    </head>
    <body>

    </body>

    <script type="text/javascript">
        //创建一个元素节点，<div></div>
        var myDiv = document.createElement("div");
        //body里追加一个子节点 <div></div>
        document.body.appendChild(myDiv);

        //创建一个元素节点，<p></p>
        var myP = document.createElement("p");
        //在<div></div> 里追加一个子节点 <p></p>
        myDiv.appendChild(myP);
        
        //创建一个元素节点,<pre></pre>
        var myPre = document.createElement("pre");
        //在 div 标签下,在 p 标签前，插入 pre
        myDiv.insertBefore(myPre, myP);

    </script>
</html>
```



## 删除节点

```javascript
父节点.removeChild(子节点);		//根据父节点，删除子节点
节点.remove();				  //节点自我删除
```



```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>index</title>
    </head>
    <body>

        <div id="myId">
            <span class="a1">我是文本</span>
        </div>

        <button onclick="del()">
            点我删除
        </button>

    </body>

    <script type="text/javascript">
        var myDiv = document.getElementById("myId");
        console.log(myDiv);

        var mySpan = document.getElementsByClassName("a1")[0];
        console.log(mySpan);
        
        del = function (){
            myDiv.removeChild(mySpan);
        }
    </script>
</html>
```



## 替换节点

```javascript
父节点.replaceChild(新节点，旧节点);		//在父节点下，使用新节点，替换就节点
旧节点.replaceWith(新节点);			  //使用新节点替换旧节点
```





## innerHtml

## innerText
