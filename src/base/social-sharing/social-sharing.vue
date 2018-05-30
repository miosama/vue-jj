<template>
  <div ref="socialSharing">
    <transition>
      <div class="socialsharing animated"  v-show="sharingFlag" :class="[sharingFlag?'fadeInUp':'fadeOutDown']">
        <ul>
          <li>
            <div>
              <i class="iconfont icon-weixin"></i>
              <p>微信</p>
            </div>
            <div>
              <i class="iconfont icon-pengyouquan"></i>
              <p>朋友圈</p>
            </div>
            <div>
              <i class="iconfont icon-QQ"></i>
              <p>QQ</p>
            </div>
            <div>
              <i class="iconfont icon-weibo"></i>
              <p>微博</p>
            </div>
          </li>
          <li>
            <div>
              <i class="iconfont icon-fuzhilianjie"></i>
              <p>复制链接</p>
            </div>
            <div>
              <i class="iconfont icon-anzhuoduanliulanqidakai"></i>
              <p>浏览器打开</p>
            </div>
            <div>
              <i class="iconfont icon-qita"></i>
              <p>其他</p>
            </div>
            <div>
              &nbsp;
            </div>
          </li>
          <li :style="{'background':'#eee'}" @click.stop="hiddenSharing">
            <div >取消</div>
          </li>
        </ul>
      </div>
    </transition>
    <div class="shade" v-show="sharingFlag" @click.stop="hiddenSharing"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sharingFlag: false
    }
  },
  created () {},
  methods: {
    hiddenSharing () {
      Object.assign(this.$data, this.$options.data())
    },
    show () {
      this.sharingFlag = true
    }
  }
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.socialsharing{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: @content-background;
  border-top: 1px solid @border-deep;
  z-index: 200;
  ul{
    li{
      padding: 8px 12px;
      display: flex;
      border-bottom: 1px solid #eee;
      div{
        text-align: center;
        flex: 1;
      }
      p{
        font-size: @fs12;
      }
      .iconfont{
        font-size: @fs-large;
      }
      .icon-weixin, .icon-pengyouquan{
        color: #008000
      }
      .icon-QQ{
        color:#00bfff
      }
      .icon-weibo{
        color:#ff6347
      }
    }
  }
}
.shade{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.animated {
  animation-duration: .5s;
}
</style>
