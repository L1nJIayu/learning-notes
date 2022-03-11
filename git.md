# git

​	文本主要对一些操作和命令的记录，方便忘记的时候直接查阅。

​	学习教程建议直接看[廖雪峰的Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)👍



## 一、基本命令



#### 初始化

```shell
git init
```



#### 查看当前状态

```shell
git status
```



#### 查看当前【工作区】与版本库中最新版本的区别

```shell
git diff
```



#### 把对文件的修改添加到【暂存区Stage】

```shell
# 添加某个文件
git add xxx.txt
# 添加当前目录下的所有文件
git add .
```



#### 提交到版本库

```shell
git commit -m "注释内容"
```



#### 查看日志

```shell
# 查看完整信息
git log
# 查看精简信息（只包含commit ID和HEAD以及”提交注释“
git log --pretty=oneline
```



#### 回滚

```shell
# 回滚到上一次提交的地方（有几个^就往前回滚几次）
git reset --hard HEAD^
# 回滚到指定的commit id
git reset --hard [commit id]
# 回滚到前100条记录
git reset --hard HEAD~100
```



#### 查看命令记录

```shell
git reflog
```



#### 撤销修改

```shell
# 撤销[暂存区]的修改（还没有commit)
git reset HEAD [fileName]
# 撤销[工作区]的修改（还没有add）
git checkout -- [fileName]
```



#### 删除文件

```shell
# git add 和 git rm的效果是一样的
git rm [fileName]
```

如果误删文件，在没有rm的情况下，可以用**git checkout -- [fileName]**恢复文件。



## 二、远程仓库 remote repository



#### SSH Key

​	打开git bash，创建SSH KEY

```shell
$ ssh-keygen -t rsa -C "youremail@example.com"
```

在用户主目录里找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。



#### 将本地的git仓库与github的仓库关联

1. 在github创建一个空的新仓库

   啥都别勾选，直接创建，会进入Quick setup，github会提示两种方式进行新仓库的创建。

2. 在本地参考目录下执行命令

   ```shell
   git remote add origin [仓库git地址]
   git branch -M main
   git push -u origin main
   ```

   - `origin`是给远程仓库起的名字，可以是任意的，但习惯上一般叫它origin；
   - 由于github默认的主分支是main，所以需要将本地的master改成main。
   - 第一次推送要加上`-u`，之后推送就不用了，甚至可以直接`git push`



#### 删除与远程仓库的绑定关系



1. 查看远程仓库信息

   ```shell
   git remote -v
   
   # origin  git@github.com:L1nJIayu/gitTest.git (fetch)
   # origin  git@github.com:L1nJIayu/gitTest.git (push)
   ```

2. 根据名字删除

   ```shell
   git remote rm origin
   ```



#### 克隆远程github仓库

在github上初始化一个新的仓库，然后在本地的对应参考执行`git clone`

```shell
git clone [远程仓库地址]
```



## 三、分支 branch



#### 查看分支

```she
git branch
```

#### 创建分支

```shell
# 创建并切换
git switch -c [分支名称]
# or (命令不好理解，建议用switch)
git checkout -b [分支名称]

# 只创建
git branch [分支名称]
```

#### 修改当前分支名称

```shell
git branch -M [新的分支名称]
```

#### 切换分支

```shell
git switch [分支名称]
# or
git checkout [分支名称]
```

#### 合并分支

```shell
git merge [分支名称]
```

#### 删除分支

```shell
git branch -d [分支名称]
```

#### 查看分支合并图

```shell
git log --graph
```



#### 强制禁用`Fast forward`模式

```shell
git merge --no-ff -m "merge with no-ff" [分支名称]
```

默认的合并会使用`Fast forward`模式，这样，删除分支后，分支信息会被丢弃。

如果禁用此模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。由于生成一个新的commit，所以也需要加上-m注释。



#### 储存当前工作现场

```shell
git stash
```



#### 查看储存工作现场的列表

```shell
git stash list
```



#### 恢复存储的工作现场

```shell
git stash apply stash@{0}
```



#### 删除存储的工作现场

```shell
git stash drop stash@{0}
```



#### 恢复的同时，删除工作现场

```shell
git stash pop
```



#### 复制特定的提交，到当前分支

```shell
git cherry-pick [commit id]
```





## 四、标签 tag



#### 查看所有标签

```shell
git tag
```



#### 打一个新的标签

```shell
# 在当前版本打一个标签
git tag v0.1
# 指定某个commit id打标签
git tag v0.2 [commit id]
# 打一个带有说明的标签
git tag -a v0.3 -m "v0.3版本" [commit id]
```



#### 查看标签信息

```shell
git show v0.1
```



#### 删除标签

```shell
git tag -d v0.1

# 同时远程仓库的标签
git tag -d v0.9
git push origin :refs/tags/v0.9
```



#### 推送标签

```shell
# 推送指定标签
git push origin [tagName]
# 推送所有标签
git push origin --tags
```





## 五、自定义Git



#### 显示颜色

```shell
git config --global color.ui true
```



#### 忽略文件 `.gitignore`



#### 配置别名





## 六、搭建Git服务器



建议Ubuntu

```shell
# 安装git
sudo apt-get install git

# 添加用户，专门用于运行git服务
sudo adduser git
# 由于默认是禁用登录shell的，需要去etc/passwd修改
vim /etc/passwd
# 找到 git:x:1001:1001:,,,:/home/git:/bin/bash
# 改为 git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell

# 找一个目录，初始化一个仓库
sudo git init --bare sample.git
# 给这个仓库设置权限
sudo chown -R git:git sample.git

# 公钥管理,一行一个，然后就可以clone和push了
vim /home/git/.ssh/authorized_keys
```













