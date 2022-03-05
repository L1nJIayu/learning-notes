import '../font/iconfont.css'
import '../css/index.css'

function packFont() {
    let oDiv = document.createElement('div')

    let oSpan = document.createElement('span')
    oSpan.className = "iconfont icon-charge-station"
    oDiv.appendChild(oSpan)

    return oDiv
}

document.body.appendChild(packFont())