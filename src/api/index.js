import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.response.use((res) => {
  return res.data
})

// 获取文章
export let getArticles = (type, offset) => {
  return axios.get(`/articles?type=${type}&offset=${offset}`)
}
// 获取热门推荐
export let getPopular = (type) => {
  return axios.get(`/popular?type=${type}`)
}
// 获取热门文章
export let getPopularArticles = (tag, offset) => {
  return axios.get(`/popularArticles?offset=${offset}`)
}
// 获取文章内容
export let getContent = (id) => {
  return axios.get(`/articleContent?id=${id}`)
}
// 获取沸点
export let getBPList = (offset) => {
  return axios.get(`/BPList?offset=${offset}`)
}
// 搜索匹配文章
export let getMatching = (keyword) => {
  return axios.get(`/match?keyword=${keyword}`)
}
// 获取选定的文章，参数为文章ID数组
export let getSelect = (ids) => {
  return axios.get(`/select?ids=${ids}`)
}
