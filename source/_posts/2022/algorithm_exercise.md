---
title: 算法实战
tags: [算法]
categories: [算法]
date: 2022-03-22 14:13:59
---
# 一、练习

## 1. 正负数排列

对任意输入的整数数组，将其元素按正数在左（右），负数在右（左）进行排列，要求时间复杂度为O(n)，且实现过程中不创建新的数组空间

我的答案：

```js
let arr = [1, 3, -4, 7, -1, 10, 12, -5]

function sortPositiveNegative(arr) {
    let length = arr.length
    // i寻找正数，j寻找负数
    let i = 0
    for (let j = 0; j < length; j++) {
        if (arr[i] > 0 && arr[j] < 0) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            i++
        }
        if (arr[i] < 0 && arr[j] < 0) {
            i++

        }
    }
    return arr
}
console.log(sortPositiveNegative(arr));

```

他人思路：

```js
// 他人思路
function sortPositiveNegativeNormal(arr) {
    let length = arr.length
    // i用于循环数组中所有元素，j用于查找数组中出现的第一个正数，j至多只能和i相等
    // 只有i出现了负数时才可能需要进行交换,在此前提下，只有j和i不相等的时候才需要进行交换
    let j = 0
    for (let i = 0; i < length; i++) {
        if (arr[i] < 0) {
            if (i != j) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
            j++
        }
    }
    return arr
}
console.log(sortPositiveNegativeNormal(arr));
```

## 2. 股票最大利润

给定一个股票交易值数组，返回最大利润

```js
function bestStock(arr) {
    if (!arr.length) {
        return 0
    }
    let minPrice = arr[0]
    let maxProfit = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < minPrice) {
            minPrice = arr[i]
        } else if (arr[i] - minPrice > maxProfit) {
            maxProfit = arr[i] - minPrice
        }
    }
    return maxProfit
}
let test = [1, 4, 2, 6, 3, 9]
console.log(bestStock(test));
```

## 3. 字符压缩

按照字符串出现的个数进行字符串压缩，如果压缩完后字符串更短则返回压缩后的字符串，否则返回原字符串

```js
function compressStr(arr) {
    let result = ''
    let sum = 1
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            sum++
        } else {
            // 如果出现一次，则默认不让其加上字符1
            if (sum == 1) {
                result += arr[i]
            } else {
                result += arr[i] + sum
            }

            sum = 1
        }

    }
    result += arr[arr.length - 1] + sum

    return arr.length > result.length ? result : arr


}
test = 'aaabbbdceffff'
tests = 'abcee'
console.log(compressStr(test));
```

## 4. 两数之和

```js
function twoNumSum(arr, targetNum) {
    let target = new Map()
    for (let i = 0; i < arr.length; i++) {
        let temp = targetNum - arr[i]
        if (target.has(temp)) {
            return [target.get(temp), i]
        } else {
            target.set(arr[i], i)
        }
    }

}
test = [1, 2, 3, 5, 7, 4]
console.log(twoNumSum(test, 9));
```

## 5. 判断字符串是否为anagram

```js
function validAnagram(arr1, arr2) {
    // 边界判断
    if (arr1.length !== arr2.length) {
        return false
    }
    let targetMap = new Map()
    for (let i = 0; i < arr1.length; i++) {

        // 对第一个字符串，如果有则将键值加一，否则将键值设为1
        if (targetMap.has(arr1[i])) {
            targetMap.set(arr1[i], targetMap.get(arr1[i]) + 1)
        } else {
            targetMap.set(arr1[i], 1)
        }

        // 对第二个字符串，如果有则将键值减一，否则将值设为-1
        if (targetMap.has(arr2[i])) {
            targetMap.set(arr2[i], targetMap.get(arr2[i]) - 1)
        } else {
            targetMap.set(arr2[i], -1)
        }
    }

    // 遍历Map，如果有非零，则返回false，否则返回true
    for (const [key, value] of targetMap) {
        if (value !== 0) {
            return false
        }
        return true

    }
}
console.log(validAnagram('anagram', 'abngarm'));
```

## 6. 字符串连续非重复的最大长度

```js
function longestSubstring(str) {
    // 使用双指针，其中一个用来遍历字符串，另一个用来控制最大长度
    let j = 0,
        maxLength = 0,
        targetSet = new Set()

    for (let i = 0; i < str.length; i++) {
        // 如果set中没有的话就将其添加至set中，同时更新长度
        if (!targetSet.has(str[i])) {
            targetSet.add(str[i])
            // 这种存储法保证了最大历史记录
            maxLength = Math.max(targetSet.size, maxLength)
        } else {

            while (targetSet.has(str[j])) {
                // 进行删除这是因为打破了前面最长的局面（已经保存到了最大长度）,
                // 必须重新开始，删除直到没有元素为止
                targetSet.delete(str[j])
                j++
            }
            // 最后加上该破坏氛围的字符串重新开始
            targetSet.add(str[i])
        }
    }
    return maxLength
}
console.log(longestSubstring('abcbeeee'));
```

## 7. palindrome(回文)

判断是否为回文

```js
function isPalindrome(str) {
    // 长度最小为1
    if (!str.length) {
        return false
    }

    //1. 正则表达式以 “/” 开头且以 “/”结尾，“^”表示以……开头，“$”表示以……结尾
    //2. \s匹配空格（换行符、制表符、空格等）相当于[\t\r\n\v\f]   \S表示取反
    //3. \w表示任意的字母数字下划线相当于[0-9a-zA-Z_] 、 \W表示取反
    //4. \d表示数字，\D表示除了数字之外的字符
    //5. g:全局匹配（如果不是全局匹配则只能处理一个字符）  i:忽略大小写  gi:全局匹配和忽略大小写

    // 假设字符串只接收字母、数字,且忽略大小写

    let temp = str.toLowerCase().replace(/[\W_]/g, ''),
        left = 0,
        right = str.length - 1

    while (left < right) {
        if (temp[left] == temp[right]) {
            right--
            left++
        } else {
            // return是退出整个函数的
            return false
        }
    }
    return true
}

testStr = '1221s'
console.log(isPalindrome(testStr));
```

## 8. parentheses

判断括号是否输入有效

```js
function validParentheses(str) {
    if (!str.length || str.length % 2 === 1) {
        return false
    }
    // 先建立一个hashMap表
    let maps = new Map(),
        tempStack = []
    maps.set('(', ')')
    maps.set('{', '}')
    maps.set('[', ']')
    // 分析：充分利用最近出现左括号，那么再次出现右括号一定是与他进行配对的，
    for (let i = 0; i < str.length; i++) {
        if (maps.has(str[i])) {
            // 将闭括号存入栈
            tempStack.push(maps.get(str[i]))
        } else {
            // 查看是否能进行配对
            if (tempStack.pop() !== str[i]) {
                return false
            }

        }
    }
    if (tempStack.length) {
        return false
    }
    return true
}
testStr = '({})]'

console.log(validParentheses(testStr));
```

## 9. mergeIntervals

合并区间

```js
// input:  [[1, 4],[5, 6],[8, 10],[9, 11]
// output: [[1, 4],[5, 6],[8,11]]
function mergeIntervals(arr) {

    if (!arr.length) {
        return false
    }
    arr.sort((a, b) => {
        return a[0] - b[0]
    })
    // 设定当前合并区间的最大合并区间
    let curr = arr[0]
    let result = []
    for (const item of arr) {
        if (item[0] <= curr[1]) {
            curr[1] = Math.max(curr[1], item[1])

        } else {
            result.push(curr)
            curr = item
        }
    }
    // 至关只要，不论最后一步走哪都要进行追加
    result.push(curr)

    return result

}
testArr = [
    [1, 4],
    [5, 6],
    [8, 10],
    [9, 11]

]
console.log(mergeIntervals(testArr));
```

## 10. maxSubPalindrome

```js
// input: 'abace'
// output: 'aba'
function subPalindrome(str) {
    // 边界判断
    if (str.length < 2) {
        return str.length
    }
    // 定义最长字符串出现的索引
    let start = 0,
        maxLength = 1
    // 定义一个处理函数，避免代码重复
    function process(left, right) {
        // 核心为不出边界，且两边（并非真正的左右，有可能是前后元素）相等
        while (str[left] === str[right] && left >= 0 && right < str.length) {
            if (right - left + 1 > maxLength) {
                maxLength = right - left + 1
                // 更新开始索引
                start = left
            }
            left--
            right++

        }
    }
    for (let i = 0; i < str.length; i++) {
        // 判断相邻两个元素
        process(i, i + 1)
        // 判断前后两个元素
        process(i - 1, i + 1)
    }
    return str.substring(start, start + maxLength)


}
testStr = 'ababacd'
console.log(subPalindrome(testStr));
```



## 11. groupPalindrome

回文组合，将仅出现一次且长度相同的字符串进行分组

```js
// input: ['abc','cba','abd','dba','jjj']
// output:[['abc','cba'],['abd','dba'],['jjj']]

function groupPalindrome(arr) {
    let targetArr = [],
        map = new Map()

    for (const item of arr) {
        let tempStr = Array(26).fill(0)
        for (let i = 0; i < item.length; i++) {
            let temp = item.charCodeAt(i) - 97
            tempStr[temp] += 1
        }
        // 将数组转换为字符串
        let joins = tempStr.join('')
        // 如果出现过则将字符串进行追加，否则创建新的map键值
        if (map.has(joins)) {
            map.get(joins).push(item)
        } else {
            map.set(joins, [item])
        }

    }
    // 遍历map将其取出
    for (const [key, value] of map) {
        targetArr.push(value)
    }
    return targetArr
}
testArr = ['age', 'ega', 'abc', 'cba', 'bac', 'deg']
console.log(groupPalindrome(testArr));
```

