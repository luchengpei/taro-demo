import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import articleApi from '../../apis/article'
import ArticleItem ,{ ArticleItemParams } from '../../components/ArticleItem/ArticleItem'


interface ArticleParams {
    keyword?: string;
    articleList?:Array<ArticleItemParams>
}
export default class Home extends Component {
    componentDidShow() {
       this.getArticleList()
    }
    state:ArticleParams = {
        keyword: '',
        articleList:[]
    }
    getArticleList = () => {
        articleApi.getArticleList().then(res => {
            if (res.code == 200) {
                this.setState({
                    articleList:res.data
                })
            }
            console.log(res,'articleList')
        })
    }
    onActionClick = () => {
        this.getArticleList()
    }
    render() {
        return (
            <View>
                <AtSearchBar
                actionName='搜一下'
                value= { this.state.keyword }
                onChange= {( value )=> this.setState({keyword:value})}
                onActionClick= {this.onActionClick}
                />
                <ArticleItem articleList = { this.state.articleList }/>
            </View>
        )
    }
}