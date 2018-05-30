<template>
  <div class="homeList" ref="homeList">
    <ul>
      <li class="articleLi" v-for="(item, index) in allArticles" :key="index" @click.stop="detail(item)">
        <div class="articleHeader">
          <div class="authorimg">
            <img v-lazy="item.authorImg">
            <span>{{item.author}}</span>
          </div>
          <div class="articleTag">
            <span>{{showTag(item.tag)}}</span>
          </div>
        </div>
        <div class="articlePreview">
          <p>{{item.title}}</p>
          <div>{{item.preview}}</div>
        </div>
        <div class="articleFooter">
          <span @click.stop="praise(item.articleID)">
            <i class="iconfont icon-collectselected" :class="{'isPraised':isPraised(item.articleID)}"></i>
            {{praiseNum(item.articleID, item.praise)}}
          </span>
          <span>
            <i class="iconfont icon-sey-talk-d-a"></i>
            {{commentNum(item.articleID, item.comment.length)}}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import {getContent} from 'api'
export default {
  props: {
    allArticles: {
      type: Array
    }
  },
  data () { return {} },
  methods: {
    ...mapMutations([
      'PRAISE_ARTICLE',
      'THE_ARTICLE'
    ]),
    praise (id) {
      this.PRAISE_ARTICLE({id})
    },
    async detail (item) {
      if (item.articleID > 0 && !item.content) {
        item.content = await getContent(item.articleID)
      }
      this.THE_ARTICLE({article: JSON.stringify(item)})
      this.$router.push({
        path: `/article-detail`
      })
    }
  },
  computed: {
    ...mapState([
      'praise_articlelist',
      'articleComment'
    ]),
    isPraised (id) {
      return id => this.praise_articlelist.indexOf(id) > -1
    },
    praiseNum () {
      return (id, num) => {
        if (this.praise_articlelist.indexOf(id) > -1) {
          return parseInt(num) + 1
        } else {
          return num
        }
      }
    },
    commentNum () {
      return (id, num) => {
        let arrlength = this.articleComment.filter(item => item.aid === id).length
        if (arrlength > 0) {
          return parseInt(num) + arrlength
        } else {
          return num
        }
      }
    },
    showTag () {
      return (arr) => {
        let length = arr.length
        let result = ''
        if (length > 0) {
          arr.forEach((element, index) => {
            if (index === length - 1) {
              result += element
            } else {
              result += element + ' / '
            }
          })
        }
        return result
      }
    }
  }
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.homeList{
  ul{
    li {
      background: @content-background;
      padding:12px 12px 6px;
      border-bottom: 1px solid @border-deep;
      margin-top: 8px;
    }
  }
  .articleHeader{
    display: flex;
    justify-content: space-between;
    font-size: @fs12;
    line-height: 22px;
    .authorimg{
      display: flex;
      align-items: top;
      img{
        width: 22px;
        height: 22px;
        border-radius: 50%;
        margin-right: 6px;
      }
    }
    .articleTag{
      color: @font-sub;
    }
  }
  .articlePreview{
    p{
      font-weight: bold;
      padding: 10px 0 6px;
    }
    div{
      color: @font-sub;
      font-size: @fs12;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;// 限制块级元素的文本行数
      overflow: hidden;
    }
  }
  .articleFooter{
    color: @font-sub;
    padding: 6px 0;
    span{
      margin-right: 12px;
      font-size: @fs12;
    }
    i{
      font-size: @fs12;
      margin-right: 2px
    }
  }
  .isPraised{
    color: @praise;
  }
}
</style>
