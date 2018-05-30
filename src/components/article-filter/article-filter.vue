<template>
  <transition name="move">
    <div class="articleFilter" v-show="showFlag" ref="articleFilter">
      <v-header>
        <div class="filterheader">
          <div class="back" @click="back">
            <i class="iconfont icon-icon"></i>
          </div>
          <div>
            <span>首页特别展示</span>
          </div>
        </div>
      </v-header>
      <ul>
        <li v-for="(type, index) in typelist.slice(1)" :key="index">
          <div>
            <span>{{type.name}}</span>
          </div>
          <div @click="selectType(index+1, type.chosen)">
            <!-- <Switch ></Switch> -->
            <toggle-button v-model="type.chosen" color="#008FFF" :sync="true" :width="46"/>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
import header from 'base/header/header'
export default {
  data () {
    return {
      showFlag: false,
      // 文章类型
      typelist: [
        {
          name: '首页',
          type: 0,
          chosen: true
        },
        {
          name: '前端',
          type: 1,
          chosen: true
        },
        {
          name: '后端',
          type: 2,
          chosen: true
        },
        {
          name: 'android',
          type: 3,
          chosen: true
        },
        {
          name: 'ios',
          type: 4,
          chosen: true
        },
        {
          name: '产品',
          type: 5,
          chosen: false
        },
        {
          name: '设计',
          type: 6,
          chosen: false
        },
        {
          name: '工具资源',
          type: 7,
          chosen: false
        },
        {
          name: '阅读',
          type: 8,
          chosen: false
        },
        {
          name: '人工智能',
          type: 9,
          chosen: false
        }
      ]
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    back () {
      this.$emit('typefilter', this.typelist.filter(item => item.chosen === true))
      this.showFlag = false
    },
    selectType (index, val) {
      this.typelist[index].chosen = !val
    }
  },
  components: {'v-header': header}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.articleFilter{
  .movelayout
}
.filterheader{
  padding: 0 12px;
  display: flex;
  .back i{
    padding-right: 12px;
  }
}
ul{
  margin-top: @header-height;
  line-height: 22px;
  li{
    padding: 12px;
    border-bottom: 1px solid @border-deep;
    display: flex;
    justify-content: space-between;
  }
}
</style>
