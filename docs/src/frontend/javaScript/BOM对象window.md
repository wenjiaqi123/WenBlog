# BOM对象window

## window

### 说明

`console.log(window);`

==window对象，是 JS 顶层对象，其他的 BOM 对象都是 window 对象的属性==

```java
// 可以将 window 理解成 java 中的对象
public class Window{
    public String name;
    public int length;
    public Document documnet;
    public Location location;
    public Navigator navigator;
    public Screen screen;
    public History history;
}
```



### 常用属性

|  属性名   | 说明                     | 示例 |
| :-------: | ------------------------ | ---- |
| document  | Document 文档对象的引用  |      |
| location  | Location 对象的引用      |      |
| navigator | Navigator 对象的引用     |      |
|  screen   | Screen 对象的引用        |      |
|  history  | History 对象的引用       |      |
|   _self   | 返回当前窗口的引用       |      |
|           |                          |      |
|   name    | 设置或返回窗口的名称     |      |
|  length   | 设置或返回窗口的框架数量 |      |

```javascript
console.log(window.history);
console.log(History);
History = window.history
```



### 常用方法

#### open()   close()

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>test</title>

        <style type="text/css">
            div{
                width: 100px;
                height: 100px;
                border:1px solid #000000;
            }
        </style>
    </head>
    <body>

        <div onclick="myFun()">
            点我
        </div>

    </body>

    <script type="text/javascript">
        myFun = function(){
            // TODO
        }
    </script>
</html>
```

```javascript
window.close();	//关闭页面
```

```javascript
window.open();	//打开新页面
window.open("https://www.baidu.com");  //打开百度
```

```javascript
window.open(url,[name],[configuration]);	
// url 新打开的地址
// name 可选，新打开页面的名称，可以通过此名字获取该窗口对象
// configuration 可选，新打开页面的配置，比如是否有菜单栏、滚动条、长高等等信息
window.open("https://www.baidu.com", "newWindow", "width=1024, height=700, top=0, left=0, titlebar=no, menubar=no, scrollbars=yes, resizable=yes, status=yes, , toolbar=no, location=yes");
```



#### alert()

```javascript
window.alert("我是弹出框");
```



#### confirm()

返回值是 boolean 类型，确定是 true，取消是 false

```javascript
window.confirm("我是确认框");
```



#### prompt()

用户交互，输入提示框，返回值是用户输入的值，取消的话返回 null

```javascript
window.prompt("请输入一个数");
```



#### 定时器

详情请参考独立文档



## document

DOM 详细讲解



## location

### 说明

该对象包含了当前 URL 的信息

Location对象是 Window 对象的一个部分，可通过 window.location 属性来访问



### 常用属性

| 属性名称 | 说明                                 | 示例                                                    |
| :------: | ------------------------------------ | ------------------------------------------------------- |
|   herf   | 设置或返回完整的URL                  | http://localhost:8080/test/demo?name=zhangsan&age=18#id |
| protocol | 设置或返回 URL 协议                  | http:                                                   |
|   host   | 主机+端口                            | localhost:8080                                          |
| hostname | 设置或返回当前 URL 的主机名          | localhost                                               |
|   port   | 设置或返回当前 URL 的端口号          | 8080                                                    |
| pathname | 设置或返回当前 URL 的路径            | /test/demo                                              |
|  search  | 设置或返回查询参数                   | ?name=zhangsan&age=18                                   |
|   hash   | 设置或返回从井号（#）开始的URL（锚） | id                                                      |

```javascript
console.log("完整URL:\t" + window.location.href);			
console.log("URL协议:\t" + window.location.protocol);

console.log("主机+端口:\t" + window.location.host);

console.log("主机名称:\t" + window.location.hostname);
console.log("端口号  :\t" + window.location.port);

console.log("URL路径:\t" + window.location.pathname);
console.log("请求参数:\t" + window.location.search);

console.log("#:\t" + window.location.hash);
```



### 常用方法

#### reload()

重新加载当前文档

```javascript
window.location.reload();
```



#### assign()

加载新的文档

- ```javascript
    window.location.assign("URL地址");
    ```

    

#### replace

用新文档替换当前文档

- ```javascript
    window.location.replace("URL地址");
    ```



```markdown
# assign 和 replace 区别联系
window.location.assign(url):加载 URL 指定的新的 HTML 文档。 就相当于一个链接，跳转到指定的url，当前页面会转为新页面内容，可以点击后退返回上一个页面。
window.location.replace(url):通过加载 URL 指定的文档来替换当前文档 ，这个方法是替换当前窗口页面，前后两个页面共用一个窗口，所以是没有后退返回上一页的
 
window.location.assign(url) 相当于 window.location.href="url";
```





## navigator

### 说明

该对象包含有关浏览器的信息，浏览器的名称，版本，语言，等等



### 常用属性

|  属性名称  | 说明                   | 示例（以 chrome 为例）                                       |
| :--------: | ---------------------- | ------------------------------------------------------------ |
|  appName   | 浏览器的名称           | Netscape                                                     |
| appVersion | 浏览器的平台和版本信息 | 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 |

```javascript
console.log(window.navigator.appName);
console.log(window.navigator.appVersion);
```



### 常用方法

无



## screen

### 说明

浏览器客户端显示器的信息



### 常用属性

| 属性名称 | 说明         | 示例 |
| :------: | ------------ | ---- |
|  width   | 显示器的宽度 | 1920 |
|  height  | 显示器的高度 | 1080 |

window 在 【系统信息】里查看

```javascript
console.log(window.screen.width);
console.log(window.screen.height);
```



## history

### 说明

浏览器当前窗口的历史访问记录，现在由于隐私，只能有前进后退的功能，设计之初是可以拿到你历史的访问记录的。



### 常用属性

| 属性名 | 说明                          | 示例 |
| :----: | ----------------------------- | ---- |
| length | 返回浏览器历史列表的 URL 数量 | 2    |

```javascript
console.log(window.history);
console.log(window.history.length);
```

- 打开一个窗口，访问百度
- 还在这个窗口访问页面，查看 window.history.length



### 常用方法

#### back()

加载 history 列表中前一个 URL

#### forward()

加载 history 列表中前一个 URL

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>

        <button onclick="goBack()">
            back
        </button>

        <button onclick="goForward()">
            forward
        </button>

    </body>
    <script type="text/javascript">
        goBack = function () {
            window.history.back();
        }

        goForward = function (){
            window.history.forward();
        }
    </script>
</html>
```



#### go()

加载 history 列表中某个具体页面

```javascript
window.history.go(数值);
```

- 数值为负数，等于 back()
    - window.history.go(-2); 向前倒退2次
- 数值为正数，等于 forward()
- 数值等于0，刷新