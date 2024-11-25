# 用户与权限

## 用户管理

MySQL 用户可以分为 ==root用户== 和 ==普通用户==，root 用户是超级管理员，拥有最高权限，普通用户可以通过授权，获得部分权限

### MySQL 连接

```shell
# 连接 MySQL,-h 指定连接IP(默认localhost),-P 指定连接端口(默认3306),-u 指定连接用户(默认root),-p指定密码,(-h -P -u 的参数可以中间有一个空格,-p如果写密码的话不可以有空格)
mysql -hlocalhost -P3306 -uroot -p123456
```



### 创建用户

```sql
# 创建用户并赋值密码
create user '用户名'			 identified by '密码';
create user '用户名'@'host地址'  identified by '密码';    # 如果指定用户名时不指定 host地址,默认是 %

# 示例:创建用户 zhangsan,任意ip地址都可以使用zhangsan登录,密码为 zhangsan123,新建用户的权限很少
create user 'zhangsan'@'%'      identified by 'zhangsan123';
```

![image-20230309122422051](https://xyb.wyxjava.com/20230310003025.png)



### 查询用户

```sql
# 切换到 mysql 数据库.MySQL(8.0.18版本)会自带4个数据库,information_schema、mysql、performance_schema、sys 
mysql> use mysql;

# 在 mysql 数据库中有一张表名为 user,该表有很多字段,只查询 host 和 user 两个字段即可
# host 表示可以访问的地址,% 表示任意 ip 都可以访问该数据库,localhost 只能本机可以访问该数据库,
# user 表示用户名,但是 user 表中 host 和 user 两列组成联合主键
mysql> select host,user from user;
```

![image-20230309121236985](https://xyb.wyxjava.com/20230310003027.png)



### 修改用户

```sql
# 切换到 mysql 数据库
mysql> use mysql;

# 更新 user 表中的数据
mysql> update user set user='zhang3' where user='zhangsan';

# 【刷新权限】不刷新权限的话,修改不生效,即使刷新了权限,如果 zhangsan 在某个终端一直登录的话,会保持连接
mysql> flush privileges;
```

==很少使用此方式会修改用户==



### 删除用户

#### ~~delete 删除~~（不推荐）

因为 delete 删除是删除 user 表中的数据，MySQL 系统中有关用户还有权限等其他表中有涉及，只删除 user 表中的数据其他地方会有残留，类似 windows 卸载软件，如果你只是单纯的删除文件夹，可能注册表中还有残留

```sql
mysql> delete from mysql.user where host=’%’ and user=’zhang3’;

mysql> flush privileges;
```

#### drop 删除（推荐）

```sql
# 删除用户,这里的用户1 指的是【用户名@主机地址】,没写主机地址的默认为 %
drop user 用户1[,用户2]...;

# 示例
drop user zhangsan,lisi,wangwu;
drop user zhangsan@%,lisi@localhost,wangwu@47.92.52.31;
```



## 密码管理

### 重置当前密码

用户已经登录，当前用户修改当前密码

```sql
# 官方推荐该方式, user()函数就是指代当前用户和主机地址,例如 root@%,zhangsan@localhost
alter user user() identified by '新密码';
```

```sql
# 简单
set password = '新密码';
```



### 修改他人密码

==需要拥有权限，因为 root 拥有最高权限，可以修改任意账户密码==

```sql
alter user '用户名'@'主机地址' identified by '新密码'
alter user '用户名'@'主机地址' identified by '新密码'[,'用户名'@'主机地址' identified by '新密码']...;

# 示例
alter user 'zhangsan'@'%'  identified by 'zhangsan123';
```

```sql
set password for '用户名'@'主机地址' = '新密码';

# 示例
set password for 'zhangsan'@'%' identified by 'zhangsan123';
```



## 权限管理

权限：不同级别只允许做权力以内的事。军委书记（root）发动核弹，只允许 select 操作，那就不能进行 增删改。

### 查看所有权限

```sql
# 查看所有的权限
mysql> show privileges;
```

- ==MySQL 8.0.18 版本提供的权限有 62 种：==
  - Alter、Alter routine、Create、Create routine、Create role、Create temporary tables、Create view、Create user、Delete、Drop、Drop role、Event、Execute、File、Grant option、Index、Insert、Lock tables、Process、Proxy、References、Reload、Replication client、Replication slave、Select、Show databases、Show view、Shutdown、Super、Trigger、Create tablespace、Update、Usage、XA_RECOVER_ADMIN、SHOW_ROUTINE、RESOURCE_GROUP_USER、REPLICATION_APPLIER、INNODB_REDO_LOG_ENABLE、GROUP_REPLICATION_ADMIN、FLUSH_USER_RESOURCES、PERSIST_RO_VARIABLES_ADMIN、ROLE_ADMIN、BACKUP_ADMIN、CONNECTION_ADMIN、SET_USER_ID、SESSION_VARIABLES_ADMIN、RESOURCE_GROUP_ADMIN、INNODB_REDO_LOG_ARCHIVE、BINLOG_ENCRYPTION_ADMIN、REPLICATION_SLAVE_ADMIN、SYSTEM_VARIABLES_ADMIN、SYSTEM_USER、APPLICATION_PASSWORD_ADMIN、TABLE_ENCRYPTION_ADMIN、SERVICE_CONNECTION_ADMIN、AUDIT_ADMIN、BINLOG_ADMIN、ENCRYPTION_KEY_ADMIN、CLONE_ADMIN、FLUSH_OPTIMIZER_COSTS、FLUSH_STATUS、FLUSH_TABLES

- 比较常用的有：
  - Create  创建数据库、表结构
  - Alter  创建完之后可以进行修改
  - Drop  数据库、表不用了可以删除
  - Insert、Delete、Update、Select 权限，==这是最常用的，允许在数据表上进行操作数据==
  - Index 允许创建/删除索引
  - Grant 允许授权其他用户
  - Create routine（创建函数和程序）Alter routine（更新和删除程序）Execute（执行程序）
  - File 权限：用户可以通过 MySQL 读取服务器上的文件



### 查看用户权限

```sql
# 查看当前登录用户的权限
mysql> show grants;

mysql> show grants for current_user;
mysql> show grants for current_user();

mysql> show grants for '用户名'@'主机地址';
```

![image-20230309215355136](https://xyb.wyxjava.com/20230310003033.png)



### 授权原则

- 一般只==授予最小权限==，比如一个用户只读权限，那就开放 select 即可，不让用户 insert、update、delete
- ==登录用户的主机地址限制==为固定IP地址或固定网段，通常数据库只允许应用程序所在的服务器连接
- ==回收权限或删除用户==，例如员工离职



### 授权

```sql
# 授权给用户权限
grant 权限1,权限2,权限3...   on 数据库名称.表名称   to  '用户名'@'主机地址' ;

# 对所有库,所有表开放全部权限(但是不包括 grant 权限)
grant all privileges       on  *.*             to  '用户名'@'主机地址';   
```

给相同用户添加权限，==权限叠加==

```sql
# 给 zhangsan 用户赋予 select 查询权限
grant select   on study_mysql.test   to  'zhangsan'@'%' ;

# 给 zhangsan 用户赋予 insert 插入权限,此时张三既有查询权限，也有插入权限
grant insert   on study_mysql.test   to  'zhangsan'@'%' ;
```



### 回收权限

**==用户退出重新登录之后才有生效==，用户不退出会仍然保持之前的权限，这有点小坑，但是问题不大**

```sql
# 回收用户权限
revoke 权限1,权限2,权限3...   on 数据库名称.表名称   from  '用户名'@'主机地址' ;

# 回收所有权限
revoke all privileges       on  *.*             from  '用户名'@'主机地址';   
```



## 权限表

在 MySQL 数据库中的 mysql 数据库中，还有很多其他的表来记录用户的权限

![image-20230310001158159](https://xyb.wyxjava.com/20230310003209.png)

- user 表：存储用户信息，==该表中的 Host 和 User 两个字段组成联合主键==
  - 图中的 `% zhangsan` 和 `localhost zhangsan` 是两条记录![image-20230310002956173](https://xyb.wyxjava.com/20230310003005.png)
- db 表：Host User 和 DB 数据库名称组成联合主键，用于记录用户和数据库之间的权限关系
  - ![image-20230310003247915](https://attach.blog.wen7.online/20241126023114.png)
- tables_priv 表：Host User 和 DB 和 Table_name 组成联合主键，用于记录用户和数据库、数据表之间的权限关系
  - ![image-20230310003356202](https://attach.blog.wen7.online/20241126023115.png)
- columns_priv 表：Host User 和 DB 和 Table_name 和 Column_name 组成联合主键，用于记录用户和数据库、数据表、数据列之间的权限关系
  - ![image-20230310003530204](https://attach.blog.wen7.online/20241126023116.png)





## 访问控制（了解）

当用户连接 MySQL 时，MySQL 会对其验证是否允许用户操作。该过程称为 **访问控制**，分为两个阶段：**连接核实阶段** 和 **请求核实阶段**

### 连接核实阶段

客户端连接服务器时，至少提供  **连接地址、用户名、用户密码** 三个数据，服务器收到请求后，对 **mysql.user 表中的 Host，User，authentication_string** 三个字段匹配，通过之后才能连接进入下一阶段，否则直接拒绝

![image-20230310001459459](https://xyb.wyxjava.com/20230310003011.png)





### 请求核实阶段

1. 先检查 `user` 表，是否符合 host，user 字段
2. 再检查 `db` 表，是否允许操作 db 表
3. 再检查 `tables_priv` 表，是否允许操作 table
4. 再检查 `columns_priv` 表 ，是否允许操作 column



## 角色管理

### 创建角色

```sql
# 创建角色,@主机地址可以省略,默认为 @%
create role  '角色名称'[@'主机地址'];

create role  '角色名称'[@'主机地址'][.'角色名称'[@'主机地址']];
```

```sql
# 示例:创建 boss 角色
create role 'boss';
create role 'boss'@'localhost';
```



### 查看角色

```sql
# 查看当前用户的角色
select current_role();
```



### 删除角色

```sql
drop role '角色名称';
drop role '角色名称'@'主机地址';
```



### 给角色授权

```sql
# 授权给角色权限
grant 权限1,权限2,权限3...   on 数据库名称.表名称   to  '角色名称'@'主机地址' ;

# 对所有库,所有表开放全部权限(但是不包括 grant 权限)
grant all privileges       on  *.*             to  '角色名'@'主机地址'; 
```



### 查看角色授权

```sql
# 查看角色权限
show grants for '角色名';
```



### 回收角色授权

```sql
# 回收角色权限
revoke 权限1,权限2,权限3...   on 数据库名称.表名称   from  '角色名'@'主机地址' ;

# 回收所有权限
revoke all privileges       on  *.*             from  '角色名'@'主机地址';  
```



### 给用户分配角色

```sql
grant '角色1'@'主机地址'[,'角色2'@'主机地址']  to '用户名1'@'主机地址'[,用户名2@'主机地址']; 

# 示例:授予马云 boss 角色
grant boss to user 'mayun'@'%';
```



### 激活角色

用户赋予角色，需要激活才可以使用

```sql
# 激活用户所拥有的所有角色,用户需要重新登录生效
set default role all to '用户名1'@'主机地址'[,用户名2@'主机地址'];

# 对所有角色永久激活,默认情况可以使用命令 show variables like 'activate_all_roles_on_login'; 查看
set global activate_all_roles_on_login=ON;
```



### 撤销用户角色

```sql
# 撤销用户角色,自己不能撤销自己角色
revoke 角色1'@'主机地址'[,'角色2'@'主机地址']   from '用户名1'@'主机地址'; 
```



### 设置强制角色（默认）

强制角色是每个用户的默认角色，无法被 revoke（回收）或 drop（删除）

#### 配置文件

```properties
[mysqld]
mandatory_roles='role1,role2@%,role3@localhost';
```

#### 运行时设置

```sql
set persist mandatory_roles='role1,role2@%,role3@localhost';	# 重启仍然有效
set global  mandatory_roles='role1,role2@%,role3@localhost';	# 重启失效
```

































