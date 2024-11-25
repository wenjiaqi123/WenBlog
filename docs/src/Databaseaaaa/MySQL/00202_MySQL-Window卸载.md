MySQL 卸载
===

Step1：停止 MySQL 服务
---

### 方式一

打开服务，找到 MySQL 服务，停止服务

![image-20220708134147784](https://attach.blog.wen7.online/image-20220708134147784.png)



### 方式二

打开任务管理器，结束 mysqld.exe 任务

![image-20220708134259994](https://attach.blog.wen7.online/image-20220708134259994.png)



Step2：卸载软件
---

==软件卸载了，但是保存的数据还存在==

比如你从 5.7 的版本升级到 8.0，只是卸载软件，但是数据并不删除

好比你拿美图秀秀拍的照片，美图秀秀卸载了，但是拍的照片还在

### 方式一

打开控制面板，卸载程序，卸载 MySQL 

![image-20220708134830317](https://attach.blog.wen7.online/image-20220708134830317.png)



### 方式二

使用 360管家 或 电脑管家 卸载 MySQL



### 方式三

使用 MySQL 安装器自带的卸载工具

比如假设你使用的 mysql-installer-community-8.0.18.0.msi 安装的 MySQL

再次点击该程序，该程序会先检测是否安装 MySQL，如果已经安装了，选择要卸载的 MySQL 服务，点击 Remove 移除掉。



Step3：清理注册表
---

在不同的版本，以上步骤可能卸载不干净（一般是 5.7 及其以前的版本），还需要手动清理注册表

Win + R ，输入 regedit ，打开注册表

```markdown
计算机\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\EventLog\Application\MySQL		删除目录
计算机\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\MySQL							删除目录

计算机\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Services\EventLog\Application\MySQL		删除目录
计算机\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Services\MySQL							删除目录

计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\Application\MySQL	删除目录
计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\MySQL						删除目录

# 这里的 ControlSet001 ControlSet002 CurrentControlSet 也可能变成 003 004 等
```

[ControlSet001 注册表信息](https://wenku.baidu.com/view/90f12f1c964bcf84b9d57bc4.html)

![image-20220708140046420](https://attach.blog.wen7.online/image-20220708140046420.png)



Step4：删除环境变量
---

找到环境变量，删除相关的环境变量信息



Step5：重启
---