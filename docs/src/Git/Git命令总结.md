# Git 命令总结

## 基本

```bash
#####################  全局配置  ######################
# 查看版本
Git --version
# 全局配置
Git config --global user.name "用户名"
Git config --global user.email "邮箱"
# 查看全局配置
Git config --list
####################  初始化本地仓库  ##################
# 初始化本地仓库
Git init
####################  查看状态	#######################
# 查看文件状态
Git status [文件名]
# 查看所有文件状态
Git status
```



## 本地

```bash
###################  本地流转  #######################
# 文件从工作区添加到暂存区
Git add 文件名
Git add .
# 文件从暂存区回退到工作区
Git restore --staged "文件名"
Git reset "文件名"
# 文件从暂存区提交到本地仓库
Git commit -m "提交备注"
# 文件从工作区添加到暂存区提交到本地仓库,需要该文件已经add过一次，-a就相当于 add
Git commit -am "提交备注"
# 如果文件在工作区已经删除,但是文件已经添加到暂存区或者已经提交到本地仓库,可以检出
Git checkout "文件名"
# 文件比较
Git diff "文件名"
```



## 日志

```bash
##################  查看日志  #########################
# 查看提交日志
Git log
# 如果日志太多，屏幕显示不方便，可以使用简便模式
Git log --pretty=oneline
Git log --oneline
Git reflog
```



## 版本跳转

```bash
##################  版本跳转  #########################
# 跳转到某版本
Git reset --hard 版本号
# 回退一个版本
Git reset --hard HEAD^
# 回退四个版本
Git reset --hard HEAD^^^^
# 回退52个版本
Git reset --hard HEAD~52
```



## 分支操作

```bash
#################  分支操作  ##########################
# 创建分支
Git branch "分支名"
# 查看分支
Git branch
# 切换分支
Git checkout 分支名
# 创建并切换到该分支
Git checkout -b 分支名
# 修改分支名
Git branch -m 旧分支名  新分支名
# 删除分支，如果你想删除分支 leaf01，需要切换到其他分支上再删除
Git branch -d 分支名
# 强制删除分支，如果该分支上还有内容没有合并，是不给删除的，需要强制删除
Git branch -D 分支名
# 合并分支,需要在主分支上合并
Git merge 分支名
```



## 远程

```bash
###############  远程   ################################
# 克隆Github上项目
Git clone 从github上拷贝的HTTPS链接

# 将本地仓库和github上的远程仓库绑定，只需要改后面的链接
Git remote add origin https://github.com/xiaoyuanbang/pname.git
# 将本地分支推送到远程仓库
Git push origin 本地分支名

# 查看所有分支，包括远程分支
Git branch -a
# 从远程同步代码到本地，此时会在本地拥有一个远程分支
Git fetch 远程别名 远程分支名
# 合并分支，该分支是远程分支  分支名:remotes/origin/分支名，使用 merge 不需要 remotes/
Git merge 远程别名/远程分支名
# 从远程拉取代码到本地,pull = fetch + merge
Git pull 远程别名 远程分支名
```