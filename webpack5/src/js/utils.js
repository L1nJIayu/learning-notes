const sum = (...nums) => {
    return nums.reduce((prev, next) => prev + next, 0)
}
const square = (...nums) => {
    return nums.reduce((prev, next) => prev * next, 1)
}

export {
    sum,
    square
}