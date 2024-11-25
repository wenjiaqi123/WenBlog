RestTemplate
===

前言
---

- HTTP 请求客户端，类似浏览器发送 HTTP 请求

- 常见的 HTTP 请求方案

    - HttpURLConnection  【来自于 JDK 原生】原生？狗用了都摇头
    - HTTP Client【来自于 Apache 基金会】
    - OkHttp【来自于 Square 公司开源】Android 开发工程师必备
    - ==RestTemplate== 【来自于 Spring 框架】SpringBoot 的 API Boy 必备
    - ~~hutool 工具类~~【来自于国内网红开源工具类】划水必备

    

### 简介

- 简化 http 通信，统一 RESTful 标准
- 由 Spring 提供的一个工具类
- 默认依赖的是 JDK 提供的 HTTP 连接的能力，基于原生 HttpURLConnection
- **学习本文档需要一定的 HTTP 协议的知识，详情参考 HTTP 文档**
- [官方文档 - RestTemplate](https://docs.spring.io/spring-framework/docs/5.1.9.RELEASE/spring-framework-reference/integration.html#rest-resttemplate)
- 在 Spring 5 中已经不再建议使用 RestTemplate，建议使用 WebClient



### 示例

本次文档的示例，已上传码云，[RestTemplate 示例](https://gitee.com/wjq303812/RestTemplate-Demo)

所用到的接口文档，已上传Apifox，[RestTemplate 接口文档](https://www.apifox.cn/apidoc/project-1572138/api-38353353)



整合 SpringBoot 
---

### 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```



### 配置类

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * RestTemplate 配置类
 */
@Configuration
public class RestTemplateConfig extends MappingJackson2HttpMessageConverter {

    public RestTemplateConfig() {
        List<MediaType> mediaTypes = new ArrayList<>();

        //使 RestTemplate 支持其他媒体类型,默认只支持 application/json
        mediaTypes.add(MediaType.TEXT_PLAIN);
        mediaTypes.add(MediaType.TEXT_HTML);

        setSupportedMediaTypes(mediaTypes);
    }

    @Bean
    public RestTemplate restTemplate(ClientHttpRequestFactory factory) {
        RestTemplate restTemplate = new RestTemplate(factory);
        restTemplate.getMessageConverters().add(this);
        return restTemplate;
    }

    @Bean
    public ClientHttpRequestFactory simpleClientHttpRequestFactory() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setReadTimeout(5000);       //单位为ms
        factory.setConnectTimeout(5000);    //单位为ms
        return factory;
    }
}
```



示例
---

### 概述

根据 RestTemplate 的方法，博主分为以下几大类：==一般情况第一组和第二组就够用了。==

- 以 RESTful 风格
    - `getForObject` 
    - `postForObject` 
    - `put`
    - `delete`
- exchange：接收 RequestEntity，设置 HTTP 方法(GET，POST，PUT，DELETE)，URL，Headers 和 Body，返回 ResponseEntity
    - ![image-20220906144545594](https://attach.blog.wen7.online/202209061445656.png)
- execute：通过 RequestCallback 的设置，对请求和响应更加全面的自定义控制。
    - <img src="https://attach.blog.wen7.online/202209061455451.png" alt="image-20220906145510405" style="zoom:100%;float:center" />



基于常用的 **GET**，**POST**，PUT，DELETE 和 **文件上传下载** 为例，介绍各个 API 使用方式 。

着重讲解 GET 和 POST，因为 PUT 和 DELETE 和 POST 非常类似。



### getForObject

#### 模拟服务端返回

```java
@RestController
@RequestMapping("/server")
@Slf4j
public class RestTemplateServerController {
    
    @GetMapping("/user")
    public UserVo getUser(String name, int age) {
        UserVo vo = UserVo.builder()
                .name(name)
                .age(age)
                .desc(UUID.randomUUID().toString().replace("-", "") + "  " + name + "  " + age)
                .build();
        return vo;
    }
    
}
```

#### 单元测试

```java
import com.example.pojo.http.resp.UserResp;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * API:
 * getForObject(String url, Class<T> responseType, Object... uriVariables)
 * getForObject(String url, Class<T> responseType, Map<String, ?> uriVariables)
 * <p>
 * 解析:
 * 假设请求为:GET http://localhost:18080/server/user?name=zhangSan&age=18
 * 第一个参数 url               就是要发起 get 请求的 url,即: http://localhost:18080/server/user?name={myName}&age={myAge}
 * 第二个参数 responseType      将响应体转换成 UserResp 类,即服务端返回的对象,这里使用 UserResp 来接收,会将 json 自动转化成该 UserResp 对象
 * <p>
 * 第三个参数 Object...         请求参数  name=zhangSan&age=18,使用 Object 数组来传递,顺序即 url 中 {} 参数顺序【不推荐】
 * 第三个参数 Map               请求参数  name=zhangSan&age=18,使用 Map 来传递,键就是第一个参数 URL 中的 {} 里的值【推荐】
 */
@SpringBootTest
@Slf4j
public class TestGet {
    @Resource
    private RestTemplate restTemplate;

    @Test
    void getUserArr() {
        //参数 url
        String url = "http://localhost:18080/server/user?name={myName}&age={myAge}";
  
        //参数 响应对象 responseType
        Class<UserResp> responseType = UserResp.class;

        //参数 请求参数 uriVariables
        Object[] uriVariables = new Object[2];
        uriVariables[0] = "zhangSan";
        uriVariables[1] = 18;

        //发送请求
        UserResp user = restTemplate.getForObject(url, responseType, uriVariables);

        log.info("user.getName() = " + user.getName());
        log.info("user.getAge() = " + user.getAge());
        log.info("user.getDesc() = " + user.getDesc());
    }

    @Test
    void getUserMap() {
        //参数 url
        String url = "http://localhost:18080/server/user?name={myName}&age={myAge}";

        //参数 响应对象 responseType
        Class<UserResp> responseType = UserResp.class;

        //参数 请求参数 uriVariables
        Map<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("myName", "zhangSan");
        uriVariables.put("myAge", 18);

        //发送请求
        UserResp user = restTemplate.getForObject(url, responseType, uriVariables);

        log.info("user.getName() = " + user.getName());
        log.info("user.getAge() = " + user.getAge());
        log.info("user.getDesc() = " + user.getDesc());
    }
}
```



```java
import com.example.pojo.http.resp.UserResp;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class RestTemplateTestController {
    @Resource
    private RestTemplate restTemplate;

    /**
     * 实际请求: https://localhost:18080/test/demo?name=zhangSan&age=18
     * 第一个参数 url,               就是要发起 get 请求的 url
     * 第二个参数 UserResp.class,    将响应体转换成 UserResp 类
     * 第三个参数 Map,               请求参数  name=zhangSan&age=18
     *
     * restTemplate.getForObject("请求URL", 响应类型, 请求参数);
     */
    @GetMapping("/user-arr")
    public void testGetUserArr() {

        String url = "http://localhost:18080/server/user?name={myName}&age={myAge}";
        Class<UserResp> respClass = UserResp.class;

        Object[] uriVariables = new Object[2];
        uriVariables[0] = "zhangSan";
        uriVariables[1] = 18;

        //调用 getForObject 方法,【参数使用 Object 数组方式】
        UserResp user = restTemplate.getForObject(url, respClass, uriVariables);

        System.out.println("user.getName() = " + user.getName());
        System.out.println("user.getAge() = " + user.getAge());
        System.out.println("user.getDesc() = " + user.getDesc());
    }

    
    @GetMapping("/user-map")
    public void testGetUserMap() {
        String url = "http://localhost:18080/server/user?name={myName}&age={myAge}";
        Class<UserResp> respClass = UserResp.class;

        Map<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("myName", "zhangSan");			//【使用 map 中的参数，替换 url 中的对应的占位符】
        uriVariables.put("myAge", 18);

        //调用 getForObject 方法,【请求参数使用 Map 方式】
        UserResp user = restTemplate.getForObject(url, respClass, uriVariables);

        System.out.println("user.getName() = " + user.getName());
        System.out.println("user.getAge() = " + user.getAge());
        System.out.println("user.getDesc() = " + user.getDesc());
    }
}
```



### postForObject

#### 模拟服务端返回

```java
@RestController
@RequestMapping("/server")
@Slf4j
public class RestTemplateServerController {

	
    @PostMapping("/user")
    public UserVo postUser(@RequestBody UserDto userDto) {
        String name = userDto.getName();
        Integer age = userDto.getAge();

        UserVo vo = UserVo.builder()
                .name(name)
                .age(age)
                .desc(UUID.randomUUID().toString().replace("-", "") + "  " + name + "  " + age)
                .build();
        return vo;
    }
    
    @PostMapping("/user-param")
    public UserVo postUserParam(@RequestBody UserDto userDto,String desc) {
        String uuid = UUID.randomUUID().toString().replace("-", "");
        log.info("postUser uuid: " + uuid);
        String name = userDto.getName();
        Integer age = userDto.getAge();

        UserVo vo = UserVo.builder()
                .name(name)
                .age(age)
                .desc(uuid + "  " + name + "  " + age + " " + desc)
                .build();
        return vo;
    }
    
}
```

#### 单元测试

```java
package com.example.controller;

import com.example.pojo.http.req.UserReq;
import com.example.pojo.http.resp.UserResp;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * API:
 * postForObject(String url, @Nullable Object request, Class<T> responseType, Object... uriVariables)
 * postForObject(String url, @Nullable Object request, Class<T> responseType, Map<String, ?> uriVariables)
 *
 * 解析:
 * 假设请求为:POST http://localhost:18080/server/user
 * 请求体 {"name":"zhangSan","age":18}
 *
 * 第一个参数 url            就是要发起的 post 请求的 url,即: http://localhost:18080/server/user
 * 第二个参数 request        就是请求的请求体,使用一个Java对象封装
 * 第三个参数 responseType   将响应体转换成 UserResp 类,即服务端返回的对象,这里使用 UserResp 来接收,会将 json 自动转化成该 UserResp 对象
 *
 * 第四个参数 Object...      请求参数(没有就不用传): 参考 GET 请求【不推荐】
 * 第四个参数 Map            请求参数(没有就不用传): 参考 GET 请求【推荐】
 */
@SpringBootTest
@Slf4j
public class TestPost {
    @Resource
    private RestTemplate restTemplate;

    /**
     * post 请求,基础用法
     */
    @Test
    void postUser(){
        //参数 url
        String url = "http://localhost:18080/server/user";

        //参数 请求体对象 request
        UserReq request = new UserReq();
        request.setName("张三");
        request.setAge(18);

        //参数 响应对象 responseType
        Class<UserResp> responseType = UserResp.class;
        
        
        UserResp user = restTemplate.postForObject(url, request, responseType);

        log.info("user.getName() = " + user.getName());
        log.info("user.getAge() = " + user.getAge());
        log.info("user.getDesc() = " + user.getDesc());
    }

    /**
     * post 请求,携带请求参数 param
     */
    @Test
    void postUserParam(){
        //参数 url 【注意这里的 URL】
        String url = "http://localhost:18080/server/user-param?desc={desc}";

        //参数 请求体对象 request
        UserReq request = new UserReq();
        request.setName("张三");
        request.setAge(18);

        //参数 响应对象 responseType
        Class<UserResp> responseType = UserResp.class;

        //参数 请求参数 uriVariables
        Map<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("desc", "我是描述");

        UserResp user = restTemplate.postForObject(url, request, responseType,uriVariables);

        log.info("user.getName() = " + user.getName());
        log.info("user.getAge() = " + user.getAge());
        log.info("user.getDesc() = " + user.getDesc());
    }
}
```



### xxxForEntity

```markdown
# GET 和 POST API:
getForObject(String url, Class<T> responseType, Object... uriVariables)
getForObject(String url, Class<T> responseType, Map<String, ?> uriVariables)
postForObject(String url, @Nullable Object request, Class<T> responseType, Object... uriVariables)
postForObject(String url, @Nullable Object request, Class<T> responseType, Map<String, ?> uriVariables)

# Entity API:
getForEntity(String url, Class<T> responseType, Object... uriVariables)
getForEntity(String url, Class<T> responseType, Map<String, ?> uriVariables)
postForEntity(String url, @Nullable Object request, Class<T> responseType, Object... uriVariables)
postForEntity(String url, @Nullable Object request, Class<T> responseType, Map<String, ?> uriVariables)
```

Entity 的调用和 `getForObject` `postForObject` 的调用一样，唯一不同的就是 ==返回值==，返回值是 `ResponseEntity<响应类型>`

可以通过该返回对象获取 HTTP 响应状态码

#### Get 

```java
//						  UserResp user = restTemplate.getForObject(url, responseType, uriVariables);
ResponseEntity<UserResp> responseEntity = restTemplate.getForEntity(url, responseType, uriVariables);
UserResp user = responseEntity.getBody();

//可以获取其他的一些信息
HttpStatus statusCode = responseEntity.getStatusCode();
int statusCodeValue = responseEntity.getStatusCodeValue();
log.info("statusCode: " + statusCode);
log.info("statusCodeValue: " + statusCodeValue);
```

#### Post

```java
//				  UserResp user = restTemplate.postForObject(url, request, responseType);
ResponseEntity<UserResp> entity = restTemplate.postForEntity(url, request, responseType);
UserResp user = entity.getBody();
```



### exchage

#### 解析

```java
//API:
exchange(RequestEntity<?> requestEntity, Class<T> responseType)
exchange(RequestEntity<?> requestEntity, ParameterizedTypeReference<T> responseType)

exchange(String url, HttpMethod method, @Nullable HttpEntity<?> requestEntity, Class<T> responseType, Object... uriVariables)
exchange(String url, HttpMethod method, @Nullable HttpEntity<?> requestEntity, Class<T> responseType, Map<String, ?> uriVariables)

exchange(String url, HttpMethod method, @Nullable HttpEntity<?> requestEntity, ParameterizedTypeReference<T> responseType, Object... uriVariables)
exchange(String url, HttpMethod method, @Nullable HttpEntity<?> requestEntity, ParameterizedTypeReference<T> responseType, Map<String, ?> uriVariables)

//解析:
参考 GET 请求 API getForObject(String url, Class<T> responseType, Object... uriVariables)
假设请求为: GET  http://localhost:18080/server/user?name=zhangSan&age=18

exchange 的方法形参解释:
String url                   就是请求 URL,即: http://localhost:18080/server/user?name={myName}&age={myAge}
HttpMethod method            就是请求方法,即:HttpMethod.GET,HttpMethod.POST,HttpMethod.PUT,HttpMethod,DELETE 等
Object... uriVariables       请求参数,数组形式
Map<String, ?> uriVariables  同上,Map 形式
Class<T> responseType        就是响应对象,响应体转成该对象


RequestEntity<?> requestEntity
ParameterizedTypeReference<T> responseType
HttpEntity<?> requestEntity
```



#### 单元测试

```java
@SpringBootTest
@Slf4j
public class TestExchange {
    @Resource
    private RestTemplate restTemplate;

    /**
     * RequestEntity 可以构建 get,post,put,delete 等请求
     * .header() 添加请求头,可以是内置的 HttpHeaders,也可以是自定义
     * .accept() 设置接受的媒体类型
     * .body()   设置请求体
     * ...... 其他方法
     */
    @Test
    void exchangeGet() {
        RequestEntity<Void> requestEntity = RequestEntity.get("http://localhost:18080/server/user?name={myName}&age={myAge}","zhangSan",18)
                .header(HttpHeaders.COOKIE, "myCookie")
                .header("token", "myToken")
                .accept(MediaType.APPLICATION_JSON)
                .build();

        Class<UserResp> responseType = UserResp.class;

        ResponseEntity<UserResp> responseEntity = restTemplate.exchange(requestEntity, responseType);
        UserResp user = responseEntity.getBody();

        log.info("user.getName() = " + user.getName());
        log.info("user.getAge() = " + user.getAge());
        log.info("user.getDesc() = " + user.getDesc());
    }

    @Test
    void exchangePost() {
        UserReq body = new UserReq();
        body.setName("张三");
        body.setAge(18);

        //构建请求
        RequestEntity<UserReq> requestEntity = RequestEntity.post("http://localhost:18080/server/user")
                .header(HttpHeaders.AUTHORIZATION, "myAuthorization")
                .header("token", "myToken")
                .accept(MediaType.ALL)
                .body(body);

        Class<UserResp> responseType = UserResp.class;

        ResponseEntity<UserResp> responseEntity = restTemplate.exchange(requestEntity, responseType);
        UserResp user = responseEntity.getBody();

        log.info("user.getName() = " + user.getName());
        log.info("user.getAge() = " + user.getAge());
        log.info("user.getDesc() = " + user.getDesc());
    }
}
```



#### HttpEntity

```java
import com.example.pojo.http.req.UserReq;
import com.example.pojo.http.resp.UserResp;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * API:
 * HttpEntity(T body)
 * HttpEntity(MultiValueMap<String, String> headers)
 * HttpEntity(@Nullable T body, @Nullable MultiValueMap<String, String> headers)
 *
 * 解析:
 * 构造参数
 * 传入 T 类型的请求体
 * 传入 MultiValueMap<String,String> 请求头
 */
@SpringBootTest
public class TestHttpEntity {
    @Resource
    private RestTemplate restTemplate;

    @Test
    void testPostHttpEntity(){
        //参数 url 【注意这里的 URL】
        String url = "http://localhost:18080/server/user-param?desc={desc}";

        /**
         * 参数 请求体对象 request
         * 当仅需要传入请求体对象时,可以直接 UserReq request = new UserReq(); 参考 postForObject 基本使用
         * 但是如果使用 postForObject() 并且也要添加请求头怎么办?
         */
        UserReq body = new UserReq();       //请求体
        body.setName("张三");
        body.setAge(18);

        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();    //请求头
        headers.add("cookie", "myCookie");
        headers.add("token", "myToken");

        HttpEntity<Object> request = new HttpEntity<>(body,headers);    //使用 HttpEntity 封装

        //参数 响应对象 responseType
        Class<UserResp> responseType = UserResp.class;

        //参数 请求参数 uriVariables
        Map<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("desc", "我是描述");

        UserResp user = restTemplate.postForObject(url, request, responseType,uriVariables);
    }

    @Test
    void testExchangeHttpEntity(){
        //参数 url 【注意这里的 URL】
        String url = "http://localhost:18080/server/user-param?desc={desc}";
        
        //参数 method,请求方式
        HttpMethod method = HttpMethod.POST;
        
        UserReq body = new UserReq();       //请求体
        body.setName("张三");
        body.setAge(18);

        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();    //请求头
        headers.add("cookie", "myCookie");
        headers.add("token", "myToken");

        HttpEntity<Object> requestEntity = new HttpEntity<>(body,headers);    //使用 HttpEntity 封装

        //参数 响应对象 responseType
        Class<UserResp> responseType = UserResp.class;

        //参数 请求参数 uriVariables
        Map<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("desc", "我是描述");

        ResponseEntity<UserResp> responseEntity = restTemplate.exchange(url, method, requestEntity, responseType, uriVariables);
        UserResp user = responseEntity.getBody();
        
    }
}
```



### 文件上传

#### 模拟服务端

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/**
 * 模拟服务端文件操作接口
 */
@RestController
@RequestMapping("/file")
@Slf4j
public class RestTemplateFileController {

    @PostMapping("/upload")
    public String uploadFile(MultipartFile file, String desc) {
        String uuid = UUID.randomUUID().toString().replace("-", "");
        log.info("uploadFile uuid: " + uuid);

        if (file != null) {
            log.info("===== 接收到文件 =====");
            log.info("文件名: " + file.getOriginalFilename());
        }
        return uuid;
    }
}
```



#### 示例

==这里的示例是将前端传过来的 MultipartFile 转成 ByteArrayResource，再调用 RestTemplate==，**提供了 postForObject 和 exchange 两种方式**

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;

/**
 * restTemplate 文件上传示例
 */
@RestController
@RequestMapping("/testFile")
@Slf4j
public class TestFileController {
    @Resource
    private RestTemplate restTemplate;

    /**
     * 将 MultipartFile 转成 字节数组,并且重写了上传的文件名,大小等
     * @param file
     * @return
     * @throws IOException
     */
    private ByteArrayResource getByteArrayResource(MultipartFile file) throws IOException {
        ByteArrayResource byteArrayResource = new ByteArrayResource(file.getBytes()){
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }

            @Override
            public long contentLength() {
                long length = 0L;
                try {
                    length = file.getBytes().length;
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return length;
            }
        };
        return byteArrayResource;
    }

    @PostMapping("/upload-1")
    public void uploadFile_1(MultipartFile file) throws IOException {
        // 文件转化
        ByteArrayResource byteArrayResource = getByteArrayResource(file);


        String url = "http://localhost:18080/file/upload";

        MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
        formData.add("file", byteArrayResource);
        formData.add("desc", "我是描述");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(formData, headers);

        /**
         * 使用 postForObject 方式
         */
        String str = restTemplate.postForObject(url, request, String.class);
        log.info("str: " + str);
    }


    @PostMapping("/upload-2")
    public void uploadFile_2(MultipartFile file) throws IOException {
        ByteArrayResource byteArrayResource = getByteArrayResource(file);

        String url = "http://localhost:18080/file/upload";

        MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
        formData.add("file", byteArrayResource);
        formData.add("desc", "我是描述");

        RequestEntity<MultiValueMap<String, Object>> entity = RequestEntity.post(url)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(formData);

        /**
         * 使用 exchange 方式
         */
        ResponseEntity<String> responseEntity = restTemplate.exchange(entity, String.class);
        log.info("str: " + responseEntity.getBody());
    }
}
```

