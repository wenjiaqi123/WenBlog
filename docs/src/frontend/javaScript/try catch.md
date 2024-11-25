# try catch

```javascript
try {
    console.log(a);
}catch (e){
    console.log(e);
    console.log(e.name);
    console.log(e.message);
}
```

|        异常        | 说明                     |          |
| :----------------: | ------------------------ | -------- |
|     RangeError     | 数值越界                 |          |
| ==ReferenceError== | 非法或不能识别的引用数值 | 本例就是 |
|    SyntaxError     | 发生语法解析错误         |          |
|     TypeError      | 操作数类型错误           |          |
|      URIError      | URI处理函数使用不当      |          |
|     EvalError      | eval() 使用与定义不一致  |          |

