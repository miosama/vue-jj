<template>
  <div class="collectList" ref="collectList">
    <ul>
      <li v-for="(item, index) in userCollectList" :key="index" @click.stop="collectIt(item.id, id)">
        <div>
          <h5>{{item.name}}</h5>
          <span>{{item.articleIdList.length}}&nbsp;篇</span>
        </div>
        <div class="collect">
          <i class="iconfont" :class="[hasCollect(item.id, id)?'icon-correct hasCollect':'icon-circle']"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  props: {
    id: Number
  },
  data () { return {} },
  methods: {
    ...mapMutations([
      'ADD_COLLECT'
    ]),
    collectIt (id, aid) {
      this.ADD_COLLECT({id, aid})
      this.$emit('collectIt')
    }
  },
  computed: {
    ...mapState([
      'userCollectList'
    ]),
    hasCollect () {
      return (id, aid) => {
        let cl = this.userCollectList.find(item => item.id === id)
        return cl.articleIdList.indexOf(aid) > -1
      }
    }
  }
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.collectList{
  height: 270px;
  overflow: auto;
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
    }
  }
  .hasCollect{
    color: @focus;
  }
  h5{
    font-size: @fs14;
    display: block;
    font-weight: 500;
  }
  .collect{
    padding: 0 4px;
    line-height: 40px;
  }
}
</style>
