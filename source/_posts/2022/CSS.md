---
title: CSS常见问题
tags: [css]
categories: [css]
date: 2022-05-02 22:06:47
---
# 常见问题

## SEO

**搜索引擎优化**（英语：**search engine optimization**，[缩写](https://zh.wikipedia.org/wiki/缩写)为**SEO**）是透过了解[搜索引擎](https://zh.wikipedia.org/wiki/搜尋引擎)的运作规则来调整[网站](https://zh.wikipedia.org/wiki/網站)，以及提高目的[网站](https://zh.wikipedia.org/wiki/網站)在有关搜索引擎内排名的方式。由于不少研究发现，搜索引擎的用户往往只会留意搜索结果最前面的几个条目，所以不少[网站](https://zh.wikipedia.org/wiki/網站)都希望透过各种形式来影响搜索引擎的排序，让自己的[网站](https://zh.wikipedia.org/wiki/網站)可以有优秀的搜索排名。当中尤以各种依靠广告维生的网站为甚。

所谓“针对搜索引擎作优化的处理”，是指为了要让网站更容易被搜索引擎接受。搜索引擎会将网站彼此间的内容做一些相关性的资料比对，然后再由[浏览器](https://zh.wikipedia.org/wiki/瀏覽器)将这些内容以最快速且接近最完整的方式，呈现给搜索者。搜索引擎优化就是通过搜索引擎的规则进行优化，为用户打造更好的用户体验，最终的目的就是做好用户体验。

对于任何一个网站来说，要想在网站推广中获取成功，搜索引擎优化都是至为关键的一项任务。同时，随着搜索引擎不断变换它们的搜索排名算法规则，每次算法上的改变都会让一些排名很好的网站在一夜之间名落孙山，而失去排名的直接后果就是失去了网站固有的可观访问流量。所以每次搜索引擎算演法的改变都会在网站之中引起不小的骚动和焦虑。可以说，搜索引擎优化是一个愈来愈复杂的任务。

经过许多专业的SEO研究机构调查后发现，当用户利用搜索引擎查找资料、产品或服务时，大部分人通常只会点击搜索结果当中，最前面出现的几个链接，因此，大部分的网站都希望能透过各种方式或手法来试图影响网站页面在搜索引击的排名。不过，搜索引擎的算法会不断的更新，网站的排名也会因此会有动荡，所以如果没有持续做好SEO，很快地排名就很有可能会掉下来。

## html语义化

让爬虫程序更容易理解代码，即SEO（搜索引擎优化）

## 块级元素/内联元素

### 块级元素

定义：块级元素占据其**父元素**（容器）的整个**水平空间**，**垂直空间**等于其**内容高度**，因此创建了一个“块”。

表现形式：display:block/table

特点：独占一行，不管内容的长度

div /  h1 / p / ul / li / table / form

### 内联元素（行内元素）：

定义：一个行内元素只占据它对应标签的**边框**所包含的空间

表现形式：display:inline

特点：不会独占一行，回紧跟着排列，直到没有足够的空间才会换行

span / strong / label / a / img / input / select / textarea / iframe

### 行内块元素

定义：在一行上显示，但是可以设置宽高。既有块元素一部分特征，又有行内元素的一部分特征。
常见的行内块元素有：Img、input…

### 区别：

1. 当行内元素在一行内**排不下的时候才会换行**，而且其宽度随着元素的内容而变化。块级元素的则宽度自动填满其父元素宽度。

2. 块级元素可以设置 width, height属性，注意：块级元素即使设置了宽度，仍然是独占一行的。而**行内元素**设置width, height**无效**。

3. 行内元素的**水平方向**的padding-left，padding-right，margin-left，margin-right 都产生**边距效果**，但是**垂直方向**的padding-top,padding-bottom,margin-top,margin-bottom都不会产生边距效果。（也就是水平方向有效，竖直方向无效）

4. 块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素。

   ![image-20220501142352884](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205011423911.png)

   ```html
   
       <style>
           .block {
               text-align: center;
               width: 200px;
               height: 200px;
               background-color: pink;
           }
       </style>
   
   <body>
       <span>
           <div class="block">块级</div>
           行内元素
       </span>
   </body>
   ```

   5. 行内元素设定水平居中

      在**外层的块级元素**设置`text-align:center`，这样可以使得其**内部的行内元素**水平居中。【因为行内元素设置宽高是无效的，且行内元素的的大小就是内容的大小，就没有所谓的text-align属性而言了，所以只需在其**父级块元素**中设定`text-align:center`即可实现水平居中】

## 盒模型

content-box

默认box-sizing属性值为content-box，此时的盒子大小是针对内容而言的。且此时border，padding值都会撑大盒子大小

border-box

如果将box-sizing属性值设定为border-box，那么border和padding值不会撑大盒子大小，相应的是此时内容区域的大小会被缩小

## 外边距合并

整体规则为以下：

![image-20220501161529384](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205011615436.png)

### 兄弟元素

发生状况：*<u>前一个</u>*元素的**下边距**与*<u>后一个</u>*元素的**上边距**会取两个元素外边距的最大值。

```html
.box1 {
     width: 200px;
     height: 200px;
     background-color: aqua;
     margin-bottom: 50px;
 }

 .box2 {
     width: 200px;
     height: 200px;
     background-color: rgb(237, 15, 141);
     margin-top: 30px;
 }
```



![image-20220501161151777](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205011611809.png)

### 父元素和子元素

父子之间的定位使用margin是实现不了的

这种情况又可以分为以下两种：

- 父元素的上外边距和第一个子元素的上外边距
- 父元素的下外边距和最后一个子元素的下外边距

这两种情况，最终显示出来的结果都是取二者中的最大值。

## 高度塌陷

一般不会给父元素设定高度，我们希望子元素的内容将其撑开，通过浮动可以使一个元素向其父元素的左侧或右侧移动。当我们设定了浮动的时候，此时父元素并没有被内容撑开，高度变成0，这就是高度塌陷。

解决高度塌陷的方法：为父元素开启BFC

## BFC

BFC（Block Formatting Context）即**块格式化上下文**，BFC是一个CSS中的一个隐含的属性，可以为一个元素开启BFC，开启BFC该元素会变成一个独立的布局区域，元素开启BFC后的特点：

1. 开启BFC的元素**不会被浮动元素所覆盖**

2. 开启BFC的元素子元素和父元素**外边距**不会重叠

3. 开启BFC的元素可以**包含浮动的子元素**

可以通过一些特殊方式来开启元素的BFC：

   1、设置元素的浮动（不推荐）
   2、将元素设置为行内块元素（不推荐）
   3、将元素的**overflow**设置为一个非visible的值
   4、给父元素增加一个**伪类元素**，同时清除浮动、将伪元素设定为块级元素，内容为空即可。

   常用的方式为元素设置` overflow:hidden `开启其BFC 以使其可以包含浮动元素

常用方法：

### overflow

给父元素设定overflow为hidden/auto

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }

    .father {
        background: red;
        border: solid 10px yellow;
        overflow: hidden;
    }

    .son {
        width: 200px;
        height: 200px;
        background-color: pink;
        float: left;
    }
</style>

<div class="father">
    <div class="son">
    </div>
</div>
```



![image-20220502165021411](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205021650436.png)

### ::after

给父元素增加一个伪类元素

```html
<style>
    .father {
        background: red;
        border: solid 10px yellow;
    }
    .father::after {
        content: '';
        display: block;
        clear: both;
    }
    .son {
        width: 200px;
        height: 200px;
        background-color: pink;
        float: left;
    }
</style>

<div class="father">
    <div class="son"></div>
</div>
```

![image-20220502164834485](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205021648522.png)



### 总结

给最外层元素开启BFC，使其可以包含浮动的子元素，同时也可以避免父子元素外边距重叠。

## 清除外边距重叠

当给父元素设定外边距时，父元素就有正常的外边距，此时由于父子元素外边距重叠了，所以相当于父子元素**共享外边距**，不过此时的子元素的外边距不是相对于父元素而言的。

当给子元素设定外边距时，此时并不是我们想象中的那样（子元素可以偏离父元素），此时作用和上述的一致，此时父子元素共享了外边距。为了达到我们想要的效果，此时可以**给父元素开启BFC**，就可以使得子元素偏离父元素。

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }

    .father {
        width: 400px;
        height: 400px;
        background: red;
        overflow: hidden;
    }

    .son {
        width: 200px;
        height: 200px;
        background-color: pink;
        margin-top: 50px;
    }
</style>
  
<div class="father">
      <div class="son">
      </div>
</div>

 
```

![image-20220502160833712](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205021608751.png)

## clearfix

自定义一个类，使得其**既**可以<u>清除浮动带来的影响</u>，**也**可以<u>解决外边距重叠</u>问题。【其实给父元素设定`overflow:hidden`也是可以实现的】

```html
<style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            width: 400px;
            height: 400px;
            background: red;
        }

        .son {
            width: 200px;
            height: 200px;
            background-color: pink;
            margin-top: 50px;
        }

        .clearfix::before,
        .clearfix::after {
            content: '';
            display: table;
            clear: both;
        }
</style>
  
<div class="father clearfix">
      <div class="son">
      </div>
</div>
```

![image-20220502173519439](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205021735473.png)



直接给父元素开启BFC，设定`overflow:hidden`也能实现同样的效果

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }

    .father {
        width: 400px;
        height: 400px;
        background: red;
        overflow: hidden;
    }

    .son {
        width: 200px;
        height: 200px;
        background-color: pink;
        margin-top: 50px;
        float: left;
    }
</style>

<div class="father">
    <div class="son">
    </div>
</div>
```

## 垂直居中

常见设定垂直居中的几种方法

### line-height=height

1. 如果子元素为**行内元素**，此时将父元素设定`text-align:center`只会使得行内元素在父元素中**水平居中**【此时设定text-align可以直接给父元素设定即可，子元素会继承父元素设定的此值】，此时再给父元素添加样式`line-height:height`，即给父元素添加样式`line-height`使得其值等于`height`的高度值即可实现其子元素在父元素中显示为垂直居中。【子元素**多个行内元素**也可以达到垂直居中的效果】

2. 如果子元素为块级元素【**只能有一个块级元素**，如果有两个块级元素，排在后的块级元素将会被挤出父元素之外】，按照上述设定也能达到垂直居中的效果。

3. 如果子元素**既有行内元素也有块级元素**，则**达不到垂直居中**的效果。此时要看**排列的先后顺序**

   排在前的可以实现垂直居中的效果，排在后的则会被挤到父元素之外。

   ```html
   <style>
       .father {
           width: 200px;
           height: 200px;
           background-color: pink;
           text-align: center;
           line-height: 200px;
       }
   </style>
   <div class="father">
       <span class="son1">son1</span>
       <span class="son2">son2</span>
   </div>
   ```

   ![image-20220503100141395](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205031001428.png)

   ```html
   <style>
       .father {
           width: 200px;
           height: 200px;
           background-color: pink;
           text-align: center;
           line-height: 200px;
       }
   </style>
   <div class="father">
       <div>子元素为块级元素</div>
       <span class="son1">son1</span>
       <span class="son2">son2</span>
   </div>
   ```

       <div class="father">

   ![image-20220503100837874](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205031008901.png)

### 定位+margin+宽高

利用**子绝父相**定位，**计算宽高**，将`top:50% ; margin-top:-height/2`===>垂直居中；`left:50% ; margin-left:-width/2`===>水平居中

```html
<style>
    .father {
        width: 200px;
        height: 200px;
        position: relative;
        background-color: pink;
        text-align: center;
    }

    .son {
        width: 100px;
        height: 100px;
        position: absolute;
        background-color: red;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
        line-height: 100px;
    }
</style>
    <div class="father">
    <div class="son">块级元素</div>
</div>
```

![image-20220503102301144](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205031023174.png)

### 定位+transform:translate

利用**子绝父相**定位，**不需要计算**垂直居中元素的**宽高**，只需使用css3的`transform: translate(-50%, -50%)`即可达到效果

```html
<style>
    .father {
        width: 200px;
        height: 200px;
        position: relative;
        background-color: pink;
        text-align: center;
    }

    .son {
        width: 100px;
        height: 100px;
        position: absolute;
        background-color: red;
        top: 50%;
        left: 50%;
        line-height: 100px;
        transform: translate(-50%, -50%);
    }
</style>
    <div class="father">
    <div class="son">块级元素</div>
</div>
```

### 定位+margin

利用**子绝父相**定位，将left/right/top/bottom统统设置为0，margin设置为auto即可实现水平垂直居中。

```html
<style>
    .father {
        width: 200px;
        height: 200px;
        position: relative;
        background-color: pink;
        text-align: center;
    }

    .son {
        width: 100px;
        height: 100px;
        position: absolute;
        background-color: red;
        line-height: 100px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
</style>
    <div class="father">
    <div class="son">块级元素</div>
</div>
```

### flex布局

```html
<style>
    .father {
        width: 200px;
        height: 200px;
        background-color: pink;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .son {
        width: 100px;
        height: 100px;
        background-color: red;
        line-height: 100px;
        /* display: flex;
        align-items: center;
        justify-content: center; */
    }
</style>
<div class="father">
	<div class="son">块级元素</div>
</div>
```

## 浮动

起初的目的是为了实现**文字环绕**效果，后来演变成了实现**水平布局**的解决方案。

### **文字环绕效果**

一般的话，如果前边的元素设定了浮动，此时浮动元素完全脱离文档流，后边的元素会自动上移，由于层级提升，所以浮动元素会压盖住上移的元素，但是此时并不会压盖住上移元素的文字，上移元素中的文字会环绕着浮动元素进行布局。此时即达到了文字环绕的效果。

### 特点
1. 浮动元素会完全脱离文档流，不再占据文档流中的位置
2. 设置浮动以后元素会向父元素的左侧或右侧移动
3. 浮动元素默认不会从父元素中移出
4. 浮动元素向左或向右移动时，不会超过它前边的其他浮动元素
5. 如果**浮动元素**的**上边**是一个**没有浮动**的块元素，则**浮动元素无法上移**
6. 浮动元素**不会超过**它**上边的浮动**的**兄弟元素**，最多最多就是和它一样高

### 注意

元素设置浮动以后，水平布局的等式便不需要强制成立元素设置浮动以后，会完全从文档流中脱离，不再占用文档流的位置，所以元素下边的还在文档流中的元素会自动向上移动

### 脱离文档流元素特征

* 块元素：
  * 块元素不在独占页面的一行
  * 脱离文档流以后，如果没有指定宽高，块元素的宽度和高度默认都被内容撑开行内元素：
* 行内元素
  * 脱离文档流以后会**变成块元素**，所以此时的**行内元素**是可以设定宽高的
  * 特点和块元素脱离文档流以后一样，所以**不需要再区分**块和行内了


## 清除浮动

如果前面有浮动元素，由于浮动元素脱离了文档流，所以会对后边的元素造成影响，后边元素**表现为**<u>跟在浮动元素后边</u>，实际上是浮动元素将后边元素**压盖**住了，如果后边元素想要正常显示，必须清除浮动元素的影响.

此时由于`.son1`没有设定宽度，元素继承了父元素的宽度，浮动元素压盖住了`.son1`

```html
<style>
    .father {
        width: 400px;
        height: 400px;
        background-color: pink;
    }

    .son {
        width: 100px;
        height: 100px;
        background-color: red;
        float: left;
    }
    .son1 {
        background-color: rgb(54, 15, 212);
    }
</style>
<div class="father">
    <div class="son">块级元素</div>
    <div class="son">块级元素</div>
    <div class="son1">块级元素?</div>
</div>
```

![image-20220503111152679](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205031111714.png)

给`.son1`清除浮动，其中`both`属性是指清除左右浮动元素对其较大的影响

```html
<style>
    .father {
        width: 400px;
        height: 400px;
        background-color: pink;
    }

    .son {
        width: 100px;
        height: 100px;
        background-color: red;
        float: left;
    }

    .son1 {
        width: 100px;
        height: 100px;
        background-color: rgb(54, 15, 212);
        clear: both;
    }
</style>
<div class="father">
    <div class="son">块级元素</div>
    <div class="son">块级元素</div>
    <div class="son1">块级元素?</div>
</div>
```

![image-20220503111425588](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202205031114621.png)

## margin为负

margin为负情况如下：

* left和top为负时，元素自身分别向左移和上移【挤自己，为正也挤自己】

  如果以%而不是px来进行影响，则其移动的大小参照的就是其**前面的元素**

* right和bottom为负时，元素不动，右边的元素左移和下边上移【挤别人，为正也挤别人】，实际上相当于压缩自己的空间。

## 圣杯布局

分为上中下布局，中间又分为三列，其中左右两列列宽固定，中间列随屏幕宽自适应。**重点是**要将中间部分放置于左右布局的前面，然后通过**float+padding+margin+定位**实现布局。精髓是将`.center`宽设定为100%，且将其**内边距**固定为左右两列的宽度。

使用**float+padding+margin+定位**来进行实现。

```html
</style>
  * {
        padding: 0;
        margin: 0;
    }

    .content {
        min-width: 800px;
        padding-left: 300px;
        padding-right: 200px;
    }

    div {
        text-align: center;
    }

    .header {
        background-color: red;
    }

    .center {
        background-color: orange;
    }

    .left {
        background-color: green;
        width: 300px;
        margin-left: -100%;
        position: relative;
        left: -300px;
    }

    .center {
        background-color: yellow;
        width: 100%;
    }

    .right {
        background-color: gray;
        width: 200px;
        margin-right: -200px;
    }

    .column {
        float: left;
    }

    .footer {
        background-color: blue;
        clear: left;
    }
</style>
<div class="container">
    <div class="header">头部</div>
    <div class="content">
        <div class="center column">中</div>
        <div class="left column">左</div>
        <div class="right column">右</div>
    </div>
    <div class="footer">
        底部
    </div>
</div>
```

## 双飞翼布局

双飞翼布局也是将实现左中右三列布局，只是DOM结构和圣杯布局不太一样罢了。双飞翼是通过margin给两侧元素预留位置，而圣杯布局是使用padding来给两侧预留位置来进行布局

使用**float+padding+margin+定位**来进行实现。

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    div {
        text-align: center;
    }

    .header {
        background-color: red;
    }

    .center {
        background-color: orange;
        width: 100%;
    }

    .inner {
        margin-left: 300px;
        margin-right: 200px;
    }

    .left {
        background-color: green;
        width: 300px;
        margin-left: -100%;

    }

    .right {
        background-color: gray;
        width: 200px;
        margin-left: -200px;
    }

    .column {
        float: left;
    }

    .footer {
        background-color: blue;
        clear: left;
    }
</style>
<div class="container">
    <div class="header">头部</div>
    <div class="center column">
        <div class="inner">中</div>
    </div>
    <div class="left column">左</div>
    <div class="right column">右</div>
    <div class="footer">底部</div>
</div>
```

## 圣杯布局和双飞翼布局对比

相同点：

* 都是通过DOM结构来使得**先渲染中间部分内容**再渲染左右部分，使得网页主要内容先进行渲染，不会由于两侧加载过久造成用户体验不佳。

不同点：

* 两者布局不一样，圣杯是中左右布局同级，`.center`通过padding来给两侧预留空间；双飞翼布局给`.center`包裹了一个父元素盒子，通过margin来给两侧预留空间。

* 圣杯布局需要通过定位来实现布局，而双飞翼布局不需要定位即可实现

## 定位

相对于margin更为高级的定位方式，因为如果仅仅靠margin来进行布局的话，会影响其他元素，常常要变动很多其他元素，并不是很方便。所以就有了定位。

* 相对定位
  * 相对于自身来进行定位
  * 不会脱离文档流
  * 层级会提升

* 绝对定位
  * 相对于**最近一层的定位元素**来进行定位
  * 会脱离文档流，从而**会影响其他元素**，由此常常和**相对定位配合**使用
  * 层级会提升

* 总结：

由于相对定位和绝对定位的特点，所以一般采用**子绝父相**的定位策略。即**父元素**使用**相对定位**不会脱离文档流，不会影响其他元素布局；而子元素在父元素内部，**子元素**使用**绝对定位**就可以相对于父元素来进行定位，所以是最佳策略。

## flex实现骰子布局

使用`align-self`单独给子元素设定侧轴排列方式

```html
<style>
    .content {
        width: 300px;
        height: 300px;
        padding: 20px;
        border: 1px solid red;
        display: flex;
        justify-content: space-between;
    }

    span {
        display: block;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background-color: #ccc;
    }

    span:nth-child(2) {
        align-self: center;
    }

    span:nth-child(3) {
        align-self: flex-end;
    }
</style>
<div class="content">
    <span></span>
    <span></span>
    <span></span>
</div>
```

## 行高继承困惑

* 如果父元素为具体px数值，则直接继承过来

* 如果父元素行高为%，那么子元素行高为：`父元素font-size*%`，子元素直接继承

* 如果父元素行高为小数，则子元素继承该小数，子元素行高为`font-size*该小数`

## 背景

1. background-image 设置背景图片：`background-image: url("./img/1.png");`

   * 可以同时设置背景图片和背景颜色，这样背景颜色将会成为图片的背景色

   * 如果背景的图片小于元素，则背景图片会自动在元素中平铺将元素铺满

   * 如果背景的图片大于元素，将会一个部分背景无法完全显示

   * 如果背景图片和元素一样大，则会直接正常显示

2. background-repeat ：用来设置背景的重复方式可选值：

   * repeat黑默认值，背景会沿着x轴y轴双方向重复

   * repeat-x沿着轴方向重复

   * repeat-y 沿着y轴方向重复

   * no-repeat 背景图片不重复

3. background-position ：用来设置背景图片的位置设置方式


   * 通过top left right bottom center几个表示方位的词来设置背景图片的位置


   * 使用方位词时必须要**同时指定**两个值，如果只写一个则第二个默认就是center


   * 通过偏移量来指定背景图片的位置：水平方向的偏移量和垂直方向偏移量


4. background-clip：设置背景的范围

   * border-box 黑默认值，背景会出现在边框的下边

   * padding-box 背景不会出现在边框，只出现在内容区和内边距

   * content-box背景只会出现在内容区

5. background-origin 背景图片的偏移量计算的原点

   * padding-box 黑默认值，

   * background-position从内边距处开始计算

   * content-box 背景图片的偏移量从内容区处计算

   * border-box 背景图片的变量从边框处开始计算

6. background-size：设置背景图片的大小

   * 第一个值表示宽度第二个值表示高度
   * 如果只写一个，则第二个值默认是auto 
   * cover图片的比例不变，将元素铺满
   * contain 图片比例不变，将图片在元素中完整显示

7. backgound 背景相关的简写

   * 所有背景相关的样式都可以通过该样式来设置并且该样式没有顺序要求，也没有哪个属性是必须写的
   * background-size必须写在background-position的后边，并且使用/隔开，`background-position/background-size`
   *  background-origin background-clip两个样式，orgin要在clip的前边



