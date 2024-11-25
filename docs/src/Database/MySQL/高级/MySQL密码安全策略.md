# MySQL密码安全策略

## 常见问题

在修改密码的时候可能会失败

```mysql
alter user 'root'@'%' identified by '123456';
```



## MySQL安全策略

- MySQL 8 以前的安全策略是采用 validate_password 插件来检测密码强度的。

  

### 开启安全策略的方式

#### ~~方式一：修改配置文件~~

修改配置文件（略）

重启 MySQL

#### 方式二：使用命令安装插件（推荐）

```mysql
# 安装插件
mysql> install plugin validate_password soname 'validate_password.so';
```

![image-20230308154544188](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230308154544188.png)

```mysql
# 卸载插件
mysql> uninstall plugin validate_password;
```

![image-20230308171455965](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230308171455965.png)



### validate_password 说明

```mysql
# 查看密码安全策略的相关属性，可以在安装插件前后分别调用以下命令查看效果。以下效果为安装 validate_password，卸载之后该命令会显示 Empty set (0.00 sec)
mysql> show variables like 'validate_password%';
```

![image-20230308170717474](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230308170717474.png)

| 参数名称                             | 值     | 参数说明                                                     |
| ------------------------------------ | ------ | ------------------------------------------------------------ |
| validate_password_check_user_name    | ON     | 设置为 ON 表示可以将密码设置成用户名                         |
| validate_password_dictionary_file    |        | 用于检查密码的字典文件的路径名，默认为空                     |
| **validate_password_length**         | 8      | 密码最小长度 ≥ 8                                             |
| validate_password_mixed_case_count   | 1      | 密码策略是 MEDIUM 或者 STONG , 密码的小写字符数量 ≥ 1 且 密码的大写字符数量 ≥ 1 |
| validate_password_number_count       | 1      | 密码必须包含的数字个数                                       |
| **validate_password_policy**         | MEDIUM | 密码强度等级，使用LOW MEDIUM STRONG 来表示<br />LOW 只检查长度<br />MEDIUM 检查长度，数字，大小写，特殊字符<br />STRONG 检查长度，数字，大小写，特殊字符，字典文件 |
| validate_password_special_char_count | 1      | 密码必须包含的特殊字符个数                                   |


如果开启了安全策略，那么密码就需要有大小写，特殊字符，数字组合符合上述配置

```mysql
mysql> alter user 'root'@'%' identified by 'root123456';
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements  #您的密码不符合当前策略要求
```

![image-20230308164743941](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230308164743941.png)

```mysql
mysql> alter user 'root'@'%' identified by 'Root_123';
Query OK, 0 rows affected (0.00 sec)	#有大写 R,有小写 oot,有特殊字符 _,有数字 123
```

![image-20230308172046315](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230308172046315.png)

### 调整策略

```mysql
# 设置密码强度等级为 LOW
mysql> set global validate_password_policy=LOW;

# 设置密码强度等级为 MEDIUM
mysql> set global validate_password_policy=MEDIUM;

# 设置密码强度等级为 STRONG
mysql> set global validate_password_policy=STRONG;
```

```mysql
# 设置密码长度为1
mysql> set global validate_password_length=1;
```

