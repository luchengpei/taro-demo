import { Component } from 'react'
import './app.scss'
import '../src/assets/icon/iconfont.css'
import 'taro-ui/dist/style/index.scss' // 引入组件样式 - 方式一
class App extends Component {

  componentDidMount() {
    console.log('appjs')
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App