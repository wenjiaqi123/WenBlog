MySQL CentOS 8 安装
===

安装前检查
---

```shell
# 查看是否安装过 MySQL
rpm -qa | grep -i mysql			
# rpm -q 开启询问模式, -a 查询全部
# | 管道符
# grep -i mysql 表示对 rpm -qa 的结果进行删选, -i 不区分大小写,删选包含 mysql 的结果
```

```shell
# 检查 mysqld 服务
systemctl status mysqld.service
```



如果有就卸载，卸载操作，查看对应的 MySQL 卸载文档



安装
---

```shell

```





查看版本
---

```shell
mysql --version
mysqladmin --version
```



服务初始化
---

```shell
# --initialize 选项默认以[安全]模式初始化,为 root 用户生成一个【临时】密码,登录后需要重新设置一个新的密码,
mysqld --initialize --user=mysql
```

```mysql
# 查看密码,具体 mysqld.log 日志在哪里,可能有一点不一样。 要是找不到，可以全系统查找该日志 find / -name mysqld.log（在 / 目录下,按照名称查找,查找 mysqld.log 的文件）
cat /var/log/mysql/mysqld.log
```

- ```shell
    # root@localhost: 后面的就是临时密码,【记录该密码】
    [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: &ylhjVIg)7lT
    ```



首次登录
---

```mysql
# 连接 mysql
mysql -hlocalhost -P3306 -uroot -p

mysql> 
```

### 重置密码

```mysql
# 重置密码
alter user '用户名'@'访问地址'  identified by '新密码';
```

- ```mysql
    # 设置 localhost 的 root 用户,密码为 root.123456
    alter user 'root'@'localhost' identified by 'root123';
    ```

### 允许远程登录

修改配置允许远程登录

- ```mysql
    use mysql;			#切换数据库
    ```

- ```mysql
    select Host,User	#查看 user 表中 Host 和 User 的权限,localhost 表示只能本机登录
    from user;
    ```

    - ![image-20220919172751632](https://attach.blog.wen7.online/202209191727688.png)

- ```mysql
    update user			# 修改 root 用户的权限为 %,表示所有来源的访问都可以
    set host = '%'
    where user = 'root';
    ```

    - 百分号 % 是通配符，比如 47.92.52.% 表示 47.92.52 为前缀的 IP 都可以访问，% 表示所有 IP 都可以访问。**生产环境应当根据自己公司的网络进行配置**

- ```mysql
    flush privileges;	# 刷新权限
    ```



远程访问
---

使用 Navicat，IntelliJ IDEA 等可视化工具访问

- 如果使用 阿里云，腾讯云等云服务器，注意安全组规则和开放端口
    - 安全组规则：阿里云和腾讯云的一层云服务器防护，开放 3306到3306 的映射
    - 防火墙端口：Linux 系统的防火墙，关闭防火墙或者开放 3306 端口

