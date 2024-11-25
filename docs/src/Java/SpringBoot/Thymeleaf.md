# Thymeleaf

[Thymeleaf官网](https://www.thymeleaf.org/)



## HelloWorld

```xml
<!--模板引擎 thymeleaf-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

在 【resources】→【templates】下新建 index.html

![image-20210713222844820](https://attach.blog.wen7.online/20210713222844.png)

通过接口的方式返回 "index" 字符串，表示跳转到该 index.html

![image-20210713222823465](https://attach.blog.wen7.online/20210713222823.png)

页面请求 http://localhost:8080/demo



## 语法