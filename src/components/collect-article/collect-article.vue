<template>
  <transition name="move">
    <div ref="collectArticle" class="collectArticle">
      <v-header>
        <span>收藏的文章</span>
      </v-header>
      <div class="caCon">
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
    // this.$nextTick(() => {
    this.getResult()
    // })
  },
  methods: {
    async getResult () {
      let id = parseInt(this.$route.params.id)
      let ids = this.userCollectList.find(item => item.id === id).articleIdList
      if (ids.length > 0) {
        this.result = this.userArticle.filter(item => ids.indexOf(item.articleID) > -1)
        this.select = await getSelect(JSON.stringify(ids))
      }
      this.result = [...this.result, ...this.select]
    }
  },
  computed: {
    ...mapState([
      'userArticle',
      'userCollectList'
    ])
  },
  components: {'v-header': header, articleList}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.collectArticle{
  .movelayout
}
.caCon{
  width: 100%;
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: 0;
  width: 100%;
}
</style>
