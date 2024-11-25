Promise
===

前言
---

- 必需知识点：
    - 同步与异步



Promise 入门
---

1. ```javascript
    // 构建 Promise 对象
    new Promise();
    ```

2. ```javascript
    // 参数输入一个箭头函数
    new Promise(()=>{});
    
    // 格式化一下
    new Promise(()=>{
        
    });
    ```

3. ```javascript
    // 箭头函数加2个参数,第一个是成功,第二个是失败
    new Promise((success, failure) => {
    
    });
    ```

4. ```javascript
    // 将 Promise 对象赋值赋值给常量 p
    const p = new Promise((success, failure) => {
    
    });
    
    console.log(p);
    ```

那么我们就构建了一个 Promise 对象，并打印了该 Promise 对象。



三种状态
---

Promise 对象主要是简化开发中的异步操作。

以 Http 请求为例，

- ==pending   等待状态==
- ==fulfilled   成功状态==
- ==rejectd   失败状态==



### pending 状态

**当我们构建一个 Promise 对象的时候，默认就是 pending 状态**

```html
<script type="text/javascript">
    const p = new Promise((success, failure) => {
        console.log("hello world");
        console.log("game over");
    });

    console.log(p);
</script>
```

![image-20221215121117629](https://attach.blog.wen7.online/202212151211681.png)



### fulfilled 状态

**在该 Promise 对象内部，调用第一个参数 success，就转换成了 fulfilled 状态**

```html
<script type="text/javascript">
    const p = new Promise((success, failure) => {
        console.log("hello world");
        success();			//调用 success
        console.log("game over");
    });

    console.log(p);
</script>
```

![image-20221215121250272](https://attach.blog.wen7.online/202212151212307.png)



### rejected 状态

**在该 Promise 对象内部，调用第二个参数 failure，就转换成了 rejected 状态**

```html
<script type="text/javascript">
    const p = new Promise((success, failure) => {
        console.log("hello world");
        failure();		//调用 failure
        console.log("game over");
    });

    console.log(p);
</script>
```

![image-20221215121449178](https://attach.blog.wen7.online/202212151214217.png)



### 状态转换

- ==pending 可以转换成成功或失败状态==

    - pending → fulfilled	（在 Promise 内部调用了第一个参数）
    - pending → rejected   （在 Promise 内部调用了第二个参数）

- ==状态凝固==：**状态一旦从 pending 转换成 fulfilled/rejected 中的任意一个，状态就凝固在该状态，不可以转换成其他状态，也回不到 pending 状态**

    - ```html
        <script type="text/javascript">
            const p = new Promise((success, failure) => {
                success();		//如果先调用 success() 那么状态就是 fulfilled
                failure();		//后续再调用 failure() 状态仍然是 fulfilled
            });
        
            console.log(p);
        </script>
        ```



回调函数
---

### then 和 catch

当状态 → 成功状态（fulfilled）之后，会调用 Promise 对象的 then 方法

当状态 → 失败状态（rejected）之后，会调用 Promise 对象的 catch 方法 

```html
<script type="text/javascript">
    const p = new Promise((success, failure) => {
        success();
        // failure();
    });

    console.log(p);

    //成功回调
    p.then(() => {
        console.log("调用了 then 方法");
    })

    //失败回调
    p.catch(() => {
        console.log("调用了 catch 方法");
    })
</script>
```

![image-20221215122954357](https://attach.blog.wen7.online/202212151229400.png)



#### 简写

```html
<script type="text/javascript">
    let p = new Promise((success, failure) => {
        // success();
        failure();
    });

    //在 then 里,两个函数,第一个表示成功的处理逻辑,第二个表示失败的处理逻辑
	p.then(()=>{},()=>{});
    
    
    p.then(()=>{
        console.log("成功");
    },()=>{
        console.log("失败");
    });

</script>
```



### then 和 catch 的返回对象

==then 和 catch 的返回仍然是一个 Promise 对象==

```html
<script type="text/javascript">
    const p = new Promise((success, failure) => {
        success();
        // failure();
    });

    console.log(p);

    let promiseSuccess = p.then(() => {
        console.log("执行了 p 的 then 方法");		//因为 p 是成功状态,所以 p 的 then 和 catch 返回都是 fulfilled 状态
    });

    let promiseFailure = p.catch(() => {
        console.log("执行了 p 的 catch 方法");
    });

    console.log(promiseSuccess);
    console.log(promiseFailure);

    promiseSuccess.then(() => {
        console.log("执行了 promiseSuccess 的 then 方法");
    })
    promiseSuccess.catch(() => {
        console.log("执行了 promiseSuccess 的 catch 方法");
    })

    promiseFailure.then(() => {
        console.log("执行了 promiseFailure 的 then 方法");
    },() => {
        console.log("执行了 promiseFailure 的 catch 方法");
    })
</script>
```

![image-20221215130157609](https://attach.blog.wen7.online/202212151301660.png)

```html
<script type="text/javascript">
    const p = new Promise((success, failure) => {
        // success();
        failure();
    });

    console.log(p);

    let promiseSuccess = p.then(() => {
        console.log("执行了 p 的 then 方法");
    });

    let promiseFailure = p.catch(() => {
        console.log("执行了 p 的 catch 方法");		//因为 p 是失败状态,所以 p 的 catch 返回的是 fulfilled 状态,p 的 then 返回的是 rejected 状态
    });

    console.log(promiseSuccess);
    console.log(promiseFailure);

    promiseSuccess.then(() => {
        console.log("执行了 promiseSuccess 的 then 方法");
    })
    promiseSuccess.catch(() => {
        console.log("执行了 promiseSuccess 的 catch 方法");
    })

    promiseFailure.then(() => {
        console.log("执行了 promiseFailure 的 then 方法");
    },() => {
        console.log("执行了 promiseFailure 的 catch 方法");
    })
</script>
```

![image-20221215130224136](https://attach.blog.wen7.online/202212151302175.png)



### then 和 catch 的返回值

```html
<script type="text/javascript">
    let p = new Promise((success, failure) => {
        success();
    });

    console.log(p);

    let promise = p.then(() => {
        console.log("执行了 then 方法");
        let obj = {
            name: "闻",
            age: 18
        }
        return obj;
    });

    console.log(promise);
    
    promise.then((result)=>{
        console.log(result);
    },(err)=>{
        console.log(err);
    })
</script>
```

![image-20221215131824558](https://attach.blog.wen7.online/202212151318622.png)



别名
---

==从 pending → 成功|失败 状态才是本质==。

success 可能又被写成 resolve、resolved、fulfill、fulfilled 等（不同开发者习惯不同）

failure 可能又被写成 reject、rejected 等

```html
<script type="text/javascript">
    //参数名只是表示成功和失败两种状态
    const p = new Promise((resolve, reject) => {
        resolve();
        // reject();
    });

    console.log(p);
</script>
```



### 简写

本质：Promise 对象 → 成功|失败，然后调用对应的 then 方法和 catch 方法

```html
<script type="text/javascript">
    Promise.resolve().then(()=>{
        console.log("调用了 then 方法");
    })

    Promise.reject().catch(()=>{
        console.log("调用了 catch 方法");
    })
</script>
```



## 链式调用

```html
<script type="text/javascript">
    Promise.resolve().then(() => {
        console.log("执行了 p1 then 方法");
    }).then(() => {
        console.log("执行了 p2 then 方法");
        throw new Error();
    }).catch(() => {
        console.log("执行了 p3 catch 方法");
    })
</script>

<!-- 等同于以下代码 -->
<script type="text/javascript">
    //p1 的状态为成功 fulfilled
    let p1 = new Promise(((resolve, reject) => {
        resolve();
    }));

    //p2 的状态为成功 fulfilled
    let p2 = p1.then(() => {
        console.log("执行了 p1 then 方法");
    });

    //p3 的状态为失败 rejected（因为 throw new Error()）
    let p3 = p2.then(() => {
        console.log("执行了 p2 then 方法");
        throw new Error();
    });

    let p4 = p3.catch(() => {
        console.log("执行了 p3 catch 方法");
    });
</script>
```

![image-20221215132812661](https://attach.blog.wen7.online/202212151328706.png)

```html
<script type="text/javascript">
    Promise.resolve().then(() => {
        console.log("执行了 p1 then 方法");
    }).catch(() => {
        console.log("执行了 p3 catch 方法");
    }).then(() => {
        console.log("执行了 p2 then 方法");
        throw new Error();
    })
</script>

<!-- 等同于以下代码 -->
<script type="text/javascript">
    //p1 的状态为成功 fulfilled
    let p1 = new Promise(((resolve, reject) => {
        resolve();
    }));

    //p3 的状态为成功 fulfilled,所以不执行 p3.catch()
    let p3 = p1.then(() => {
        console.log("执行了 p1 then 方法");
    });

    //p3Success 的状态为成功 fulfilled
    let p3Success = p3.then(() => {

    })

    //p3Failure 的状态为成功 fulfilled
    let p3Failure = p3.catch(() => {
        console.log("执行了 p3 catch 方法");
    });

    p3Failure.then(() => {
        console.log("执行了 p2 then 方法");
        throw new Error();
    });
</script>
```

![image-20221215133405137](https://attach.blog.wen7.online/202212151334182.png)



API
---

| API                                | 说明                                    |
| ---------------------------------- | --------------------------------------- |
| all([promise1，promise2，......])  | 多个 Promise 对象，全部执行结束返回     |
| race([promise1，promise2，......]) | 多个 Promise 对象，最快的一个返回就返回 |
|                                    |                                         |

### all

**一个数组中所有的 Promise 都结束的时候执行**

```html
<script type="text/javascript">
    let getTime = () => {
        let date = new Date();
        let s = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;
        return s;
    }

    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {

            console.log(getTime() + "p1 执行结束");
            resolve();
        }, 1000)
    });

    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(getTime() + "p2 执行结束");
            resolve();
        }, 2000)
    });


    let p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(getTime() + "p3 执行结束");
            resolve();
        }, 3000)
    });

    let all = Promise.all([p1, p2, p3]);
    all.then(() => {
        console.log(getTime() + "执行了 all!");
    })
</script>
```

![image-20221215142531681](https://attach.blog.wen7.online/202212151425742.png)



### race

**一个数组中最快结束的立即执行，竞速**

```html
<script type="text/javascript">
    
    //将下面代码替换上述 Promise.all 部分的代码
    let race = Promise.race([p1, p2, p3]);
    race.then(() => {
        console.log(getTime() + "执行了 race!");
    })
</script>
```

![image-20221215142621227](https://attach.blog.wen7.online/202212151426267.png)



async 和 await
---

```

```

