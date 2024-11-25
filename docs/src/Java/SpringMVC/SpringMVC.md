# SpringMVC

[百度百科-SpringMVC](https://baike.baidu.com/item/spring%20MVC/5627187?fr=aladdin)



说是一个框架，其实就是 spring 的一个模块独立出来的，Spring web MVC

![image-20210712153920446](https://attach.blog.wen7.online/20210719000617.png)

## MVC  是什么？

Model：可以理解成我们 java 中的 JavaBean，前后端传输数据时，可以将数据封装成一个对象

View：视图，可以理解成前端页面

Controller：控制层，可以简单粗暴的当成后端中的 Controller 层



## 接口/Servlet是什么？

如图所示：每一个红框就是一个接口，一个 DemoController **约等于**之前学的 Servlet（Server + Applet），服务端小程序。

你可以将一个红框称为一个**==接口==**，一个处理器 **==Handler==** 都可以

![image-20210719000450977](https://attach.blog.wen7.online/20210719000556.png)



## DispatcherServlet

### 初识

前端控制器 DispatcherServlet，Dispatcher [调度员]  Servlet [服务端小程序]

DispatcherServlet 本质就是 Servlet

~~以前在 SSM 的时候，还需要我们自己手动配置，现在 SpringBoot 导入 web 的依赖直接就可使用~~，看一下源码，DispatcherServlet 继承 HttpServlet 实现 Servlet

![image-20210719095132004](https://attach.blog.wen7.online/image-20210719095132004.png)

前端发起的请求，都会经过 DispatcherServlet ，然后再分发给各个接口

![image-20210719095333461](https://attach.blog.wen7.online/image-20210719095333461.png)

### 组件

查看源码，有很多组件

![image-20210719220022697](https://attach.blog.wen7.online/20210719220022.png)

==处理器映射器== HandlerMapping

==处理器适配器== HandlerAdapter

==处理器== Handler 可以理解成我们写的每一个接口

视图解析器 （现在流行前后端分离，对于视图解析器不过多讲解，自行了解）

...

其实 DispatcherServlet 并不全是自己完成所有的功能，而是注册了很多组件，通过这些组件来完成对应的功能，所谓组件，其实就是一个类。



## HandlerMapping

处理器映射器 HandlerMapping，Handler [处理器]  Mapping [映射器]

前端有很多不同的请求，后端也有很多不同的接口（处理器），前端控制器 DispatcherServlet 是如何一 一对应找到各个处理器去工作的呢？前端控制器有一个小弟，HandlerMapping 处理器映射器，映射的是什么呢？就是 @RequestMapping 里面的 url 路径

![image-20210719223902580](https://attach.blog.wen7.online/20210719223902.png)

## @RequestMapping

### 说明

```java
// 该注解可以加在 类/接口/枚举/注解 方法上
@Target({ElementType.TYPE, ElementType.METHOD})
// 该注解保留到运行期
@Retention(RetentionPolicy.RUNTIME)
@Documented
// 
@Mapping
public @interface RequestMapping {
    //默认名称
    String name() default "";

    /**
    * value 和 path 互为别名
    * 可以使用 @RequestMapping(value = {"aa","bb"}) 指定多个值，这样前端 /aa 或者 /bb 都能被映射到该接口
    */
    @AliasFor("path")
    String[] value() default {};

    @AliasFor("value")
    String[] path() default {};
    
	/**
    * 支持的 HTTP 请求方式
    * @RequestMapping(value = "hello",method = {RequestMethod.GET,RequestMethod.POST})
    * RequestMethod 枚举类的几种方式，现在一般使用 Restful 风格，GET/POST/PUT/DELETE 4种较为常用
    */
    RequestMethod[] method() default {};

    /**
    * @RequestMapping(value = "test",params = "myName=aaa") 只处理请求参数中 myName=aaa 的请求
    */
    String[] params() default {};

    /**
    * 
    */
    String[] headers() default {};

    /**
    * @RequestMapping(value = "test",consumes = "application/json") 只处理请求 Content-Type 为 application/json 的请求
    */
    String[] consumes() default {};

    /**
    * @RequestMapping(value = "test",produces = "application/json") 方法返回类型 Content-Type 为 application/json
    */
    String[] produces() default {};
}
```

### 示例

该注解可以加在类上面，一般是按照模块划分，加在每个方法上，根据不同的功能划分

http://localhost:8080/demo/aa

http://localhost:8080/demo/bb

http://localhost:8080/demo/cc

![image-20210719225711511](https://attach.blog.wen7.online/20210719225711.png)



**浏览器地址栏里输入的 url ，请求方式默认是 GET 请求**

请求 url 相同，不同 Http 请求方式，这就是 ==restful 风格==，对应增删改查

GET:	 http://localhost:8080/demo/test  	查询

POST:   http://localhost:8080/demo/test	新增

PUT: 	http://localhost:8080/demo/test 	修改

DELETE: http://localhost:8080/demo/test	删除

![image-20210719230337667](https://attach.blog.wen7.online/20210719230337.png)

框架对请求方式又进行了一次封装，可以自己使用以下四个注解，直接替代上图 method = RequestMethod.GET/POST/PUT/DELETE

```java
@GetMapping
@PostMapping
@PutMapping
@DeleteMapping
```



## 流程图

SpringMVC 三大组件 ==处理器映射器== ==处理器适配器== ==视图解析器==

现在流行前后端分离，虽然有视图解析器，但是市场的走向是不会再返回到以前 前后端代码都写在后端的年代的，现在前后端的交互都通过 json 数据，那么对于视图解析器有兴趣可以自行查阅资料学习。

执行步骤

① 用户发起请求 Request

② 前端控制器发送给处理器映射器去寻找应该找哪个方法去处理

③ 返回一个 HandlerExecutionChain 处理器执行器链（可以查看接口 HandlerMapping ）

④ 前端控制器将请求发送给处理器适配器，对数据再处理一下

⑤ 数据到达我们定义的方法中

.... 具体的处理逻辑

⑥ 返回一个 ModelAndView ，虽然我们方法中可能返回的是string，int，框架给我们封装了。（可以查看接口 HandlerAdapter）

⑦ 继续返回 ModelAndView

~~视图解析器进行解析~~

⑧ 返回给前端

![image-20210719234152606](https://attach.blog.wen7.online/20210719234152.png)



































