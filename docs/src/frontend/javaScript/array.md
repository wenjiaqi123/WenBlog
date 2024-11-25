# Array

## 直接赋值

```javascript
var arr = [1,2,3,"aa","bb","cc",true,false];

console.log(arr);
```



## 定义长度

```javascript
var arr = new Array(3);

arr[0] = 0;
arr[1] = 1;
arr[2] = 2;

arr.push(33);
arr.push(44);
arr.push(55);
arr.push("aa");
arr.push("bb");
arr.push("cc");

arr[50] = 50;

arr.push(true);
arr.push(false);

console.log(arr);		

console.log(arr[100]);
```

![image-20210804150232550](https://attach.blog.wen7.online/image-20210804150232550.png)

- ```javascript
    var arr = new Array(3);  //定义一个长度为3的数组
    ```

- 可以溢出读写

- 没有值的就是 undefined



## 数组常用方法

```javascript
var arr = [1,2,3];
arr.push("aaa");
console.log(arr);		//[1,2,3,"aaa"]

var array = [1,2,3];
var newarr = array.concat("aaa");
console.log(newarr);	//[1,2,3,"aaa"]
console.log(array);		//[1,2,3]
```

### 改变原数组

#### push

- 往数组末尾插入值

```javascript
var arr = [];
arr.push(1,2,3);
document.write(arr);  //[1,2,3]
```



#### pop

- 从数组的末尾弹出一个值

```javascript
var arr = [1,2,3];
arr.pop();
document.write(arr);	//[1,2]
```



#### unshift

- 从数组开始插入值

```javascript
var arr = [1,2,3];
arr.unshift("aa","bb","cc");
document.write(arr);	//["aa","bb","cc",1,2,3]
```



#### shift

- 从数组开始弹出一个值

```javascript
var arr = [1,2,3];
arr.shift();
document.write(arr);	//[2,3]
```



#### sort

- 数组从小到大排序

```javascript
var arr = [9,5,2,7];
arr.sort();
document.write(arr);	//[2,5,7,9]
```



#### reverse

- 数组翻转

```javascript
var arr = [1,2,3];
arr.reverse();
document.write(arr);	//[3,2,1]
```



#### splice

- spilce（从第几位开始，截掉多少位）

```javascript
var arr = [1,2,3,4,5,6,7,8,9];
arr.splice(2,3);		//从第 2 位开始，截掉 3 位
document.write(arr);	//[1,2,6,7,8,9]
```

- splice（从第几位开始，截掉多少位，添加的数）

```javascript
var arr = [1,2,3,4,5,6,7,8,9];
arr.splice(2,3,"aa","bb");		//从第2位开始，截掉3位，并插入"aa","bb"
document.write(arr);			//[1,2,"aa","bb",6,7,8,9]
```



### 不改变原数组

#### length

```javascript
var arr = [1,2,3];
document.write(arr.length);	//3 
```



#### concat

```javascript
var arr = [1,2,3];
var newArr = arr.concat(4,5,6);
document.write(newArr);		//[1,2,3,4,5,6]
document.write("<br>");
document.write(arr);		//[1,2,3]  原数组没变
```



#### join

```javascript
var arr = [1,2,3];
var str = arr.join(",");
document.write(str);		//1,2,3  这里是字符串
document.write("<br>");
document.write(arr);		//[1,2,3]
```

- split 根据符号切割字符串

- ```javascript
    var str = "1,2,3";
    var arr = str.split(",");	
    document.write(arr);		//[1,2,3]
    ```

    

#### toString

```javascript
var arr = [1,2,3];
var str = arr.toString();
document.write(str);	//1,2,3
document.write(arr);	//[1,2,3]
```



#### slice

- splice（）  截取数组所有

```javascript
var arr = [1,2,3,4,5,6];
var newArr = arr.slice();
document.write(newArr);		//[1,2,3,4,5,6]
document.write("<br>")
document.write(arr);		//[1,2,3,4,5,6]
```

- splice（index） 从 index 开始，截取到末尾

```javascript
var arr = [1,2,3,4,5,6];
var newArr = arr.slice(3);		
document.write(newArr);		//[4,5,6] 从第 3 位开始，截取到末尾
document.write("<br>")
document.write(arr);		//[1,2,3,4,5,6]
```

- splice（index，end）从 index 开始截取到 end 前

```javascript
var arr = ["a","b","c","d","e","f"];
var newArr = arr.slice(2,4);	
document.write(newArr);			//["c","d"] 从第2位开始，到第4位终止(不包括第4位)
document.write("<br>")
document.write(arr);			//["a","b","c","d","e","f"]
```



## 数组实现

### 数组去重

- 编写一个函数，实现数组去重的功能

```javascript
Array.prototype.deDuplicat = function () {
    var temp = {};
    var arr = [];
    var len = this.length;
    for (var i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = "闻老C";
            arr.push(this[i]);
        }
    }
    return arr;
}
var arr = [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, , 6];
var newArr = arr.deDuplicat();
document.write(newArr);
```

