# let 和 const

## let

以前声明变量都是  `var a = 1;`

现在使用 let 来声明局部变量，仅在代码块中有效

```javascript
for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log("我是外面的i: " + i);

for (let j = 0; j < 10; j++) {
    console.log(j);
}
console.log("我是外面的j: " + j);
```



## const

定义一个常量

- 常量必须赋值
- 常量不能改变值

```javascript
//定义一个常量,常量必须赋值
const i = 1;

console.log(i);

//常量不能改变值
i = 2;
```

![image-20210806121647161](https://attach.blog.wen7.online/image-20210806121647161.png)