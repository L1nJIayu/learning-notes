
window.onload = function() {

    /* 画布 */
    let canvas = document.querySelector('#canvas')
    let ctx = canvas.getContext('2d')


    /* DOM */
    let scratcherDOM = document.querySelector('#scratcher')
    let prizeDOM = document.querySelector('#prize')
    let addCoinBtn = document.querySelector('#add-coin')
    let addCoinCountDOM = document.querySelector('#add-coin-count')
    let prizeListDOM = document.querySelector('#prize-list')
    let winPrizeListWrapperDOM = document.querySelector('#win-prize-list-wrapper')
    let winPrizeListDOM = document.querySelector('#win-prize-list')


    /* 信息初始化 */
    if(localStorage['addCoinCount'] === undefined) {
        localStorage['addCoinCount'] = 0
    }
    if(localStorage['winPrizeList'] === undefined) {
        localStorage['winPrizeList'] = JSON.stringify([])
    }

    /* 信息记录 */
    let addCoinCount = localStorage['addCoinCount']                     // 刮奖次数
    let canScratch = false                                              // 是否可以刮卡
    let isNewGame = false                                                // 是否为新游戏(一旦刮卡,就不是新游戏了)
    let currentPrize = localStorage['currentPrize'] || null             // 当前刮刮卡的奖品
    let winPrizeList = JSON.parse(localStorage['winPrizeList'])         // 中奖列表

    /* 奖品列表 */
    let firstPrize = { prize: '一等奖: Iphone 13', percent: 0.01 }
    let secondPrize = { prize: '二等奖: AirPods 3', percent: 0.05 }
    let thirdPrize = { prize: '三等奖: 商城20元代金卷', percent: 0.3 }
    let noPrize = { prize: '谢谢参与', percent: (1 - ( firstPrize.percent + secondPrize.percent + thirdPrize.percent )) }

    prizeListDOM.innerHTML += `<div>${ firstPrize.prize }, 中奖概率为:${ firstPrize.percent * 100 }%</div>`
    prizeListDOM.innerHTML += `<div>${ secondPrize.prize }, 中奖概率为:${ secondPrize.percent * 100 }%</div>`
    prizeListDOM.innerHTML += `<div>${ thirdPrize.prize }, 中奖概率为:${ thirdPrize.percent * 100 }%</div>`


    /* 事件 */
    scratcherDOM.onmousedown = function() { canScratch = true }
    scratcherDOM.onmouseup = function() { canScratch = false }
    scratcherDOM.onmousemove = function(e) { scratchCard(e) }
    // 兼容移动端事件
    scratcherDOM.addEventListener('touchstart', function() { canScratch = true })
    scratcherDOM.addEventListener('touchend', function() { canScratch = false })
    scratcherDOM.addEventListener('touchmove', function(e) { scratchCard_mobile(e) })

    // 投币事件
    addCoinBtn.addEventListener('click', () => { addCoin() })

    /* 初始化 */
    // 初始化中奖记录面板
    updateWinPrizePanel()
    // 初始化投币次数
    addCoinCountDOM.innerHTML = addCoinCount
    // 初始化奖品
    prizeDOM.innerHTML = currentPrize || '请投币'
    

    // 更换刮刮卡
    function newGame() {
        isNewGame = true
        
        ctx.clearRect(0, 0, 300, 100)
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = "#ccc"
        ctx.fillRect(0, 0, 300, 100)
        ctx.fillStyle = "#fff"
        ctx.font = "56px 微软雅黑"
        ctx.fillText("刮奖区", 70, 70)

        addCoinCountDOM.innerHTML = addCoinCount

        
    }
    // 刮卡(PC端)
    function scratchCard(e) {
        
        if(canScratch) {
            if(isNewGame) {
                getPrize()
                if(currentPrize !== null && currentPrize !== noPrize.prize) {
                    savedWinPrize(currentPrize)
                }
            }
            isNewGame = false
            ctx.beginPath()
            ctx.globalCompositeOperation = 'destination-out'
            const { offsetX, offsetY } = e
            ctx.fillStyle = '#fff'
            ctx.arc(offsetX, offsetY, 20, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()

        }
    }
    // 刮卡(移动端)
    function scratchCard_mobile(e) {
        
        if(canScratch) {
            if(isNewGame) {
                getPrize()
                if(currentPrize !== null && currentPrize !== noPrize.prize) {
                    savedWinPrize(currentPrize)
                }
            }
            isNewGame = false
            ctx.beginPath()
            ctx.globalCompositeOperation = 'destination-out'
            const { clientX, clientY } = e.changedTouches[0]
            const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect()
            const x = clientX - canvasX
            const y = clientY - canvasY
            ctx.fillStyle = '#fff'
            ctx.arc(x, y, 20, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()

        }
    }
    // 生成奖励
    function getPrize() {
        let random = Math.random()
        let prize = ''
    
        let firstPrizePercent = firstPrize.percent
        let secondPrizePercent = firstPrize.percent + secondPrize.percent
        let thirdPrizePercent = firstPrize.percent + secondPrize.percent + thirdPrize.percent
    
        if(random < firstPrizePercent) {
            prize = firstPrize.prize
        } else if (random < secondPrizePercent) {
            prize = secondPrize.prize
        } else if (random < thirdPrizePercent) {
            prize = thirdPrize.prize
        } else {
            prize = noPrize.prize
        }

        prizeDOM.innerHTML = prize
        currentPrize = localStorage['currentPrize'] = prize

        console.log(random, prize)

    }
    // 投币
    function addCoin() {
        if(isNewGame) {
            alert('还没刮奖呢，别急着投币开新局呀！')
        } else {
            localStorage['addCoinCount'] = ++addCoinCount
            newGame()
        }
        // if(currentPrize === '请投币' || !isNewGame) {
        //     localStorage['addCoinCount'] = ++addCoinCount
        //     newGame()
        // } else {
        //     alert('还没刮奖呢，别急着投币开新局呀！')
        // }

    }
    // 保存中奖记录
    function savedWinPrize(prize) {
        const T = new Date()
        winPrizeList.unshift({
            prize,
            time: `${ T.getFullYear() }-${ String(T.getMonth() + 1).padStart(2, '0') }-${ String(T.getDate()).padStart(2, '0') } ${ String(T.getHours()).padStart(2, '0') }:${ String(T.getMinutes()).padStart(2, '0') }:${ String(T.getSeconds()).padStart(2, '0') }`
        })
        localStorage['winPrizeList'] = JSON.stringify(winPrizeList)
        updateWinPrizePanel()
    }
    // 更新中奖记录面板
    function updateWinPrizePanel() {
        if(winPrizeList.length !== 0) {
            winPrizeListWrapperDOM.style.display = 'block'
            let prizeList = winPrizeList.map(item => {
                return `
                    <li>
                        <span>${ item.prize }</span>
                        <span>${ item.time }</span>
                    </li>
                `
            }).join('')
            winPrizeListDOM.innerHTML = prizeList
        } else {
            winPrizeListWrapperDOM.style.display = 'none'
            
        }
    }
    
    

}
