MySQL 安装
===

版本
---

- 社区版本（GPL）
    - 开源，免费，任意下载
    - 不提供官方支持，学习使用
- 企业版本（）
    - 付费，可试用
    - 更多功能，提供官方支持，可靠性更高
- 集群版本
    - 开源免费，集群服务器
    - 多个 MySQL Server 封装成一个 Server
- 集群付费版（CGE）
    - 付费



下载地址
---

[官网 - MySQL](https://www.mysql.com/)



![image-20220708172139323](https://attach.blog.wen7.online/image-20220708172139323.png)



![image-20220708172458010](https://attach.blog.wen7.online/image-20220708172458010.png)



![image-20220708172819403](https://attach.blog.wen7.online/image-20220708172819403.png)



![image-20220708173539488](https://attach.blog.wen7.online/image-20220708173539488.png)



安装步骤
---

### 前言

**不同版本安装的界面可能有一些小区别，不过也不影响，即使不如下面的步骤，也可以根据英文说明来阅读每一步是干嘛的**

如果第一步不是以下界面，是客户端检测到你已经安装过相关的软件，可以 remove 卸载掉。

如果以前从未装过 MySQL，第一步就是如下界面



### 步骤

![image-20220708175130665](https://attach.blog.wen7.online/image-20220708175130665.png)



![image-20220708175750577](https://attach.blog.wen7.online/image-20220708175750577.png)



**博主在 E盘: 下新建了如下目录，分别用以存放不同数据**

![image-20220708180007479](https://attach.blog.wen7.online/image-20220708180007479.png)

![image-20220708180515402](https://attach.blog.wen7.online/image-20220708180515402.png)

![image-20220708180557495](https://attach.blog.wen7.online/image-20220708180557495.png)



![image-20220708180655370](https://attach.blog.wen7.online/image-20220708180655370.png)



![image-20220709192240970](https://attach.blog.wen7.online/image-20220709192240970.png)



![image-20220709192721865](https://attach.blog.wen7.online/image-20220709192721865.png)

![image-20220709192826482](https://attach.blog.wen7.online/image-20220709192826482.png)



![image-20220709193207678](https://attach.blog.wen7.online/image-20220709193207678.png)



![image-20220709193643103](https://attach.blog.wen7.online/image-20220709193643103.png)



![image-20220709194054136](https://attach.blog.wen7.online/image-20220709194054136.png)



![image-20220709202416693](https://attach.blog.wen7.online/20220709202422.png)



### 配置环境变量

配置环境变量

![image-20220709203126897](https://attach.blog.wen7.online/20220709203127.png)

![image-20220709203230798](https://attach.blog.wen7.online/20220709203230.png)



### 启动服务

#### 可视化界面

打开【服务】，启动 MySQL，可以手动，自动等

![image-20220709205929987](https://attach.blog.wen7.online/20220709205930.png)



#### 命令

![image-20220709210041292](https://attach.blog.wen7.online/20220709210041.png)

```mysql
net start	服务名称
net stop	服务名称
```



### 检测是否安装成功

![image-20220709203422006](https://attach.blog.wen7.online/20220709203422.png)



## 安装常见错误



## DB 和 DBMS

DBMS 数据库管理系统

![image-20220709204554198](https://attach.blog.wen7.online/20220709204554.png)



DB 数据库，我们后续添加的表，数据会保存在 Data 目录下

![image-20220709204623034](https://attach.blog.wen7.online/20220709204623.png)