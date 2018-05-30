<template>
    <div>
      <v-header>
        <div class="MPHeader">
          <span>我</span>
        </div>
      </v-header>
      <div class="mypageCon">
        <div class="myInfo" @click="openSelfPage">
          <div class="main">
            <img :src="user.uimg">
            <div class="mainInfo">
              <div class="myName">{{user.uname}}</div>
              <div class="myJob">
                <template v-if="user.job||user.company">
                  {{user.job}}
                  <span v-if="user.job">&nbsp;@&nbsp;</span>
                  {{user.company}}
                </template>
                <template v-else>
                  职位&nbsp;@&nbsp;公司
                </template>
              </div>
            </div>
          </div>
          <div class="other">
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </div>
        <ul>
          <!-- <li>
            <div>
              <i class="iconfont icon-icon_ring"></i>
              <span>消息中心</span>
            </div>
            <div></div>
          </li> -->
          <li @click.stop="openUserFavor">
            <div>
              <i class="iconfont icon-collectselected"></i>
              <span>我喜欢的</span>
            </div>
            <div>{{praise_articlelist.length}}篇</div>
          </li>
          <li @click.stop="openUserCollect">
            <div>
              <i class="iconfont icon-lines"></i>
              <span>收藏集</span>
            </div>
            <div>{{userCollectList.length}}个</div>
          </li>
          <li @click.stop="openUserRead">
            <div>
              <i class="iconfont icon-eye"></i>
              <span>阅读过的文章</span>
            </div>
            <div>{{readedArticles.length}}篇</div>
          </li>
          <!-- <li>
            <div>
              <i class="iconfont icon-tag"></i>
              <span>标签管理</span>
            </div>
            <div></div>
          </li> -->
        </ul>
        <ul>
          <li>
            <div>
              <i class="iconfont icon-yijianxiang"></i>
              <span>意见反馈</span>
            </div>
            <div></div>
          </li>
          <!-- <li>
            <div>
              <i class="iconfont icon-ioscloudynight"></i>
              <span>夜间模式</span>
            </div>
            <div><Switch size="small"></Switch></div>
          </li> -->
          <li>
            <div>
              <i class="iconfont icon-seticon"></i>
              <span>设置</span>
            </div>
            <div></div>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import header from 'base/header/header'
export default {
  data () { return {} },
  methods: {
    openSelfPage () {
      this.$router.push({path: '/self-page'})
    },
    openUserCollect () {
      this.$router.push({path: '/myPage/user-collect'})
    },
    openUserFavor () {
      this.$router.push({path: '/myPage/favor-article'})
    },
    openUserRead () {
      this.$router.push({path: '/myPage/read-article'})
    }
  },
  computed: {
    ...mapState([
      'user',
      'readedArticles',
      'praise_articlelist',
      'userCollectList'
    ])
  },
  components: {'v-header': header}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.MPHeader{
  text-align: center;
}
.mypageCon{
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: @footer-height;
  width: 100%;
  ul{
    margin-top: 12px;
    font-size:@fs12;
    color: @font-sub;
    line-height: 32px;
    li{
      background: @content-background;
      padding: 8px 12px;
      border-bottom: 1px solid @body-background;
      display: flex;
      justify-content: space-between;
      i{
        font-size: @fs18;
        margin-right: 12px;
      }
      span{
        font-size: 14px;
        color: #333;
      }
    }
  }
  .icon-icon_ring, .icon-lines{
    color: @blue;
  }
  .icon-collectselected{
    color: @praise;
  }
}
.myInfo{
  background: @content-background;
  margin-top: 8px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .main{
    display: flex;
    justify-content: space-between;
  }
  .mainInfo{
    padding: 6px 12px;
  }
  .myName{
    font-weight: bold;
  }
  .myJob{
    color: #A2AFBB;
    font-size: @fs12;
  }
  .other{
    line-height: 50px;
    i{
      color: @font-sub;
      padding: 8px 0 8px 10px;
    }
  }
}
</style>
