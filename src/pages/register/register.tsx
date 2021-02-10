import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components'
import './register.scss'


interface FormData {
    userName: string,
    password: any,
    rePassWord: any
}

export default function Register() {
    //注册信息
    const [formData, setFormData] = useState<FormData>({
        userName: '',
        password: '',
        rePassWord: ''
    })
    const onSubmit = () => {
        const { userName, password, rePassWord } = formData
        if (!userName || !password || !rePassWord) {
            Taro.showToast({
                title: '请填写完整信息',
                icon: 'none'
            })
            return false
        }
        if (password != rePassWord) {
            Taro.showToast({
                title: '密码不一致',
                icon: 'none'
            })
            return false
        }
        Taro.cloud.callFunction({
            name: 'checkRegister',
        }).then((res: any) => {
            if (res.result.data.length) {
                Taro.showToast({
                    title: '该账号已注册',
                    icon: 'none',
                    success: () => {
                        Taro.reLaunch({
                            url: '/pages/login/login'
                        })
                    }
                })
            } else {
                //注册
                Taro.cloud.callFunction({
                    name: 'register',
                    data: {
                        userName,
                        password
                    }
                }).then(res => {
                    Taro.showToast({
                        title: '注册成功',
                        icon: 'success',
                        success: () => {
                            Taro.reLaunch({
                                url: '/pages/login/login'
                            })
                        }
                    })
                })
            }
        })
    }
    return (
        <>
            <View className="index">
                <View className="form">
                    <View className="form-item">
                        <Text className="text">用户名</Text>
                        <Input
                            className="input"
                            onInput={(e) => {
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
                                (e) => {
                                    const password = e.detail.value
                                    setFormData({ ...formData, ...{ password: password } })
                                }
                            }
                            type="text" placeholder='请填写密码' value={formData.password} />
                    </View>
                    <View className="form-item">
                        <Text className="text">确认密码</Text>
                        <Input
                            className="input"
                            password
                            onInput={
                                (e) => {
                                    const rePassWord = e.detail.value
                                    setFormData({ ...formData, ...{ rePassWord: rePassWord } })
                                }
                            }
                            type="text" placeholder='请填写密码' value={formData.rePassWord} />
                    </View>
                    <Button type="primary" className="button"
                        onClick={onSubmit}
                        size="mini">立即注册</Button>
                </View>
            </View>
        </>
    )
}
