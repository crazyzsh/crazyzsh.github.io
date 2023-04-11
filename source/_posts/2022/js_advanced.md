---
title: JS高级
tags: [web,js]
categories: [web,js]
date: 2022-01-05 09:14:44
---
# 十一、原型与继承

## 1. 基础api

### 1.1 getPrototypeOf

* 获取某个对象的原型

* 用法：`Object.getPrototypeOf(object)`

```js
//数组
let a = ["a"];
let b = a.concat("b")
console.log(b);

//对象
let x = {};
let y = {name:"张三"};

//数组的原型一样
console.log(Object.getPrototypeOf(a) == Object.getPrototypeOf(b)); //true
//对象的原型一样
console.log(Object.getPrototypeOf(x) == Object.getPrototypeOf(y)); //true
```

### 1.2 isPrototypeOf

* 测试一个对象是否存在于另一个对象的原型链上

* 用法：`prototypeObj.isPrototypeOf(object)`

### 1.3 hasOwnProperty

* 返回一个布尔值
* 指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）

```js
const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1'));
// expected output: true

console.log(object1.hasOwnProperty('toString'));
// expected output: false
```

### 1.4 create

* **`Object.create()`**方法创建一个新对象，使用**现有的对象**来**提供新创建的对象**的__proto__

* 语法：`Object.create(proto，[propertiesObject])`第二个参数为可选项

```javascript
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};
//这是最原始的定义对象的形式，只是我们省略了直接进行创建了而已
const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"

//me本身是没有hasOwnProperty这个方法的，是me原型上有这个方法
me.hasOwnProperty('name')//true
```

创建一个没有原型的对象

```js
let test = Object.create(null, {
    name: {
         value: "张三"
    }
})
test.hasOwnProperty('name')//hasOwnProperty不是一个函数，因为test没有原型对象
```

### 1.5 `__proto__`

给原型追加属性或者方法

```js
let a = {}

//给a对象自身追加属性
a.name="张三"

//给a对象自身追加方法
a.hi = function () {
            console.log("a自身的hi方法");
        }

//给a对象原型追加方法
a.__proto__.hi = function () {
	console.log("a原型的hi方法");
}

//就近原则，如果有，则用自身，否则向原型进行搜索，直到顶层
a.hi()//a自身的hi方法
```

非自定义构造函数（类）创建

```js
let a = new Array(1, 23, "jj")
console.log(a.__proto__ == Array.prototype); //true

let c = new Object({
    name: "张三"
})

// 动态赋方法
c.hi = () => {
    console.log("hi方法");
}

// 原型追加方法
c.__proto__.say = () => {
    console.log("say方法");
}

console.log(c.__proto__ == Object.prototype); //true
console.log(c);
```

![image-20220105144818542](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/%E7%AE%80%E5%8D%95%E7%B1%BB%E5%9E%8B%E5%88%9B%E5%BB%BA.png)

一般来说，**简单类型**对象进行创建时，可以直接在其**本身获得**相应的**方法或者属性**，而由函数（构造函数）、类创建的对象则是将**属性**直接赋予实例本身，**方法**则在其原型上【减少开销，避免每生产一个对象就另外开辟一个空间，而是选择继承】

### 1.6 `__proto__ & prototype`

* `__proto__`服务于一个***具体的对象***【直接创建的对象/由构造函数或者类实例化出来的对象】，可以称之为对象的**隐式原型**，我们可以直接在这种类型的对象上**追加属性**或者**方法**

* **prototype**服务于“抽象的对象”，例如构造函数本身（Array、Object、String、Number、Boolean、Date自定义构造函数），其中`实例对象.__proto__==抽象对象.prototype`，也可以称之为**显示原型**

* 谷歌浏览器中如果直接打印对象的话会直接显示`[[Prototype]]:显示原型`

  * 由String、Number、Boolean、Array、Object**关键字**===>打印直接显示`[[Prototype]]:Array/Object`，同时`xxx instanceof Object/Array/Boolean/String/Number===true`，其中**所有由关键字创建**的都属于Object，即`xxx instanceof Object===true`

    

  * 或者直接创建**数组**或者**对象**===>打印直接显示`[[Prototype]]:Array/Object`，同时`xxx instanceof Object/Array===true`

    

  * 字面量创建的Number，Boolean，String则**不会**打印原型，且`xxx instanceof Number/Boolean/String===false`，即非对象实例，因此返回 false

    

  * 由构造函数创建的对象，不要直接看控制台中的`[[Prototype]]:xxx`，实际上的prototype是`constructor`的属性值，同时和constructor同一级的就是该实例对象的原型上的方法【属性在实例对象本身，方法在实例对象的原型上】

  

```js
//我们只是遵循约定将构造函数首字母进行大写，其实大小写无关紧要

function test() {}
console.dir(test);
const a = new test()
console.log(a);
console.log(a.__proto__ == test.prototype); //true

function Test() {}
console.dir(Test);
const b = new Test()
console.log(b);
console.log(b.__proto__ == Test.prototype); //true
```

![image-20220105105051028](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E5%8E%9F%E5%9E%8B.png)

```js
class Person {
    constructor(sex) {
        this.sex = sex
    }
    introduction() {
        console.log(`我是${this.sex}的`);
    }
}

class Teacher extends Person {
    constructor(course, sex) {
        super(sex)
        this.course = course
    }
    teach() {
        this.introduction()
        console.log(`我教${this.course}`);
    }
}

let test = new Teacher("地理", "男")
console.log(test);
test.teach()

console.log(test.__proto__ == Teacher.prototype); //true
console.log(test.__proto__ == Person.prototype); //false

```

谷歌浏览器对应查看方法如下：

![image-20220105142036051](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/%E5%8E%9F%E5%9E%8B%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9F%A5%E7%9C%8B.png)

### 1.7 instanceof

**`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
let a = []
let b = {}
let c = new String("JIAN")

console.log(a instanceof Array); //true
console.log(a instanceof Object); //true

console.log(b instanceof Array); //false
console.log(b instanceof Object); //true

console.log(c instanceof String); //true
console.log(c instanceof Object); //true
```



## 2. 原型基础

### 原型对象

每个对象都有一个原型`prototype`对象，通过函数创建的对象也将拥有这个原型对象。原型是一个指向对象的指针。

- 可以将原型理解为对象的父亲，对象从原型对象继承来属性
- 使用原型对象为多个对象共享属性或方法
- 如果对象本身不存在属性或方法将到原型上查找
- 使用原型可以解决，通过构建函数创建对象时复制多个函数造成的内存占用问题
- 原型包含 `constructor` 属性，指向构造函数

下例使用的就是**数组原型对象**的 `concat` 方法完成的连接操作

```javascript
//数组
let a = ["a"];
let b = a.concat("b")
console.log(b);

//对象
let x = {};
let y = {name:"张三"};

//数组的原型一样
console.log(Object.getPrototypeOf(a) == Object.getPrototypeOf(b)); //true
//对象的原型一样
console.log(Object.getPrototypeOf(x) == Object.getPrototypeOf(y)); //true
```

数组的原型对象【两层】：

* `[[Prototype]] : Array`
* `[[Prototype]] : Object`

对象的原型对象【一层】：

* `[[Prototype]] : Object`

```javascript
//数组的原型一样
console.log(Object.getPrototypeOf(a) == Object.getPrototypeOf(b)); //true
//对象的原型一样
console.log(Object.getPrototypeOf(x) == Object.getPrototypeOf(y)); //true
```