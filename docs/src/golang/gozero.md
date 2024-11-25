# gozero

![image-20240204142849729](https://attach.blog.wen7.online/20240204142849.png)

- 如果没有 go.mod 就执行 

- ```
  go mod init xxxx
  xxxx 项目名称
  ```

  - ```
    go get -u github.com/zeromicro/go-zero
    执行下载依赖
    ```

![image-20240204143115656](https://attach.blog.wen7.online/20240204143115.png)



```
go  install  github.com/zeromicro/go-zero/tools/goctl@latest
下载安装 goctl 
如果不能下载，检查代理。

# Go 1.15 及之前版本
GO111MODULE=on GOPROXY=https://goproxy.cn/,direct go get -u github.com/zeromicro/go-zero/tools/goctl@latest

# Go 1.16 及以后版本
GOPROXY=https://goproxy.cn/,direct go install github.com/zeromicro/go-zero/tools/goctl@latest
```

