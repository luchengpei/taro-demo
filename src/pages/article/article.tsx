import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import articleApi from '../../apis/article'
import ArticleItem ,{ ArticleItemParams } from '../../components/ArticleItem/ArticleItem'
import Taro from '@tarojs/taro'

interface ArticleParams {
    keyword?: string;
    articleList?:Array<ArticleItemParams>
}
export default class Home extends Component {
    componentDidMount() {
       this.getArticleList()
    }
    state:ArticleParams = {
        keyword: '',
        articleList:[]
    }
    getArticleList = async () => {
        Taro.cloud.callFunction({
            name: 'getArticle',
            // data: {
            //     // type: 'get',
            //     // data: {
            //     //     collectionNum: 0,
            //     //     createTime: '2020-02-03',
            //     //     img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2977303835,4064798147&fm=11&gp=0.jpg',
            //     //     isSelect: true,
            //     //     preViewNum: 0,
            //     //     subTitle: '测试',
            //     //     title:'cloud dev'
            //     // }
            // }
        }).then((res:any) => {
            const { data } = res.result
            this.setState({
                articleList:data
            })

        }).catch(err=>{
            console.log(err,'error')
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
                <ArticleItem articleList={this.state.articleList} getArticleList ={this.getArticleList}/>
            </View>
        )
    }
}