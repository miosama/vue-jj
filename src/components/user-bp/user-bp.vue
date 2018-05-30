<template>
  <transition name="move">
    <div ref="userbp" class="userbp">
      <v-header>
        <span>个人沸点</span>
      </v-header>
      <div class="mainCon">
        <bpList ref="bpList" @sharing="showSharing" :allbp="userbp"></bpList>
      </div>
      <socialSharing ref="socialSharing"></socialSharing>
    </div>
  </transition>
</template>
<script>
import {mapState} from 'vuex'
import header from 'base/header/header-back'
import bpList from 'base/bp-list/bp-list'
import socialSharing from 'base/social-sharing/social-sharing'
export default {
  data () { return {} },
  created () {},
  methods: {
    back () {
      this.$router.back()
    },
    showSharing () {
      this.$refs.socialSharing.show()
    }
  },
  computed: {
    ...mapState([
      'userbp'
    ])
  },
  components: {'v-header': header, socialSharing, bpList}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.userbp{
  .movelayout;
}
.bpHeader{
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  i{
    padding: 3px 13px 3px 1px;
  }
}
.mainCon{
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: 0;
  width: 100%;
}
</style>
