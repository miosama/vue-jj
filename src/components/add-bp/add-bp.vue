<template>
  <transition name="move">
    <div ref="addbp" class="addbp">
      <v-header>
        <div class="bpHeader">
          <div @click="back">
            <i class="iconfont icon-icon"></i>
            <span>发布沸点</span>
          </div>
          <div :class="{'unrelease': !this.newbp}" @click="release">发布</div>
        </div>
      </v-header>
      <div class="bpCon">
        <textarea v-model="newbp" placeholder="分享最新最好玩的..."></textarea>
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
      newbp: ''
    }
  },
  created () {},
  methods: {
    ...mapMutations([
      'ADD_BP'
    ]),
    back () {
      this.$router.back()
    },
    release () {
      if (this.newbp) {
        let bp = {
          'bpid': -Math.abs(this.userbp.length + 1),
          'uname': this.user.uname,
          'job': this.user.job,
          'company': this.user.company,
          'bptime': '刚刚',
          'uimg': this.user.uimg,
          'praise': '0',
          'comment': [],
          'bpcon': this.newbp
        }
        this.ADD_BP({bp})
        this.$router.back()
      }
    }
  },
  computed: {
    ...mapState([
      'user',
      'userbp'
    ])
  },
  components: {'v-header': header}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.addbp{
  .movelayout
}
.bpHeader{
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
.bpCon{
  width: 100%;
  background: @body-background;
  position: fixed;
  overflow: hidden;
  top:  @header-height;
  bottom: 0;
  width: 100%;
  textarea{
    line-height: 20px;
    font-size: @fs14;
    padding: 12px;
    width: 100%;
    height: 100%;
    border: none;
    outline:none;
    &::placeholder {
      color: @font-sub;
    }
  }
}
</style>
