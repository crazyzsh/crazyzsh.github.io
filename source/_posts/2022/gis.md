---
title: gis
tags: []
categories: []
date: 2022-01-30 22:28:04
---
# 一、开发笔记

## 1. 常见坐标和格式转换

### tif转ASCII

![image-20220119213305668](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202201192133750.png)

### 坐标转换（QGIS）

* 非跨地理坐标系转换：

  必须提前知道原来的坐标系，例如地理转投影、投影转地理就**先**设定**原坐标**（缺少关键投影信息的情况下），再直接**右键导出**相应的坐标系即可

###  常见EPSG坐标系

* EPSG:4490 - China Geodetic Coordinate System 2000 - 地理坐标系
* EPSG:4549 - CGCS2000 / 3-degree Gauss-Kruger CM 120E - 投影坐标系
* EPSG:4326 - WGS 84 - 地理坐标系
* EPSG:3857 - WGS 84 / Pseudo-Mercator - 投影坐标系

### 关于坐标转换的经典帖子

| 名称           | 链接                                                         | 备注 |
| -------------- | ------------------------------------------------------------ | ---- |
| python坐标转换 | [python坐标转换](https://nsidc.org/support/faq/how-can-i-reproject-geotiff-file-polar-stereographic-projecton-geographic-latlon) |      |
|                |                                                              |      |
|                |                                                              |      |
|                |                                                              |      |
|                |                                                              |      |
|                |                                                              |      |
|                |                                                              |      |
|                |                                                              |      |
|                |                                                              |      |



##  2. python相关

### 安装包失败

采取豆瓣镜像：具体安装为：`pip install 包名 -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com`

## 3. 常见三维数据处理

超图桌面软件查看倾斜摄影数据

![Snipaste_2022-01-22_23-02-47](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202201222309866.png)

![Snipaste_2022-01-22_23-14-51](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202201222315289.png)

![Snipaste_2022-01-22_23-12-32](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202201222313488.png)

![Snipaste_2022-01-22_23-07-31](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202201222308413.png)



##  二、模型相关

## 1. 降雨数据

单位为`mm/h`，原理为线性插值，只要秒对应上即可

![image-20220123162131451](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202201231621486.png)

