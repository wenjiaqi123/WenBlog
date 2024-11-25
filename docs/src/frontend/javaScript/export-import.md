# export-import

## 需求分析

![image-20210806155558797](https://attach.blog.wen7.online/image-20210806155558797.png)

- 注意 \<script> 的属性 type="module"
- common.js   index.js   index.html 文件在附件里

当项目很大的时候，需要对各类文件进行分类，比如一个 js 里专门写有关 http 的，一个 js 里专门写 数据校验的，但是这每一个 js 都是不互通的，例如上图

每一个 js 里的内容都是独立且自闭的，外界不能访问，index.js 不能访问 common.js 里面的变量，对象，方法。

但是各个模块之间可能是需要互相调用的，比如 common.js 里有一个数据校验的方法，index.js 里需要用到该方法，怎么才能让模块之间互通呢？



## export

在 common.js 里需要导出的数据前加上 export，本例只导出了 str，coder，没有导出函数 myFun

相当于是这个 common.js 暴露出2个数据 str 和 coder，那么就可以在其他文件里使用该变量 str，使用对象 coder，但是不能使用 myFun

```javascript
export const str = "别打扰我,我在写代码";

export let coder = {
    name:"闻老C",
    age:18,
    desc:str
}

let myFun = function () {
    console.log("我是函数");
    return 123;
}
```



## import

在 index.js 里加上 

```javascript
import {str,coder} from "./common.js";
```

相当于将 common.js 引入，并且将 common.js 里的公开属性 str，coder 引入到 index.js 里，这下就可以在 index.js 里使用了

```javascript
import {str,coder} from "./common.js";
console.log("index.js");

console.log(str);
console.log(coder);
```



## export {}

如果当 common.js 里的属性非常之多，需要暴露的属性，对象，方法都要在前面加上 export 也太麻烦了，所以使用 export {}

```javascript
const str = "别打扰我,我在写代码";

let coder = {
    name:"闻老C",
    age:18,
    desc:str
}

let myFun = function () {
    console.log("我是函数");
    return 123;
}

export {
    str,
    coder,
    myFun
}
```



## export default

之前的导出导入，都是名称写死的，common.js 导出的名称叫 str，coder，index.js 中导入的名称就必须是 str，coder

如何才能让名称也随便呢？

- 导出字符串

    - common.js

        - ```javascript
            export default "我是一个字符串"
            ```

    - index.js

        - ```javascript
            import str from "./common.js";
            console.log(str);
            ```

    - common.js 里并没有指定字符串的名称，index.js 里随意给了一个变量名 str

- 导出方法

    - common.js
    
        - ```javascript
            export default function(){
                console.log("我是函数");
            }
            ```
        
    - index.js
    
        - ```javascript
            import myFun from "./common.js";
            myFun();
            ```
    
    - common.js 里并没有指定方法的名称，index.js 里随意给了一个变量名 myFun



==一个 js 里只能有一个 export default== 所以如果只使用 export default 导出一个的话，只能导出一个字符串，或者一个方法

==一个 js 里只能有一个 export default，但是可以有多个 export==

使用 export default 导出匿名对象

```javascript
export default {
    str:"我是字符串",
    coder:{
        name:"闻老C",
        age:18
    },
    myFun:function () {
        console.log("我是函数");
        return 123;
    }
}
```

- 这样就导出一个匿名对象，所以的数据作为对象的属性导出去

在 index.js 导入匿名对象

```javascript
import commonObj from "./common.js";

console.log(commonObj.str);
console.log(commonObj.coder);
commonObj.myFun();
```

- 在 index.js 里随意给了一个变量名 commonObj，可以通过对象.属性来获取 common.js 里的内容



## 别名

common.js 里的属性命名的时候可能有自己的含义，companyName 表示的是公司名称，18 表示的是年龄

但是不想暴露名称出去，因为见名知义，别人可能就知道属性是干嘛的，所以 export 的时候给一个别名

使用 as，类似 sql 的查询别名

```javascript
const companyName = "小猿邦";
const age = 18;

export {
    companyName as str,
    age as num
}
```

如果 index.js 不但导入了 common.js 模块，还导入了 test.js 模块，

common.js 暴露数据的别名用的是 str，num

test.js 暴露数据的别名也是 str，num

那么在 index.js 里就会出现这种情况，在 index.js 里就无法区分，str，num 到底取哪一个

```javascript
import {str,num} from "./common.js";
import {str,num} from "./test.js";
```

所以在 index.js 里使用别名 as 来区分

```javascript
import {str as commonStr,num as commonNum} from "./common.js";
import {str as testStr,num as testNum} from "./test.js";

console.log(commonStr);
console.log(commonNum);
console.log(testStr);
console.log(testNum);
```



## 小结

每个公司有自己的规范，每个人也有自己的喜好，仅为博主个人使用习惯和想法来做的小结，欢迎交流讨论

```javascript
const str = "别打扰我,我在写代码";

let coder = {
    name:"闻老C",
    age:18,
    desc:str
}

let myFun = function () {
    console.log("我是函数");
    return 123;
}

export default {		//这里导出一个匿名对象
    name:"闻老C",
    str:str,
    myFun:myFun
}
export {				//注意这里导出一个 coder
	coder
}
```

使用 export default 导出一个对象

在调用者的角度给该文件一个命名即可，可以调用属性来完成，也不用写那么多别名了

```javascript
import common,{coder} from "./common.js";		//common 导出多个，export default 和 export 混用，中间用逗号分隔
import test from "./test.js";

console.log(common.name);
console.log(common.str);
console.log(coder);
console.log(test.name);
console.log(test.str);
```



## 附件

### common.js

```javascript
const str = "别打扰我,我在写代码";

let coder = {
    name:"闻老C",
    age:18,
    desc:str
}

let myFun = function () {
    console.log("我是函数");
    return 123;
}
```



### index.js

```index.js
console.log("index.js");

console.log();

console.log("===");
```



### index.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>index</title>
    </head>
    <body>


    </body>

    <script type="module" src="../js/index.js">

    </script>

</html>
```

