<template>
  <div class="articleList" ref="articleList">
    <ul>
      <li v-for="(item, index) in articles" :key="index" @click.stop="showDetail(item)">
        <p>{{item.title}}</p>
        <div>
          <span>
            {{praiseNum(item.articleID, item.praise)}}
            人喜欢&nbsp;·&nbsp;
            {{item.author}}
            &nbsp;·&nbsp;
            {{item.publishTime}}</span>
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
    articles: Array
  },
  data () { return {} },
  methods: {
    ...mapMutations([
      'THE_ARTICLE'
    ]),
    async showDetail (item) {
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
    praiseNum () {
      return (id, num) => {
        if (this.praise_articlelist.indexOf(id) > -1) {
          return parseInt(num) + 1
        } else {
          return num
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
ul{
  background: @content-background;
  li{
    padding: 10px 12px 20px;
    color: @font-common;
    border-bottom: 1px solid @border-deep;
    margin-top: 0;
    p{
      font-weight: bold;
      padding-bottom: 4px;
    }
    span{
      font-size: @fs12;
      color: @font-sub;
    }
  }
}
</style>
