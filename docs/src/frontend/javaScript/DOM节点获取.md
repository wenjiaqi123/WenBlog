# DOM节点的获取

## document.getElementById();

```javascript
document.getElementById("id值");					//因为 id 唯一，所以根据 id 获取的元素也是唯一的

document.getElementsByClassName("class值");		//因为 class 值不唯一，所以根据 class 值获取的元素是一个数组
document.getElementsByTagName("标签值");			//因为 标签 值(div,span,p 等)的元素不唯一，所以获取的是一个数组
document.getElementsByName("name属性值");			//类似 input 的多选 name 是相同的，所以获取的是一个数组
```



```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>index</title>
    </head>
    <body>

        <div id="a1" class="c1 c2">
            王二
        </div>
        <div id="a2" class="c1 c2">
            张三
        </div>

        <input type="text" name="userName">
        <input type="password" name="userPwd">

        <input type="radio" name="sex" value="男">
        <input type="radio" name="sex" value="女">

    </body>

    <script type="text/javascript">
        var a1 = document.getElementById("a1");
        console.log(a1);

        var c1Arr = document.getElementsByClassName("c1");
        console.log(c1Arr);

        var c1_0 = document.getElementsByClassName("c1")[0];
        console.log(c1_0);

        var inputArr = document.getElementsByTagName("input");
        console.log(inputArr);

        var input_0 = document.getElementsByTagName("input")[0];
        console.log(input_0);

        var sexArr = document.getElementsByName("sex");
        console.log(sexArr);

        var sex_0 = document.getElementsByName("sex")[0];
        console.log(sex_0);
    </script>
</html>
```





## querySelector

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>index</title>
    </head>
    <body>

        <div>
            <span class="a1">我是第一个span</span>
            <span id="myId">我是第一个span</span>
        </div>

    </body>

    <script type="text/javascript">
        var mySpan = document.querySelector("div span.a1");
        console.log(mySpan);

        var mySpan_id = document.querySelector("div span#myId");
        console.log(mySpan_id);
    </script>
</html>
```

- document.querySelector("css 选择器");  默认选第一个，返回一个值
- document.querySelector("css 选择器"); 返回一个数组



![image-20210805155622009](https://attach.blog.wen7.online/image-20210805155622009.png)

![image-20210805155553467](https://attach.blog.wen7.online/image-20210805155553467.png)
