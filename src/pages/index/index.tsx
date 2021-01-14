import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton,AtForm, AtInput } from 'taro-ui'
import Taro from '@tarojs/taro'
// import "taro-ui/dist/style/components/button.scss" // 按需引入
// import "taro-ui/dist/style/components/form.scss" // 按需引入
// import "taro-ui/dist/style/components/input.scss" // 按需引入
interface FormProps{
  account: string;
  password:string
}
import './index.scss'
export default class Index extends Component {
  constructor(props) {
    super(props)
  }
  state:FormProps = {
    account: '',
    password:''
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  onSubmit = function () {
    const { account, password } = this.state
    if (account && password) {
      Taro.navigateTo({
        url:`/pages/home/home?account=${account}&password=${password}`
      })
    } else {
      Taro.showToast({
        title: '请输入完整信息',
        icon:'none'
      })
    }
  }
  onReset = ()=> {
    this.setState({
      account: '',
      password:''
     })
  }
  handleChange = function (type,value) {
    if (type == 'account') {
      this.setState({
        account:value
      })
    } else {
      this.setState({
        password:value
      })
    }
  }
  render () {
    return (
      <View className='index'>
        <AtForm
        >
          <AtInput 
            name='account' 
            title='账号' 
            type='text' 
            placeholder='请输入账号' 
            value={this.state.account} 
            onChange={this.handleChange.bind(this,'account')} 
          />
          <AtInput 
            name='password' 
            title='密码' 
            type='password' 
            placeholder='请输入密码' 
            value={this.state.password} 
            onChange={this.handleChange.bind(this,'password')} 
          />
          <AtButton onClick={this.onSubmit.bind(this)}>提交</AtButton>
          <AtButton onClick={this.onReset}>重置</AtButton>
        </AtForm>
      </View>
    )
  }
}
