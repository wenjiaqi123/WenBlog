# MySQL字符集

## 字符集

- MySQL 8 之前默认字符集是 `latin1` 添加中文的话会乱码
- MySQL 8 之前 utf8 指的是 `utf8mb3` 只有 3 个字节，例如 4 字节的 emoji 表情就存不下，所以在 MySQL 5.5.3 版本之后提供了 utf8mb4，支持 4 字节的 UTF-8 编码



### 查看默认字符集

```sql
# 查看默认字符集
mysql> show variables like 'character%';
```

![image-20230308180728755](https://attach.blog.wen7.online/20241126022941.png)


下面是更新后的MySQL字符集设置表格：

| 参数名称                 | 参数值                     | 说明                                      |
| ------------------------ | -------------------------- | ----------------------------------------- |
| character_set_client     | utf8mb4                    | 客户端字符集，即客户端使用的字符集。      |
| character_set_connection | utf8mb4                    | 连接字符集，即连接使用的字符集。          |
| character_set_database   | utf8mb4                    | 数据库字符集，即数据库使用的字符集。      |
| character_set_filesystem | binary                     | 文件系统字符集，即文件系统使用的字符集。  |
| character_set_results    | utf8mb4                    | 结果字符集，即查询结果使用的字符集。      |
| character_set_server     | utf8mb4                    | 服务器字符集，即服务器使用的字符集。      |
| character_set_system     | utf8mb3                    | 系统字符集，即操作系统使用的字符集。      |
| character_sets_dir       | /usr/share/mysql/charsets/ | 字符集目录，即MySQL字符集文件所在的目录。 |



### 查看支持的字符集

```sql
# 两种命令都可以查看支持的字符集
mysql> show charset;
mysql> show character set;
```

| Charset            | Description | Default collation      | Maxlen                       |
| ------------------ | ----------- | ---------------------- | ---------------------------- |
| Charset 字符集名称 | 字符集描述  | 该字符集默认的排序规则 | 存储一个字符最大占用几个字节 |

- Default collection 说明：表示该字符集默认的比较规则，包含主要作用于哪种语言，格式为 xxxxx\_地区\_后缀

    - 地区

        - utf8_polish_ci  表示以波兰语的规则比较
        - utf8_spanish_ci 表示以西班牙语的规则比较
        - gb2312_chinese_ci 表示以中文的规则比较
        - utf8_general_ci 中的 **general** 是一种通用的比较规则

    - 后缀

        - | 后缀    | 英文解释           | 说明                         | 示例                                                         |
                | ------- | ------------------ | ---------------------------- | ------------------------------------------------------------ |
          | _ai     | accent-insensitive | 表示不区分重音符号的比较规则 | 字符 "a" 和 "á" 在使用 `utf8_general_ai` 字符比较规则进行比较时，将被认为是相等的 |
          | _as     | accent-sensitive   | 表示区分重音符号的比较规则   | 字符 "a" 和 "á" 在使用 `utf8_general_as` 字符比较规则进行比较时，将被认为是不相等的 |
          | ==_ci== | case-insensitive   | 表示不区分大小写的比较规则   | 字符 "A" 和 "a" 在使用 `utf8_general_ci` 字符比较规则进行比较时，将被认为是相等的 |
          | _cs     | case-sensitive     | 表示区分大小写的比较规则     | 字符 "A" 和 "a" 在使用`utf8_general_cs`字符比较规则进行比较时，将被认为是不相等的 |
          | _bin    | binary             | 表示按照二进制比较的规则     | 在二进制比较中，字符的大小和顺序是根据它们在计算机内存中的二进制表示来确定的。字符 "A" 和 "a" 在使用 `utf8_bin` 字符比较规则进行比较时，将被认为是不相等的 |

![image-20230308200026013](https://attach.blog.wen7.online/20241126022942.png)



### 查看字符比较规则

```sql
# 查看字符比较规则
mysql> show collation;
```

![image-20230308210702559](https://attach.blog.wen7.online/20241126022943.png)

MySQL 8.0.18 版本有 272 种

- 以 utf8_unicode_ci 和 utf8_general_ci 为例：
    - utf8_general_ci 校对速度快，准确度差（一般情况够用，对只有中英文两种来说，两者差不多）
    - utf8_unicode_ci 准确度高，校对速度稍慢 （如果系统应用还涉及德语，法语，俄语等，使用 utf8_unicode_ci）



## 修改字符集

### 查看字符集

```sql
# 博主演示数据库名为 study_mysql，数据表名为 test
mysql> show create database study_mysql;

mysql> show create table test;
```

![image-20230308212608195](https://attach.blog.wen7.online/20241126022944.png)

![image-20230308212657206](https://attach.blog.wen7.online/20241126022945.png)



### 修改字符集

```sql
# 修改 xxx数据库 字符集为 utf8mb4 比较规则为 utf8mb4_unicode_ci
mysql> alter database xxx数据库名称 default character set 'utf8mb4' collate 'utf8mb4_unicode_ci';

# 修改 xxx表
mysql> alter table xxx表名称 default character set 'utf8mb4' collate 'utf8mb4_unicode_ci';
```

- 一般来说：MySQL 8 基本上都使用 utf8mb4 字符集，博主个人喜欢使用 utf8mb4_unicode_ci 排序规则

![image-20230308211149746](https://attach.blog.wen7.online/20241126022946.png)

- **如果修改了数据库的字符集和比较规则，原来已经创建表格的字符集和比较规则不会改变，如果需要改变需要单独修改**