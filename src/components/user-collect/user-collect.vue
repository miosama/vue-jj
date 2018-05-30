<template>
  <transition name="move">
    <div ref="userCollect" class="userCollect">
      <v-header>
        <div class="ucHeader">
          <div @click="back">
            <i class="iconfont icon-icon"></i>
            <span>收藏集</span>
          </div>
          <div class="addCollect" @click.stop="newCollectList">
            <i class="iconfont icon-tianjia-copy"></i>
          </div>
        </div>
      </v-header>
      <div class="ucCon">
        <ul>
          <li v-for="(item, index) in userCollectList" :key="index" @click.stop="articleList(item.id)">
            <div>
              <h5>{{item.name}}</h5>
              <span>{{item.articleIdList.length}}&nbsp;篇</span>
            </div>
            <div class="arrowDiv">
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script>
import {mapState} from 'vuex'
import header from 'base/header/header'
export default {
  data () {
    return {
      theArticle: {},
      id: 0
    }
  },
  created () {},
  methods: {
    back () {
      this.$router.back()
    },
    articleList (id) {
      this.id = parseInt(id)
      this.$router.push({path: `${this.$route.path}/collect-article/${id}`})
    },
    newCollectList () {
      this.$router.push({path: `${this.$route.path}/add-collect-list`})
    }
  },
  computed: {
    ...mapState([
      'userCollectList'
    ])
  },
  components: {'v-header': header}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.userCollect{
  .movelayout
}
.ucHeader{
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  i.icon-icon{
    padding: 3px 13px 3px 1px;
  }
  .addCollect{
    padding-left: 18px;
  }
}
.ucCon{
  width: 100%;
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: 0;
  width: 100%;
  ul{
    background: @content-background;
    li{
      padding: 8px 12px;
      display: flex;
      border-bottom: 1px solid @border-deep;
      justify-content: space-between;
      span{
        font-size: @fs12;
        color: @font-sub;
      }
      h5{
        font-size: @fs14;
        font-weight: 500;
      }
      .arrowDiv{
        color: @font-sub;
        line-height: 37px;
      }
    }
  }
}
</style>
