import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ButtonList from '@/components/buttonList'
import './index.scss'

/**
 * 开放接口-收藏
 * @returns
 */

export default class Index extends React.Component {
  state = {
    list: [
      {
        id: 'addVideoToFavorites',
        func: null,
      },
      {
        id: 'addFileToFavorites',
        func: null,
      },
    ],
  }
  render() {
    const { list } = this.state
    return (
      <View className='api-page'>
        <ButtonList buttonList={list} />
      </View>
    )
  }
}
