<template>
  <transition name="move">
    <div class="addArticle">
      <v-header>
        <div class="addArticleHeader">
          <div @click="back">
            <i class="iconfont icon-icon"></i>
            <span>分享文章</span>
          </div>
          <div :class="{'unrelease': !this.content || !this.title}" @click="release">发布</div>
        </div>
      </v-header>
      <div class="main">
        <ul>
          <!-- <li>
            <span><i class="iconfont icon-anzhuoduanliulanqidakai"></i></span>
            <input v-model.lazy="link" type="text" placeholder="文章链接(可自动识别粘贴板)">
          </li> -->
          <li>
            <span><i class="iconfont icon-fenlei"></i></span>
            <div>
              <p>选择分类</p>
              <div class="types">
                <div v-for="(item, index) in typelist" :key="index" :class="{'chosen':item.chosen}" @click="choseType(item.type)">{{item.name}}</div>
              </div>
            </div>
          </li>
          <li>
            <span><i class="iconfont icon-biaoti"></i></span>
            <input v-model.lazy="title" type="text" placeholder="标题">
          </li>
          <li>
            <span><i class="iconfont icon-lineweight"></i></span>
            <textarea v-model.lazy="idea" placeholder="你此刻的想法(可选)" rows="2"></textarea>
          </li>
          <li>
            <span><i class="iconfont icon-edit"></i></span>
            <textarea v-model="content" placeholder="文章内容" rows="18"></textarea>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import {mapMutations} from 'vuex'
import header from 'base/header/header'
export default {
  data () {
    return {
      link: '',
      title: '',
      idea: '',
      type: 0,
      content: '',
      // 文章类型
      typelist: [
        {
          name: 'Android',
          type: 3,
          chosen: false
        },
        {
          name: '前端',
          type: 1,
          chosen: false
        },
        {
          name: 'iOS',
          type: 4,
          chosen: false
        },
        {
          name: '产品',
          type: 5,
          chosen: false
        },
        {
          name: '设计',
          type: 6,
          chosen: false
        },
        {
          name: '工具资源',
          type: 7,
          chosen: false
        },
        {
          name: '阅读',
          type: 8,
          chosen: true
        },
        {
          name: '后端',
          type: 2,
          chosen: false
        },
        {
          name: '人工智能',
          type: 9,
          chosen: false
        }
      ]
    }
  },
  created () {},
  methods: {
    ...mapMutations([
      'ADD_ARTICLE'
    ]),
    back () {
      Object.assign(this.$data, this.$options.data())
      this.$router.back()
    },
    choseType (type) {
      this.type = type
      this.typelist.forEach(function (item) {
        if (item.type === type) {
          item.chosen = true
        } else {
          item.chosen = false
        }
      })
    },
    release () {
      if (this.title && this.content) {
        this.ADD_ARTICLE({
          content: this.content,
          title: this.title,
          idea: this.idea,
          type: this.type
        })
        Object.assign(this.$data, this.$options.data())
        this.$router.back()
      }
    }
  },
  computed: {},
  components: {'v-header': header}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.addArticle{
 .movelayout;
}
.addArticleHeader{
  color: @font-head;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  i{
    padding: 3px 13px 3px 1px;
  }
}
.unrelease{
  color: @font-title;
}
.main{
  margin-top: @header-height;
  ul{
    li{
      padding: 12px;
      border-bottom: 1px solid #eee;
      display: flex;
      i{
        font-size: @fs18;
      }
    }
  }
  span{
    margin-right: 12px;
  }
  input{
    width: 100%;
    border: none;
    outline:none;
    font-size:@fs14;
    &::placeholder {
      color: @font-sub;
    }
  }
  textarea{
    width: 100%;
    border: none;
    outline: none;
    font-size:@fs14;
    &::placeholder {
      color: @font-sub;
    }
  }
  .types{
    display: flex;
    flex-wrap: wrap;
    div{
      margin: 4px;
      padding: 6px 12px;;
      background: #eee;
      color: @font-sub;
      border-radius: 3px;
    }
    .chosen{
      background:@blue;
      color: @font-head;
    }
  }
}
</style>
