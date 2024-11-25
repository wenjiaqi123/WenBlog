# axios

[百度百科-axios](https://baike.baidu.com/item/axios/56933453?fr=aladdin)

[axios官网](http://www.axios-js.com/)

- ==网络请求库==，vue 在 1.x 版本中，尤雨溪开发了一个 vue-resource 的插件用来网络请求，后来发现了 axios 更方便好用，于是在 2.x 的版本就废弃了 vue-resource，从而全新拥抱 axios
- 在 Vue ，React 中使用甚广



## 初识 axios

### 准备工作

[在线 JSON](https://jsonplaceholder.typicode.com/)

启动后台服务，这里提供一个基础 jar 包，下载并修改 jar 包名称为 demo.jar ，命令行启动 `java -jar demo.jar`

```markdown
# 接口 
GET		http://localhost:8080/test
```

启动好服务，可以通过浏览器访问 http://localhost:8080/test，查看请求，返回了信息，这里使用该接口模拟后端服务

![image-20210809111228595](https://attach.blog.wen7.online/image-20210809111228595.png)

### 引入 axios

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>test</title>
		<!--引入 vue -->
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
        <!--引入 axios -->
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    </head>
    <body>

        <div id="vue-app">
            <button @click="req">点我请求后端数据</button>
            <div>
                {{response}}
            </div>
            <hr>
            <div>
                {{data}}
            </div>
        </div>

    </body>

    <script type="text/javascript">
        var vue = new Vue({
            el: "#vue-app",
            data: {
                response: {},
                data: {}
            },
            methods: {
                req: function () {
                    //发起请求
                    let promise = axios.get("http://localhost:8080/test");
					//成功回调
                    promise.then((response) => {
                        this.response = response
                        console.log(response);
                        this.data = response.data
                        console.log(response.data);
                    })
                }
            }
        })
    </script>
</html>
```



## axios发起请求

### 基本格式

```javascript
axios(配置对象)
```

```js
axios({
    method:"GET",
    url:"http://localhost:8080/test",
    //设置请求头信息
    headers:{
        "Authorization":"5cfcd6bdcc54c52f6acc9f6bc5e8d60390287cb8",
        "myHeader":"自定义数据"
    }，
    //设置请求参数
    params:{
    	"name":"zhangsan",
    	"age":18
	},
    //设置请求体数据，用于 POST,PUT
    data:{
        name:"zhangsan",
        age:20
    }
})
```

- 更多配置查看官网 [axios配置](http://www.axios-js.com/docs/#Request-Config)
- method：GET/POST/PUT/DELETE/...
- params 用于 get 请求
- data 用于 post/put 请求，get和delete可以携带但是不推荐



### get

```js
axios.get("http://localhost:8080/test",{
    params:{
    	"name":"zhangsan",
    	"age":18
	}
})
```



### post

```js
axios.post("http://localhost:8080/test",{
    data:{
        name:"zhangsan",
        age:18
    }
})
```



```js
axios.post("http://localhost:8080/test",{
    name:"zhangsan",
    age:18
})
```



## axios 响应

```js
{
  // 服务器真实
  data: {},

  status: 200,

  statusText: 'OK',

  headers: {},

  config: {},

  request: {}
}
```

axios 返回的是一个 promise 对象

```js
const promise = axios.get(`http://localhost:8080/test`);
console.log(promise);

promise.then((response)=>{
    console.log(response);
    console.log(response.data);
})
```

我们实际最常使用的是 response.data 里的数据

![image-20210809124540606](https://attach.blog.wen7.online/image-20210809124540606.png)



### 实践

```js
axios.get(`http://localhost:8080/test`)
.then((resp)=>{
    //正常响应的处理
})
.catch((error)=>{
    //异常响应的处理
})
```

关于 this 的问题

```js
axios.get(`http://localhost:8080/test`)
.then(function (){
    console.log(this);
})
```

```js
axios.get(`http://localhost:8080/test`)
.then(()=>{
    console.log(this);
})
```





## axios 拦截器

```js
//请求拦截
axios.interceptors.request.use(()=>{},()=>{});
//响应拦截
axios.interceptors.response.use(()=>{},()=>{});
```

- use 里传入两个函数，第一个函数是成功处理函数，第二个是失败处理函数

```js
//请求拦截
axios.interceptors.request.use((config)=>{
    //在请求之前做一些处理
    return config;
},(error)=>{
    //当请求失败了做一些处理
    return Promise.reject(error);
});
//响应拦截
axios.interceptors.response.use((config)=>{
    //对响应数据做一些处理
    return config;
},(error)=>{
    //当响应失败了做一些处理
    return Promise.reject(error);
});
```

示例：

```js
//请求拦截
axios.interceptors.request.use((request) => {
    // 设置基础 URL
    request.baseURL = "https://localhost:8080"
    // 设置请求头
    request.headers = {
        "content-type": "application/json;charset=utf-8"
    }
    return request;
}, (error) => {
    //请求出错处理逻辑
    return Promise.reject(error)
});


//响应拦截
axios.interceptors.response.use((response) => {
    /**
     * 将 data 数据返回,项目中 this.axios的 then 获取的数据就是 data ,我们需要的真实数据了
     */
    let data = response.data;
    // 在项目中与后端协同开发,定义的响应码等都可以在这里设置
    return data;
}, (error) => {
    //响应出错处理逻辑
    return Promise.reject(error)
});
```

