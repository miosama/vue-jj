<template>
  <div>
    <v-header>
      <div class="sHeader">
        <div @click="search">
          <i class="iconfont icon-search"></i>
          <span>搜索</span>
        </div>
      </div>
    </v-header>
    <div class="searchCon" ref="searchCon" @scroll="getMore">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, index) in carouselItem" :key="index">
          <img :src="slide" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="sort">
        <div>
          <i class="iconfont icon-fire"></i>
          <p>本周最热</p>
        </div>
        <div>
          <i class="iconfont icon-shoucang"></i>
          <p>收藏集</p>
        </div>
        <div>
          <i class="iconfont icon-xiaofangguangbo"></i>
          <p>线下活动</p>
        </div>
        <div>
          <i class="iconfont icon-file"></i>
          <p>专栏</p>
        </div>
      </div>
      <div class="popularArticle">
        <div class="popularTitle">
          <div>
            <i class="iconfont icon-fire"></i>
            <span>热门文章</span>
          </div>
          <div class="setPopular">
            <i class="iconfont icon-shezhi2"></i>
            <span>定制热门</span>
          </div>
        </div>
        <articleList ref="articleList" :articles="popular"></articleList>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import header from 'base/header/header'
import articleList from 'base/article-list/article-list'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {getPopularArticles} from 'api'
export default {
  data () {
    return {
      carouselItem: [
        'https://user-gold-cdn.xitu.io/152540087281296fa550b559af524a1386cc66d347489.jpg?imageView2/1/w/460/h/270/q/85/interlace/1',
        'https://user-gold-cdn.xitu.io/1523514575279849749998de6d3301c770842eca93941.jpg?imageView2/1/w/460/h/270/q/85/interlace/1',
        'https://user-gold-cdn.xitu.io/1525747863710f0bf5606c64650d363e14f0b5b797230.jpg?imageView2/1/w/460/h/270/q/85/interlace/1',
        'https://user-gold-cdn.xitu.io/1525659033219f7fb0a2163afc6e26bdc754e704c7223.jpg?imageView2/1/w/460/h/270/q/85/interlace/1'
      ],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        // width: 800,
        height: 50
      },
      popular: [],
      hasMore: true
    }
  },
  created () {
    this.getPopular(0)
  },
  methods: {
    getMore () {
      if (this.hasMore) {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.searchCon
        if (scrollTop + clientHeight + 10 > scrollHeight) {
          this.hasMore = false
          this.getPopular(this.popular.length)
        }
      }
    },
    async getPopular (offset) {
      let {popular, hasMore} = await getPopularArticles(null, offset)
      this.popular = [...this.popular, ...popular]
      this.hasMore = hasMore
    },
    search () {
      this.$router.push({path: '/search/search-article'})
    }
  },
  components: {'v-header': header, articleList, swiper, swiperSlide}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.sHeader{
  padding:7px 8px;
  div{
    width: 100%;
    display: flex;
    background:#39F;
    padding: 0 12px;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    span{
      color: @blue-shallow;
    }
    i{
      font-size: @fs14;
      padding-right: 14px;
    }
  }
}
.swiper-container {
    width: 100%;
    height: 180px;
    img{
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
}
.searchCon{
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: @footer-height;
  width: 100%;
  .icon-fire{
    color:#FF5E34
  }
  .icon-shoucang{
    color:#19C09A
  }
  .icon-xiaofangguangbo{
    color:#FFCC00
  }
  .icon-file{
    color:#666FDE
  }
}
.sort{
  padding: 12px 0;
  display: flex;
  font-size: @fs12;
  background: @content-background;
  div{
    text-align: center;
    flex: 1;
  }
  i{
    font-size: 24px;
  }
}
.popularArticle{
  background: @content-background;
  margin-top: 8px;
  .popularTitle{
    display: flex;
    justify-content: space-between;
    padding: 6px 12px;
    border-bottom: 1px solid @border-deep;
  }
  .setPopular{
    color:@font-sub;
  }
}
</style>
