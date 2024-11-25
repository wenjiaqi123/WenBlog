# 数据校验 Validation

- 基于 JSR 303 规范
	- Java Specification Requests（Java 规范提案）
	- JAVA EE 6 中提出了一项子规范，名为【Bean Validation】用于对 Java Bean 做数据校验，官方实现【Hibernate Validator】
- 303 提案就是 Bean Validation 数据校验规范，我们在接口请求时，用来验证数据
- Hibernate Validator 就是 Bean Validation 具体实现



## 引入依赖

```xml
<!--数据校验起步依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

```xml
<!-- WEB 起步依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- lombok简化 JavaBean -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```



## 初识

### User

```java
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.Date;
import java.util.List;


@Data
public class User {

    @NotNull(message = "用户id不能为空")
    private Long userId;        //用户id

    @Null(message = "nil值必须为空")
    private Object nil;         //某个值

    @Min(value = 18, message = "年龄必须 ≥ 18")
    @Max(value = 70, message = "年龄必须 ≤ 70")
    private Integer userAge;    //用户年龄

    @DecimalMin(value = "100.11", message = "余额必须 ≥ 100.11")
    @DecimalMax(value = "999.99", message = "余额必须 ≤ 999.99")
    private Double money;       //账户余额

    @NotBlank(message = "用户昵称不能为空")
    private String nickName;    //用户昵称

    @Length(min=6,max=12,message = "用户名必须是 [6,12] 个字符")
    private String userName;    //用户名

    @Range(min = 100, max=200,message = "身高必须是 [100,200] 之间")
    private Integer height;     //身高


    @AssertTrue(message = "gender 必须是true")
    private Boolean gender;     //true男 false女

    @Email(regexp = "^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$", message = "邮箱格式错误")
    private String userEmail;   //用户邮箱

    【拷贝的时候注意 \\,IntelliJ IDEA 可能会将 \\ 再处理一遍】
    @Pattern(regexp = "^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\\d{8}$", message = "手机号格式错误")
    private String iphoneNo;    //用户手机号

    @Past(message = "出生日期必须比现在早")
    private Date birthDate;  //出生日期

    @Future(message = "死亡时间必须比现在晚")
    private Date deathDate; //死亡时间

    @Size(min=2,max=5,message="爱好的个数必须在 [2,5] 之间")
    private String[] hobby;

    @NotEmpty(message="幸运数不能为空")
    private List<Integer> luckNum;

    @Valid
    private Car car;
}
```

### Car

```java
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class Car {
    @NotBlank(message = "汽车名称不能为空")
    private String carName;
}
```



### Controller

- ==@Valid 开启对 User 的数据校验==

```java
import com.example.entity.User;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("login")
public class LoginController {

    @PutMapping("user")
    public String updateUser(@RequestBody @Valid User user) {		//注意这里加上 @Valid
        System.out.println("user已经通过校验");
        return "user已经通过校验";
    }
}
```



### 异常处理和返回封装

#### Result

```java
import lombok.Data;

@Data
public class Result<T> {
    //返回状态码
    private int code = 200;
    //返回信息
    private String msg = "success";
    //具体响应数据
    private T data = null;
}
```

#### GlobalResult

```java
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class GlobalResult implements InitializingBean {
    //请求映射处理器适配器
    @Resource
    private RequestMappingHandlerAdapter adapter;

    /**
     * 初始化容器时执行
     * @throws Exception
     */
    @Override
    public void afterPropertiesSet() throws Exception {
        //根据此适配器获取 处理方法返回值的处理器列表
        List<HandlerMethodReturnValueHandler> unmodifiableList = adapter.getReturnValueHandlers();

        List<HandlerMethodReturnValueHandler> list = new ArrayList<>(unmodifiableList.size());

        for (HandlerMethodReturnValueHandler i : unmodifiableList) {
            if (i instanceof RequestResponseBodyMethodProcessor) {
                list.add(new GlobalResultHandler(i));
            } else {
                list.add(i);
            }
        }
        //重新设置适配器 方法返回值处理列表
        adapter.setReturnValueHandlers(list);
    }

    private class GlobalResultHandler implements HandlerMethodReturnValueHandler{
        private HandlerMethodReturnValueHandler r;

        public GlobalResultHandler(HandlerMethodReturnValueHandler r) {
            this.r = r;
        }

        @Override
        public boolean supportsReturnType(MethodParameter returnType) {
            return r.supportsReturnType(returnType);
        }

        /**
         *
         * @param o             返回数据对象【就是Controller层中，处理器[请求接口]的返回值】
         * @param returnType    处理器的方法参数
         * @param mavContainer
         * @param webRequest
         * @throws Exception
         */
        @Override
        public void handleReturnValue(Object o, MethodParameter returnType, ModelAndViewContainer mavContainer, NativeWebRequest webRequest) throws Exception {
            if(o instanceof Result){
                r.handleReturnValue(o,returnType,mavContainer,webRequest);
                return;
            }
            Result<Object> result = new Result<>();
            result.setData(o);
            r.handleReturnValue(result,returnType,mavContainer,webRequest);
        }
    }
}
```

#### GlobalException

```java
import com.example.config.Result;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice(basePackages = "com.example.controller")  【注意这里的包路径】
public class GlobalException {

    @ExceptionHandler(Exception.class)
    public Result h(Exception e){
        Result result = new Result<>();
        /**
         * 数据校验异常
         */
        if(e instanceof MethodArgumentNotValidException){
            BindingResult br = ((MethodArgumentNotValidException) e).getBindingResult();

            if (br.hasErrors()) {
                StringBuilder sb = new StringBuilder();
                List<ObjectError> errors = br.getAllErrors();
                //多个数据校验不匹配
                for (int i = 0; i < errors.size(); i++) {
                    sb.append(i+1).append(":").append(errors.get(i).getDefaultMessage()).append(";  ");
                }
                result.setMsg(sb.toString());
                result.setCode(500);
            }
        }
        return result;
    }
}
```



### 查看

- ==以下的数据都错误的数据，尝试一 一改正==

```http
PUT http://localhost:8080/login/user
{
    "userId":"",
    "nil":123,
    "userAge":90,
    "money":99.99,
    "userNickName":"  ",
    "userEmail":"939949243",
    "iphoneNo":"1525192",
    "birthDate":"2222-02-02",
    "deathDate":"1970-01-01",
    "userName":"abc",
    "height":210,
    "hobby":["吃饭"],
    "luckNum":[],
    "car":{
        "carName":""
    }
}
```

![image-20210909011835023](https://attach.blog.wen7.online/20210909011835.png)





## 注解

|                     注解                     |            适用类型            | 说明                                                   | 常用 |
| :------------------------------------------: | :----------------------------: | ------------------------------------------------------ | ---- |
|                  @NotNull()                  |            任意对象            | 字段不允许为 null，==可以为空字符串==                  | ★    |
|                   @Null()                    |            任意对象            | 字段必须为 null                                        |      |
|                 @NotBlank()                  |             字符串             | ==trim() 之后不能为空==                                | ★    |
|                                              |                                |                                                        |      |
|                @Min(value=18)                |              数值              | 值必须大于等于18                                       | ★    |
|                @Max(value=70)                |              数值              | 值必须小于等于70                                       | ★    |
|        @DecimalMin(value = "100.11")         |          数值\|字符串          | 用来校验小数和字符串                                   |      |
|        @DecimalMax(value = "999.99")         |          数值\|字符串          | 用来校验小数和字符串                                   |      |
|          @Range(min=下限,max=上限)           |              数值              | 值的上下区间                                           | ★    |
|          @Length(min=下限,max=上限)          |             字符串             | 字符长度上下区间                                       | ★    |
| @Digits(integer=整数位数，fraction=小数位数) |              数值              | 整数位数和小数位数上限                                 | ★    |
|                                              |                                |                                                        |      |
|             @Email(regexp=正则)              |             字符串             | 字符串必须是符合正则的邮箱                             | ★    |
|            @Pattern(regexp=正则)             |             字符串             | 字符串必须符合正则                                     | ★    |
|                                              |                                |                                                        |      |
|                @AssertTrue()                 |            布尔类型            | 必须是 true                                            |      |
|                @AssertFalse()                |            布尔类型            | 必须是 false                                           |      |
|                                              |                                |                                                        |      |
|                   @Past()                    |              日期              | 传过来的参数必须比当前时间早                           |      |
|                  @Future()                   |              日期              | 传过来的参数必须比当前时间晚                           |      |
|                                              |                                |                                                        |      |
|             @Size(min=值,max=值)             | 字符串\|Collection\| Map\|数组 | 字符串长度必须在最大最小值中间，集合个数，数组元素个数 | ★    |
|                 @NotEmpty()                  | 字符串\|Collection\|Map\|数组  | 集合个数不为0，==字符长度不为0，但是可以是空字符串==   | ★    |
|                                              |                                |                                                        |      |
|                    @Valid                    |              对象              | 例如User有一个子属性Car，想验证Car可用@Valid关联验证   |      |

- 比较容易混淆的空，空字符串

- ```markdown
	@NotNull 	不能为 null ,可以为 "" 或 "   "
	@NotBlank	不能为 null ,不能为 "" 或 "   "		# 一般业务都会 trim(),谁会拿一个"  "来处理业务呢？
	@NotEmpty	不能为 null ,不能为 "" ,可以是 "   "
	```





## 分组校验

当新增用户的时候，是==不需要== userId 的

当更新用户的时候，基本都==要== userId 的

而这两种情况用到同一个实体类，但是我们 userId 已经加上注解了，如何才能使同一个实体类应付不同场景呢？



### User

```java
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;


@Data
public class User {
    /**
     * 添加两个分组
     */
    public interface insert {}

    public interface update {}

    @NotNull(message = "用户id不能为空",groups = update.class)
    private Long userId;        //用户id

    
    @Length(min=6,max=12,message = "用户名必须是 [6,12] 个字符",groups=insert.class)
    @Length(min=20,max=30,message = "用户名必须是 [20,30] 个字符",groups=update.class)
    private String userName;    //用户名
}
```

![image-20210909012850535](https://attach.blog.wen7.online/20210909012850.png)

- 当指定 insert 组的时候，userId 可以为空，userName 的长度为 [6,12] 个字符
- 当指定 update 组的时候，userId 不能为空，userName 的长度为 [20,30] 个字符



### Controller

```java
import com.example.entity.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("login")
public class LoginController {

    /**
     * 注意这里使用的是 @Validated 注解,指定类别 update,采用 update组的校验
     */
    @PutMapping("user")
    public String updateUser(@RequestBody @Validated(User.update.class) User user) {
        System.out.println("user已经通过校验");
        return "user已经通过校验";
    }
}
```

- 指定了 update.class ，userId 不能为空，用户名必须是 [20,30] 个字符



## 自定义校验

### 注解

```java
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * 指定哪个类来校验该注解
 */
@Constraint(
        validatedBy = {StrEnumValidator.class}
)
//注解可以使用在哪些地方,方法上,字段上,注解上......
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
//保留奥运行期
@Retention(RetentionPolicy.RUNTIME)
//生成文档
@Documented
public @interface StrEnum {
    String message() default "";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    String[] values() default { };
}
```



### 具体逻辑

```java
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.HashSet;
import java.util.Set;

public class StrEnumValidator implements ConstraintValidator<StrEnum,String> {
    //用来存储元素
    private Set<String> set = new HashSet<>();

    @Override
    public void initialize(StrEnum constraintAnnotation) {
        //获取该注解传进来的值
        String[] values = constraintAnnotation.values();
        //添加到 set 集合中
        for (int i = 0; i < values.length; i++) {
            set.add(values[i]);
        }
    }

    /**
     * 如果校验成功返回 true
     * @param s 被校验的值
     * @param constraintValidatorContext
     * @return
     */
    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        /**
         * 如果包含,返回 true
         */
        boolean flag = set.contains(s);
        return flag;
    }
}
```



### 使用

![image-20210909015137596](https://attach.blog.wen7.online/20210909015137.png)















































