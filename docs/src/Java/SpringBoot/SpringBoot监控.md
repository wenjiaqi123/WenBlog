SpringBoot监控
===

引入依赖
---

```xml
<!--监控 SpringBoot 指标-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

配置文件
---

```yml
management:
  endpoints:
    web:
      exposure:
        include: '*'
```

访问
---

http://localhost:8080/actuator

点进各个 href 连接查看详细信息

![image-20220510161220683](https://attach.blog.wen7.online/image-20220510161220683.png)

![image-20220510161301148](https://attach.blog.wen7.online/image-20220510161301148.png)

