# MySQL目录结构

## 查看 MySQL 相关目录

```shell
# find 是 linux 查找命令，/ 表示以根目录开始检索，-name 表示按照名称查找，mysql 表示包含 mysql 的目录或文件
find / -name mysql
# 由于演示机器有其他操作，可能不太一样，但是核心的应该不会有误差
```

![image-20230309025441147](https://attach.blog.wen7.online/20241126021911.png)



### 数据存储目录

#### 查找数据存储目录

##### 方式一

```mysql
# 查看数据存储在哪里
mysql> show variables like 'datadir';
```

![image-20230309031929232](https://attach.blog.wen7.online/20241126022023.png)

##### 方式二

```shell
# 查看配置文件,不同版本可能会将配置文件模块化,可以查看 /etc/my.cnf 里是否引入 my.cnf.d
cat /etc/my.cnf
```

![image-20230309032312992](https://attach.blog.wen7.online/20241126021917.png)



#### 查看数据存储目录

```shell
# 查看 /var/lib/mysql 目录下有哪些文件
ll /var/lib/mysql
```

![image-20230309030920466](https://attach.blog.wen7.online/20241126021914.png)

```shell
# 其中 study_mysql 是博主建的数据库,该数据库下有一张 test 表,以 test.ibd 格式存储
ll /var/lib/mysql/study_mysql/
```

![image-20230309031041510](https://attach.blog.wen7.online/20241126022055.png)



### MySQL 命令目录
```shell
# /usr/bin 目录是 Linux 存储可执行文件(绿色),
# /usr/bin 包含是普通用户可以执行的命令(通常是系统自带或软件包安装的，例如 MySQL安装包中的 mysql 命令)
# /usr/sbin 包含的是管理员可以使用的命令(例如 ifconfig)
# 展示 /usr/bin 目录下包含 mysql 的文件
ll /usr/bin | grep mysql
```

![image-20230309033412900](https://attach.blog.wen7.online/20241126021957.png)



### MySQL 配置文件目录

```shell
# 查看 mysql 配置文件目录
ls /usr/share/mysql/
```

![image-20230309034303984](https://attach.blog.wen7.online/20241126021921.png)

