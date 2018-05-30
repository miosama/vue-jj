<template>
  <div>
    <v-header>
      <div class="content">
        <div class="wrapper" ref="typeWrapper">
          <ul class="type-list" ref="typeList">
            <li class="type-item" @click="getArticleList(type.type, 0)" ref="typeItem" v-for="(type, index) in types" :key="index" :class="{'current': currentType===type.type}">
              <span>{{type.name}}</span>
            </li>
          </ul>
        </div>
        <div class="filter" @click="filter">
          <i class="iconfont icon-zhixiang-zhishiqixia"></i>
        </div>
      </div>
    </v-header>
    <div class="home" @scroll="getMore" ref="home">
      <div class="mainContent">
        <popularArticle ref="popularArticle" :popular="popular" @refresh="getPopularArticles"></popularArticle>
        <homeList ref="homeList" :allArticles="allArticles"></homeList>
      </div>
    </div>
    <transition>
      <div class="addBtn animated" :class="[addBtnShowFlag?'zoomIn':'zoomOut']" v-show="addBtnShowFlag" @click.stop="addArticle">
        <i class="iconfont icon-tianjia"></i>
      </div>
    </transition>
    <articleFilter ref="articleFilter" @typefilter="changeType" :types="types"></articleFilter>
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import header from 'base/header/header'
import homeList from 'base/home-list/home-list'
import articleFilter from 'components/article-filter/article-filter'
import popularArticle from 'components/popular-article/popular-article'
import {getArticles, getPopular} from 'api'
export default {
  data () {
    return {
      types: [
        {
          name: '首页',
          type: 0
        },
        {
          name: '前端',
          type: 1
        },
        {
          name: '后端',
          type: 2
        },
        {
          name: 'android',
          type: 3
        },
        {
          name: 'ios',
          type: 4
        }
      ],
      currentType: 0,
      articles: [],
      popular: [],
      addBtnShowFlag: true,
      hasMore: true
    }
  },
  created () {
    this.getArticleList(0, 0)
    this.getPopularArticles(0)
    this.$nextTick(() => {
      this._initTypeScroll()
    })
  },
  methods: {
    _initTypeScroll () {
      let width = 0
      for (let i = 0; i < this.types.length; i++) {
        // console.log(this.$refs.typeItem[0].clientWidth)
        // console.log(this.$refs.typeItem[0].getBoundingClientRect().width)
        width += this.$refs.typeItem[0].getBoundingClientRect().width
      }
      width += 110 // 不加的话不能完全显示
      this.$refs.typeList.style.width = width + 'px'
      if (!this.typeScroll) {
        this.typeScroll = new BScroll(this.$refs.typeWrapper, {
          startX: 0,
          scrollX: true,
          scrollY: false,
          bounce: true,
          bounceTime: 100,
          eventPassthrough: 'vertical'
        })
      } else {
        this.typeScroll.refresh()
      }
    },
    changeType (data) {
      this.types = data
      let type = this.types.find(item => {
        return item.type === this.currentType
      })
      if (!type) {
        this.currentType = 0
        this.articles = []
        this.hasMore = true
        this.getArticleList(0, 0)
        this.getPopularArticles(0)
      }
      this._initTypeScroll()
    },
    async getArticleList (type, offset) {
      if (this.currentType !== type) {
        this.$refs.home.scrollTop = 0
        let {articles, hasMore} = await getArticles(type, offset)
        this.articles = articles
        this.hasMore = hasMore
        this.currentType = type
        this.getPopularArticles()
      } else {
        if (this.articles.length === offset) {
          let {articles, hasMore} = await getArticles(type, offset)
          this.articles = [...this.articles, ...articles]
          this.hasMore = hasMore
        }
      }
    },
    getMore () {
      if (this.hasMore) {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.home
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.hasMore = false
          this.getArticleList(this.currentType, this.articles.length)
        }
      }
    },
    async getPopularArticles () {
      this.popular = await getPopular(this.currentType)
    },
    filter () {
      this.$refs.articleFilter.show()
    },
    addArticle () {
      this.$router.push({
        path: `/home/add-article`
      })
    }
  },
  computed: {
    ...mapState([
      'userArticle'
    ]),
    allArticles () {
      let al = this.userArticle
      if (this.currentType !== 0) {
        al = al.filter(item => item.type === this.currentType)
      }
      return [...al, ...this.articles]
    }
  },
  components: {
    'v-header': header,
    articleFilter,
    homeList,
    popularArticle
  }
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.$refs.home.scrollTop = vm.$route.meta.scrollTop
  //   })
  // },
  // beforeRouteLeave (to, from, next) {
  //   let { scrollTop } = this.$refs.home
  //   this.$route.meta.scrollTop = scrollTop
  //   next()
  // }
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.home{
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: @footer-height;
  width: 100%;
  .mainContent{
    width: 100%;
  }
}
.content {
  width: 100%;
  display: flex;
  line-height: 42px;
  font-size: @fs14;
  .filter {
    flex: 1;
    text-align: center;
    i {
      color:  @font-head;
      vertical-align: middle;
    }
  }
  .wrapper {
    flex: 9;
    overflow: hidden;
    .type-list {
      .type-item {
        display: inline-block;
        color: @font-title;
        padding: 0 20px;
      }
    }
  }
  .current{
    color: @font-head !important;
    font-weight: bolder;
    border-bottom: 2px solid @font-head;
  }
}
.addBtn{
  position: absolute;
  z-index: 1;
  bottom: 70px;
  right: 20px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: @blue;
  box-shadow: 0px 0px 15px #999;
  color: @font-head;
  display: flex;
  justify-content: center;
  align-items: center;
  i{
    font-size: 26px;
  }
}
.animated {
  animation-duration: .5s;
}
</style>
