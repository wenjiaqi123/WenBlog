# WebSocket

HTTP 的请求，由客户端发起一次请求，服务器响应一次，还不包括每次的三次握手和四次挥手

![image-20210729122848161](https://attach.blog.wen7.online/image-20210729122848161.png)

来看一个场景，张三在某篇文章下发表一个评论，过了两天，李四对张三的评论点赞，我们要怎么设计这个程序，让张三知道有人给他的评论点赞了呢？

我们可以在张三登录的时候，向后台请求一次，看有没有人给自己的评论点赞。

假设张三是个网瘾少年，从早上9点登录，一直刷到晚上23点，有个王二在下午2点的时候给张三评论了。要如何设计程序才能做到，一旦有人给张三评论了，就立马通知张三。

**==轮询==**：浏览器每一秒都发起一次请求。很耗费性能



## websocket

[百度百科-WebSocket](https://baike.baidu.com/item/WebSocket/1953845?fr=aladdin)

WebSocket 是一种在单个[TCP](https://baike.baidu.com/item/TCP)连接上进行[全双工](https://baike.baidu.com/item/全双工)通信的协议，浏览器和服务器只需完成一次握手，两者就直接可以创建持久性的连接，进行双向数据传输。

==允许服务端主动向客户端推送数据==



### 时序图

![image-20210729131215601](https://attach.blog.wen7.online/image-20210729131215601.png)

### 请求截图

![image-20210729124636326](https://attach.blog.wen7.online/image-20210729124636326.png)

|           请求           |           响应           |
| :----------------------: | :----------------------: |
|   Connection: Upgrade    |   Connection: upgrade    |
|    Upgrade: websocket    |    Upgrade: websocket    |
|                          |                          |
| Sec-WenSocket-Extensions | Sec-WenSocket-Extensions |
|    Sec-WebSocket-Key     |   Sec-WenSocket-Accept   |
|  Sec-WebSocket-Version   |                          |

Connection: 连接方式

Upgrade: 升级为其他协议



请求：为了实现 WebSocket 通信，请求头 Upgrade: websocket 告知服务器通信协议发生改变

响应：对于改变协议的请求，返回状态码 101 Switching Protocols 的响应，表示服务器已经成功应答



## Demo

### 后端代码

采用 SpringBoot 测试

#### 引入依赖

```xml
<!-- WebSocket 起步依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

#### 注入 Bean

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration
public class BeanConfig {

    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
```

#### WebSocketServer

```java
import org.springframework.stereotype.Component;

import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * 前端配套请求 url
 * ws://localhost:8080/websocket/12345
 */
@Component
@ServerEndpoint("/websocket/{userId}")
public class WebSocketServer {
    // 用来存储 Session 连接
    private static Set<Session> sessionSet = new HashSet();

    /**
     * OnOpen 是 websocket 提供的一个注解,当前端请求连接该服务时调用
     * @param session   原生 API,类似于 HttpServletRequest
     * @param userId 请求路径中的占位符 userId,前端配套请求 ws://localhost:8080/websocket/12345
     */
    @OnOpen
    public void open(Session session,@PathParam("userId")String userId){
        this.sessionSet.add(session);
        System.out.println("用户id为: " + userId);
    }

    /**
     * 给前端推送信息
     * @param msg
     */
    public void sendMessage(String msg){
        this.sessionSet.forEach(i->{
            try {
                i.getBasicRemote().sendText(msg + "\t" +Math.random());
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
}
```



### 前端代码

随便在哪里新建一个 index.html 文件，代码拷贝进去

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebSocket</title>
</head>
<body>

<h1 style="text-align:center;"> SpringBoot - WebSocket 测试</h1>
<hr>

<div id="msg"></div>

</body>


<script type="text/javascript">
    var websocket = null;
    var userId = 0;
	
    //用户输入
    userId = prompt("请输入一个用户id");

    //#################  判断浏览器是否支持 Websocket  ###################
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://localhost:8080/websocket/" + userId);
    } else {
        alert("您的浏览器不支持websocket");
    }
    //#################################################################


    //处理服务器推送过来的信息
    websocket.onmessage = function (event){
        document.getElementById('msg').innerHTML += "<br/>" + event.data;
    }
</script>
</html>
```



### 测试步骤

1. 启动后端程序

2. 打开 html ，F12 打开浏览器控制台

3. 刷新页面，输入用户 id，查看控制台请求，并查看后端请求

4. 如果后端控制台能够打印出页面刚才输入用户 id，说明此时 websocket 通道已经打开

5. 在后面编写一个定时任务，给前端发送请求

```java
import com.example.deme.server.WebSocketServer;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
@EnableScheduling
public class TestJob {
    @Resource
    private WebSocketServer webSocketServer;

    @Scheduled(cron = "0/2 * * * * ?")
    public void job(){
        webSocketServer.sendMessage(new SimpleDateFormat("yyyy年MM月dd日  HH:mm:ss").format(new Date()));
    }
}
```

   6. 编写一个定时器，每 2 秒给前端发送数据

   7. 重启后端服务，刷新 index.html 页面，观看效果。

      ```markdown
      如果后台有报错,先重启后端服务，再刷新 index.html,同一个页面不要刷新第二次，可以打开多个页面
      ```



### 逻辑图

![image-20210729142518097](https://attach.blog.wen7.online/image-20210729142518097.png)

1. 前端页面发送请求 ws://localhost:8080/==websocket/12345==
2. 后端 WebSocketServer 上的注解 @ServerEndpoint(=="/websocket/{userId}"==) 捕获到该请求
3. 同时后端被 ==@OnOpen== 修饰的方法执行逻辑
    1. Demo中保存了 session，打印了 userId，这里的逻辑看具体情况
4. 返回给前端 ==101==，表示全双工通道已经打开
5. 如果再新开一个页面，同样执行 @OnOpen 里的逻辑，保存 session，打印 userId，打开通道（框架封装好了）。
6. 通道打开，后端什么时候推送消息给前端，看后端具体的业务逻辑
    1. 我这里是定时任务，每 2 秒推送一次
    2. 具体比如李四点赞了张三，可以在这时候调用方法，推送消息给张三
7. 如果前端有多个页面打开，或者刷新页面，都会往 sessionSet 里添加 session，如果此时关闭了前端页面，但是后端没有处理，set 集合中还是保存了所有的 session，遍历 set 发送消息的时候就会出错。



## 优化

### WebSocketServer

```java
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * 前端配套请求 url
 * ws://localhost:8080/websocket/12345
 */
@Component
@ServerEndpoint("/websocket/{userId}")
public class WebSocketServer {
    //记录当前有多少在线数
    private static long onlineCount = 0;

    /**
     * concurrent包线程安全 Set，用来存放每个客户端对应的 WebSocket 对象
     */
    private static CopyOnWriteArraySet<WebSocketServer> webSocketSet = new CopyOnWriteArraySet<>();

    private Session session;
    private String userId;

    //###########################  有新连接，处理数据	#########################
    @OnOpen
    public void open(Session session, @PathParam("userId") String userId) {
        this.session = session;
        this.userId = userId;
        //往 set 集合里添加当前对象
        webSocketSet.add(this);
        //在线数+1
        onlineCountAdd();
        System.out.println("监听新窗口:\t" + userId + "\t当前在线连接数为:\t" + getOnlineCount());
    }

    //给当前在线连接数 +1
    private static synchronized void onlineCountAdd() {
        WebSocketServer.onlineCount++;
    }
    //########################################################################

    
    //**************************** 有连接断开时处理数据  ************************
    @OnClose
    public void close() {
        //从 set 集合里移除当前对象
        webSocketSet.remove(this);
        //在线数-1
        onlineCountSub();
        System.out.println("有窗口断开连接!\t当前在线连接数为:\t" + getOnlineCount());
    }

    //给当前在线连接数 -1
    private static synchronized void onlineCountSub() {
        WebSocketServer.onlineCount--;
    }
    //**********************************************************************

    //当前所有连接数
    private static synchronized long getOnlineCount() {
        return onlineCount;
    }

    
    //############## 给不同情况下，给单人推送，给多人推送，给所有人推送 ##############
    //给某一个人推送消息
    public void sendMessage2UserById(String msg, @NonNull String userId) {
        webSocketSet.forEach(i -> {
            if(userId.equals(i.userId)){
                try {
                    i.session.getBasicRemote().sendText(msg + "\t用户ID: " + i.userId);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }
    //给某一组人推送消息
    public void sendMessage2UserList(String msg, @NonNull List<String> userIdList){
        userIdList.forEach(i->{
            sendMessage2UserById(msg,i);
        });
    }

    //给所有人推送消息
    public void sendMessage2All(String msg){
        webSocketSet.forEach(i->{
            try {
                i.session.getBasicRemote().sendText(msg + "\t用户ID: " + i.userId);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
    //#########################################################################
}
```



### 定时任务

```java
import com.example.deme.server.WebSocketServer;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
@EnableScheduling
public class TestJob {
    @Resource
    private WebSocketServer webSocketServer;

    @Scheduled(cron = "0/10 * * * * ?")
    public void job(){
        webSocketServer.sendMessage2All(new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss").format(new Date()));
    }
}
```



### 测试 Controller

```java
import com.example.deme.server.WebSocketServer;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Arrays;

@RestController
@RequestMapping
public class TestController {

    @Resource
    private WebSocketServer webSocketServer;

    @RequestMapping("ids/{ids}")
    public void getIds(@PathVariable("ids") @NonNull String ids) {
        String msg = "默认信息 ";
        String[] split = ids.split(",");
        if (split.length == 1) {
            webSocketServer.sendMessage2UserById(msg, split[0]);
        } else {
            webSocketServer.sendMessage2UserList(msg, Arrays.asList(split));
        }
    }
}
```

http://localhost:8080/ids/1

http://localhost:8080/ids/1,2,3



### 前端

[WebSocket-API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

这里仅仅作为 demo 演示，使用的也是原生的 js，根据自己使用的 JQuery，Vue，React 自行扩展

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebSocket</title>
</head>
<body>

<h1 style="text-align:center;"> SpringBoot - WebSocket 测试</h1>
<hr>

<div id="msg"></div>

</body>


<script type="text/javascript">
    var websocket = null;
    var userId = 0;
	
    //用户输入
    userId = prompt("请输入一个用户id");

    //#################  判断浏览器是否支持 Websocket  ###################
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://localhost:8080/websocket/" + userId);
    } else {
        alert("您的浏览器不支持websocket");
    }
    //#################################################################

    
    websocket.onopen = function(event){
        console.log("连接成功后的回调函数");
    }
    
    websocket.onerror = function(event){
        console.log("连接失败后的回调函数");
    }
    
    //处理服务器推送过来的信息
    websocket.onmessage = function (event){
        document.getElementById('msg').innerHTML += "<br/>" + event.data;
    }
    
    webSocket.onclose = function(event){
        console.log("连接关闭后的回调函数");
    }
</script>
</html>
```

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").withSockJS();
    }
    @Override
    public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
        messageConverters.add(new MappingJackson2MessageConverter()); //json 解码
        return true;
    }
}
```

