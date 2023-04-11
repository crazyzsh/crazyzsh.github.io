---
title: 开发记录
tags: []
categories: []
date: 2022-02-22 21:05:54
---
# 开发手册

## 1. 优秀博客

| 序号 | 内容            | 链接                                                         |
| ---- | --------------- | ------------------------------------------------------------ |
| 1    | cesium官方文档  | https://sandcastle.cesium.com/?src=CZML%20Custom%20Properties.html |
| 2    | 网友代码        | https://blog.csdn.net/weixin_39080216/article/details/99747748 |
| 3    | 水淹没          | https://blog.csdn.net/weixin_44011559/article/details/118979678?spm=1001.2014.3001.5501 |
| 4    | 地形高度        | https://blog.csdn.net/u013821237/article/details/84838103    |
| 5    | cesium坐标转换  | https://blog.csdn.net/u013821237/article/details/80169327?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164169395916780274137001%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=164169395916780274137001&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-1-80169327.pc_search_insert_ulrmf&utm_term=cesium+cartesian3&spm=1018.2226.3001.4187 |
| 6    | VMware16pro秘钥 | ZF3R0-FHED2-M80TY-8QYGC-NPKYF                                |
| 7    |                 |                                                              |
| 8    |                 |                                                              |
| 9    |                 |                                                              |
| 10   |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |
|      |                 |                                                              |

## 2. 项目部署

使用`npm run build`之后便可得到dist文件夹，为了方便，可将其部署到Windows自带的iis服务上，步骤如下：

### 2.1 IIS

初次`开启Windows的IIS服务`步骤为：

* win+r输入control唤出控制面板
* 单击【卸载程序】按钮
* 单击【启用或关闭Windows功能】
* 选中【IIS】即可

![image-20220222195342769](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202202221953840.png)

初次打开`IIS管理器`的步骤：

* 控制面板中打开【系统和安全】
* 【管理工具】
* 【IIS管理器】

![image-20220222200123664](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202202222001714.png)

`新建IIS网站`：

* 右击上述网站，单击【添加网站】

  ![image-20220222204524566](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202202222045625.png)
  

### 2.2 防火墙

打开防护墙的方式如同打开【IIS管理器】一致

* 控制面板中打开【系统和安全】

* 【管理工具】

* 【防火墙】

* 输入端口（iis设置的端口），后续操作默认即可

  ![image-20220222205641288](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202202222056356.png)



### 2.3 flask配置

![image-20220222215312386](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202202222153417.png)



![image-20220222215322798](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202202222153838.png)
