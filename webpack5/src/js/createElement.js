// import 'css-loader!../css/createElement.css' // 方式一：行内
import '../css/createElement.css'
// import '../less/createElement.less'
import '../css/testpostcss.css'

function h2Element() {
    let h2 = document.createElement('h2')
    h2.innerHTML = 'webpack5学习'
    h2.className = 'title example'
    return h2
}
document.body.appendChild(h2Element())