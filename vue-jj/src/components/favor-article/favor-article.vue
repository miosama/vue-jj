<template>
  <transition name="move">
    <div ref="favorArticle" class="favorArticle">
      <v-header>
        <span>喜欢的文章</span>
      </v-header>
      <div class="faCon">
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
        item => this.praise_articlelist.indexOf(item.articleID) > -1
      )
      this.select = await getSelect(JSON.stringify(this.praise_articlelist))
      this.result = [...this.result, ...this.select]
    }
  },
  computed: {
    ...mapState([
      'userArticle',
      'praise_articlelist'
    ])
  },
  components: {'v-header': header, articleList}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.favorArticle{
  .movelayout
}
.faCon{
  width: 100%;
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: 0;
  width: 100%;
}
</style>
