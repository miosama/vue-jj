import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  user: {},
  userbp: [],
  userArticle: [],
  praise_bplist: [],
  bpComment: [],
  praise_articlelist: [],
  articleComment: [],
  focusUsers: [],
  userCollectList: [],
  searchList: [],
  readedArticles: [],
  article: {},
  bp: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
