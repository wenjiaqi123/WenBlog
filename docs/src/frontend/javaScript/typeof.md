# typeof

类似于 java 中的 instanceof 



## JavaScript 数据类型

|   typeof   | 数据类型  |                                                      |
| :--------: | --------- | ---------------------------------------------------- |
|   number   | number    | NaN，Infinity，-Infinity，数值（正负数，整数，小数） |
|   string   | string    | 字符串                                               |
|  boolean   | boolean   | true，false                                          |
| undefined  | undefined | undefined                                            |
| ==object== | null      | null                                                 |
|            |           |                                                      |
| ==object== | array     | [ , , ]                                              |
| ==object== | object    | { , , }                                              |
|  function  | function  | function (){}                                        |

```javascript
var n_NaN = NaN;
var n_Infinity = Infinity;
var n__Infinity = -Infinity;
var n = 1;

var s_ = "";
var s = "abc";

var b1 = true;
var b0 = false;

var u;
var un = undefined;

var nu = null;

var arr = [1,2,3];
var obj = {};
var fun = function () {

}

// console.log("n_NaN" + "\t\t" +  typeof  n_NaN );
// console.log("n_Infinity" + "\t\t" +  typeof  n_Infinity );
// console.log("n__Infinity" + "\t\t" +  typeof  n__Infinity );
// console.log("n" + "\t\t" +  typeof  n );
// console.log("-------------------------");
// console.log("s_" + "\t\t" +  typeof  s_ );
// console.log("s" + "\t\t" +  typeof  s );
// console.log("-------------------------");
// console.log("b1" + "\t\t" +  typeof  b1 );
// console.log("b0" + "\t\t" +  typeof  b0 );
// console.log("-------------------------");
// console.log("u" + "\t\t" +  typeof  u );
// console.log("un" + "\t\t" +  typeof  un );
// console.log("-------------------------");
// console.log("nu" + "\t\t" +  typeof  nu );
// console.log("arr" + "\t\t" +  typeof  arr );
// console.log("obj" + "\t\t" +  typeof  obj );
// console.log("-------------------------");
// console.log("fun" + "\t\t" +  typeof  fun );
```



## typeof

```javascript
var i = 1;
console.log( typeof(i) );
console.log( typeof i );
```

