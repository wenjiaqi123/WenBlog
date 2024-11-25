# Git命令

## 全局配置

```bash
#全局设置用户名和邮箱
Git  config  --global  user.name  "你的用户名"
Git  config  --global  user.email  "你的邮箱"

#查看全局设置
Git  config  --list
```

![image-20210621171555439](https://attach.blog.wen7.online/image-20210621171555439.png)

在设置了用户名和邮箱，在你的电脑里会生成一个 .gitconfig 的配置文件，里面就是刚才配置的用户信息，可以尝试删掉信息再使用 git config --list 查看配置

<img src="https://attach.blog.wen7.online/image-20210621171746783.png" alt="image-20210621171746783" style="zoom:80%;" />



## 初始化仓库

新建一个空白文件夹 study（实际工作中，就是你的项目名，我们的项目代码就放在 study 目录下），

在 study 的目录下，右击 Git Bash Here 使用命令初始化本地仓库，

如果没有 .git，查看 window 是否勾选了隐藏项目，因为 .git 是一个隐藏文件夹

```bash
# 初始化本地仓库
Git init
```

![image-20210621175624366](https://attach.blog.wen7.online/image-20210621175624366.png)

>如果不想使用 命令行初始化本地仓库，也可以使用 【Git Gui Here】→【Create New Repository】→ 【Browse】选择文件夹 study，【Create】，也可以达到初始化本地仓库的效果。
>
>【Git Gui Here】只是图像化界面，方便使用。接下来的命令行操作都可以在GUI里完成



## 查看文件状态

在 study 目录下新建一个文件 hello.java 使用命令行查看状态

```bash
# 查看文件状态
Git status 文件名
# 查看所有文件状态
Git status
```



![image-20210621180904822](https://attach.blog.wen7.online/image-20210621180904822.png)

我们发现上图 hello.java 是红色的，并且是 Untracked files（未跟踪的文件），

hello.java 文件在【工作区】状态是【Untracked】

```markdown
文件状态
 Untracked		未跟踪(还未加入版本控制)
 Modified		已修改(已经加入版本控制)
 Staged			已暂存(已经加入版本控制)
 Committed		已提交(已经加入版本控制)
```



##  本地文件操作

![image-20210622161522710](https://attach.blog.wen7.online/image-20210622161522710.png)

![image-20210621175237725](https://attach.blog.wen7.online/image-20210621175237725.png)



### 文件添加到暂存区

将文件从工作区，加入暂存区，并再次查看状态

```bash
# 将文件加入暂存区
Git add 文件名
# 将所有文件加入暂存区
Git add .
```



![image-20210621181957123](https://attach.blog.wen7.online/image-20210621181957123.png)

我们发现上图 hello.java 是绿色的，状态是 staged（已暂存），

hello.java 文件在【暂存区】状态是【Staged】



### 文件提交到本地仓库

将文件从暂存区，提交到本地仓库，并再次查看状态

```bash
# 将暂存区的文件提交到本地仓库,-m就是message,本次提交的内容作个备注
Git commit -m "提交信息"
```

![image-20210621183114029](https://attach.blog.wen7.online/image-20210621183114029.png)

我们发现上图 git status 已经没有内容了，显示 nothing to commit，working tree clean 没有东西可提交了，工作树已经清空

hello.java 文件在 【本地仓库】当前的状态是 【Committed】 （已提交）

查看提交日志  .git → logs → Head，

![image-20210621183323118](https://attach.blog.wen7.online/image-20210621183323118.png)

使用命令行查看日志

```bash
# 查看提交日志
Git log
# 如果日志太多，屏幕显示不方便，可以使用简便模式
Git log --pretty=oneline
Git log --oneline
Git reflog
```



![image-20210621183509108](https://attach.blog.wen7.online/image-20210621183509108.png)



### 文件检出到工作区

【将工作区的 hello.java 删掉】

使用命令行将 hello.java 文件从本次仓库检出到工作区，checkout 也可将暂存区的内容检出到工作区

```bash
# 将本地仓库的文件检出到工作区
Git checkout "文件名"
```



![image-20210621185230159](https://attach.blog.wen7.online/image-20210621185230159.png)



### Modified 已修改

新建一个 test.txt 文件，添加到 暂存区，并查看状态【Staged】

修改 text.txt 文件，再次查看状态，【Modified】已修改状态

![image-20210621190824108](https://attach.blog.wen7.online/image-20210621190824108.png)



### 文件从暂存区回退到工作区

将 test.txt 文件添加到暂存区，使用回退命令，将文件状态回退到工作区，并再次查看状态

```bash
# 将文件从暂存区回退到工作区
Git restore --staged "文件名"
Git reset "文件名"
```

![image-20210621191518861](https://attach.blog.wen7.online/image-20210621191518861.png)



### 文件比较

准备工作，准备一个文件，添加到暂存区，提交到本地仓库

![image-20210621212227474](https://attach.blog.wen7.online/20210621212227.png)

然后在工作区修改文件，并比较两个文件不同

```bash
# 比较文件不同
Git diff "文件名"
```



![image-20210621212425317](https://attach.blog.wen7.online/20210621212425.png)

```mark
比较说明
--- a/HelloWorld.java		表示改动前的文件
+++ b/HelloWorld.java		表示改动后的文件
变动的位置用 @@  @@ 作为起首和结尾

@@ -1,6  +1,12 @@ 含义说明
-1,6 	-表示第1个文件	从第1行起的连续6行
+1,12	+表示第2个文件	从第1行起的连续12行

图中绿色的 + 号表示变动后的内容
```



### 文件版本穿梭/时光穿梭机

准备工作，先准备一个文件

第一次提交内容

```markdown
我是第一版本
```

第二次提交内容

```markdown
我是第一版本
我是第二版本
```

第三次提交内容

```markdown
我是第一版本
我是第二版本
我是第三版本
```

第四次提交内容

```markdown
我是第一版本
我是第二版本
我是第三版本
我是第四版本
```

第五次提交内容

```markd
我是第五版本
我是第五版本
我是第五版本
我是第五版本
```

![image-20210622091642997](https://attach.blog.wen7.online/image-20210622091642997.png)

查看日志

```bash
# 查看日志
Git reflog
```

<img src="https://attach.blog.wen7.online/image-20210622093429167.png" alt="image-20210622093429167"  />

根据版本号/索引值回退到该版本

```bash
# 跳转到某版本
Git reset --hard  版本号
```

![image-20210622093639680](https://attach.blog.wen7.online/image-20210622093639680.png)

![image-20210622094119144](https://attach.blog.wen7.online/image-20210622094119144.png)

```bash
# 回退一个版本
Git reset --hard HEAD^
# 回退四个版本
Git reset --hard HEAD^^^^
# 回退52个版本
Git reset --hard HEAD~52
```



## 分支操作

在实际工作中，团队不可能直接在主分支上进行操作，而是会重新开辟新的分支，在新的分支上进行开发，调试。当分支上的内容全部调试成功，才会合并到主干分支上。

![image-20210622163502709](https://attach.blog.wen7.online/image-20210622163502709.png)



### 创建分支

创建分支前，先将 b.txt 提交到本地仓库，使用命令行新建分支

```bash
# 创建分支
Git branch "分支名"
```



![image-20210621214439908](https://attach.blog.wen7.online/20210621214439.png)



### 查看分支

```bash
# 查看分支，*号标识的是当前所在分支
Git branch
```

![image-20210621215116571](https://attach.blog.wen7.online/20210621215116.png)

```bash
# 切换分支
Git checkout 分支名
# 创建分支并切换到该分支上,-b 就是 branch
Git checkout -b 分支名
```

![image-20210621215232931](https://attach.blog.wen7.online/20210621215232.png)

因为分支 leaf01 是从主分支上开辟出来的，所以主分支上有的内容，该分支上也有

在 leaf02分支上新建文件 leaf02.txt 并在 leaf02 分支上提交到该分支的本地仓库上

![image-20210621220118665](https://attach.blog.wen7.online/20210621220118.png)

切换到 leaf01 分支上，发现并没有在分支 leaf02 上提交的内容

![image-20210621220310500](https://attach.blog.wen7.online/20210621220310.png)



### 修改分支

假设我们现在有 master leaf01 leaf02 三个分支，每个分支上都有 b.txt 文件，leaf02 分支上还有 leaf02.txt 文件

```bash
# 修改分支名
Git branch -m 分支旧名称  分支新名称
```

![image-20210621220539439](https://attach.blog.wen7.online/20210621220539.png)



### 删除分支

```bash
# 删除分支，-d 就是 delete，如果你想删除分支 leaf01，需要切换到其他分支上再删除
Git branch -d 分支名
# 强制删除分支，如果该分支上还有内容没有合并，是不给删除的，需要强制删除
Git branch -D 分支名
```



### 分支合并与冲突

准备工作，在 master 分支上新建一个 Hello.java 文件，并填写一些内容，【提交到本地仓库】，创建分支 leaf01 并切换到该分支上

![image-20210621223259473](https://attach.blog.wen7.online/20210621223259.png)



测试：在主干分支上改动该文件并提交，再切换到分支 leaf01 上改动该文件并提交

![image-20210621223513520](https://attach.blog.wen7.online/20210621223513.png)

![image-20210621223627576](https://attach.blog.wen7.online/20210621223627.png)



切换到主分支上，合并分支 leaf01，

```bash
# 合并分支，需要在主分支上合并
Git merge  分支名
```



![image-20210621223743275](https://attach.blog.wen7.online/20210621223743.png)

```mark
冲突说明
git使用 <<<<<<< 	=======		>>>>>>> 来标注不同的分支的不同内容
如上图所示
<<<<<<< HEAD
	//在主干分支上改动该文件
	public void master(){
		System.out.println("我是主干分支");
=======
这一块表示 HEAD 主分支上的内容
=======
    //在leaf01分支上改动该文件
	public void master(){
		System.out.println("我是leaf01分支");
>>>>>>> leaf01
这一块表示 leaf01 分支上的内容
```

出现冲突后，对 Hello.java 里的内容进行手动合并，合并看实际开发情况而定

![image-20210621224209979](https://attach.blog.wen7.online/20210621224210.png)