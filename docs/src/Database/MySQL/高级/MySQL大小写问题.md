# MySQL 大小写问题

## 操作系统

这是因为 windows 和 linux 操作系统的原因，你可以在 window 同一目录下新建 AA 文件夹和 aa 文件夹（报错，已经存在该文件夹），再去 Linux 目录下新建 AA 和 aa，是可以创建的，而 MySQL 作为一个软件安装在平台上，最终存储的文件还是以文件夹、文件的形式落地在磁盘上，所以导致大小写问题

- ==MySQL 安装在 Windows 环境下，全部不区分大小写==
- MySQL 安装在 Linux 环境下：==在 Linux 系统上大小写敏感==
  - 数据库名，表名，表别名，变量名严格区分大小写
  - 在 SQL 语句中，关键字和函数名是不用区分大小写的，例如 SELECT（select），FROM（from），WHERE（where），MAX()  max()
  - 列名、列别名忽略大小写



### 查看大小写规范

```sql
# 查看大小写是否敏感
show variables like '%lower_case_table_names%';
```

![image-20230308225206622](https://attach.blog.wen7.online/202303082252656.png)

![image-20230308225104791](https://attach.blog.wen7.online/202303082251858.png)

相同的命令在不同系统的 MySQL 上，结果不一样，第一张图连接的是 Window上的 MySQL 是 1，第二张图连接的是 Linux 上的 MySQL 是 0

- ==默认为 0，表示大小写敏感==
- ==设置为 1，设置大小写不敏感==，创建的数据库、表都是以小写形式存放在硬盘上，所有的 SQL 语句都会转成小写进行查询
- ==设置为 2==，创建的数据库、表按照语句的大小写格式存放，查找转换成小写进行





## Linux修改大小写规则

在 Linux 上默认大小写敏感，如果想设置成大小写不敏感需要进行修改配置：

1. 停止 MySQL 服务 `systemctl stop mysqld`
2. 备份数据目录以防万一，/var/lib/mysql 下的内容 `cp /var/lib/mysql /backup`
3. 删除数据目录，`rm -rf /var/lib/mysql/*`
4. 修改配置文件 my.cnf，`echo lower_case_table_names=1 >> /etc/my.cnf`
5. 将原来的数据库、表转换成小写，要不然找不到数据库、表
6. 启动 MySQL 服务，`systemctl start mysqld`



## SQL 建议

- ==将所有的数据库名称，表名称统一命名成小写==，比如数据库名称为 study_mysql，ali_taobao，tencent_qq，表名称为 sys_user，sys_menu

- **博主个人习惯：一切都小写**

  - 有些人习惯 关键字和函数名大写（见仁见智）

    - SELECT 这些关键字，在开发的时候要不停切换 Caps Lock 大小写键，不方便

    - 在国内中文的环境下，单词较长且大写不太方便阅读，例如 `select CHARACTER_LENGTH('hello')` 和 `select character_length('hello')`

      















































