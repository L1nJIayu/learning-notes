
let currentValue: number
currentValue = 1

let myStr: string
myStr = 'jeffrey'

function foo(a, b) {
    console.log(a, b)
}

function foo2(this: Window) {
    console.log(this)
}
let box = document.querySelector('#box')
if(box !== null) {
    box.addEventListener('click', () => {
        console.log('有#box')
    })
}
box?.addEventListener('click', () => {
    
})

export default {
    name: 'jeffrey'
}