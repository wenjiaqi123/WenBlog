# Vuex [官网](https://vuex.vuejs.org/zh/)

如果要存储一些数据，是多个组件之间共享的，如何存储？

A 和 B 两个组件依赖同一份数据，A 组件的值改变希望 B 也随之改变

- 组件内的存储数据？
    - ```vue
        <script>
        export default {
          //这个只是单个组件内存储数据
          data(){
            return{
              name:"闻C",
              age:18
            }
          }
        }
        </script>
        ```

- sessionStorage  或者  localStorage？

    - ```js
        console.log(window.sessionStorage.getItem("token"));
        console.log(window.localStorage.getItem("user"));
        ```

    - sessionStorage  会话存储，临时保存，会话结束数据被删除

    - localStorage 本地存储，以文件的形式存储在本地

    - sessionStorage localStorage 只能存储字符串，可以通过 JSON 的 stringify 和 parse 进行对象处理

    - 常用于页面之间的传值

- 组件传值？

    - 组件传值一般仅用于值的传递，总不能所有的这种 A B 共用同一份数据都使用



## Vuex

- 用于==组件之间传值==
- F5刷新（F5属于清除内存）会丢失 Vuex 数据
- Vuex 核心是 store（仓库），包含应用中的**状态** state
- 响应式，当 Vue 组件从 store 中读取的时候，store 变化，相应组件中也得到更新
- 不能直接改变 store 中的变化，只能通过提交（commit） mutation
    - 有点类似于 JavaBean 中的 SET/GET

```markdown
# vuex 和 sessionStorage localStorage
sessionStorage 会话关闭就丢失数据
localStorage 会存储在本地,但是由于是字符串保存,虽然能够通过 JSON 的 parse 解析成对象,不方便,常用于不变的数据,长久保存的
vuex 常用于多个组件之间共用一份数据,当一个组件的数据源改变,另外一个组件跟随响应变化
```



## store/index.js

store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
//注册成为 Vue 插件
Vue.use(Vuex)

//默认导出
export default new Vuex.Store({
  // 全局 state 对象,用于保存所有组件的公共数据
  state: {
  },
  // 【唯一】可以设置 state 的值，同步执行
  mutations: {
  },
  // 异步执行 mutations 方法
  actions: {
  },
  // 监听 state 最新状态,计算属性  
  getters:{
      
  },  
  //模块化
  modules: {
  }
})
```

main.js

```js
import Vue from 'vue'
import App from './App.vue'

// 引入 ./store 目录下的 index.js 文件,不写名称默认是 index.js
import store from './store'

new Vue({
    //属性 store:store 属性名和属性值相同,简写 store
    store,
    render: h => h(App)
}).$mount('#app')
```



## 用法

### state

```js
export default new Vuex.Store({
  // 定义两个值,一个字符串 myName,一个对象 user
  state: {
    myName:"闻C",
    user:{
      uName:"张三",
      uAge:18
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

- ```js
	// 可以把 this.$store 理解成数据源,存储数据的容器,
	this.$store.state.myName
	// this 可以省略
	$store.state.user
	```

- ```js
	// 通过计算属性的方式使用值
	computed: {
	    myName(){
	        return this.$store.state.myName
	    },
	    user(){
	        return this.$store.state.user
	    }
	}
	```

	

### getters

- 相当于组件内的 computed，只不过 getters 是全局的，作用于整个项目， computed 是单个组件内部的
- 方法默认有一个参数，表示 state

```js
export default new Vuex.Store({
  state: {
    myName:"闻C",
    user:{
      uName:"张三",
      uAge:18
    }
  },
  mutations: {
  },
  actions: {
  },
  //相当于组件内的 computed,只不过 getters 是全局的, computed 是组件内部的
  getters:{
    getMyName: function(state){
      return state.myName;
    },
    getUser(state){
      return state.user;
    }
  },
  modules: {
  }
})
```

```vue
<template>
  <div class="app">
    <!-- 组件中使用 --> 
    {{$store.getters.getMyName}} <br>
    {{$store.getters.getUser}} <br>
  </div>
</template>
```



### mutations

- 如果使用 `this.$store.state.myName = "闻C"` 这种方式赋值，虽然页面可以显示，但是没有赋值成功，查看F12 Vue 的 Vuex
- ==唯一==赋值的方式，使用 mutations，==同步==

```js
export default new Vuex.Store({
  state: {
    myName:"aa",
    user:{
      uName:"bb",
      uAge:0
    }
  },
  // 【唯一】【同步】设值
  mutations: {
    // 方法名随意，第一个参数是 state，后面可以有多个参数,一般对应设值即可。  
    setMyName: function(state,value){
      state.myName = value;
    }, 
    setUser: function(state,user){
      state.user.uName = user.name;
      state.user.uAge = user.age;
    }
  },
  actions: {
  },
  getters:{
  },
  modules: {
  }
})
```

- 如何使用？

    - ```js
        // 这个具体的参数根据 mutations 定义函数的时候，定义的参数来设置，第一个是 mutations 里定义的函数名
        this.$store.commit("setMyName",值)
        ```

        

### actions

- 异步
- 调用了 mutations 里定义的方法

```js
export default new Vuex.Store({
  state: {
  },
  //同步
  mutations: {
   
    setMyName: function(state,value){
      state.myName = value;
    },
    setUser: function(state,user){
      state.user.uName = user.name;
      state.user.uAge = user.age;
    }
  },
  //异步  
  actions: {
    //第一个参数是 store 上下文
    asyncSetMyName: function(store,value){
      // 调用了 mutations 里的方法  
      store.commit('setMyName',value);
    },
    asyncSetUser(store,user){
      store.commit('setUser',user)
    }
  },
  getters:{

  },
  modules: {
  }
})
```

- 如何使用？

    - ```js
        this.$store.dispatch('asyncSetMyName',值)
        ```

        

### 小结

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  /**
   * 定义状态
   * this.$store.state.myName 这种格式获取使用值
   */
  state: {
    myName:"",
    user:{
      uName:"",
      uAge:0
    }
  },
  //唯一设值方式【同步】
  mutations: {
    /**
     * 方法名随意
     * @param state this.$store.state
     * @param value 后面可以加多个参数   this.$store.commit("setMyName","张三")
     */
    setMyName: function(state,value){
      state.myName = value;
    },
    setUser: function(state,user){
      state.user.uName = user.name;
      state.user.uAge = user.age;
    }
  },
  //【异步】
  actions: {
    /**
     * 方法名随意
     * @param store this.$store 上下文
     * @param value 可以是多个参数，自己定义  this.$store.dispatch("asyncSetUser",{user对象})
     */
    asyncSetMyName: function(store,value){
      store.commit('setMyName',value);
    },
    asyncSetUser(store,user){
      store.commit('setUser',user)
    }
  },
  /**
   * 相当于组件内的 computed,只不过 getters是全局的
   */
  getters:{
    getMyName: function(){
      return this.$store.state.myName;
    },
    getUser(){
      return this.$store.state.user;
    }
  },
  modules: {
  }
})
```





## 模块化

当 state 里定义的数据很多的时候，该 index.js 将会很大很复杂，拆分成多模块

![image-20210907111911729](https://attach.blog.wen7.online/image-20210907111911729.png)

### user.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const user = {
    state:{
        name:"闻C"
    },
    mutations:{
        setName(state,name){
            state.name = name
        }
    },
    actions:{
        asyncSetName(store,name){
            store.commit('setName',name)
        }
    },
    getters:{
        getName(state){
            return state.name
        }
    }
}
export default user;
```

### index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

//引入 user.js
import user from "./user"

Vue.use(Vuex)

export default new Vuex.Store({
  //模块化
  modules: {
    user
  }
})
```

### 使用

```vue
<template>
  <div class="test-a">
    直接使用: {{this.$store.state.user.name}}
    <hr>
    组件内计算属性: {{name}}
    <hr>
    全局getters: {{this.$store.getters.getName}}
    <hr>
    <button @click="set">点我设值</button>

  </div>
</template>

<script>
export default {
  computed:{
    name(){
      //user作为 state 的一个属性
      return this.$store.state.user.name
    }
  },
  methods:{
    set(){
      this.$store.commit('setName',"张三")
    }
  }
}
</script>

<style lang="less" scoped>
</style>
```



## F5刷新

- F5 刷新会丢失 vuex 中的值
    - Vuex 是响应式的，多个组件从 store 中读取状态的时候，store 发生变化，这些组件里的值都会发生改变
    - F5 刷新，而 store 里的状态是存储在页面中的，所以 store 状态丢失，组件上所有的值也回到初始状态
- 采取的策略很多种，这里仅提供其中一种思路
    - 监听页面刷新，如果页面刷新了，将 store 里的内容存储到 sessionStorage 中，当页面打开的时候，判断 sessionStorage 中是否存在 vuex ，如果存在就从 sessionStorage 中取出并赋值给 store。



在 App.vue 组件中监听刷新事件

```vue
<template>
  <div id="app">

  </div>
</template>

<script>
export default {

  mounted() {
    /**
     * 监听刷新事件,如果 F5 刷新了,就将数据写入到 sessionStorage
     */
    window.addEventListener('unload',()=>{
      window.sessionStorage.setItem("vuex",JSON.stringify(this.$store.state))
    })

    /**
     * 从 sessionStorage 获取 vuex,如果值不为 null,对应的将值写入到对应的 state 中去
     */
    let data = window.sessionStorage.getItem("vuex");
    if(data!=null){
      let store = JSON.parse(data);
      this.$store.commit("setName",store.user.name)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
```

