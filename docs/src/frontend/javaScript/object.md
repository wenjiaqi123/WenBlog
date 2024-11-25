# object

```javascript
var obj = {
    name: "闻老C",
    age: 18,
    money: 10086.5,
    address: "江苏",
    hobby: ["吃饭", "睡觉", "写代码"],
    girlFriend: {
        gName: "刘亦菲",
        gAge: 18
    },
    teach:function (){
        console.log("coding");
    }
}

console.log(obj.name);		//闻老C
console.log(obj.hobby);		//["吃饭", "睡觉", "写代码"]
console.log(obj.teach);		//ƒ (){ console.log("coding"); }
obj.teach();

obj.aaa="bbb";
console.log(obj.aaa);		//bbb
```

- 对象的定义 { }

- 属性名:属性值，   ==属性之间用逗号==

- 调用属性  

    - obj.name

    - obj["属性名"]

    - ```javascript
        var obj = {
            0:"HelloWorld",
            name: "闻老C"
        }
        document.write(obj["name"]);
        document.write(obj[0]);
        ```

- 调用函数  obj.teach()

    - ```javascript
        obj.teach		//这个是 obj 里的一个属性
        obj.teach()		//这个是调用 obj 里的方法
        ```
    
- 可以给没有的属性赋值，同时也在对象中添加了该属性




## 对象

```javascript
var obj = {
    //字面量
    
    //构造函数/构造器
    
    //方法/函数
}
```

- 字面量约等于 java 中的字段
- 构造函数
    - 系统自带
        - new Object()
        - Array()
        - Number()
        - Boolean()
        - String()
        - Date()
    - 自定义构造器
- 方法
    - Object.create(原型)方法
    - 自定义方法
