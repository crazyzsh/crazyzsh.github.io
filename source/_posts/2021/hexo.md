---
title: Hexo
date: 2021-12-31 18:20:02
tags: [hexo,web]
categories: [web,野生技术]
---
#  一、全流程

## 1. hexo的安装

1、首先全局安装一下hexo，使用命令【类似于Vue脚手架】

```
npm i hexo-cli -g
```

2、创建项目【自动生成一个文件夹，如果省略项目名称的话就会默认在使用命令的根目录下进行创建项目】

``````
hexo init [folderName]
``````

3、进入项目目录下，使用命令安装相应的依赖

``````
npm i
``````

4、生成静态文件【在项目目录中生成public文件】

```
hexo g
```

5、启动服务器

```
hexo s
```

## 2. 部署前的准备

上述是创建一个应用的最简步骤，接下来的操作是将代码托管到github，并创建一个github域名供查看。

1. 下载hexo-deployer-git包【需要注意的是，这个包是在项目中安装的，不要全局安装】


```
npm install hexo-deployer-git --save
```

2. 创建远程仓库【命名是唯一的：用户名.github.io】：

   ![image-20211229214808378.png](https://s2.loli.net/2021/12/30/yax8DK3Ifv9R5nw.png)

   

3. 更改项目配置，将项目与远程仓库进行绑定，找到项目根目录下的【_config.yml 】文件，并在末尾进行修改相关配置如下：

```deploy:
 type: git
 repo: git@github.com:crazyzsh/crazyzsh.github.io.git
 branch: main
```

上述配置中的repo对象修改为github远程仓库的地址，分支branch修改为main，github默认的分支为main，也可以修改为其他分支【如果修改为其他分支的话，记得在以下界面切换着查看一下】

![image-20211229214925972.png](https://s2.loli.net/2021/12/30/DiKWs1FXAjZ7IRf.png)





## 3. 部署

在先前**安装好hexo-deployer-git**、**创建好仓库**、**配置好_config.yaml文件**的基础上，使用`hexo deploy`命令即可进行部署，命令的简写方式为：`hexo d`

## 4. 总结

**初次使用**：

1. `hexo g`生成静态页面===>生成**public文件夹**【HTML等文件】
2. 使用`hexo s`进行本地**预览查看**
3. 再使用`hexo d`进行部署到github===>生成**deploy_git文件夹**

​           上述命令1会在项目目录中生成public目录【文件夹内的是编译好的html文件】，在开发时如果进行了改动，应该使用`hexo clean`进行清除【最暴力的方法是先删除public目录，再使用`hexo clean`命令来清空，如果前面没有达到这个预期效果的话，可以尝试这种方法】，然后再使用命令1来生成静态页面，再使用命令3部署到github。

**日常使用：**

1. 删除deploy_git文件夹
2. `hexo clean`===>**删除public目录**
3. `hexo g`===>**重新生成public文件夹**
4. `hexo s`===>**预览**【非必要步骤】
5. `hexo d`===>**生成deploy_git文件夹**

如果不进行1、2两步骤，一定会报错，**需谨记！！！**

# 二、基本操作

## 1. 如何在Markdown中插入图片？

​         一般在Markdown语法中，假如直接插入本地图片，由于本地文件变更比较频繁，容易造成图片遗失，这里我们选择图床来保存图片。

这里选择将本地图片上传至`sm.ms`网站上，可以直接生成Markdown语法格式的地址，将地址直接复制到相应位置即可。

## 2. new

```
hexo new [layout] <titleName>
```

* 其中的layout如果不指定的话就是在_config.yml全局配置项的default_layout属性值，默认值为`default_layout: post`
* 如果标题包含空格的话，要使用引号括起来。`hexo new "your title name"`
* 新建文章时一定要加上标题名，否则将达不到想要的效果（--path只是一个强制参数，放在前或后都无所谓）

```
hexo new <layout> <titleName> --path yourPath
```

```
hexo new <layout> --path yourPath <titleName>
```

如果使用默认的post布局且要指定路径，也是按照以上命令来进行指定，值得注意的是，使用`--path`时记得写下一级路径，可作为md文件的文件名用

## 3. page和post&&draft的区别

只有page布局才能任意放置在根路径下，**自定义布局**和**post布局**只能放置在**_posts文件夹**中。

![image-20211231150950197](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202112311509234.png)







# 三、功能完善

## 1. 评论





## 2. 图床使用

**2.1 github、picgo进行绑定**

使用sm.ms图床容易挂掉（有时候晚上看不到），这里使用github/gitee自带的图床，使用工具为：picgo

这里以github为例 ：

* 首先在github上新建一个仓库用来专门保存图片，同时拿到github的token

* 下载picgo软件【一款图床集大成软件，里面内嵌了国内外众多优秀图床】

* 在picgo中进行github相关配置如下图：

  * ![](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/picgo%E4%B8%ADgithub%E8%AE%BE%E7%BD%AE.png)

  * 默认的域名为：

    `https://githubusercontent.com/用户名/仓库名/分支名/目录名称/图片文件名`

**2.2 picgo和typora进行绑定**

![image-20211231111504773](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/typora%E4%B8%8Epicgo%E8%BF%9B%E8%A1%8C%E7%BB%91%E5%AE%9A.png)

  

**具体用法**：

通过上述的typora与picgo进行的绑定，只要在typora中进行图片插入操作【赋值粘贴（cv，snipaste），拖拽】就可以直接进行上传操作，此时如果在picgo中**关闭了**【上传前重命名】且**打开了**【时间戳重命名】的话就不会弹出窗口来提示而是**直接上传**了。