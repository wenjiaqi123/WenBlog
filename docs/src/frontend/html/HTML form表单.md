# HTML form表单

表单提交，一般用于信息填写，常见的如账户登录，个人信息

## form

![image-20210730155946846](http://xyb.wyxjava.com/image-20210730155946846.png)

```html
<form method="get" action="http://localhost:8080/test" enctype="multipart/form-data">

    账户:<input type="text"><br/>
    密码:<input type="password"><br/>

    提交:<input type="submit">
    
</form>
```

form 表单的 3 个属性：

- method 请求方式

    - get

    - post

- action 请求地址
- enctype 文件上传，添加该属性



## input

![image-20210730163722645](http://xyb.wyxjava.com/image-20210730163722645.png)

```html
<form method="get" action="http://localhost:8080/test" enctype="multipart/form-data">

    账户:<input type="text"><br/>
    密码:<input type="password"><br/>
    性别:<input type="radio" name="sex" value="1" checked>男
        <input type="radio" name="sex" value="0">女

    <br/>
    爱好:<input type="checkbox" name="hobby" value="1" checked>吃饭
        <input type="checkbox" name="hobby" value="2">睡觉
        <input type="checkbox" name="hobby" value="3">打豆豆

    <br/>
    编程:<input type="checkbox" name="language" value="1">Java
        <input type="checkbox" name="language" value="2">JS
        <input type="checkbox" name="language" value="3">Python

    <br/>
    文件:<input type="file" name="file" multiple>
    <br>
    住址:<select name="address">
            <option value="-1">请选择</option>
            <option value="1">北京</option>
            <option value="2">上海</option>
            <option value="3">广州</option>
            <option value="4">深圳</option>
        </select>

    <br>
    提交:<input type="submit">
    重置:<input type="reset">
</form>
```



```html
<input type="text" name="" id="" value="" placeholder="" multiple>
```

属性：

- type 类型
    - text 			文字
    - password  密码
    - radio          单选
    - checkbox  多选
    - file             文件上传
    - submit      提交
    - button      按钮
    - reset         重置
    - hidden     隐藏
- name  
- id    唯一标识
- value  输入框的值
- placeholder  默认值
- multiple="multiple"  可以不写属性值，文件能够多选
- checked="checked"  可以不写属性值，当前默认选中



### text

```html
账户:<input type="text" name="account" value="" placeholder="请输入用户名">
```

- type="text" 文本类型
- 使用浏览器打开，点击提交时，F12，查看 Network， **name:value** 的格式   account:闻老C
- placeholder="请输入用户名"  输入框中提示信息，当有数据输入的时候就会没了



### password

```html
密码:<input type="password" name="pwd" value="" placeholder="请输入密码">
```

- type="password"  输入的数据会变成实心圆点

- 使用浏览器打开，点击提交时，F12，查看 Network， **name:value** 的格式    pwd:123456

    

### radio

```html
性别:<input type="radio" name="sex" value="1" checked="checked">男
    <input type="radio" name="sex" value="0">女
```

- type="radio" 单选框
- 通过 name 分组，name 相同的，只能有一个值
- value 选择的值
- checked="checked"  可以简写成  checked 不需要属性值，被设置为 checked 的默认选中



### checkbox

```html
爱好:<input type="checkbox" name="hobby" value="1" checked>吃饭
    <input type="checkbox" name="hobby" value="2">睡觉
    <input type="checkbox" name="hobby" value="3">打豆豆

编程:<input type="checkbox" name="language" value="1" checked="checked">Java
    <input type="checkbox" name="language" value="2">JS
    <input type="checkbox" name="language" value="3">Python
```

- type="checkbox" 多选框
- 通过 name 分组，name 相同的为一组
- value 选择的值
- checked="checked"  可以简写成  checked 不需要属性值，被设置为 checked 的默认选中



### file

```html
文件:<input type="file" name="file" multiple>
```

- type="file" 上传文件
- multiple="multiple" 可以简写成 multiple 不需要属性值，被设置为 multiple 表示可以选择多个文件



### select

```html
住址:<select name="address">
        <option value="-1">请选择</option>
        <option value="1">北京</option>
        <option value="2">上海</option>
        <option value="3">广州</option>
        <option value="4">深圳</option>
    </select>
```



### hidden

```html
<input type="hidden" name="attributeName" value="attributeValue">
```

- 隐藏域，如果提交表单，需要传一些值给后端，但是又不需要在页面展示，通过隐藏域的 name:value 给后端传值



### textarea





### button/submit/reset

```html
<input type="button" value="我是按钮">
<input type="submit" value="点我提交">
<input type="reset" value="点我重置">
```

- button 就是一个简单的按钮，value 是按钮显示的字符

- submit 是相当于是一个特例按钮，提交

- reset 是相当于是一个特例按钮，重置

- 也可使用如下的标签

	```html
	<button>登录</button>
	<button type="button">登录</button>
	<button type="submit">提交</button>
	<button type="reset">重置</button>
	```

	



## 文件上传

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style>
            #my-file {
                width: 500px;
                height: 50px;
                position: absolute;
                z-index: -1;
                opacity: 0;
                border: 1px solid black;
            }

            label[for="my-file"] {
                display: inline-block;
                width: 200px;
                height: 200px;
                border: 1px solid black;
                background-color: #48ffe7;
                padding: 10px 15px;
                color: #ff838e;
                font-size: 30px;
                line-height: 200px;
                text-align: center;
                border-radius: 20px;
                cursor: pointer;
            }

        </style>
    </head>
    <body>

        <input type="file" id="my-file" multiple>
        <label for="my-file">点我上传</label>

    </body>
</html>
```



































