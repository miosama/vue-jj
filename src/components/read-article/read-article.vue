<template>
  <transition name="move">
    <div ref="readArticle" class="readArticle">
      <v-header>
        <span>阅读过的文章</span>
      </v-header>
      <div class="raCon">
        <articleList ref="articleList" :articles="result"></articleList>
      </div>
    </div>
  </transition>
</template>
<script>
import {mapState} from 'vuex'
import {getSelect} from 'api'
import header from 'base/header/header-back'
import articleList from 'base/article-list/article-list'
export default {
  data () {
    return {
      result: [],
      select: []
    }
  },
  created () {
    this.getResult()
  },
  methods: {
    back () {
      Object.assign(this.$data, this.$options.data())
      this.$router.back()
    },
    async getResult () {
      this.result = this.userArticle.filter(
        item => this.readedArticles.indexOf(item.articleID) > -1
      )
      this.select = await getSelect(JSON.stringify(this.readedArticles))
      this.result = [...this.result, ...this.select]
    }
  },
  computed: {
    ...mapState([
      'userArticle',
      'readedArticles'
    ])
  },
  components: {'v-header': header, articleList}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.readArticle{
  .movelayout
}
.raCon{
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: 0;
  width: 100%;
}
</style>
