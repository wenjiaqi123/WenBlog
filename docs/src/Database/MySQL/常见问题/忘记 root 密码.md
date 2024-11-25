# 忘记 root 密码

步骤：

1. 关闭 mysqld 服务进程

2. 重启 mysqld 进程，指定配置文件，跳过权限检查

	- ```sql
		-- 找到 my.ini 的位置
		mysqld  --defaults-file="xxxx/xxx/xxx/xxx/my.ini"  --skip-grant-tables;
		```

3. 新打开一个客户端连接，无密码登录

	- ```sql
		mysql -uroot
		```

4. 修改权限

	- ```sql
		-- 切换到 mysql 数据库
		use mysql;
		```

	- ```sql
		-- 更新密码,XXXXX 是你要新设置的密码
		update user 
		set authentication_string=password("XXXXX") 
		where user='root' and Host='localhost';
		```

	- ```sql
		-- 刷新权限
		flush privileges;
		```

5. 关闭 mysqld 服务进程

6. 重启 mysql 服务

7. 使用新密码登录

	

	