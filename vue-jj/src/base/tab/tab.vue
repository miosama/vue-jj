<template>
    <div class="footer">
      <router-link to="/home">
        <i class="iconfont icon-home"></i>
      </router-link>
      <router-link to="/boilingPoint">
        <i class="iconfont icon-talkbubble"></i>
      </router-link>
      <router-link to="/search">
        <i class="iconfont icon-search"></i>
      </router-link>
      <router-link to="/myPage">
        <i class="iconfont icon-iconfontzhizuobiaozhun023104"></i>
      </router-link>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: @footer-height;
  line-height: @footer-height;
  display: flex;
  background: white;
  border-top: 1px solid @border-deep;
  a{
    display: flex;
    flex: 1;
    flex-direction: column;
    color: @font-sub;
    align-items: center;
    i{
      font-size: 22px;
    }
  }
  a.router-link-active{
    color: @blue;
  }
}
</style>
