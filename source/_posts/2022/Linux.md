---
title: Linux
tags: [操作系统]
categories: [操作系统]
date: 2022-01-06 13:20:23
---
# 一、环境配置使用

## 1. VMware下载安装

登入：[官网](https://customerconnect.vmware.com/en/downloads/details?downloadGroup=WKST-1621-WIN&productId=1038&rPId=77282)，【Resources→Tools & Training→Product Downloads→Desktop & End-User Computing→VMware Workstation Pro】傻瓜式安装，需要秘钥（百度一下即可得到），这里收集到的16.2.1 Pro版本的VMware的秘钥为：`ZF3R0-FHED2-M80TY-8QYGC-NPKYF`，即可激活使用。

## 2. ubantu下载安装

登入：[官网](https://ubuntu.com/)，下载结果为一个后缀为`.iso`的镜像文件

## 3. VMware中安装ubantu

* 【文件→新建虚拟机→新建虚拟机向导】

  ![image-20220111111446781](https://gitee.com/crazy_zsh/Images/raw/master/myImages/image-20220111111446781.png)

  

  ![image-20220111111623852](https://gitee.com/crazy_zsh/Images/raw/master/myImages/image-20220111111623852.png)

  

  ![image-20220111111711933](https://gitee.com/crazy_zsh/Images/raw/master/myImages/image-20220111111711933.png)

  

  ![image-20220111111805293](https://gitee.com/crazy_zsh/Images/raw/master/myImages/image-20220111111805293.png)

* 加载镜像文件

* 安装ubantu【需要耗费一定时间】

## 4. 常见问题

* 安装ubantu时安装界面显示不全解决方案：

  Alt+F7+鼠标左键

* 安装VMware Tools

* 
# 二、常见命令

## 1. 文件列表

* `ls`：查看**当前目录**下的文件列表（包括文件夹/文件）

* `ls /`：查看**根目录**下的文件夹/文件

* `ls /xxx`：查看**任意目录下**的文件夹/文件【须以`/`开头，xxx为具体路径名称】

* `ls -l`：以**详细的方式**列出文件夹/文件

## 2. 切换目录

* `pwd`  (print work directory)：查看当前所在文件夹（包括当前文件夹下的文件和文件夹）
* `~`：当前用户主目录
* `cd` （change directory)：切换文件夹
* `.`：当前目录
* `..`：上一级目录
* 示例：`cd ~/solftware`=`cd /home/crazyzsh/solftware` 

## 3. 目录操作

* `mkdir` ( make directory)：创建目录
* `mkdir -p`：创建深层目录（如果创建深层目录不加`-p`的话会报错）
* `rmdir`：删除一个空目录（如果目录非空，则删除不成功，不常用）
* `rm -rf xxx` (r→recursive：递归的，f→force)：彻底删除一个目录xxx（包括目录中所有的目录或文件）
* `rm -rf /*`：删库跑路（只有root用户才能使用）
* `cp -rf a b`：将a（文件或文件夹）复制一份为b（如果b存在，则将a复制到b文件夹下面）
* `mv a b`：将a（文件或文件夹）重命名（也称移动）为b

## 4. 压缩/解压

tar：tape archive

**归档**：

* `tar -cvf 【要被打包成的问价名.tar】【要打包的文件名】 `→可以有多个文件夹或文件一同被压缩（只需以空格隔开即可）

**还原**档案包：

* `tar -xvf 压缩文件名.tar`
* `tar -xvf压缩文件名.tar-C 目标文件夹 ` →还原档案到指定文件夹，`C`为大写

| 选项 | 含义                                                         |
| ---- | ------------------------------------------------------------ |
| c    | 生成档案文件，创建打包文件                                   |
| x    | 解开档案文件                                                 |
| v    | 列出归档解档的详细过程，显示进度                             |
| f    | 指定档案文件名称，f 后面一定是 .tar 文件，所以必须放选项最后 |

**归档并压缩**：

`tar -zcvf 【要被打包成的问价名.tar.gz】【要打包的文件名】 `

**解压缩**

* `tar -zxvf 压缩文件名.tar.gz`
* `tar -zxvf压缩文件名.tar.gz-C 目标文件夹 ` →解压到指定文件夹，`C`为大写

## 5. 软链接

软链接即快捷方式（link)，`-s`：soft，默认为硬

* `ln -s 文件夹/文件 链接名称`

* 使用`ls -l`显示出具体文件详情：

  ![image-20220113224119054](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202201132241121.png)

  带有`l`的即为link

  带有`-`的即为文件

  带有`d`的即为目录