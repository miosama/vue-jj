<template>
  <div class="popularArticle" ref="popularArticle"  v-if="showFlag">
    <div class="popular">
      <div class="popularTitle">
        <div class="popularFont">
          <i class="iconfont icon-hot_light"></i>热门推荐
        </div>
        <div class="popularFun" >
          <i class="iconfont icon-28-copy" :class="{'rotating':loadingPopular}" @click.stop="refresh"></i>
          <i class="iconfont icon-close" @click.stop="hidden"></i>
        </div>
      </div>
      <div>
        <ul>
          <li v-for="(item, index) in popular" :key="index" @click.stop="popularDetail(item)">
            <p>{{item.title}}</p>
            <div>
              <span @click.stop="praise(item.articleID)">
                <i class="iconfont icon-collectselected" :class="{'isPraised':isPraised(item.articleID)}"></i>{{praiseNum(item.articleID, item.praise)}}
              </span>
              <span><i class="iconfont icon-iconfontzhizuobiaozhun023104"></i>{{item.author}}</span>
              <span><i class="iconfont icon-icon33"></i>{{item.publishTime}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import {getContent} from 'api'
export default {
  props: {
    popular: Array
  },
  data () {
    return {
      showFlag: true,
      loadingPopular: false
    }
  },
  created () {},
  methods: {
    ...mapMutations([
      'PRAISE_ARTICLE',
      'THE_ARTICLE'
    ]),
    hidden () {
      this.showFlag = false
    },
    refresh () {
      if (!this.loadingPopular) {
        this.loadingPopular = true
        this.$emit('refresh')
      }
    },
    praise (id) {
      this.PRAISE_ARTICLE({id})
    },
    async popularDetail (item) {
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
      'praise_articlelist'
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
    }
  },
  watch: {
    popular: function () {
      this.loadingPopular = false
      this.showFlag = true
    }
  }
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.popularArticle{
  background: @content-background;
  .popularTitle{
    color: @font-sub;
    display: flex;
    justify-content: space-between;
    padding: 8px;
    margin-top: 4px;
    border-bottom: 1px solid @border-deep;
    i{
      margin-right: 12px
    }
    .popularFont{
      color: @blue;
      font-weight:bold
    }
  }
  ul{
    li{
      padding: 10px 12px 20px;
      border-bottom: 1px solid @border-deep;
      p{
        font-weight: bold;
        padding-bottom: 4px;
      }
      span{
        font-size: @fs12;
        color: @font-sub;
        margin-right: 6px;
      }
      i{
        font-size:@fs12;
        padding: 3px;
      }
    }
    .isPraised{
      color: @praise;
    }
    // li:last-child{
    //   padding-bottom: 2px;
    // }
  }
  .popularFun{
    display: flex;
    i{
      flex: 1
    }
  }
  .rotating{
    display: block;
    animation: load3 .8s infinite linear;
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      transform-origin:center;
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
      transform-origin:center;
    }
  }
}
</style>
