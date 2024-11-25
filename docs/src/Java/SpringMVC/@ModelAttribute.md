# @ModelAttribute

## 说明

```java
package org.springframework.web.bind.annotation;

// 该注解可以使用在参数前，或者方法上
@Target({ElementType.PARAMETER, ElementType.METHOD})
// 该注解保留到运行期
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ModelAttribute {

	/**
	 * name 和 value 互为别名
	 */
	@AliasFor("name")
	String value() default "";

	@AliasFor("value")
	String name() default "";

	boolean binding() default true;
}
```



## 注解在方法上

==优先于其他接口执行==

![image-20210720164603786](https://attach.blog.wen7.online/image-20210720164603786.png)

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @RequestMapping("test")
    public String test(){
        System.out.println("test 方法执行");
        return "测试";
    }

    @ModelAttribute
    public void testModelAttribute(){
        System.out.println("testModelAttribute 方法执行");
    }
}
```

测试： http://localhost:8080/test



## 注入对象

可以通过参数 value 指定 model 名称

```java
// 为了先于控制器 controller 执行
@ModelAttribute
public void testModelAttribute(@ModelAttribute User user){		//可以理解为给容器注入一个 model，默认 id 为类的首字母小写
    user.setName("用户名");
    user.setAge(18);
}
```

```java
@ModelAttribute
public ProjectInfo setProjectInfo(){				//返回值为 ProjectInfo,可以理解为给容器注入一个 model，默认 id 为类的首字母小写
    ProjectInfo projectInfo = new ProjectInfo();
    projectInfo.setProjectName("demo");
    projectInfo.setVersion("v1");
    return projectInfo;
}
```

