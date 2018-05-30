<template>
  <transition name="move">
    <div ref="searchArticle" class="searchArticle">
      <v-header>
        <div class="saHeader">
          <i class="iconfont icon-icon" @click="back"></i>
          <input @keyup.enter="search" type="text" placeholder="搜索(不支持空格及特殊字符串)" v-model="text">
          <i class="iconfont icon-close" @click.stop="cancel" v-show="showResult"></i>
        </div>
      </v-header>
      <div class="saCon">
        <template v-if="showResult">
          <articleList ref="articleList" :articles="resultArticle"></articleList>
          <div v-if="resultArticle.length===0" class="null">没有相关的搜索结果</div>
        </template>
        <template v-else>
          <ul class="searchul">
            <li v-for="(item, index) in searchList" :key="index" @click.stop="searchThis(item.text)">
              <div>
                <i class="iconfont icon-icon33"></i>
                <span>{{item.text}}</span>
              </div>
              <div>
                <i class="iconfont icon-close" @click.stop="del(item.id)"></i>
              </div>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </transition>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import {getMatching} from 'api'
import header from 'base/header/header'
import articleList from 'base/article-list/article-list'
export default {
  data () {
    return {
      showResult: false,
      text: '',
      resultArticle: [],
      theArticle: {}
    }
  },
  created () {},
  methods: {
    ...mapMutations([
      'ADD_SEARCH',
      'DEL_SEARCH'
    ]),
    back () {
      this.$router.back()
    },
    search () {
      let pattern = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if (pattern.test(this.text)) {
        this.ADD_SEARCH({text: this.text})
        this.getResult()
      }
    },
    searchThis (arg) {
      this.text = arg
      this.getResult()
    },
    async getResult () {
      var reg = new RegExp(this.text, 'i')
      let al1 = await getMatching(this.text)
      let al2 = this.userArticle.filter(item => item.title.match(reg))
      this.resultArticle = [...al2, ...al1]
      this.showResult = true
    },
    del (id) {
      this.DEL_SEARCH({id})
    },
    cancel () {
      this.text = ''
      this.showResult = false
    }
  },
  computed: {
    ...mapState([
      'searchList',
      'userArticle'
    ])
  },
  components: {'v-header': header, articleList}
}
</script>
<style scoped lang="less">
@import '../../styles/set.less';
.searchArticle{
  .movelayout;
}
.saHeader{
  display: flex;
  width: 100%;
  padding: 0 12px;
  i.icon-icon{
    padding: 3px 13px 3px 1px;
  }
  i{
    padding: 3px 0;
  }
  input{
    width: 100%;
    color: @font-head;
    background: @blue;
    outline:none;
    font-size: @fs16;
    &::placeholder {
      color: @blue-shallow;
    }
  }
}
.saCon{
  width: 100%;
  background: @body-background;
  position: fixed;
  overflow: auto;
  top: @header-height;
  bottom: 0;
  width: 100%;
  ul.searchul{
    line-height: 18px;
    li{
      padding: 12px;
      color: @font-sub;
      border-bottom: 1px solid @border-deep;
      display: flex;
      justify-content: space-between;
    }
    i{
      padding-right: 8px;
    }
  }
  .null{
    text-align:center;
    color: @font-sub;
    margin-top: 12px;
  }
}
</style>
