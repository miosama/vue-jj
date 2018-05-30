<template>
  <transition name="move">
    <div class="addCollectList">
      <v-header>
        <div class="collectHeader">
          <div>
            <i class="iconfont icon-icon" @click.stop="back"></i>
            <span>新建收藏集</span>
          </div>
          <div :class="{'unrelease': !canRelease}" @click.stop="release">创建</div>
        </div>
      </v-header>
      <div class="collectCon">
        <div>名称</div>
        <div class="contentDiv" :class="{'chosen':inputName}">
          <input @focus="focusName" @blur="blurName" v-model="name" type="text" placeholder="20字以内，不支持空格及特殊字符串" maxlength="20">
          <span>{{remainName}}</span>
        </div>
        <div>描述(可选)</div>
        <div class="contentDiv" :class="{'chosen':inputDescription}">
          <input @focus="focusDescription" @blur="blurDescription" v-model="description" type="text" placeholder="请添加100字以内的描述"  maxlength="100">
          <span>{{remainDescription}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {mapMutations} from 'vuex'
import header from 'base/header/header.vue'
export default {
  data () {
    return {
      name: '',
      description: '',
      inputName: false,
      inputDescription: false
    }
  },
  created () {},
  methods: {
    ...mapMutations([
      'ADD_COLLECT_LIST'
    ]),
    back () {
      // Object.assign(this.$data, this.$options.data())
      this.$router.back()
    },
    focusName () {
      this.inputName = true
    },
    blurName () {
      this.inputName = false
    },
    focusDescription () {
      this.inputDescription = true
    },
    blurDescription () {
      this.inputDescription = false
    },
    release () {
      if (this.name) {
        this.ADD_COLLECT_LIST({name: this.name, description: this.description})
        Object.assign(this.$data, this.$options.data())
        this.$router.back()
      }
    }
  },
  computed: {
    remainName () {
      return 20 - this.name.length
    },
    remainDescription () {
      return 100 - this.description.length
    },
    canRelease () {
      let pattern = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      return pattern.test(this.name)
    }
  },
  components: {'v-header': header}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.addCollectList{
  .movelayout;
  z-index: 3;
}
.collectHeader{
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  i{
    padding: 3px 13px 3px 1px;
  }
  .unrelease{
    color: @font-title;
  }
}
.collectCon{
  width: 100%;
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: 0;
  width: 100%;
  line-height: 18px;
  padding: 12px 14px;
  .contentDiv{
    display: flex;
    justify-content: space-between;
    margin: 8px 0 12px;
    border-bottom: 1px solid #ccc;
    span{
      padding: 2px 0;
      color: @font-sub;
    }
  }
  .chosen{
    border-bottom: 2px solid @blue;
  }
  input{
    width: 100%;
    outline:none;
    background: @body-background;
    padding: 2px 0;
    &::placeholder {
      color:  @font-sub;
    }
  }
}
</style>
