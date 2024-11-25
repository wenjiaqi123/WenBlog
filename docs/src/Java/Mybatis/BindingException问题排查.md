# BindingException

BindingException 绑定异常



## 是否指定 Mapper 文件

在 application.yml 中有没有添加 Mapper 文件的位置

```yml
mybatis:
  mapper-locations: classpath:mapper/*.xml,com/example/dao/*.xml
```

具体含义是编译过后的 xml 是否存在？注意查看 target

- **==注意==这里的目录分割符号是斜杠 / （com/example/dao/*.xml），而不是点 .（com.example.dao.\*.xml）**



## 启动类是否扫描

是否在每个 Dao 接口上加上 @Mapper，或者启动类上使用 @MapperScan("dao接口的包名")

推荐在启动类上使用 @MapperScan("dao接口的包名")

```java
package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.example.demo.dao")			【这里有没有扫描？】
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```



## 是否配置别名包

在 application.yml 中有没有指定别名包

```yml
mybatis:
  type-aliases-package: com.example.demo.entity,com.example.demo.model
```



## 命名空间/方法名是否匹配

查看 *Mapper.xml 中的 namespace 是否匹配

查看 id = "方法名" 和 Dao 接口中的 方法名是否匹配



Maven 重新编译
---

maven 先清除 clean，再编译 package
