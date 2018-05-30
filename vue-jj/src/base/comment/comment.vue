<template>
  <div class="comment" >
    <input v-model="comment" type="text" placeholder="添加评论..." @keyup.enter="addComment">
    <span @click.stop="addComment"><i class="iconfont icon-emizhifeiji"></i></span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      comment: ''
    }
  },
  created () {},
  methods: {
    addComment () {
      if (this.comment) {
        this.$emit('newComment', this.comment)
        Object.assign(this.$data, this.$options.data())
      }
    }
  },
  computed: {},
  components: {}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.comment{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: @footer-height;
  display: flex;
  background: @content-background;
  border-top: 1px solid @border-deep;
  z-index: 2;
  input{
    width: 100%;
    outline: none;
    padding-left: 8px;
    &::placeholder {
      color: @font-sub;
    }
  }
  span{
    line-height: @footer-height;
    padding: 0 12px;
  }
}
</style>
