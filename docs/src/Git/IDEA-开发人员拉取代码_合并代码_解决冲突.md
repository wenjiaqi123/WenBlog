# 开发人员拉取代码/合并代码/解决冲突

## 更新

![image-20210902153948773](https://attach.blog.wen7.online/image-20210902153948773.png)

![image-20210902154234932](https://attach.blog.wen7.online/image-20210902154234932.png)



## 合并代码/解决冲突

1. 用户 A 在自己的 Test 里写一些方法，并提交到本地

    - ```java
        public void test(){
            System.out.println("A");
        }
        ```

2. 用户 B 在自己的 Test 里写一些方法，提交到本地并推送到远程仓库

    - ```java
        public void test(){
            System.out.println("B");
        }
        ```

3. 用户 A 更新远程仓库的代码，合并代码

    - 左侧列表就是冲突的文件，右侧选择使用别人的，还是自己的，还是手动合并【Merge】

![image-20210902155654813](https://attach.blog.wen7.online/image-20210902155654813.png)

![image-20210902160004664](https://attach.blog.wen7.online/image-20210902160004664.png)

![image-20210902160036508](https://attach.blog.wen7.online/image-20210902160036508.png)