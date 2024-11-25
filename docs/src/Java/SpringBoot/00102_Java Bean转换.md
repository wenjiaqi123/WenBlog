# Java Bean转换

## 简介

很多情况需要将一个对象转换成另外一个对象，UserInfo 里的值，对应的塞到 User 里，如果进行手动 set/get ，会很麻烦，且枯燥，且无聊。

这时候就需要 JavaBean 互相转换了

```java
public class UserInfo {
    private long id;
    private String login;
    private String name;
    private String avatar_url;
    private String url;
    private String html_url;
    private String followers_url;
}
```

```java
public class User{
    private long id;
    private String login;
    private String name;
    private String avatar_url;
    private String url;
    private String html_url;
    private String followers_url;
    private String following_url;
}
```



常见转换工具
---

| 工具名称                 |   优点   | 缺点 | 点评   |
| :----------------------- | :------: | :--: | ------ |
| set/get                  | 简单灵活 | 繁琐 | 不推荐 |
| json                     |          |      |        |
| Apache 的 copyProperties |          |      |        |
| Spring 的 copyProperties |          |      |        |

常见：

- org.apache.commons.beanutils.PropertyUtils 中的  copyProperties(**目标bean，源bean**)

    - 性能较差
    - 反射
    - java.util.Date 不支持
    - 支持自动转换，比如 UserInfo 中的 Integer age，会转成 User 中的 String age，因为字段名相同
    - 支持 null

- Spring 中的 BeanUtils 中的 copyProperties(**源bean，目标bean**)

    - 性能一般
    - 反射
    - 没有自动转换，参数名相同，类型不同，不转换
    - 部分属性不支持 null
    - Integer，Long 等包装类不支持

- 对象转成 json，json 转成 对象

    - com.fasterxml.jackson.databind.ObjectMapper，~~com.alibaba.fastjson.JSON~~
    - 只要属性名一致即可

- mapstruct

    - 使用 SET GET 方式

- Orika

    - 性能强悍，比 BeanUtils 强悍百倍

    - 动态生成字节码

    - [技术博文](https://www.cnblogs.com/fuzongle/p/12609063.html)

    - ```xml
        <dependency>
            <groupId>ma.glasnost.orika</groupId>
            <artifactId>orika-core</artifactId>
            <version>1.5</version>
        </dependency>
        ```





## 示例

### PropertyUtils

- 需要额外依赖 commons-beanutils

```xml
<!-- commons-beanutils -->
<dependency>
    <groupId>commons-beanutils</groupId>
    <artifactId>commons-beanutils</artifactId>
    <version>1.9.4</version>
</dependency>
```

```java
import org.apache.commons.beanutils.PropertyUtils;
import java.lang.reflect.InvocationTargetException;

public class Main {
    public static void main(String[] args) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(1L);
        userInfo.setName("闻C");

        User user = new User();
        PropertyUtils.copyProperties(user,userInfo);

        System.out.println("user.getId() = " + user.getId());
        System.out.println("user.getName() = " + user.getName());
    }
}
```



### BeanUtils

- 依赖于 Spring 框架

```java
import org.springframework.beans.BeanUtils;

public class Main {
    public static void main(String[] args)  {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(1L);
        userInfo.setName("闻C");


        User user = new User();

        BeanUtils.copyProperties(userInfo,user);

        System.out.println("user.getId() = " + user.getId());
        System.out.println("user.getName() = " + user.getName());
    }
}
```

