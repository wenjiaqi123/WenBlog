DDL 数据表的增删改查
===

## 前言

对数据类型有一定了解

==对于初学者而言，数据表的增删改查不重要，因为在企业工作时，很多情况下是用可视化工具创建的==



新增表
---

```sql
create table [if not exists] 表名(
	字段1 数据类型 [约束条件] [默认值],
   	字段2 数据类型 [约束条件] [默认值],
    字段3 数据类型 [约束条件] [默认值],
    ......
	[表约束条件]
)
```

### 简单新增

```sql
-- 创建名为 test_user 的表,表里一共有3列
create table test_user
(
    user_id   int         ,
    user_name varchar(40) ,
    user_age  int
);
```

![image-20220824205525164](https://attach.blog.wen7.online/20220824205525.png)

### 存在新增

简单新增里的创建 test_user 语句，如果再执行一遍，就会报错，`Table 'test_user' already exists` 表已经存在

```sql
-- 表不存在就创建,存在就拉倒
create table if not exists test_user
(
    user_id   int         ,
    user_name varchar(40) ,
    user_age  int
);
```



### 默认值

```sql
create table if not exists test_user
(
    user_id   int         default null,
    user_name varchar(40) default null,
    user_age  int         default null
);
```



### 拿来吧你

```sql
create table if not exists test_student
as
select *					-- 下面是查询语句,查出来的列和行,都放到新表 test_student 里去
from t_student
where 1=2					-- 如果只想要表结构,不想要数据,就添加一个不成立的条件
```

![image-20220824210607359](https://attach.blog.wen7.online/20220824210607.png)



查看表
---

```sql
-- 查看表信息
show 
create table 表名;

-- 查看表结构
desc 表名;
```

![image-20220824210041640](https://attach.blog.wen7.online/20220824210041.png)



![image-20220824211445667](https://attach.blog.wen7.online/20220824211445.png)



修改表
---

### 列的追加

```sql
-- alter:修改
alter table 表名
add [column] 列名  列类型  [first|after 列名];
```

- ```sql
	-- 给 test_user 表添加一列,列名为 user_money,类型为 浮点数 8 位整数,2 位小数, 默认添加到最后一列
	alter table test_user
	add user_money double(10,2);
	```

- ```sql
	-- 给 test_user 表添加一列,列名为 user_desc,类型为 字符串,不超过100个字符,并且添加到第一列
	alter table test_user
	add user_desc varchar(100) first;
	```

- ```sql
	-- 给 test_user 表添加一列,列名为 user_score,类型为 整型 int,并且添加到 user_age 后面一列
	alter table test_user
	add user_score int after user_age;
	```

	![image-20220824225207670](https://attach.blog.wen7.online/20220824225207.png)



### 列的修改

#### 列类型的修改

```sql
alter table 表名
modify [column] 列名 列类型 [first|alter 列名 2]
```

- ```sql
	-- 修改 test_user 表中 user_desc 字段类型,修改成 varchar(200) 个字符 
	alter table test_user
	modify user_desc varchar(200);
	```

	![image-20220824234057216](https://attach.blog.wen7.online/20220824234057.png)

	

#### 列名的修改

```sql
alter table 表名
change [column] 列名 新列名 新数据类型;
```

- ```sql
	-- 修改 test_user 表,将 user_money 修改为 user_assets,并且改成 int 类型
	alter table test_user
	change user_money user_assets int;
	```

	![image-20220824234437373](https://attach.blog.wen7.online/20220824234437.png)

	

### 列的删除

```sql
alter table 表名
drop column 列名;
```

- ```sql
	-- 将 test_user 表中的 user_assets 列删掉
	alter table test_user
	drop column user_assets;
	```

	

### 表的重命名

```sql
-- 将表名改成新表名
rename table 表名 to 新表名;

-- 将表名改成新表名
alter table 表名
rename [to] 新表名;
```

- ```sql
	-- 将表 test_user 重命名为 user_test
	rename table test_user to user_test;
	
	-- 将表 user_test 重命名为 test_user
	alter table user_test
	rename to test_user;
	```

	



删除表
---

```sql
-- 删除表
drop table 表名;

-- 删除表,表存在就删除,不存在就跳过
drop table if exists 表名;
```

- ==不能回滚==**，从删库到跑路，提前备份**
- 表结构删除，表数据删除



## 清空表

```sql
-- 清空表
truncate tabale 表名;
```

- ==不能回滚==**，从删库到跑路，提前备份**
- 表结构保留，表数据清空
- 删除表和清空表对比：
	- truncate 是将表里的数据删除，表结构保留，相当于是教室里的学生，将学生赶走，教室还在
	- drop 是删除表，同时也删除数据，相当于是赶走学生，还把教室炸了



































































