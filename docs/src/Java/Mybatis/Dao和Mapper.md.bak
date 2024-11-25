# Dao和Mapper

## Mapper

[//]: # (![image-20210722045230484]&#40;https://attach.blog.wen7.online/20210722045230.png&#41;)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.demo.dao.UserDao">

    <!--新增用户-->
    <insert id="insertUser" parameterType="User">
		
    </insert>

    
    <!--删除用户-->
    <delete id="deleteUserById" parameterType="Integer">

    </delete>

    
    <!--修改用户信息-->
    <update id="updateUserById" parameterType="User">

    </update>

    
    <!--查询用户信息-->
    <select id="selectUserById" parameterType="Integer" resultType="User">

    </select>

</mapper>
```

## Mapper属性

|    属性名     | 说明                                                     |
| :-----------: | -------------------------------------------------------- |
|      id       | 同一个 Mapper 文件中，id 唯一                            |
| parameterType | 入参类型，==可以不写==                                   |
|  resultType   | 增删改没有该属性，增删改返回的是影响的行数，查询有该属性 |



## Dao 和 Mapper 如何建立连接

[//]: # (![image-20210722043515420]&#40;https://attach.blog.wen7.online/20210722043536.png&#41;)

### 命名空间

Mapper 文件中的命名空间 namespace 是接口 UserDao 的全限定名

[//]: # (![image-20210722041820829]&#40;https://attach.blog.wen7.online/20210722041821.png&#41;)



### 方法名

Mapper 文件中的 id 需要和方法名一致，同一个 Mapper 文件中的 id 不能重复

[//]: # (![image-20210722042020264]&#40;https://attach.blog.wen7.online/20210722042020.png&#41;)



### 入参

参数类型，parameterType ==可以不写==

- 如果是 Integer，Double 等，只能填写包装类，不能填写 int ，double

参数个数 = 0，不写

参数个数 = 1，推荐填写

参数个数 ≥ 2，不写

[//]: # (![image-20210722042146833]&#40;https://attach.blog.wen7.online/20210722042146.png&#41;)



### 出参

返回类型，resultType，填写全限定名

- 如果是 Integer，String，Double，等 java.lang 包下的，不用全限定名，resultType="Integer"，只能是包装类，不能是 int

- 如果是 List<User> 或者 User[ ] ，resultType 也只填写 com.example.demo.entity.User，不需要填写 List

[//]: # (![image-20210722042619556]&#40;https://attach.blog.wen7.online/20210722042619.png&#41;)



入参出参说明

```yml
mybatis:
    # 别名包,比如 com.example.demo.entity.User，每次都写权限定名很麻烦
    type-aliases-package: com.example.demo.entity, com.example.demo.model
    configuration:
		# 出参转化，数据库字段可能是 user_name，JavaBean 中字段 userName，配置将下划线映射到驼峰大小写，即可将 sql 中的 user_name 转成 userName
        map-underscore-to-camel-case: true
```

