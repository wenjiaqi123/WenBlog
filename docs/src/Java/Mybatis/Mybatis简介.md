# Mybatis

## 三层架构

![image-20210712153920446](https://attach.blog.wen7.online/image-20210712153920446.png)

## 何为 JDBC？

[百度百科-JDBC](https://baike.baidu.com/item/Java%E6%95%B0%E6%8D%AE%E5%BA%93%E8%BF%9E%E6%8E%A5/1173389?fromtitle=jdbc&fromid=485214)

Java 数据库连接（==J==ava ==D==ata==B==ase ==C==onnectivity）

Java 程序需要连接数据库，于是 java 定义了一个连接数据库的规范 ==JDBC==

而做数据库的厂商有很多，Mysql，Oracle，MariaDB 等数据库，那么如果新出了一个数据库，总不能由 java 来写一套程序去连接数据库吧，就算想写，我怎么知道你那数据库内部是怎么搞的，怎么实现的？所以每个数据库厂商都自己提供 JDBC 的实现，用以连接该数据库，对应的实现就被称为==数据库驱动==

![image-20210721153748464](https://attach.blog.wen7.online/image-20210721153748464.png)

每个数据库都自己提供了一个驱动，可以理解成 JDBC 的实现类，类比于我们生活中你买格力空调的使用说明书

使用传统的 JDBC 我们自己手动操作如何连接数据库，如何关闭数据。大概的流程和 http 请求有点像

第一步：创建一个链接，从 java 程序连接数据库

第二步：在 java 程序中写一段 sql，将 sql 发送到数据库执行

第三步：获取执行的结果，即数据库执行 sql 返回的结果



## Mybatis简介

[百度百科-Mybatis](https://baike.baidu.com/item/MyBatis/2824918?fr=aladdin)

[Mybatis官网](https://mybatis.org/mybatis-3/)

[Mybatis中文网](https://mybatis.org/mybatis-3/zh/index.html)

本是apache的一个开源项目 iBatis，2010年改名 Mybatis

Mybaits 提供了2个核心功能：==SQL Maps== （SQL映射） 和 ==Data Access Objects== （数据库的增删改查）



## ORM

ORM（==O==bject ==R==elational ==M==apping）[对象关系映射](https://baike.baidu.com/item/%E5%AF%B9%E8%B1%A1%E5%85%B3%E7%B3%BB%E6%98%A0%E5%B0%84/311152?fromtitle=ORM&fromid=3583252) 

数据库的表，每一行表示一个对象，可以映射成 Java 中的一个对象

![image-20210721165243773](https://attach.blog.wen7.online/image-20210721165243773.png)

