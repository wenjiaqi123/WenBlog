# 使用 IntelliJ IDEA 创建 SpringBoot 项目

## 使用 Spring Initializer 创建（推荐）

【File】→ 【New】→【Project】

![image-20210711003500927](https://attach.blog.wen7.online/20210711003501.png)

【Spring Initializr】→【Default:https//start.spring.io】

<img src="https://attach.blog.wen7.online/20210711003547.png" alt="image-20210711003547885" style="zoom:80%;" />

填写信息

创建项目时 groupid 分支，org开头的是非盈利组织，例如 org.apache，com开头的是商业组织，其他的有兴趣可自行了解

![image-20210711004509760](https://attach.blog.wen7.online/20210711004509.png)

springboot 版本选择

Spring Boot 有三个重要分支: 1.5.x 和 2.0.x 和 2.1.x，官方建议 2.1.x

[Maven Repository - Spring Boot Starter](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter)

![image-20210711004914602](https://attach.blog.wen7.online/20210711004914.png)

![image-20210711005019036](https://attach.blog.wen7.online/20210711005019.png)



![image-20210711005547688](https://attach.blog.wen7.online/20210711005547.png)

每次创建项目都要修改 Maven 配置，可以在 【File】→【New Projects Settings】→【Settings for New Projects】为所有新项目统一设置

![image-20210711012836423](https://attach.blog.wen7.online/20210711012836.png)

IDEA 右下角会加载依赖，等待即可

![image-20210711005059970](https://attach.blog.wen7.online/20210711005100.png)

创建好之后删除三个文件

![image-20210711005258090](https://attach.blog.wen7.online/20210711005258.png)

启动项目

![image-20210711013232676](https://attach.blog.wen7.online/20210711013232.png)



## 目录结构说明

约定大于配置

![image-20210711013430594](https://attach.blog.wen7.online/20210711013430.png)

```markdown
demo
 |--.idea										【Idea的配置信息，和我们关系不是很大】
 |--src											【源码目录，我们主要开发就是在 src 里进行开发】
 |	 |--main									【main 里包含2个 java和 resources】
 |   |	  |--java								【源码目录】
 |   |	  |	   |--com.example.demo
 |   |	  |	   		|--DemoApplication
 |   |    |
 |   |	  |--resources							【配置文件及静态资源】
 |   |		   |--static
 |   |		   |--templates
 |   |		   |--application.properties
 |   |
 |   |--test									【单元测试】
 |    	  |--java
 |    	  |	   |--com.example.demo
 |    	  |	   		|--DemoApplication
 |        |
 |    	  |--resources
 |    		   |--application.properties
 |
 |
 |--target										【src编译后的文件】
 |   |--classes
 |   |--
 |   |--
 |
 |--.gitignore									【git忽略文件】
 |
 |--pom.xml										【pom文件】
 |
 |--External Libraries							【依赖jar包】
```

后续我们写代码会将代码按照类别放到不同的包里，基本的 controller，service，dao，entity(不同公司可能名称不同)

|     名称      | 说明                                                     |
| :-----------: | -------------------------------------------------------- |
|  controller   | 控制层                                                   |
|    service    | 业务逻辑层                                               |
|      dao      | 持久层                                                   |
|    entity     | 实体类，不同公司名称可能不同，pojo，model 等等           |
|               |                                                          |
| ------------- | 以下的包不同公司可能名称不同，路径不同，只是作为一个参考 |
|    common     | 通用                                                     |
|     utils     | 工具类                                                   |
|   constant    | 常量                                                     |
|   enumerate   | 枚举                                                     |
|    config     | 配置文件                                                 |
|  annotation   | 注解                                                     |
|   exception   | 异常                                                     |
|      ...      | ...                                                      |

![image-20210711014933651](https://attach.blog.wen7.online/20210711014933.png)



## 第一个静态页面 HelloWorld （了解）

现在流行前后端分离，前端代码单独打包部署，在后端代码里写前端已经是过去式，玩一下即可

在 resources 包下 static 里新建 index.html 里面填写 HelloWorld，在 static 包下添加一张照片

启动项目，注意控制台打印的端口号 【Tomcat started on port(s): ==8080== (http) with context path ''】

![image-20210712234120029](https://attach.blog.wen7.online/20210712234120.png)

可以修改 index.html 里的内容，重新编辑 Ctrl + F9，不需要重启，再次查看 localhost:8080/index.html

如果添加的照片等展示不出来，查看编译目录 【target】→【classes】→【static】下有没有照片或者 html，如果没有删掉 target 包，重新启动



## 模板引擎 thymeleaf（了解）

详情请参考独立文档



## 第一个程序 HelloWorld

在 pom.xml 里 dependencies 添加 web 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

![image-20210711022004371](https://attach.blog.wen7.online/20210711022004.png)

编写第一个程序 HelloWorld

![image-20210711020410359](https://attach.blog.wen7.online/20210711020410.png)

在浏览器里测试 http://localhost:8080/hello 这后面跟的 hello 就是 @RequestMapping 括号里的值

![image-20210711020554119](https://attach.blog.wen7.online/20210711020554.png)



## 使用 骨架 创建（了解）

使用 Maven 骨架创建的路径和 Spring Initializer 不太一样，但是最终还是要搞成和 Spring Initializer 一样，不建议骨架创建，可以百度自行了解。

[maven 骨架创建 SpringBoot 项目](https://www.baidu.com/s?ie=UTF-8&wd=maven%20%E9%AA%A8%E6%9E%B6%E5%88%9B%E5%BB%BA%20SpringBoot%20%E9%A1%B9%E7%9B%AE)



## 常见问题

### connect timed out

#### 问题描述

![image-20210711003616371](https://attach.blog.wen7.online/20210711003616.png)

#### 问题原因及解决方案

连接 https://start.spring.io 超时，网络问题，多试几次



### 下载依赖卡住

#### 问题原因及解决方案

可能是 Maven 没有设置或者设置有问题，设置 Maven 配置信息

可能是 Maven 的配置文件使用的默认的镜像，下载较慢，换成阿里云的

```xml
<!-- 在 Maven 的安装目录下，conf 目录下的 settings.xml 查找 <mirrors> </mirrors> 中间添加 -->
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```



### Whitelabel Error Page

#### 问题描述

![image-20210711020931377](https://attach.blog.wen7.online/20210711020931.png)

#### 问题原因

可能是请求路径不对，检查 localhost:8080/hello 是否正确

可能是类上面没有写 @ResponseBody，返回的是页面，而不是 json 数据



## pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <!-- 声明项目描述符遵循的pom模型版本  -->
    <modelVersion>4.0.0</modelVersion>

    <!--父项目的坐标-->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.2</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <!--当前项目的坐标-->
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <!--项目打包方式 jar,war,pom 等-->
    <packaging>jar</packaging>

    <!--项目名称,描述-->
    <name>demo</name>
    <description>Demo project for Spring Boot</description>

    <!--声明版本-->
    <properties>
        <java.version>1.8</java.version>
    </properties>

    <!--依赖-->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <!--构建-->
    <build>
        <!--插件-->
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

![image-20210711182956802](https://attach.blog.wen7.online/20210711183002.png)

