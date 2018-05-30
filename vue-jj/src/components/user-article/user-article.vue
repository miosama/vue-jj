<template>
  <transition name="move">
    <div class="userArticle">
      <v-header>
        <span>原创文章</span>
      </v-header>
      <div class="ualCon">
        <articleList ref="articleList" :articles="userArticle"></articleList>
      </div>
    </div>
  </transition>
</template>
<script>
import {mapState} from 'vuex'
import header from 'base/header/header-back'
import articleList from 'base/article-list/article-list'
export default {
  data () { return {} },
  created () {},
  methods: {
    back () {
      this.$router.back()
    }
  },
  computed: {
    ...mapState([
      'userArticle'
    ])
  },
  components: {'v-header': header, articleList}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.userArticle{
 .movelayout
}
.ualCon{
  width: 100%;
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: 0;
  width: 100%;
}
</style>
