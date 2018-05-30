<template>
  <transition name="move">
    <div ref="editInfo" class="editInfo">
      <v-header>
        <div class="eiHeader">
          <div @click="back">
            <i class="iconfont icon-icon"></i>
            <span>个人设置</span>
          </div>
        </div>
      </v-header>
      <div class="main">
        <ul>
          <li>
            <div>
              <span>头像</span>
            </div>
            <div>
              <img :src="newInfo.uimg" >
            </div>
          </li>
          <li>
            <div>
              <span>用户名</span>
            </div>
            <div>
              <input type="text" v-model="newInfo.uname" placeholder="用户名为空编辑无效">
            </div>
          </li>
          <li>
            <div>
              <span>职位</span>
            </div>
            <div>
              <input type="text" v-model="newInfo.job" placeholder="例如：全栈工程师">
            </div>
          </li>
          <li>
            <div>
              <span>公司</span>
            </div>
            <div>
              <input type="text" v-model="newInfo.company" placeholder="例如：稀土掘金">
            </div>
          </li>
          <li>
            <div>
              <span>简介</span>
            </div>
            <div>
              <input type="text" v-model="newInfo.intro">
            </div>
          </li>
          <li>
            <div>
              <span>博客地址</span>
            </div>
            <div>
              <input type="text" v-model="newInfo.blog" placeholder="例如：juejin.im">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import header from 'base/header/header'
export default {
  data () {
    return {
      newInfo: {}
    }
  },
  created () {
    Object.assign(this.newInfo, this.user)
  },
  methods: {
    ...mapMutations([
      'UPDATE_INFO'
    ]),
    back () {
      if (this.newInfo.uname) {
        this.UPDATE_INFO({user: this.newInfo})
      }
      this.$router.back()
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  components: {'v-header': header}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.editInfo{
  .movelayout
}
.eiHeader{
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  i{
    padding: 3px 13px 3px 1px;
  }
}
.main{
  width: 100%;
  background: #fafafa;
  position: fixed;
  top: @header-height;
  bottom: 0;
  width: 100%;
  ul{
    line-height: 32px;
    li{
      background: @content-background;
      padding: 8px 12px;
      border-bottom: 1px solid @body-background;
      display: flex;
      div:nth-child(1)
      {
        flex:1;
      }
      div:nth-child(2)
      {
        flex:3;
      }
      span{
        margin-right: 12px;
      }
      input{
        width: 100%;
        outline:none;
        text-align: right;
        &::placeholder {
          color: @font-sub;
        }
      }
      img{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        float: right;
      }
    }
  }
}
</style>
