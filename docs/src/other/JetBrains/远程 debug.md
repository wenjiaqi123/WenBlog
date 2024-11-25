# 远程 Debug

```java
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar XXXXX.jar
```

```bash
Java: 这是用来运行Java程序的命令。

-agentlib:jdwp: 这个参数告诉Java虚拟机(JavaVirtualMachine)加载JDWP代理库。JDWP代理库能够让你通过JDWP协议进行调试。

transport=dt_socket: 这个参数指定了调试数据的传输方式，这里是使用socket连接。

server=y: 这个选项说明JVM将会作为调试服务器，等待调试器的连接。

suspend=n: 这个选项设定JVM在启动时是否要暂停执行，等待调试器的连接。设置为n表示不等待调试器即开始执行。

address=*:5005: 这个选项指定了调试服务器监听的地址和端口。注意前面有一个星号 * ，表示接受任何IP地址的调试请求。

-jar XXXXX.jar: 这是指定要运行的jar文件。
```

注意开放云服务器的防火墙，安全组规则

![image-20231109113326090](https://attach.blog.wen7.online/202311091133202.png)