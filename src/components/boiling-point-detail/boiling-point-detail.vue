<template>
  <transition name="move">
    <div class="bpDetail">
      <v-header>
        <span>沸点详情</span>
      </v-header>
      <div class="mainCon">
        <div class="bpCon">
          <div class="bpInfo">
            <div class="user">
              <img :src="bp.uimg">
              <div>
                <div class="username">{{bp.uname}}</div>
                <div class="userInfo">
                    {{bp.job}}
                    <span v-if="bp.job">&nbsp;@&nbsp;</span>
                    {{bp.company}}
                    <span v-if="bp.company">&nbsp;·&nbsp;</span>
                    {{bp.bptime}}
                  </div>
              </div>
            </div>
          </div>
          <p v-html="bp.bpcon"></p>
        </div>
        <div class="comment">
          <div class="commentHeader">
            <span>评论&nbsp;{{allComment.length}}</span>|<span>赞&nbsp;{{praiseNum (bp.bpid, bp.praise)}}</span>
          </div>
          <ul>
            <li v-for="(item, index) in allComment" :key="index">
              <div class="commentInfo">
                <div class="user">
                  <img :src="item.commentImg">
                  <div>
                    <div class="username">{{item.username}}</div>
                    <div class="userInfo">{{item.commentTime}}</div>
                  </div>
                </div>
                <div class="review">
                  <div>
                    <i class="iconfont icon-iconfontzhizuobiaozhun44"></i>
                    <span v-show="item.admire > 0">{{item.admire}}</span>
                  </div>
                  <div>
                    <i class="iconfont icon-pinglun1"></i>
                    <span></span>
                  </div>
                </div>
              </div>
              <p v-html="item.commentText"></p>
            </li>
          </ul>
        </div>
      </div>
      <comment @newComment="addComment"></comment>
    </div>
  </transition>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import comment from 'base/comment/comment'
import header from 'base/header/header-back'
export default {
  data () { return {} },
  created () {},
  methods: {
    ...mapMutations([
      'COMMENT_BP'
    ]),
    back () {
      Object.assign(this.$data, this.$options.data())
      this.$router.back()
    },
    addComment (data) {
      if (data) {
        this.COMMENT_BP({text: data, bpid: this.bp.bpid})
      }
    }
  },
  computed: {
    ...mapState([
      'bpComment',
      'praise_bplist',
      'bp'
    ]),
    allComment () {
      let commentlist = this.bpComment.filter(item => item.bpid === this.bp.bpid)
      return [...commentlist, ...this.bp.comment]
    },
    praiseNum () {
      return (id, num) => {
        if (this.praise_bplist.indexOf(id) > -1) {
          return parseInt(num) + 1
        } else {
          return num
        }
      }
    }
  },
  components: {'v-header': header, comment}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.bpDetail{
  .movelayout
}
.bpHeader{
  padding: 0 12px;
  i{
    padding: 0 5px 5px;
  }
}
.mainCon{
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom:  @footer-height;
  width: 100%;
  p{
    padding: 12px;
  }
  .bpCon{
    background: @content-background;
  }
}
.comment{
  margin-top: 8px;
  background: @content-background;
  li{
    border-bottom: 1px solid @body-background;
  }
  .commentHeader{
    color:  @font-sub;
    border-bottom: 1px solid @body-background;
    font-size: @fs12;
    span{
      padding: 0 12px;
      line-height: 32px;
    }
  }
  p{
    margin-left: 52px;
    padding: 8px 12px;
  }
  .review{
    color: @font-sub;
    display: flex;
    justify-content: space-between;
    line-height: 26px;
    div{
      padding: 0 6px;
    }
  }
}
.bpInfo, .commentInfo{
  display: flex;
  justify-content: space-between;
  padding: 12px 12px 0 12px;
  .user{
    display: flex;
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .username{
      padding: 2px 0 0 12px;
      color:  @font-intro
    }
    .userInfo{
      padding: 0 0 2px 12px;
      color:  @font-sub;
      font-size: @fs12;
    }
  }
}
</style>
<style lang="less">
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
</style>
