存储引擎
===

## MySQL 存储引擎（~~表处理器~~）

- 定义：使用不同的技术存储在文件中，每一种技术都使用不同的存储机制，索引技巧，锁定水平，最终提供不同的能力和功能。这些不同的技术就被称为存储引擎。
- 存储引擎处于文件系统之上，在数据保存到数据库之前会先传输到存储引擎，然后按照不同的存储引擎格式进行存储。



### 查看引擎

```sql
# 查看有哪些引擎
show engines;

# 查看默认的存储引擎
show variables like '%storage_engine%';
select @@default_storage_engine;
```


| 引擎 名称     | 是否支持 | 描述                                                         | Transactions | Locking  | Foreign Keys |
| ------------- | ------- | ------------------------------------------------------------ | ------------ | -------- | ------------ |
| FEDERATED     | NO      | Federated MySQL storage engine                               |              |          |              |
| MEMORY        | YES     | Hash based, stored in memory, useful for temporary tables    | NO           | NO       | NO           |
| ==InnoDB（8.0默认）== | ==DEFAULT== | ==支持事务、行级锁，外键== | YES          | YES      | YES          |
| PERFORMANCE_SCHEMA | YES | Performance Schema                                            | NO           | NO       | NO           |
| ==MyISAM==    | YES     | MyISAM storage engine                                         | NO           | NO       | NO           |
| MRG_MYISAM    | YES     | Collection of identical MyISAM tables                         | NO           | NO       | NO           |
| BLACKHOLE     | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO       | NO           |
| CSV           | YES     | CSV storage engine                                            | NO           | NO       | NO           |
| ARCHIVE       | YES     | Archive storage engine                                        | NO           | NO       | NO           |



### 修改存储引擎

**5.5 版本以前默认是 MyISAM，5.5 及之后版本以后默认是 InnoDB**

#### 命令行模式修改

```sql
set default_sotrage_engine=MyISAM;
```

####  配置文件修改

修改 my.cnf（Linux）

```properties
default-storage-engine=MyISAM
```

```shell
# 重启 MySQL 服务
systemctl restart mysqld.service
```

#### 修改表存储引擎

```sql
# 一般是表已经建好,修改存储引擎,很少用,一般情况表建好就不会再改存储引擎
alter table 表名 engine=MyISAM;
```



## 引擎简介

### Archive（归档）

- 用于数据存档，仅支持**插入**和**查询**，插入后不可修改和删除，一般当做仓库使用，比如档案，日志，数据采集等

- 在插入的时候实时进行 zlib 压缩，插入效率很高，查询较差，因为压缩的原因，只有 MyISAM 的 $\frac{1}{4}$，只有 InnoDB 的 $\frac{1}{5}$ 左右

- 5.5版本以后支持索引

- 存储文件名为 xxx.arz

  

### Blackhole （黑洞）

- 不会存储数据，读取数据为空
- 会记录 binlog 日志
- 常用于复制数据到备份库（例如主从复制减轻主库压力）



### CSV

- 使用 csv 文件作为 MySQL 表来处理，可以用 excel 读取
- 不支持索引
- 存储文件名为 xxx.csv



### Memory（内存）

- 存储在内存中，速度非常快，当 MySQL 崩溃或重启之后，数据会丢失
- 支持哈希索引和 B+树索引
- 物理磁盘会生成一个和表名相同的 xxx.frm，但是数据会存储在内存中
- 常存储一些内容不是很大，但是需要经常快速访问的数据，表大小默认 16MB，**在实际企业级开发中，一般会有其他手段来完成这些功能，比如 Redis **



### Mrg_MyISAM（merge：合并）

- 管理多个 MyISAM 表构成的表集合



### Federated（联邦）

- 采用代理的方式，可以远程访问其他机器上的 MySQL 中的表
- 默认不支持



### NDB Cluster

- 这里演示的 MySQL 版本是单机版的，所以没有
- 用于 MySQL 集群环境，因为企业级 MySQL 一般不会只有一台，而是以集群的方式来提供服务





InnoDB 和 MyISAM
---

|   引擎   | MyISAM                                  | InnoDB                               |      |
| :------: | --------------------------------------- | ------------------------------------ | ---- |
|   版本   | MySQL 5.5 之前默认                      | 5.5 及之后默认                       |      |
|          |                                         |                                      |      |
| 锁的级别 | 表级锁（table-level locking）           | 行级锁（row-level locking）和 表级锁 |      |
|   事务   | 不支持                                  | 支持                                 |      |
| ~~外键~~ | ~~不支持~~                              | ~~支持~~                             |      |
|          |                                         |                                      |      |
| 安全恢复 | 不支持                                  | 支持                                 |      |
|          |                                         |                                      |      |
| 应用场景 | 不需要事务支持，以 插入、查询为主的数据 | 需要事务支持，CRUD 的数据            |      |

- 版本：==5.5 之前默认是 MyISAM，5.5 及之后默认是 InnoDB==
- 锁的级别：
    - MyISAM 只支持表级锁
    - InnoDB 既支持表级锁又支持行级锁，InnoDB 默认行级锁
    - InnoDB 支持 MVCC，MVCC 可以看成是行级锁的升级，有效减少加锁操作。MyISAM 都不支持行级锁，又何谈 MVCC 
- 事务：
    - MyISAM 不支持事务
    - InnoDB 支持事务，可以 提交（commit） 和回滚（rollback） 
- 崩溃之后安全恢复  
    - InnoDB 在异常崩溃之后，数据库重启的时候会恢复到崩溃之前的状态。该恢复过程依赖于 redo log
- 文件存储方式
    - InnoDB 索引即数据，索引和数据保存在一起
    - MyISAM 索引是一个独立文件，数据是一个独立文件




### InnoDB 和 MyISAM 文件存储结构

假设有数据库 study_mysql 表 aaa、bbb

![image-20230310191704736](https://attach.blog.wen7.online/20230310191725.png)

![image-20230310191719578](https://attach.blog.wen7.online/20230310191723.png)

