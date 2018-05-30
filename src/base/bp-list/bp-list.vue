<template>
  <div class="bpList" ref="bpList">
    <ul>
      <li @click.stop="showDetail(item)" v-for="(item, index) in allbp" :key="index">
        <div class="bpInfo">
          <div class="user">
            <img :src="item.uimg">
            <div>
              <div class="username">{{item.uname}}</div>
              <div class="userInfo">
                {{item.job}}
                <span v-if="item.job">&nbsp;@&nbsp;</span>
                {{item.company}}
                <span v-if="item.company">&nbsp;·&nbsp;</span>
                {{item.bptime}}
              </div>
            </div>
          </div>
          <div class="focus">
            <span class="focusSpan" @click.stop="focusUser(item.uname)" :class="{'hasFocus':hasFocus(item.uname)}">
              <template v-if="hasFocus(item.uname)">
                <span>已关注</span>
              </template>
              <template v-else>
                <i class="iconfont icon-tianjia"></i>
                <span>关注</span>
              </template>
            </span>
          </div>
        </div>
        <p v-html="item.bpcon"></p>
        <div class="bpFooter">
          <div @click.stop="praise(item.bpid)">
            <i class="iconfont " :class="[isPraised(item.bpid)?'icon-dianzan isPraised':'icon-iconfontzhizuobiaozhun44']"></i>
            <span v-if="praiseNum(item.bpid, item.praise)==='0'">赞</span>
            <span v-else>{{praiseNum(item.bpid, item.praise)}}</span>
          </div>
          <div>
            <i class="iconfont icon-pinglun1"></i>
            <span v-if="commentNum(item.bpid, item.comment.length)===0">评论</span>
            <span v-else>{{commentNum(item.bpid, item.comment.length)}}</span>
          </div>
          <div @click.stop="showSharing">
            <i class="iconfont icon-share"></i>
            <span></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  props: {
    allbp: Array
  },
  data () { return {} },
  methods: {
    ...mapMutations([
      'PRAISE_BP',
      'FOCUS',
      'THE_BP'
    ]),
    showDetail (item) {
      let bp = JSON.stringify(item)
      this.THE_BP({bp})
      this.$router.push({
        path: `/boiling-point-detail`
      })
    },
    praise (id) {
      this.PRAISE_BP({id})
    },
    showSharing () {
      this.$emit('sharing')
    },
    focusUser (name) {
      this.FOCUS({name})
    }
  },
  computed: {
    ...mapState([
      'praise_bplist',
      'bpComment',
      'focusUsers'
    ]),
    isPraised (id) {
      return id => this.praise_bplist.indexOf(id) > -1
    },
    praiseNum () {
      return (id, num) => {
        if (this.praise_bplist.indexOf(id) > -1) {
          return parseInt(num) + 1
        } else {
          return num
        }
      }
    },
    commentNum () {
      return (id, num) => {
        let arrlength = this.bpComment.filter(item => item.bpid === id).length
        if (arrlength > 0) {
          return parseInt(num) + arrlength
        } else {
          return num
        }
      }
    },
    hasFocus () {
      return (uname) => this.focusUsers.some(item => item === uname)
    }

  }
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
ul {
  li{
    background: @content-background;
    margin-top: 8px;
  }
}
p{
  padding: 12px;
}
.bpInfo{
  display: flex;
  justify-content: space-between;
  padding:12px 12px 0 12px;
  height: 56px;
  .user{
    display: flex;
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .username{
      padding: 2px 0 0 12px;
      color: @font-intro;
    }
    .userInfo{
      padding: 0 0 2px 12px;
      color: @font-sub;
      font-size: @fs12;
    }
  }
  .focus{
    line-height: 42px;
    color: @font-sub;
    i{
      font-size: @fs12;
    }
    .focusSpan{
      font-size: @fs12;
      border: 1px solid @border-deep;
      border-radius: 4px;
      padding: 5px 6px;
    }
  }
  .hasFocus{
    background: @focus;
    color: @font-head;
    border: 1px solid @focus;
  }
}
.bpFooter{
  display: flex;
  padding: 6px 0;
  border-top: 1px solid @body-background;
  color: @font-sub;
  div{
    flex:1;
    text-align: center;
  }
  .isPraised{
    color: @praise;
  }
}
</style>
<style lang="less">
.bpList{
  .topic-title{
    margin-right: .3em;
    color: #007fff;
  }
  .content-box{
    line-height: 1.5;
    white-space: pre-wrap;
    color: #17181a;
  }
  .pin-image-row {
    margin-top: .333rem;
  }
  .image-box {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
  }
  .image-box.col-1 .image {
    width: 230px;
  }
  .image-box.col-3 .image:not(:nth-child(3n)) {
    margin-right: 4px;
  }
  .image-box.col-3 .image{
    width: calc((100% - 4px * 2) / 3);
  }
  .image{
    flex: 0 1 auto;
    position: relative;
    margin-top: 4px;
    max-width: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: zoom-in;
  }
  .link-box{
    display: flex;
    align-items: center;
    padding: .833rem 1.333rem;
    width: 44.166rem;
    max-width: 100%;
    background-color: #fff;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .link-box .link-info-box{
    height: 6rem;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    min-width: 0;
    .link-title{
      font-weight: 500;
      line-height: 1.5;
      color: #000;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .link-domain{
      margin-top: auto;
      color: #8a93a0;
    }
  }
  .link-thumb {
    width: 6rem;
    height: 6rem;
    flex: 0 0 auto;
    margin-left: 1.333rem;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 2px;
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: #909090;
  }
}
</style>
