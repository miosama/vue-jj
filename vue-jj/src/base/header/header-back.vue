<template>
    <div class="header">
      <div class="back" @click="back">
        <i class="iconfont icon-icon"></i>
      </div>
      <slot></slot>
    </div>
</template>
<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  font-size: @fs16;
  height: @header-height;
  background: @blue;
  padding: 0 12px;
  overflow: hidden;
  color: @font-head;
  line-height: @header-height;
  display: flex;
  .back i{
    padding-right: 12px;
  }
}
</style>
