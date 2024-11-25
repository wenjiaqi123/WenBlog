Maven 配置文件
===

注释删掉了，只留了一个大概结构

```xml
<?xml version="1.0" encoding="UTF-8"?>

<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 http://maven.apache.org/xsd/settings-1.2.0.xsd">
  
  <localRepository>E:\Maven\repository</localRepository>

  <!--插件组-->
  <pluginGroups>
      
  </pluginGroups>

  <!--代理-->
  <proxies>
      
  </proxies>

  <!--服务-->
  <servers>
  
  </servers>
    
  <!--镜像-->  
  <mirrors>

	 <mirror>
      <id>aliyunmaven</id>
      <mirrorOf>*</mirrorOf>
      <name>阿里云公共仓库</name>
      <url>https://maven.aliyun.com/repository/public</url>
    </mirror>

  </mirrors>

  <!-- 描述 -->
  <profiles>
  
  </profiles>


</settings>

```

参数说明
---

### localRepository

- 默认 `${user.home}/.m2/repository` 目录下

    - 如何查看 user.home 目录，在运行界面输入 `%homepath%` window 电脑一般是 C:\用户\zhangsan，这个 zhangsan 就是当前登录用户
    - ![image-20220517122702158](https://attach.blog.wen7.online/image-20220517122702158.png)

- ```xml
    <!--修改到其他位置,这样就不占用 C盘目录空间了-->
    <localRepository>E:\Maven\repository</localRepository>
    ```

    

### mirrors

- 镜像地址

- 因为 maven 会从默认仓库源下载，但是由于网站在国外，所以比较慢，我们可以切换为国内的镜像源，加快速度

    - ```xml
        <!-- 在 settings.xml 中 <mirrors> 里面-->
        <mirror>
            <id>aliyunmaven</id>
            <mirrorOf>*</mirrorOf>
            <name>阿里云公共仓库</name>
            <url>https://maven.aliyun.com/repository/public</url>
        </mirror>
        ```

        

