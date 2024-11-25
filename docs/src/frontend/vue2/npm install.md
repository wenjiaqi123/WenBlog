# npm install



## 本地安装

安装的包只在一个目录中有，可能在你电脑上有很多个项目，都使用到该模块，不易复用

```c
npm install axios
```

会安装到当前目录的 node_modules 目录下

测试：

- 在 F:\test 目录下新建 node_modules

![image-20210809153211306](https://attach.blog.wen7.online/image-20210809153211306.png)

- 随便安装一个 npm 模块

    ![](https://attach.blog.wen7.online/image-20210809153325004.png)

- 查看 node_modules 下安装的包

![image-20210809153359251](https://attach.blog.wen7.online/image-20210809153359251.png)![image-20210809153410297](https://attach.blog.wen7.online/image-20210809153410297.png)



## 全局安装

```c
npm install axios -g
npm install -g axios
```

会将包安装到全局位置去，方便复用

```c
// 查看全局目录
npm config get prefix				//C:\Users\闻老C\AppData\Roaming\npm
// 设置全局目录
npm config set prefix "目录路径"
```

- ==如果修改了全局目录，注意修改系统环境变量==

```c
//查看全局路径
npm root -g							//C:\Users\闻老C\AppData\Roaming\npm\node_modules
```

- 去 npm root -g 查询出来的目录下查看有无 axios 文件夹，有就删除
- 全局安装 `npm install axios -g`
- 再次查看



## i

- install 可以简写成 i

```bash
npm install -g axios
npm i -g axios
```



## 参数

```bash
npm install xxxxx --save		# 将该包保存到 package.json 的 dependencies 中去【正式上线依赖】
npm install xxxxx -S			# 等同于 --save

npm install xxxxx -D 			# 将该包保存到 devDependencies 中去【开发依赖包】

```



## 常用安装

### 安装 webpack

```bash
npm install webpack -g
```



### 安装 @vue/cli

```bash
npm install -g @vue/cli
```

- @vue/cli 以前是 叫  vue-cli  后来叫  @vue/cli

- ```bash
    # 卸载旧版本 vue-cli,或者直接找到
    npm uninstall vue-cli -g
    ```

    
