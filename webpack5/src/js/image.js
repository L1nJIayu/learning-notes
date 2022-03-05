
import webpackImg from '../images/webpack.jpg'

import '../css/fileLoader.css'

function createElement() {
    let oElement = document.createElement('div')

    let oImg = document.createElement('img')
    let bgBox = document.createElement('div')

    oImg.width = 400

    // oImg.src = '../images/webpack.jpg'
    // oImg.src = require('../images/webpack.jpg')
    // oImg.src = require('../images/webpack.jpg').default
    oImg.src = webpackImg

    oElement.appendChild(oImg)

    bgBox.className = 'bgImg'
    oElement.appendChild(bgBox)

    return oElement
}

document.body.appendChild(createElement())