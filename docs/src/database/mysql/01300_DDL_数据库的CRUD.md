# DDL 数据库的增删改查

## 前言

==对于初学者而言，数据库的增删改查不重要，因为在企业工作时，很多情况下是用可视化工具创建的==



## 系统架构

数据库服务器 → 数据库系统 → 数据库 → 数据表（行+列）

![image-20220819073841264](https://attach.blog.wen7.online/20220819073841.png)



## 基础知识

- **数据库名、表名不得过长**

	- 不同版本限制长度不同，一般情况没人会写那么长
	- 推荐写法：taobao，jd，zhifubao 等
	- 推荐写法：sys_user，sys_role，sys_user_role 等

- **只能包含字母，数字，下划线**

	- 大写26 + 小写26 + 数字10 + 下划线_ = 63 个字符，只能在这 63 个字符里选
	- 不得包含空格

- **同名问题**

	- 同一个 MySQL 服务中，数据库不能重名
	- 同一个数据库中，表不能重名
	- 同一张表中，字段不能重名

- 字段命名

	- 字段不得含有保留字，如果坚持使用需要用着重号 ` 引起来

	- ```mysql
		-- 假设表名叫 order,字段名叫 select,from,order, 这下面的怎么解析
		select select,from,order
		from order
		```



## 创建和管理数据库

### 创建数据库

```mysql
-- 创建数据库
create database 数据库名;

-- 创建数据库时指定字符集
create database 数据库名 character set 字符集;

-- 创建数据库时判断是否存在,不存在才创建【推荐】
create database if not exists 数据库名;
```

![image-20220824203319796](https://attach.blog.wen7.online/20220824203319.png)

![image-20220824203431049](https://attach.blog.wen7.online/20220824203431.png)

![image-20220824203640813](https://attach.blog.wen7.online/20220824203640.png)



### 查看数据库

```mysql
-- 查看所有的数据库
show databases;

-- 查看当前所在的数据库
select database();

-- 查看数据库的创建信息
show
create database 数据库名;

-- 切换数据库
use 数据库名;
```

![image-20220824203907437](https://attach.blog.wen7.online/20220824203907.png)

![image-20220824203950332](https://attach.blog.wen7.online/20220824203950.png)

![image-20220824204102649](https://attach.blog.wen7.online/20220824204102.png)





### 修改数据库

- ==数据库不能改名==

```mysql
-- 修改数据库字符集
alter database 数据库名 character set 字符集;
```



### 删除数据库

```mysql
-- 删除指定数据库
drop database 数据库名;

-- 删除指定数据库,如果存在的话【推荐】
drop database if exists 数据库名;
```













































