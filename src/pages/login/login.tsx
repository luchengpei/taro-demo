import React, { useState } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './login.scss'

interface FormData {
    userName: string,
    password: any,
}
export default function Login() {
    const [formData,setFormData] =useState<FormData>({
        userName:'',
        password:''
    })
    // click = () =>{
    //     Taro.chooseImage({
    //         count:1,
    //         sizeType:['original','compressed'],
    //         sourceType:['album','camera'],
    //         success:(res)=>{
    //             this.uploadImg(res.tempFilePaths[0])
    //         }
    //     })
    // }
    // uploadImg = (tempFilePaths)=>{
    //     Taro.cloud.uploadFile({
    //         cloudPath:'demoImg.png',
    //         filePath:tempFilePaths,
    //         success:(res)=>{
    //             this.setState({
    //                 img:res.fileID
    //             })
    //         }
    //     })
    // }
    const onSubmit = () => {
        if(!formData.userName||!formData.password) {
            Taro.showToast({
                title: '请填写完整信息',
                icon: 'none',
            })
            return false
        }
        Taro.cloud.callFunction({
            name: 'checkRegister',
        }).then((res:any) => {
            const { userName, password } = res.result.data[0]
            if(formData.userName != userName) {
                Taro.showToast({
                    title: '该账号不存在',
                    icon: 'none',
                })
                return false
            }else if(formData.password != password) {
                Taro.showToast({
                    title: '密码不正确',
                    icon: 'none',
                })
                return false
            }
            Taro.showToast({
                title: '登陆成功',
                icon: 'success',
                success:() => {
                    Taro.switchTab({
                        url:'/pages/article/article'
                    })
                }
            })
        })
    }
        return (
            <View className="index">
                <View className="form">
                    <View className="form-item">
                        <Text className="text">用户名</Text>
                        <Input
                            className="input"
                            onInput={e => {
                                const userName = e.detail.value
                                setFormData({ ...formData, ...{ userName: userName } })
                            }}
                            type="text" placeholder='请填写用户名' value={formData.userName} />
                    </View>
                    <View className="form-item">
                        <Text className="text">密码</Text>
                        <Input
                            className="input"
                            password
                            onInput={
                                e => {
                                    const password = e.detail.value
                                    setFormData({ ...formData, ...{ password: password } })
                                }
                            }
                            type="text" placeholder='请填写密码' value={formData.password} />
                    </View>
                    <Button type="primary" className="button"
                        onClick={onSubmit}
                        size="mini">登陆</Button>
                </View>
            </View>
        )
    }
