# @ControllerAdvice

controller 注入 bean

advice 通知/增强

@ControllerAdvice 是 SpringMVC 提供的一个对 controller 增强的注解，可以完成 **全局异常处理**，**全局数据预处理**，**全局数据绑定**，等



## 全局异常处理

需要对 SpringMVC 的全局异常有一定的了解

- ==@RestControllerAdvice== = @ResponseBody + @ControllerAdvice

```java
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 全局异常处理器
 */
@ControllerAdvice
public class GlobalExceptionHandler{

    @ResponseBody
    @ExceptionHandler(value = {Exception.class})
    public String resolveException(HttpServletRequest request, HttpServletResponse response, Exception e) {
        /**
         * 具体的业务逻辑
         */
        return "自定义返回信息";
    }
}
```



## 全局数据预处理





## 全局数据绑定

全局数据绑定：常用来做一些初始化的数据操作，将一些公共的数据定义在添加了 @ControllerAdvice 注解的类中，这样，在所有 Controller 的接口都能够访问导致这些数据

![image-20210720163714124](https://attach.blog.wen7.online/image-20210720163714124.png)

在请求中并没有传入参数，但是 ProjectInfo 的确有值，是因为在 GlobalControllerData 类中进行了设值操作

@ModelAttribute 返回的全局 model 对象名称为 projectInfo，所以在 test(ProjectInfo projectInfo) 中根据 projectInfo 来获取该类

