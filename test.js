const start1 = function (n) {
    if (n === 1) return 1
    if (n === 2) return 1
    return start1(n - 1) + start1(n - 2)
}

const cache = function (fn) {
    let obj = Object.create(null)
    return function (b) {
        return obj[b] ? obj[b] :(obj[b] = fn(b))
    }
}


const start2 = cache(function (n) {
    if (n === 1) return 1
    if (n === 2) return 1
    return start2(n - 1) + start2(n - 2)
})

// console.time('第一种方法')
// console.log(start1(50))
// console.timeEnd('第一种方法')

console.time('第二种方法')
console.log(start2(1000))
console.timeEnd('第二种方法')

