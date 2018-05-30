import * as types from './mutation-types'

import {setStore, getStore} from '../config/util'

export default{

  // 加载本地数据
  [types.INIT_LOCATION_DATA] (state) {
    if (getStore('userbp')) {
      state.userbp = getStore('userbp')
    }
    if (getStore('userArticle')) {
      state.userArticle = getStore('userArticle')
    }
    if (getStore('praise_bplist')) {
      state.praise_bplist = getStore('praise_bplist')
    }
    if (getStore('bpComment')) {
      state.bpComment = getStore('bpComment')
    }
    if (getStore('praise_articlelist')) {
      state.praise_articlelist = getStore('praise_articlelist')
    }
    if (getStore('articleComment')) {
      state.articleComment = getStore('articleComment')
    }
    if (getStore('focusUsers')) {
      state.focusUsers = getStore('focusUsers')
    }
    if (getStore('userCollectList')) {
      state.userCollectList = getStore('userCollectList')
    }
    if (getStore('searchList')) {
      state.searchList = getStore('searchList')
    }
    if (getStore('readedArticles')) {
      state.readedArticles = getStore('readedArticles')
    }
  },

  // 初始化用户数据
  [types.INIT_USER] (state) {
    if (getStore('user')) {
      state.user = getStore('user')
    } else {
      let name = Math.random().toString(16).slice(-4)
      state.user.uname = '用户' + name
      state.user.company = '掘金'
      state.user.job = '普通员工'
      state.user.intro = '我在这里挖掘最优质的互联网技术'
      state.user.blog = ''
      state.user.uimg = 'https://tva2.sinaimg.cn/crop.0.0.180.180.180/663aa05ajw1e8qgp5bmzyj2050050aa8.jpg'
      setStore('user', state.user)
    }
  },

  // 更新用户数据
  [types.UPDATE_INFO] (state, payload) {
    state.user = payload.user
    setStore('user', state.user)
  },

  // 添加沸点
  [types.ADD_BP] (state, payload) {
    state.userbp.unshift(payload.bp)
    setStore('userbp', state.userbp)
  },

  // 对沸点内容点赞
  [types.PRAISE_BP] (state, payload) {
    let id = parseInt(payload.id)
    let idIndex = state.praise_bplist.indexOf(id)
    if (idIndex === -1) {
      state.praise_bplist.unshift(id)
    } else {
      state.praise_bplist.splice(idIndex, 1)
    }
    setStore('praise_bplist', state.praise_bplist)
  },

  // 对沸点内容评论
  [types.COMMENT_BP] (state, payload) {
    if (payload.text) {
      let comment = {
        'bpid': payload.bpid,
        'username': state.user.uname,
        'commentImg': state.user.uimg,
        'commentTime': '刚刚',
        'admire': '0',
        'commentText': payload.text
      }
      state.bpComment.unshift(comment)
      setStore('bpComment', state.bpComment)
    }
  },

  // 关注用户
  [types.FOCUS] (state, payload) {
    let name = payload.name
    let index = state.focusUsers.indexOf(name)
    if (index === -1) {
      state.focusUsers.unshift(name)
    } else {
      state.focusUsers.splice(index, 1)
    }
    setStore('focusUsers', state.focusUsers)
  },

  // 添加文章
  [types.ADD_ARTICLE] (state, payload) {
    let article = {
      'articleID': -Math.abs(state.userArticle.length + 1),
      'type': payload.type,
      'title': payload.title,
      'publishTime': '刚刚',
      'praise': '0',
      'tag': ['文章'],
      'author': state.user.uname,
      'authorImg': state.user.uimg,
      'comment': [],
      'preview': payload.idea,
      'content': payload.content
    }
    state.userArticle.unshift(article)
    setStore('userArticle', state.userArticle)
  },

  // 对文章内容点赞
  [types.PRAISE_ARTICLE] (state, payload) {
    let id = parseInt(payload.id)
    let idIndex = state.praise_articlelist.indexOf(id)
    if (idIndex === -1) {
      state.praise_articlelist.unshift(id)
    } else {
      state.praise_articlelist.splice(idIndex, 1)
    }
    setStore('praise_articlelist', state.praise_articlelist)
  },

  // 对文章内容评论
  [types.COMMENT_ARTICLE] (state, payload) {
    if (payload.text) {
      let comment = {
        'aid': payload.aid,
        'username': state.user.uname,
        'commentImg': state.user.uimg,
        'commentTime': '刚刚',
        'admire': '0',
        'commentText': payload.text
      }
      state.articleComment.unshift(comment)
      setStore('articleComment', state.articleComment)
    }
  },

  // 添加收藏集
  [types.ADD_COLLECT_LIST] (state, payload) {
    let cl = {
      'id': state.userCollectList.length + 1,
      'name': payload.name,
      'description': payload.description,
      'articleIdList': []
    }
    state.userCollectList.unshift(cl)
    setStore('userCollectList', state.userCollectList)
  },

  // 收藏文章
  [types.ADD_COLLECT] (state, payload) {
    let aid = payload.aid
    let id = payload.id
    let cl = state.userCollectList.find(item => item.id === id)
    if (cl) {
      let index = cl.articleIdList.indexOf(aid)
      if (index === -1) {
        cl.articleIdList.unshift(aid)
      } else {
        cl.articleIdList.splice(index, 1)
      }
      setStore('userCollectList', state.userCollectList)
    }
  },

  // 添加搜索记录
  [types.ADD_SEARCH] (state, payload) {
    let item = {
      'id': state.searchList.length + 1,
      'text': payload.text
    }
    state.searchList.unshift(item)
    setStore('searchList', state.searchList)
  },

  // 删除搜索记录
  [types.DEL_SEARCH] (state, payload) {
    let sindex = -1
    let id = payload.id
    state.searchList.forEach(function (item, index) {
      if (item.id === id) {
        sindex = index
      }
    })
    state.searchList.splice(sindex, 1)
    setStore('searchList', state.searchList)
  },

  // 选中的文章，同时记录在阅读过的文章中
  [types.THE_ARTICLE] (state, payload) {
    let article = JSON.parse(payload.article)
    state.article = article
    let id = article.articleID
    let index = state.readedArticles.indexOf(id)
    if (index === -1) {
      state.readedArticles.unshift(id)
      setStore('readedArticles', state.readedArticles)
    }
  },

  // 选中的沸点
  [types.THE_BP] (state, payload) {
    state.bp = JSON.parse(payload.bp)
  }

}
