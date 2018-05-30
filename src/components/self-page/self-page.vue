<template>
  <transition name="move">
    <div ref="selfPage" class="selfPage">
      <v-header>
        <span>个人主页</span>
      </v-header>
      <div class="spCon">
        <div class="selfInfo">
          <div class="mainInfo">
            <img :src="user.uimg">
            <h2>{{user.uname}}</h2>
          </div>
          <div class="otherInfo">
            <div class="focusInfo">
              <div>
                <h5>{{focusUsers.length}}</h5>
                <span>关注者</span>
              </div>
              <div>
                <h5>0</h5>
                <span>关注</span>
              </div>
            </div>
            <div class="editInfo" @click.stop.stop="editInfo">
              编辑
            </div>
          </div>
        </div>
        <!-- <ul>
          <li>
            <div>
              <span>动态</span>
            </div>
            <div></div>
          </li>
        </ul> -->
        <ul>
          <li @click.stop="openUserbp">
            <div>
              <span>沸点</span>
            </div>
            <div>{{userbp.length}}</div>
          </li>
          <li @click.stop="openUserArticle">
            <div>
              <span>原创文章</span>
            </div>
            <div>{{userArticle.length}}</div>
          </li>
          <li @click.stop="openUserCollect">
            <div>
              <span>收藏集</span>
            </div>
            <div>{{userCollectList.length}}</div>
          </li>
        </ul>
        <ul>
          <li @click.stop="openUserFavor">
            <div>
              <span>喜欢的文章</span>
            </div>
            <div>{{praise_articlelist.length}}</div>
          </li>
          <!-- <li>
            <div>
              <span>关注的标签</span>
            </div>
            <div>0</div>
          </li> -->
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script>
import {mapState} from 'vuex'
import header from 'base/header/header-back'
export default {
  data () { return {} },
  created () {},
  methods: {
    back () {
      this.$router.back()
    },
    editInfo () {
      this.$router.push({path: '/self-page/edit-info'})
    },
    openUserbp () {
      this.$router.push({path: '/self-page/user-bp'})
    },
    openUserArticle () {
      this.$router.push({path: '/self-page/user-article'})
    },
    openUserCollect () {
      this.$router.push({path: '/self-page/user-collect'})
    },
    openUserFavor () {
      this.$router.push({path: '/self-page/favor-article'})
    }
  },
  computed: {
    ...mapState([
      'user',
      'userbp',
      'userArticle',
      'userCollectList',
      'praise_articlelist',
      'focusUsers'
    ])
  },
  components: {'v-header': header}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.selfPage{
  .movelayout;
}
.spCon{
  width: 100%;
  background: @body-background;
  position: fixed;
  top: @header-height;
  bottom: 0;
  width: 100%;
  ul{
    margin-top: 12px;
    font-size: @fs12;
    color: @font-sub;
    line-height: 32px;
    li{
      background: @content-background;
      padding: 8px 12px;
      border-bottom: 1px solid @body-background;
      display: flex;
      justify-content: space-between;
      font-size: @fs14;
      i{
        font-size: 20px;
        margin-right: 12px;
      }
      span{
        color: @font-common;
      }
    }
  }
}
.selfInfo{
  background: @content-background;
  margin-top: 8px;
  padding: 12px 14px;
}
.mainInfo{
  display: flex;
  font-size: @fs16;
  margin-bottom: 8px;
  img{
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  h2{
    font-weight: bold;
    line-height: 56px;
    margin-left: 12px;
  }
}
.otherInfo{
  display: flex;
  justify-content: space-between;
  .editInfo{
    border: 1px solid @blue;
    color: @blue;
    height: 32px;
    line-height: 32px;
    text-align: center;
    width: 52px;
    border-radius: 4px;
  }
  .focusInfo{
    display: flex;
    div{
      margin-right: 32px;
    }
    span{
      font-size: @fs12;
      color: @font-sub;
    }
    h5{
      text-align: center;
      font-size: @fs16;
    }
  }
}
</style>
