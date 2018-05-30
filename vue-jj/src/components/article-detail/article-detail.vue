<template>
  <transition name="move">
    <div class="articleDetail">
      <v-header>
        <div class="detailHeader">
          <div class="authorimg">
            <i class="iconfont icon-icon" @click="back"></i>
            <div><img v-lazy="article.authorImg"></div>
            <span>{{article.author}}</span>
          </div>
          <div class="articleShare" @click="showSharing">
            <i class="iconfont icon-share"></i>
          </div>
        </div>
      </v-header>
      <div class="detailContent">
        <div class="detailWrapper" ref="detailWrapper">
          <div class="contentArea" >
            <h1 class="article-title">{{article.title}}</h1>
            <div class="detailhtml" v-html="article.content"></div>
            <div class="commentDiv">
              <i class="iconfont icon-iconfontzhizuobiaozhun023104-copy"></i>
              说说你的想法...
            </div>
            <div class="commentList" v-show="commentLength > 0">
              <div class="listhead">{{commentLength}}&nbsp;条评论</div>
              <ul>
                <li v-for="(item, index) in allComment" :key="index">
                  <div class="commentImg">
                    <img v-lazy="item.commentImg" >
                  </div>
                  <div class="commentArea">
                    <span>{{item.username}}</span>
                    <p v-html="item.commentText"></p>
                    <div class="commentOther">
                      <span><i class="iconfont icon-dianzan"></i>&nbsp;{{item.admire}}</span>&nbsp;•&nbsp;
                      <span>回复&nbsp;</span>&nbsp;•&nbsp;
                      <span>{{item.commentTime}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="detailFooter">
          <div class="userFun">
            <i @click.stop="praise(article.articleID)" class="iconfont" :class="[isPraised(article.articleID)?'icon-collectselected isPraised':'icon-collect']"></i>
            <i @click.stop="giveComment" class="iconfont icon-sey-talk-a"></i>
            <i @click.stop="showCollect" class="iconfont" :class="[hasCollectThis(article.articleID)?'icon-icon-test1':'icon-add']"></i>
          </div>
          <div class="userShow">
            <span v-show="praiseNum > 0">喜欢&nbsp;{{praiseNum}}</span>
            <span v-show="praiseNum > 0 && commentLength > 0">&nbsp;•&nbsp;</span>
            <span v-show="commentLength > 0">评论&nbsp;{{commentLength}}</span>
          </div>
        </div>
      <transition>
        <div class="collectDiv animated" v-show="collectFlag" :class="[collectFlag?'fadeInUp':'fadeOutDown']">
          <div class="collectHeader">
            <div>添加到收藏集</div>
            <div class="addCollectList" @click.stop="newCollectList">
              <i class="iconfont icon-tianjia-copy"></i>&nbsp;
              <span>新建收藏集</span>
            </div>
          </div>
          <collectList :id="article.articleID" @collectIt="hiddenCollect" ref="collectList"></collectList>
        </div>
      </transition>
      <socialSharing ref="socialSharing"></socialSharing>
      <comment @newComment="addComment" v-show="commentFlag"></comment>
      <div class="shade" v-show="commentFlag" @click.stop="hiddenComment"></div>
      <div class="shade" v-show="collectFlag" @click.stop="hiddenCollect"></div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import BScroll from 'better-scroll'
import comment from 'base/comment/comment'
import collectList from 'base/collect-list/collect-list'
import socialSharing from 'base/social-sharing/social-sharing'
import header from 'base/header/header'
export default {
  data () {
    return {
      collectFlag: false,
      commentFlag: false
    }
  },
  created () {
    this.$nextTick(() => {
      this._initDetailScroll()
    })
  },
  methods: {
    ...mapMutations([
      'PRAISE_ARTICLE',
      'COMMENT_ARTICLE',
      'ADD_COLLECT'
    ]),
    _initDetailScroll () {
      this.detailScroll = new BScroll(this.$refs.detailWrapper, {
        eventPassthrough: 'horizontal',
        mouseWheel: true,
        bounce: true,
        bounceTime: 100
      })
    },
    showSharing () {
      this.$refs.socialSharing.show()
    },
    praise (id) {
      this.PRAISE_ARTICLE({id})
    },
    showCollect () {
      this.collectFlag = true
    },
    hiddenCollect () {
      this.collectFlag = false
    },
    newCollectList () {
      this.$router.push({
        path: `${this.$route.fullPath}/add-collect-list`
      })
    },
    giveComment () {
      this.commentFlag = true
    },
    hiddenComment () {
      this.commentFlag = false
    },
    addComment (data) {
      if (data) {
        this.COMMENT_ARTICLE({text: data, aid: this.article.articleID})
        this.commentFlag = false
      }
    },
    back () {
      Object.assign(this.$data, this.$options.data())
      this.$router.back()
    }
  },
  computed: {
    ...mapState([
      'praise_articlelist',
      'articleComment',
      'userCollectList',
      'userArticle',
      'article'
    ]),
    isPraised (id) {
      return id => this.praise_articlelist.indexOf(id) > -1
    },
    praiseNum () {
      if (this.praise_articlelist.indexOf(this.article.articleID) > -1) {
        return parseInt(this.article.praise) + 1
      } else {
        return this.article.praise
      }
    },
    allComment () {
      let commentlist = this.articleComment.filter(item => item.aid === this.article.articleID)
      return [...commentlist, ...this.article.comment]
    },
    commentLength () {
      return this.allComment.length
    },
    hasCollectThis () {
      return (id) => this.userCollectList.some(item => item.articleIdList.indexOf(id) > -1)
    }
  },
  components: {
    'v-header': header,
    socialSharing,
    comment,
    collectList
  }
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.articleDetail{
  .movelayout;
}
.header{
  border-bottom: 1px solid @border-deep;
}
.detailHeader{
  background: #fff;
  color:@font-common;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.authorimg{
  display: flex;
  i{
    padding:0 22px 0 12px;
  }
  div{
    height: 32px;
    width: 36px;
    text-align: center;
  }
  img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
.articleShare{
  i{
    padding: 0 20px;
  }
}
.detailFooter{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: @footer-height;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid @border-deep;
  padding: 0 12px;
  line-height:@footer-height;
  color: @font-sub;
  background: @content-background;
  i{
    padding: 12px 8px;
    font-size: 22px;
  }
  span{
    font-size: @fs12;
  }
  .isPraised{
    color: @praise;
  }
}
.shade{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.collectDiv{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 320px;
  background: @body-background;
  border-top: 1px solid @border-deep;
  z-index: 2;
  .collectHeader{
    padding: 12px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid @border-deep;
  }
  .addCollectList{
    color:  @blue;
  }
}
.animated {
  animation-duration: .5s;
}
</style>
<style lang="less">
@import '../../styles/set.less';
.detailContent{
  position: fixed;
  top: @header-height;
  bottom: @footer-height;
  left: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  background: @body-background;
  .detailWrapper, .contentArea{
    width: 100%;
  }
  .commentDiv{
    line-height: 70px;
    height: 70px;
    width: 100%;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    padding: 0 14px;
    color: @font-sub;
    background: @content-background;
    i{
      border-radius: 3px;
      padding: 12px;
      color: @content-background;
      background: @font-sub;
      margin-right: 10px;
    }
  }
  .article-title{
    font-weight: 700;
    padding: 10px 12px 0;
    background: #fff;
  }
  .detailhtml{
    padding: 0 12px;
    background: #fff;
    width: 100%;
    word-break: break-word;
    line-height: 1.75;
    font-weight: 400;
    font-size: 15px;
    margin-bottom: 10px;
    overflow: hidden;
    p {
      line-height: inherit;
      margin-top: 22px;
      margin-bottom: 22px;
    }
    blockquote {
      color: #666;
      padding: 1px 23px;
      margin: 22px 0;
      border-left: 4px solid #cbcbcb;
      background-color: #f8f8f8;
    }
    blockquote>p {
      margin: 10px 0;
    }
    img{
      max-width: 100%;
    }
    h2 {
      padding-bottom: 12px;
      font-size: 20px;
      border-bottom: 1px solid #ececec;
    }
    h1,  h2,  h3,  h4,  h5,  h6 {
      color: #333;
      line-height: 1.5;
      margin-top: 32px;
      margin-bottom: 10px;
      padding-bottom: 5px;
    }
    a {
      color: #0269c8;
      border-bottom: 1px solid #d1e9ff;
    }
    code {
      background-color: #fff5f5;
      color: #ff502c;
      font-size: .87em;
      padding: .065em .4em;
      border-radius: 2px;
      overflow-x: auto;
      word-break: break-word;
    }
    pre>code.hljs[lang][lang=bash] {
      padding-top: 12px;
    }
    pre>code.hljs[lang] {
      padding: 20px 15px 12px;
    }
    pre>code {
      margin: 0;
      word-break: normal;
      display: block;
      color: #333;
      background: #f8f8f8;
      overflow-x: auto;
      font-size: 11px;
      padding: 15px 12px;
    }
    table {
      display: inline-block;
      font-size: 12px !important;
      width: auto;
      max-width: 100%;
      overflow-x: auto;
      border: 1px solid #f6f6f6;
      tbody {
        vertical-align: middle;
      }
      td {
        min-width: 10rem;
      }
      td, th {
        vertical-align: middle;
        padding: 1rem .6rem;
        line-height: 2rem;
      }
    }
  }
  .commentList{
    background: @content-background;
    width: 100%;
    margin-bottom: 10px;
    .listhead{
      padding: 12px 14px;
      color: @font-sub;
      width: 100%;
      border-bottom: 1px solid @border-deep;
    }
    ul{
      line-height: 22px;
      li{
        padding: 14px;
        border-bottom: 1px solid @border-deep;
        display: flex;
        .commentImg{
          flex:1;
          display: flex;
          justify-content: center;
          img{
            width: 40px;
            height: 40px;
            border-radius: 3px;
          }
        }
        .commentArea{
          flex: 6;
          color: @font-sub;
          padding: 0 2px;
          span{
            color: @font-intro;
          }
          p{
            color: #333;
            margin: 4px 0;
          }
          .commentOther span{
              color: @font-sub;
              font-size: @fs12;
              margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
