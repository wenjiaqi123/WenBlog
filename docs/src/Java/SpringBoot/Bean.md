# Bean

![image-20210712200427475](https://attach.blog.wen7.online/20210712200427.png)

## @Component

```java
@Controller		Controller层
@Service		Service层
@Repository		Dao层
@Component		其他
```

最初版本只有 @Component 注解，后续根据三层分层，添加了 @Controller @Service @Repository 三个注解，分别给 Controller 层，Service 层，Dao 层使用，这4个注解的功能完全一样

被上述4个注解扫描，Spring 会自动创建一个 bean，==该 bean 的 id 为类名首字母小写==

假设有一个类 UserService 类，被 @Service 扫描，会在 Spring 容器中有一个 id 为 userService 的 bean，我们就可以使用 userService

![image-20210714170738847](https://attach.blog.wen7.online/image-20210714170738847.png)

==也可以自己指定该 bean 的 id（大部分情况不会手动指定，一般都使用默认），不指定默认是该类的 首字母小写==

![image-20210715100848074](https://attach.blog.wen7.online/image-20210715100848074.png)



## @ComponentScan

```java
// 这个可以理解成容器
AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(DemoApplication.class);
```

DemoApplication 是程序入口，该类上有一个注解 @SpringBootApplication，而该注解点进去是由其他注解组成的。其中有一个 @ComponentScan

### 作用

```java
// @ComponentScan(value = "com.example")  扫描 com.example 包下的类,如果类上被标注 @Controller @Service @Repository @Component 就被扫描
@ComponentScan	扫描包
```

### 说明

==熟悉 value 和 basePackages 属性即可==

```java
// 元注解,ComponentScan 保留到运行期
@Retention(RetentionPolicy.RUNTIME)
// ComponentScan可以使用在 类/接口/枚举/注解
@Target({ElementType.TYPE})
// 在 javadoc 生成文档时会显示 @Documented 注解
@Documented
@Repeatable(ComponentScans.class)
public @interface ComponentScan {
    /**
    *【熟悉 value 和 basePackages 属性即可】
    * value 和 basePackages 互为别名
    * String[] 可以使用 @ComponentScan(value = {"com.aaa","com.bbb"}) 扫描多个包
    */
    @AliasFor("basePackages")
    String[] value() default {};

    @AliasFor("value")
    String[] basePackages() default {};
    
    
	// 指定具体扫描的类 @ComponentScan(basePackageClasses = {Person.class, User.class}) 扫描指定的类，和该类所在的包及其子包下的组件
    Class<?>[] basePackageClasses() default {};

    /**
    * bean 名称生成器
    * 假设 UserService 类被 @Service 扫描，Spring 容器中就有一个 id 为 userService 的 bean。这是默认生成规则，类名首字母小写，可以使用该属性自行     * 指定 bean 的 id 命名方式，不推荐修改，使用极少
    */
    Class<? extends BeanNameGenerator> nameGenerator() default BeanNameGenerator.class;

    // 每个 bean 都有 scope(作用域) 范围，该属性就用来处理 bean 的 scope 范围，使用极少
    Class<? extends ScopeMetadataResolver> scopeResolver() default AnnotationScopeMetadataResolver.class;

    // scopedProxy 与 scopeResolver 互斥，指定 bean 的作用域代理，使用极少
    ScopedProxyMode scopedProxy() default ScopedProxyMode.DEFAULT;

    // 默认扫描的是 *.class
    String resourcePattern() default "**/*.class";

    // 默认开启检测，开启状态也就是对 @Controller 等4个注解进行检测
    boolean useDefaultFilters() default true;

    // 包含过滤器
    ComponentScan.Filter[] includeFilters() default {};

    // 排除过滤器
    ComponentScan.Filter[] excludeFilters() default {};

    // 扫描的类是否懒加载，默认 false
    boolean lazyInit() default false;

    // 内部过滤器
    @Retention(RetentionPolicy.RUNTIME)
    @Target({})
    public @interface Filter {
        FilterType type() default FilterType.ANNOTATION;

        @AliasFor("classes")
        Class<?>[] value() default {};

        @AliasFor("value")
        Class<?>[] classes() default {};

        String[] pattern() default {};
    }
}
```



## @Bean (搭配 @Configuration)

### 作用

以上使用 @Controller @Service @Repository @Component 可以注入对象，但是需要在类的上面添加注解，如果我们引用的是第三方 jar 包，别人是已经写好的代码，怎么可能让你自己加注解呢？所以我们还有一种方式能够注入别人已经写好的类。

![image-20210715095630721](https://attach.blog.wen7.online/image-20210715095630721.png)

@Bean 自己设置某一个类加入容器，指定 bean 的 id，==不指定默认为方法名==

==需要搭配 @Configuration 注解来使用==  也就是 @Bean 需要在被 @Configuration 修饰的类里去填写

> 查看 @Configuration 注解，其实使用 @Component 也可以，但是可能会有其他问题(自行了解,例 initMethod)，==官方推荐使用 @Configuration==



### 说明

```java
// @Bean 可以使用在 方法/注解
@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
// 元注解,@Bean 保留到运行期
@Retention(RetentionPolicy.RUNTIME)
// 在 javadoc 生成文档时会显示 @Documented 注解
@Documented
public @interface Bean {
    /**
    *【熟悉 value 和 name 属性即可】
    * value 和 name 互为别名
    * String[] 可以使用 @Bean(value = {"user","myUser"}) 指定多个值，不指定默认为 方法名
    */
    @AliasFor("name")
    String[] value() default {};

    @AliasFor("value")
    String[] name() default {};

    /** @deprecated */
    // @Deprecated 表示此方法或类不再建议使用，调用时也会出现删除线，可用但不推荐使用，还有更好的方法可以调用。
    @Deprecated
    Autowire autowire() default Autowire.NO;

    // 容器在自动装配对象时，查找 bean，是否将该 bean 作为候选者
    boolean autowireCandidate() default true;

    // 初始化某个方法
    String initMethod() default "";

    // 销毁某个方法
    String destroyMethod() default "(inferred)";
}
```



## Bean 注入小结

```markdown
@SpringBootApplication 注解里包含了  @ComponentScan
所以能够扫描启动类 DemoApplication 所在的包及其子包下的类
只要这些类被 @Controller @Service @Repository @Component注解了，就能自动扫描进容器，并且 id 默认为类名首字母小写，可修改

在自己的项目中，类上加注解随便加，但是引用第三方 jar 包时，这些类都是别人已经写好的，无法给类上加注解
可以通过 @Bean + @Configuration 来注入对象，id 默认为方法名首字母小写，可修改
```



## 初始化及销毁

### @PostConstruct 和 @PreDestroy

被 @PostConstruct 修饰的方法在初识化的时候会执行

被 @PreDestroy 修饰的方法在销毁前执行（相对 @PostConstruct 而言很少用）

![image-20210715132139550](https://attach.blog.wen7.online/image-20210715132139550.png)



### @Bean(initMethod = "",destroyMethod = "")

![image-20210715132704915](https://attach.blog.wen7.online/image-20210715132704915.png)



### implements InitializingBean, DisposableBean

![image-20210715133534321](https://attach.blog.wen7.online/image-20210715133534321.png)



### 三种方式的顺序（了解）

![image-20210715135915374](https://attach.blog.wen7.online/image-20210715135915374.png)

初始化

1.  @PostConstruct
2.  接口 InitializingBean 的方法 afterPropertiesSet
3. @Bean 的 initMethod

销毁

1. @PreDestroy
2. 接口 DisposableBean 的方法 destroy
3. @Bean 的 destroyMethod



## @Scope 默认单例

scope 指定 bean 的类型

|  Scope 参数   | 说明                                                         |
| :-----------: | ------------------------------------------------------------ |
|   singleton   | ==默认单例==，容器中只有一个对象，每次返回都是同一个         |
|   prototype   | 原型多例，每获得一个 bean，都会在容器中创建一个 bean         |
|    request    | web环境，每接收一个新的请求就创建一个 bean，同一个请求里使用同一个 bean |
|    session    | web环境，每接收一个新的会话就创建一个 bean，同一个会话里使用同一个 bean |
| globalSession | web环境，                                                    |

![image-20210715142413187](https://attach.blog.wen7.online/image-20210715142413187.png)



## @Lazy 默认懒加载

```java
//作用目标
@Target({ElementType.TYPE, ElementType.METHOD, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.FIELD})
//元注解
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Lazy {
    // 默认懒加载
    boolean value() default true;
}
```

容器创建的时候，并不会直接加载所有的 bean，而是当我们使用前一瞬间，容器才开始加载

![image-20210715150123611](https://attach.blog.wen7.online/image-20210715150123611.png)

测试步骤：

1. 启动 DemoApplication，控制台不会打印
2. 启动 单元测试，控制台打印了
3. 尝试将注解设置成 false， @Lazy(value = false) 再次测试查看效果



## 使用

### @Resource

从容器中获取一个 bean，拿来使用，替代了我们之前学习的 DemoService service = new DemoService();

相当于上面测试时的 AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(DemoApplication.class);

![image-20210715151540917](https://attach.blog.wen7.online/image-20210715151540917.png)



### @Autowired

功能效果基本类似于 @Resource

![image-20210715153248067](https://attach.blog.wen7.online/image-20210715153248067.png)



### @Resource 与 @Autowired 区别

#### @Resource 

![image-20210715153752588](https://attach.blog.wen7.online/image-20210715153752588.png)

准备测试：

1. 在 service 包下新建 DemoService 类，如上图白框
2. 在 service 包下新建 impl 包，在 impl 包下新建 DemoService 类，如上图白框
3. 在 DemoController 中引用 DemoService

```java
import com.example.demo.service.impl.DemoService;		【注意这里导入的包，是什么类型】

@Controller
@ResponseBody
public class DemoController {

    @Resource
    private DemoService demoService;			【注意这里的名称 demoService 就是容器中 bean 的 id】
}
```

```java
@Resource 注解会先根据【名称(即 demoService)】去匹配容器中的 bean
    |
    |-- 容器中有同名 bean，注入该 bean
	|
    |-- 容器中没有同名 bean，根据 @Resource(type = DemoService.class) 导入的 import 类型注入 bean
    
【先名称后类型】
```



#### @Autowired 和 @Qualifier("")

![image-20210715160552189](https://attach.blog.wen7.online/image-20210715160552189.png)

准备测试：

1. 在 service 包下新建 DemoService 接口
2. 在 servcie 包下新建 impl 包，在 impl 包下新建 DemoServiceA，DemoServiceB 两个类都 implements DemoService
3. 在 DemoController 中引用 DemoService

```java
import com.example.demo.service.DemoService;			【这里导入的包是接口】

@Controller
@ResponseBody
public class DemoController {

    @Autowired
    private DemoService demoService;			【这里的名称 demoService既不是 demoServiceA 也不是 DemoServiceB】
}
```

启动会报异常，在容器中找到了2个 bean 都符合，因为是根据接口类型去查找，找到2个实现类都是 DemoService 的实现类，但是无法判断取哪一个

```java
Field demoService in com.example.demo.controller.DemoController required a single bean, but 2 were found:
	- demoServiceA: defined in file [F:\demo\target\classes\com\example\demo\service\impl\DemoServiceA.class]
	- demoServiceB: defined in file [F:\demo\target\classes\com\example\demo\service\impl\DemoServiceB.class]
```

可以使用注解 @Qualifier(value = "bean名称") 和 @Autowired 组合使用，来指定某一个 bean

![image-20210715161232195](https://attach.blog.wen7.online/image-20210715161232195.png)

```java
@Autowired 默认按照类型匹配，当同一类型拥有多种实现方式的时候，需要指定名称，使用 @Qualifier注解
默认容器中必须要有对象，不能为 null，如果想要允许为 null，可以指定 @Autowired(required = false)
```

#### 区别

|    注解    |       基于       | 说明                           | 注入                         |
| :--------: | :--------------: | ------------------------------ | ---------------------------- |
| @Resource  |     基于 JDK     | 单独使用                       | 默认优先按照==名称==进行装配 |
| @Autowired | 基于 Spring 框架 | 有时需要和 @Qualifier 组合使用 | 默认根据==类型==进行自动装配 |

==实际开发中，这种多个 bean 的问题不是很常见，一般不要写这么比较容易混淆的类，如果容易混淆的话，指定 name，注入时指定类型，基本上不会错==

当接口只有一个实现类的时候，随便用 @Resource 还是 @Autowired，问题不是很大

 	@Autowired 在编辑器里会报红，虽然不影响使用，强迫症看着挺难受，可在类上加注解 @SuppressWarnings("all") 用以压制警告

当接口拥有多个实现类的时候，使用 @Autowired 需要搭配 @Qualifier 使用

**较为推荐 @Resource**



## Bean 小结

```
4个注解 
        @Controller		Controller层
        @Service		Service层
        @Repository		Dao层
        @Component		其他
当自己写的类不能添加注解，需要使用 @Bean + @Configuration
-初始化（了解）
-单例（了解）
-懒加载（了解）
@Resource / @Autowired + @Qualifier
```

