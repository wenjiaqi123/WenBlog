# function

函数，类似于 java 中的方法

## 定义

==注意 函数声明 和 函数表达式 的写法不同==

### 函数声明

```javascript
function fun(a, b) {
    return a + b;
}
```



### 函数表达式

```javascript
var fun = function (a, b) {
    return a + b;
}
```

- 函数表达式和赋值表达式类似

    - 将函数体 function(){} 当成一个值，赋值给变量 fun

    - ```javascript
        var  a  = 1;
        var fun = function(){}
        ```

- ~~函数表达式可以被执行符号 () 执行~~
    - ~~被执行符号执行过的函数表达式，放弃函数名，相当于立即执行函数~~

  

## 知识点

```javascript
function m(a, b) {
    return a + b;
}

var t1 = m(1,2);
var t2 = m("a","b");

console.log(t1);
console.log(t2);
```

- 形参没有类型
    - 因为指定类型，`function m(var a,var b)` 还是相当于没有指定
- 返回值没有类型



```javascript
function m(a, b) {	//这里定义的形参定义了2个
    console.log(b);
    return a + b;
}

var t1 = m(1);			//这里传参值传了一个
var t2 = m("hello");	//只传一个，会传给第一个形参 a

console.log(t1);
console.log(t2);
```

- 调用时，实参个数可以少于形参个数

```javascript
function m(a, b=12345) {	
    console.log(b);
    return a + b;
}
```

- 形参可以设置默认值，如果调用时，有参数传入就用实参，没有就用默认值

