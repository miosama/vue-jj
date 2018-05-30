<template>
  <div>
    <v-header>
      <div class="bpHeader">
        <span>沸点</span>
        <div>
          <i class="iconfont icon-edit" @click="addNewbp"></i>
        </div>
      </div>
    </v-header>
    <div class="mainCon" ref="mainCon" @scroll="getMore">
      <bpList ref="bpList" @sharing="showSharing" :allbp="allbp"></bpList>
    </div>
    <socialSharing ref="socialSharing"></socialSharing>
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import header from 'base/header/header'
import bpList from 'base/bp-list/bp-list'
import socialSharing from 'base/social-sharing/social-sharing'
import {getBPList} from 'api'
export default {
  data () {
    return {
      bplist: [],
      hasMore: true
    }
  },
  created () {
    this.getBP(0)
  },
  methods: {
    async getBP (offset) {
      let {bplist, hasMore} = await getBPList(offset)
      this.hasMore = hasMore
      this.bplist = [...this.bplist, ...bplist]
    },
    getMore () {
      if (this.hasMore) {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.mainCon
        if (scrollTop + clientHeight + 10 > scrollHeight) {
          this.hasMore = false
          this.getBP(this.bplist.length)
        }
      }
    },
    addNewbp () {
      this.$router.push({path: '/boilingPoint/add-bp'})
    },
    showSharing () {
      this.$refs.socialSharing.show()
    }
  },
  computed: {
    ...mapState([
      'userbp'
    ]),
    allbp () {
      return [...this.userbp, ...this.bplist]
    }
  },
  components: { 'v-header': header, socialSharing, bpList }
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.bpHeader{
  padding: 0 12px;
  text-align: center;
  div{
    float: right;
  }
}
.mainCon{
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: @footer-height;
  width: 100%;
}
</style>
