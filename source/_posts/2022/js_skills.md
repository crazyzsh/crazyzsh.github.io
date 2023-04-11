---
title: js常用技巧
tags: [js]
categories: [js]
date: 2022-05-02 22:04:12
---
## 1. 初始化数组

初始化一维数组

```js
let arr=Array(5).fill(0)
```

初始化二维数组

fill方法可以不传参数

```js
let arr=Array(5).fill().map(()=>Array(5).fill(0))
```

## 2. reduce求和、极值

```js
let arr = [1, 3, 2, 7, 6]
let sum = arr.reduce((a, b) => a + b)
let min = arr.reduce((a, b) => a > b ? b : a)
let max = arr.reduce((a, b) => a > b ? a : b)
```

## 3. Math求极值

```js
let arr = [1, 3, 1, 7, 9, 8]

a = Math.max(...arr)
console.log(a); //9

b = Math.min(...arr)
console.log(b); //1
```

## 4. 排序

数组经过排序后**原数组会发生改变**，同时数组排序也会返回一个数组，这个数组就是**原数组**经过排序后的数组

排序数值型数组

```js
let arr = [1, 3, 1, 7, 9, 8]
let a = arr.sort((a, b) => a - b)
console.log(a === arr); //true
```

排序字符串数组【根据ASCII值来进行排序】

```js
const stringArr = ["Joe", "Kapil", "Steve", "Musk"]
stringArr.sort();
// 输出
["Joe", "Kapil", "Musk", "Steve"]
stringArr.reverse();
// 输出
["Steve", "Musk", "Kapil", "Joe"]
```

## 5. 从数组中过滤出虚假值

`0`，`undefined`，`null`，`false`，`""`，`''`可以很容易地通过以下方法省略

```js
const array = [3, 0, 6, 7, '', false];
let a = array.filter(Boolean);
console.log(a); //
```

## 6. 对各种条件使用逻辑运算符

使用逻辑运算符可以减少嵌套 `if…else `或 `switch case`，可以简单地使用基本的逻辑运算符`AND/OR`。

```js
function doSomething(arg1) {
    arg1 = arg1 || 10;
    // 如果尚未设置，则将 arg1 设置为 10 作为默认值
    return arg1;
}

let foo = 10;
foo === 10 && console.log(doSomething(32)); //32
foo === 5 && console.log(doSomething()); // 不执行函数
foo === 5 || console.log(doSomething()); // 10
foo === 10 || console.log(doSomething(12)); // 不执行函数
```

## 7. 数组去重

```js
const array = [5, 4, 7, 8, 9, 2, 7, 5];

const out = array.filter((item, index, arr) => arr.indexOf(item) === index);
console.log(out);

const unique = [...new Set(array)];
console.log(unique);
```

## 8. 创建计数器

```js
let string = 'kapilalipak';

// 方法1
const table = {};
for (let char of string) {
    table[char] = table[char] + 1 || 1;
}
console.log(table); //{ k: 2, a: 3, p: 2, i: 2, l: 2 }

// 方法2
const countMap = new Map();
for (let i = 0; i < string.length; i++) {
    if (countMap.has(string[i])) {
        countMap.set(string[i], countMap.get(string[i]) + 1);
    } else {
        countMap.set(string[i], 1);
    }
}
console.log(countMap) //Map(5) { 'k' => 2, 'a' => 3, 'p' => 2, 'i' => 2, 'l' => 2 }
```

## 9. 巧用三元运算符

```js
function Lottery(number) {
    return number > 97 ? 'Beautiful' :
        number < 97 ? 'Once Again!!' : 'You Got It'
}
console.log(Lottery(98)); // Beautiful
console.log(Lottery(97)); // You Got It
console.log(Lottery(88)); // Once Again!!
```

## 10. 合并对象或数组

```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

let obj1 = {
    name: 'zs'
}
let obj2 = {
    age: 18
}

let arr = [...arr1, ...arr2]
let obj = {
    ...obj1,
    ...obj2
}

console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]
console.log(obj); // { name: 'zs', age: 18 }
```

## 11. 打乱数组顺序

```js
let arr = [1, 2, 3, 4, 5, 6]
let arr_ = arr.sort(() => Math.random() - 0.5)
console.log(arr_);
```

## 12. 可选链操作符?.

克服以往如果将一个不存在的属性值赋值给一个变量时会报错，此时使用**可选链操作符**将会把`undefined`值赋值给它。

只有当a存在，同时a具有name属性的时候，才会把值赋给b，否则就会将undefined赋值给b。重要的是，a是否有name属性，这么做都不会报错。

```js
let a={
    name:'zsh'
}
let b = a ?.name?.age
console.log(b); // undefined
```
或者

```js
let a={
    name:{alis:'zsh'}
}
let b = a ?.name?.alis
console.log(b); // zsh
let c = a ?.name?.other //undefined
```

## 13. 空值合并运算符??

`??` 这个和 `||` 很像，但是它**不会屏蔽掉false和 0**，即在未定义时来用最为恰当，其余地方使用`||`即可。【当a除了undefined、或者null之外的任何值，都会将a的值赋值给b，否则就将??右侧的值赋值给b】

```js
let a=0
let b=a??'cc'
console.log(b) //0
```

```js
let a=false
let b=a??'cc'
console.log(b) //false
```

```js
let a=0
let b=a||'cc'
console.log(b) //'cc'
```

## 14. 逻辑空赋值

当`??=`左侧的值为null、undefined的时候,才会将右侧变量的值赋值给左侧变量，其他所有值都不会进行赋值

```js
let a=1
let b=null
let c=0
let d =false

b ??= a
console.log(b) //1

c ??=a
console.log(c) //0

d ??=a
console.log(d) //false
```

## 15. 默认参数

```js
const search = (arr, low=0,high=arr.length-1) => high
console.log(search([1,2,3,4,5])) //4
```

## 16. arguments

arguments为函数中的关键字，值得注意的是，**箭头函数**中使用**arguments**是会**报错**的

```js
function test() {
    console.log(arguments); //[Arguments] { '0': 2, '1': 34, '2': 1 }，arguments也有length属性
    console.log([...arguments]); //[ 2, 34, 1 ]
}
test(2, 34, 1)
```

## 17. 十进制==>二进制/十六进制

使用`toString`方法

```js
let a = 19

// 转换为16进制
let b = a.toString(16)
console.log(b);//13

// 转换为2进制
let c = a.toString(2)
console.log(c);//10011
```

## 18. 判断回文字符

```js
function isPalindrome(str) {
    return str == str.split('').reverse().join('')
}

console.log(isPalindrome('ana'));
```

## 19. 使用Object属性转成属性数组

```js
let a = {
    name: 'zsh',
    age: 18
}
console.log(Object.keys(a)); //[ 'name', 'age' ]
console.log(Object.values(a)); //[ 'zsh', 18 ]
console.log(Object.entries(a)); //[ [ 'name', 'zsh' ], [ 'age', 18 ] ] 
let b = new Map(Object.entries(a))
console.log(b); //Map(2) { 'name' => 'zsh', 'age' => 18 }
```

## 20. 使用解构简单交换两值

```js
let a = 3;
let b = 2;
[a, b] = [b, a]
console.log(a, b); //2,3
```

