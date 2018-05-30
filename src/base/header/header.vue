<template>
    <div class="header">
      <slot></slot>
    </div>
</template>
<script>
export default {}
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
  overflow: hidden;
  color: @font-head;
  line-height: @header-height;
}
</style>
