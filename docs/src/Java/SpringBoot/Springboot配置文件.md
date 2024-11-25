# SpringBoot配置文件

<img src="https://attach.blog.wen7.online/20210712231732.png" alt="image-20210712231731926" style="zoom: 80%;" />

配置文件从上往下加载，最后的 properties 会覆盖前面的 yml ，也就是 properties 优先级更高



## properties

修改启动端口，并重新启动，从浏览器测试

![image-20210711024414048](https://attach.blog.wen7.online/20210711024414.png)

![image-20210711024308825](https://attach.blog.wen7.online/20210711024308.png)



## yml/yaml（官方推荐）

YML：YAML Ain't a Markup Language

- k: v 表示键值对关系，==冒号后面必须有一个空格==

- 使用空格的缩进表示层级关系，空格数目不重要，只要是左对齐的一列数据，都是同一个层级的

- 大小写敏感

- ==缩进时不允许使用Tab键==，只允许使用空格

- 松散表示，在 yml 中属性的名称 user-name 和 userName 是完全相同的，yml 中 user-name 也能对应 java 代码 userName

- 注释使用 #

	```yaml
	my:
	  userName: "闻 老 C"
	  date: 2020/07/07
	  wife:
	    name: 迪丽热巴
	    age: 20
	  friend: {name: 古力娜扎,age: 30}
	  animal: dog,cat,rabbit
	  car: benz,BMW,Audi
	```
	
	![image-20210711025326432](https://attach.blog.wen7.online/20210711025326.png)
	
	

## 属性加载 @Value("${}")

### 字符串

读取字符串写到浏览器，可能会有字符乱码问题，注意 IDEA 右下角 yml 的编码格式，设为 UTF-8，Spring Boot 是以 ISO-8859 的编码⽅式读取

![image-20210711030441271](https://attach.blog.wen7.online/20210711030441.png)



### 日期

![image-20210711031828421](https://attach.blog.wen7.online/20210711031828.png)



### 对象

![image-20210711031639102](https://attach.blog.wen7.online/20210711031639.png)

![image-20210831120813963](https://attach.blog.wen7.online/image-20210831120813963.png)



### List/数组

![image-20210711034714413](https://attach.blog.wen7.online/20210711034714.png)



### 静态字段的引用（了解）

通过 @Value("${my.desc}") 给形参 d 赋值，通过 set 的方式给 static String desc 设值

![image-20210712195143948](https://attach.blog.wen7.online/20210712195144.png)

如图所示：我们可以对 String name 赋值，也可以对 set 方法参数赋值

|        方式         |      好处      |     坏处      |       推荐       |
| :-----------------: | :------------: | :-----------: | :--------------: |
|     对字段赋值      | 简单/方便/美观 | 破坏了封装性  | 个人推荐字段赋值 |
| 对 set 方法参数赋值 |                | 不方便/不美观 |   spring 推荐    |



## 属性加载 @ConfigurationProperties(prefix = "")

![image-20210713004409846](https://attach.blog.wen7.online/20210713004409.png)

```yml
person:
  name: 闻老C
  age: 18
  money: 5.2
  cars:
    - benz
    - BMW
    - Audi
  hobby:
    - 吃饭
    - 睡觉
    - 打豆豆
  map:
    k1: v1
    k2: v2
  dog:
    dName: 哈士奇
    dAge: 4

  #cars: benz,BMW,Audi
  #hobby: 吃饭,睡觉,写代码
  #map: {k1: v1,k2: v2}
  #dog: {dName: 哈士奇,dAge: 4}
```

@ConfigurationProperties(prefix = "") 使用该注解时会上面有提示报红，不影响运行

注意 

![image-20210713001048444](https://attach.blog.wen7.online/20210713004422.png)

可以在 pom.xml 中添加依赖

```xml
<!--注解执行器,用以压制 @ConfigurationProperties 报红-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

```java
// 如果还报红，就再加上一个注解
@EnableConfigurationProperties({当前类的类名.class})
@EnableConfigurationProperties({Person.class})

// 实在不行,加上warning压制注解
@SuppressWarnings("all")
```

如果配置了注解执行器，我们在定义好对象以后，填写配置文件就很方便

![image-20210713005822262](https://attach.blog.wen7.online/20210713005822.png)

还可使用 JSR-303 对 Bean 做数据校验，详情请参考独立文档



## 参数之间引用

![image-20210711034947634](https://attach.blog.wen7.online/20210711034947.png)





## 随机数

![image-20210711035730703](https://attach.blog.wen7.online/20210711035730.png)

```yml
# 自定义属性
my:
  # 随机uuid
  id: ${random.uuid}

  # 随机字符串
  str: ${random.value}

  # 随机int
  int: ${random.int}

  # 随机long
  long: ${random.long}

  # 10以内的整数
  i1: ${random.int(10)}

  # [10-20]随机一个整数
  i2: ${random.int[10,20]}
```



## 命令行设置属性值

打成 jar 包

如果右侧栏没有 【Maven】，鼠标移动到 IDEA 左下角图标，选择 Maven

![image-20210711040023834](https://attach.blog.wen7.online/20210711040023.png)

```bat
# 启动项目
java -jar  xxx.jar
# 指定参数
java -jar  xxx.jar  --server.port=9090		# 相当于在配置文件里指定端口号
```

![image-20210711040312489](https://attach.blog.wen7.online/20210711040312.png)

![image-20210711040344153](https://attach.blog.wen7.online/20210711040344.png)



## 多环境配置

一个项目可能在多种环境下运行，在公司有开发/测试/生产环境等。如果每次从开发环境切换到测试环境，都修改一下配置文件很麻烦，所以使用多环境配置

|   环境   |    英文    | 说明     |
| :------: | :--------: | -------- |
|   dev    |  develop   | 开发环境 |
|   test   |    test    | 测试环境 |
|   pre    |  prepare   | 灰度发布 |
| pro/prod | production | 生产环境 |

创建三个文件，配置文件名称需要符合 ==application-{profile}.yml== 规则

application-dev.yml		开发环境配置

application-prod.yml	  生产环境配置

application-test.yml		测试环境配置

在 application.yml 指定默认配置 

```yml
spring:
	profiles:
		active: dev
```

<img src="https://attach.blog.wen7.online/20210711042132.png" alt="image-20210711042132653" style="zoom:200%;" />

如果在测试环境只需要在后面设置命令行参数

```bat
java -jar xxx.jar  --spring.profiles.active=test
```



## 配置文件是怎么进行配置的？

### 配置原理

一个框架肯定有很多配置信息，如果想整合进 Spring，肯定要做一些基本的配置，

比如 redis ，可能要配置 host port name pwd timeout等，有些配置不是必要的，有些则是必要的，

所以 springboot 提供了一种策略

![image-20210713211636903](https://attach.blog.wen7.online/20210713211637.png)

SpringBoot 启动会自动加载一些配置类，命名格式为 XxxxAutoConfiguration，上图蓝色方框

这些配置类可以在【org.springframework.boot:spring-boot-autoconfigure】包下 META-INF 下【spring.factories】查看

![image-20210713211741187](https://attach.blog.wen7.online/20210713211741.png)

XxxxAutoConfiguration 会加载 XxxxProperties 的类

XxxxProperties 通过 @ConfigurationProperties("") 来获取我们填写的参数

### debug: true

可以在 application.yml 中配置

```yml
# 开启查看哪些启动了自动配置
debug: true
```

控制台查看

Positive matches	已经开启的自动装配

Negative matches  没有自动装配的



