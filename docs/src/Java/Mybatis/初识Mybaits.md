

# 初识 Mybatis

## 引入依赖

因为 Mybatis 不是 Spring 的，所以看依赖的项目，mybatis-spring-boot-starter 是以 Mybatis 开头，一般 Spring 自己的项目都是 Spring 开头

```xml
<!--Mybatis启动依赖-->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.0</version>
</dependency>
```

连接不同的数据库，就加入不同的数据库驱动

```xml
<!--MySQL 数据库驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.21</version>
</dependency>
```

## 配置文件

启动项目，发现报错了

![image-20210721185916165](https://attach.blog.wen7.online/20210721185916.png)

在配置文件中配置 数据库连接的一些属性

![image-20210721194156786](https://attach.blog.wen7.online/20210721194156.png)

```yml
spring:
  datasource:
  	# 数据库驱动
    driver-class-name: com.MySQL.cj.jdbc.Driver
    # 数据库连接 url
    url: jdbc:MySQL://localhost:3306/xiaoyuanbang?autoReconnect=true&serverTimezone=Asia/Shanghai&useSSL=false&allowMultiQueries=true&allowPublicKeyRetrieval=true
    # 用户名
    username: zhangsan
    # 密码
    password: zhangsan123
```

注意用户需要权限

```sql
grant system_user on *.* to 'root';		# 对 root 用户授予权限

# 创建用户
create user '用户名'@'主机名' identified by '用户密码';
create user 'zhangsan'@'%' identified by 'zhangsan123';		# 示例：创建用户zhagnsan，对所有主机都可访问，密码为 zhangsan123

# 授权
grant privileges on 数据库名.表名 to '用户名'@'主机名';
grant all on *.* to 'zhangsan'@'%';					# 示例：授予zhangsan所有数据库，所有表，所有权限

# 刷新权限
flush privileges;
```



## 表和数据

[sys_user.sql](https://attach.blog.wen7.online/20210722034535.sql)

![image-20210722034942457](https://attach.blog.wen7.online/20210722034942.png)



## Dao 和 Mapper

### Dao

@Mapper 功能

- 将接口交给 Spring 管理，使用了 @Mapper 可以不加 @Repository
- 生成实现类

```java
package com.example.demo.dao;

import com.example.demo.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserDao {

    List<User> selectUserList();

}
```

### Mapper

```yml
# 在 application.yml 中添加 mapper 地址
mybatis:
  mapper-locations: classpath:mapper/*.xml
```

namespace 的值填写的是接口的全限定名

```xml
<select id="方法名" resultType="映射对象的全限定名">
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.demo.dao.UserDao">

    <select id="selectUserList" resultType="com.example.demo.entity.User">
        select t.id,
               t.user_name as userName,
               t.user_pwd as userPwd,
               t.user_age as userAge
        from sys_user t
    </select>
</mapper>
```



## 整体代码

![image-20210722035937851](https://attach.blog.wen7.online/20210722035938.png)
