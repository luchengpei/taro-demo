import React, { useState ,useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'
export interface ArticleItemParams {
    id: string | number;
    title: string;
    createTime: string;
    preViewNum: number;
    collectionNum: number;
    subTitle: string;
    img: string;
    isSelect:boolean
}

interface PropsData {
    articleList: Array<ArticleItemParams>;
}


export default function ArticleItem (props: PropsData) {
    const { articleList } = props
    const [list, setList] = useState<Array<ArticleItemParams>>([])
    useEffect(() => {
        setList([...list,...articleList])
    }, [articleList])
    //详情
    const toDetail = (item) => {
        console.log(item,'item')
    }
    //收藏
    const handleCollection = (index) => {
        const { isSelect } = list[index]
        if (isSelect) {
            list[index].collectionNum--
            Taro.showToast({
                title:'取消收藏'
            })
        } else {
            list[index].collectionNum++
            Taro.showToast({
                title:'收藏成功'
            })
        }
        list[index].isSelect = !list[index].isSelect
        setList([...list])
    }
    return (
        <View className="article">  
            {
                list.map((row,index) => {
                    return (
                        <View className="wrap" onClick= { () => {
                            toDetail(row)
                    }}>
                            <View className="title">
                                <Text className="title">{ row.title}</Text>
                            </View>
                        <View className="content">

                            <View className="time">
                                <Text>发布时间:</Text>
                                    <Text style="margin-left:20rpx">{ row.createTime }</Text>
                            </View>

                            <View className="info">
                                <View className="preview">
                                    <AtIcon  value='eye' size='20' ></AtIcon>
                                        <Text className="number">{ row.preViewNum}</Text>
                                </View>
                                    <View className="collection" onClick={(event) => {
                                        event.stopPropagation()
                                        handleCollection(index)
                                }}> 
                                    <AtIcon  value='heart' size='20' ></AtIcon>
                                        <Text className="number">{row.collectionNum }</Text>
                                </View>
                            </View>
                            
                            <View className="img">
                                <Image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2977303835,4064798147&fm=11&gp=0.jpg"></Image>
                            </View>

                            <View className="type">
                                <AtIcon  value='image' size='20'></AtIcon>
                                    <Text className="title1">{ row.subTitle }</Text>
                            </View>

                        </View>
                    </View>
                    )
                })
            }
        </View>
    )

}