---
title: Python
tags: [Python]
categories: [Python]
date: 2022-05-04 20:26:27
---
# 一、常见函数使用方法

## 1. enumerate

`
enumerate(sequence, [start=0])
`

- sequence -- 一个序列、迭代器或其他支持迭代对象。
- start -- 下标起始位置。

```python
a = ['A', 'B', 'C']

for index, val in enumerate(a):
    print(index, val)
# 	0 A
#	1 B
#	2 C

for index, val in enumerate(a,20):
    print(index, val)
# 	20 A
#	21 B
#	22 C
```

## 2. lambda

> lambda 函数是一种小的匿名函数。lambda 函数可接受任意数量的参数，但只能有一个表达式。

一个 lambda 函数，它把作为参数传入的数字加 10，然后打印结果：【不推荐这样使用，不如def函数的结构清晰，不足以体现lambda函数的强大之处】

```python
x = lambda a : a + 10
print(x(5))  ##15
```

### 为何使用 Lambda 函数？

当您把 lambda 用作另一个函数内的匿名函数时，会更好地展现 lambda 的强大能力。

在同一程序中使用相同的函数定义来生成两个函数：

```python
def myfunc(n):
  return lambda a : a * n

# 定义返回自乘2倍的函数
mydoubler = myfunc(2)

# 定义返回自乘3倍的函数
mytreble = myfunc(3)

print(mydoubler(11)) 
print(mytreble(11))
```



# 二、查缺补漏

## 1. 闭包closure

闭包实际上是一个函数，其最显著的特征是传入一个函数，返回的也是一个函数。

```python
import time


def print_odds():
    for i in range(1024):
        if i % 2 == 1:
            print(i)


# 闭包函数【参数为函数，返回值也是函数】
def count_time(func):
    def improve():
        start = time.time()
        func()
        end = time.time()
        print('共耗时：{}'.format(end - start))

    return improve


if __name__ == '__main__':
    # 传入一个函数同时将该函数进行加工并返回出去供调用
    count_time(print_odds)()

```



## 2. 装饰器

* 装饰器使用`@`进行声明
* `@`符号跟着的装饰器必须为一个闭包函数
* 使用装饰器后紧跟着定义被装饰函数
* 装饰器在第一次调用被装饰函数时进行增强

```python
import time


# 闭包函数【参数为函数，返回值也是函数】
def count_time(func):
    def improve():
        start = time.time()
        func()
        end = time.time()
        print('共耗时：{}'.format(end - start))

    return improve


@count_time
def print_odds():
    for i in range(1024):
        if i % 2 == 1:
            print(i)


if __name__ == '__main__':
    print_odds()
```

有返回值和参数情况

```python
import time


# 闭包函数【参数为函数，返回值也是函数】
def count_time(func):
    # 这里考虑参数问题
    def improve(*args, **kwargs):
        start = time.time()
        # 将参数获取过来，同时保存返回值
        res = func(*args, **kwargs)
        end = time.time()
        print('共耗时：{}'.format(end - start))
        # 使得能成功返回
        return res

    return improve


def count_odds(lim=100):
    cnt = 0
    for i in range(lim):
        if i % 2 == 0:
            cnt += 1
    return cnt


# 对于含有返回值的函数，调用闭包增强后，不能成功返回，但是成功增强了辅助功能
if __name__ == '__main__':
    print('增强前')
    print(count_odds(lim=3003))
    print('*' * 20)
    print('增强后')
    # 这里进行传函数的时候不需要进行传参，只需在调用时才需要传参
    after = count_time(count_odds)
    # 这里真正调用时进行传参
    print(after(lim=393))
```



## 3. 函数参数省略

* arg

普通参数

* *args

*args 用来将参数打包成tuple(元组)给函数体调用

* **kwargs

kwargs 用来将参数打包成dict(字典)给函数体调用

```python
# 将参数以元组的形式进行存储
def arg_(*args):
    print(args, type(args))


# 将参数以字典的形式进行存储
def arg__(**kwargs):
    print(kwargs, type(kwargs))


# 如果有特殊的组合，其先后顺序一定是按照此顺序进行的
def arg___(arg, *args, **kwargs):
    print(arg, type(arg), args, type(args), kwargs, type(kwargs))


if __name__ == '__main__':
    arg_(2, 23, 4)
    arg__(a=3, b='jj', c=8)
    arg___(1, 3, 5, 7, a='hello', b=9)
```



# 三、编辑器设置

## 1. 设定代码模板

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
@File  : ${NAME}.py
@Author: crazyzsh
@Date  : ${DATE} ${TIME}
@Desc  : 
'''
```

![image-20220212104630176](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202202121046214.png)
# 四、常见问题解决

## 1. 无法安装第三方包

采取豆瓣镜像：具体安装为：`pip install 包名 -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com`
