import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import articleApi from '../../apis/article'
import './index.scss'
import { update } from 'lodash'
export interface ArticleItemParams {
    id: string | number;
    title: string;
    createTime: string;
    preViewNum: number;
    collectionNum: number;
    subTitle: string;
    img: string;
    isSelect: boolean
}
interface PropsData {
    articleList: Array<ArticleItemParams>;
    getArticleList: Function
}



type ListParams = Array<ArticleItemParams>

export default function ArticleItem(props: PropsData) {
    const { articleList, getArticleList } = props
    const [list, setList] = useState<ListParams>([])
    useEffect(() => {
        setList([...articleList])
    }, [articleList])
    //详情
    const toDetail = (item, index) => {
        handlePreview(item)
    }
    //预览数
    const handlePreview = ({ _id, preViewNum }) => {
        Taro.cloud.callFunction({
            name: 'updatePreview',
            data: {
                _id,
                preViewNum
            }
        }).then(res => {
            getArticleList()
        })
    }
    //收藏
    const handleCollection = ({ _id, collectionNum }: any, index) => {
        const { isSelect } = list[index]
        list[index].isSelect = !list[index].isSelect
        if (isSelect) {
            list[index].collectionNum--
            updateCollection(_id, list[index].collectionNum,list[index].isSelect, 'cancel')

        } else {
            list[index].collectionNum++
            updateCollection(_id, list[index].collectionNum,list[index].isSelect, 'add')
        }
        
        setList([...list])
    }
    //收藏和取消收藏统一请求
    const updateCollection = (_id, collectionNum,isSelect ,type) => {
        Taro.cloud.callFunction({
            name: 'updateCollection',
            data: {
                _id,
                collectionNum,
                isSelect
            }
        }).then(({ result }: any) => {
            const { stats } = result
            const { updated } = stats
            getArticleList()
            if (updated && type == 'add') {
                Taro.showToast({
                    title: '收藏成功',
                    icon: 'success'
                })
            } else {
                Taro.showToast({
                    title: '取消收藏',
                    icon: 'success'
                })
            }
        })
    }
    return (
        <View className="article">
            {
                list.map((row, index) => {
                    return (
                        <View className="wrap" onClick={() => {
                            toDetail(row, index)
                        }}>
                            <View className="title">
                                <Text className="title">{row.title}</Text>
                            </View>
                            <View className="content">

                                <View className="time">
                                    <Text>发布时间:</Text>
                                    <Text style="margin-left:20rpx">{row.createTime}</Text>
                                </View>

                                <View className="info">
                                    <View className="preview">
                                        <AtIcon value='eye' size='20' ></AtIcon>
                                        <Text className="number">{row.preViewNum}</Text>
                                    </View>
                                    <View className="collection" onClick={(event) => {
                                        event.stopPropagation()
                                        handleCollection(row, index)
                                    }}>
                                        <AtIcon value='heart' size='20' ></AtIcon>
                                        <Text className="number">{row.collectionNum}</Text>
                                    </View>
                                </View>

                                <View className="img">
                                    <Image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2977303835,4064798147&fm=11&gp=0.jpg"></Image>
                                </View>

                                <View className="type">
                                    <AtIcon value='image' size='20'></AtIcon>
                                    <Text className="title1">{row.subTitle}</Text>
                                </View>

                            </View>
                        </View>
                    )
                })
            }
        </View>
    )

}