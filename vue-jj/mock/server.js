let http = require('http')
let url = require('url')
let fs = require('fs')
const pageSize = 5 // 每页条数

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('X-Powered-By', ' 3.2.1')
  if (req.method === 'OPTIONS') return res.end()

  let {pathname, query} = url.parse(req.url, true)

  // 获取文章
  if (pathname === '/articles') {
    let type = parseInt(query.type) // 文章类型
    let offset = parseInt(query.offset) // 当前文章数目
    let hasMore = true // 是否还有未加载文章
    let articles = []
    read(function (data) {
      articles = data.articles
      // 获取选定文章类型
      if (type > 0 && !isNaN(type)) {
        articles = articles.filter(item => item.type === type)
      }
      if (offset + pageSize >= articles.length) {
        articles = articles.slice(offset)
        hasMore = false
      } else {
        articles = articles.slice(offset, offset + pageSize)
      }
      res.setHeader('Content-Type', 'application/json;charset=utf8')
      return res.end(JSON.stringify({articles, hasMore}))
    })
  }

  // 获取热门推荐
  if (pathname === '/popular') {
    let type = parseInt(query.type) // 文章类型
    let articles = []
    let result = []
    read(function (data) {
      articles = data.articles
      if (type > 0 && !isNaN(type)) {
        result = articles.filter(item => item.type === type)
      } else {
        result = articles
      }
      // 设定点赞数超过20的为热门文章，随机获取3篇
      result = result.sort(randomSort).filter(item => parseInt(item.praise) > 20).slice(0, 3)
      res.setHeader('Content-Type', 'application/json;charset=utf8')
      return res.end(JSON.stringify(result))
    })
  }

  // 获取热门文章
  if (pathname === '/popularArticles') {
    let hasMore = true // 是否还有未加载文章
    let offset = parseInt(query.offset) // 文章类型
    let articles = []
    let pageSize = 7 // 每页条数
    read(function (data) {
      articles = data.articles
      articles = articles.filter(item => parseInt(item.praise) > 10)
      if (offset + pageSize >= articles.length) {
        articles = articles.slice(offset)
        hasMore = false
      } else {
        articles = articles.slice(offset, offset + pageSize)
      }
      res.setHeader('Content-Type', 'application/json;charset=utf8')
      return res.end(JSON.stringify({'popular': articles, hasMore}))
    })
  }

  // 获取文章内容
  if (pathname === '/articleContent') {
    let id = parseInt(query.id) // 文章ID
    let result = []
    fs.readFile('./data.json', 'utf8', function (error, data) {
      if (error) {}
      let articles = JSON.parse(data).articles
      let article = articles.find(item => item.articleID === id)
      if (article) {
        result = article.content
        res.setHeader('Content-Type', 'application/json;charset=utf8')
        return res.end(JSON.stringify(result))
      }
    })
  }

  // 获取沸点
  if (pathname === '/BPList') {
    let offset = parseInt(query.offset) // 当前沸点数目
    let hasMore = true // 是否还有未加载沸点
    let bplist = []
    read(function (data) {
      bplist = data.bplist
      if (offset + pageSize > bplist.length) {
        bplist = bplist.slice(offset)
        hasMore = false
      } else {
        bplist = bplist.slice(offset, offset + pageSize)
      }
      res.setHeader('Content-Type', 'application/json;charset=utf8')
      return res.end(JSON.stringify({bplist, hasMore}))
    })
  }

  // 搜索匹配文章
  if (pathname === '/match') {
    let keyword = query.keyword // 关键字
    let articles = []
    let result = []
    var reg = new RegExp(keyword, 'i')
    read(function (data) {
      articles = data.articles
      result = articles.filter(item => item.title.match(reg))
      res.setHeader('Content-Type', 'application/json;charset=utf8')
      return res.end(JSON.stringify(result))
    })
  }

  // 获取选定的文章，参数为文章ID数组
  if (pathname === '/select') {
    let ids = JSON.parse(query.ids)
    let articles = []
    let result = []
    read(function (data) {
      articles = data.articles
      result = articles.filter(item => ids.indexOf(item.articleID) > -1)
      res.setHeader('Content-Type', 'application/json;charset=utf8')
      return res.end(JSON.stringify(result))
    })
  }

  // fs.stat('.' + pathname, function (err, stats) {
  //   if (err) {
  //     // res.statusCode = 404
  //     // res.end('NOT FOUND')
  //     // fs.createReadStream('index.html').pipe(res)
  //   } else {
  //     if (stats.isDirectory()) {
  //       let p = require('path').join('.' + pathname, './index.html')
  //       fs.createReadStream(p).pipe(res)
  //     } else {
  //       fs.createReadStream('.' + pathname).pipe(res)
  //     }
  //   }
  // })
}).listen(3000, function () {
  console.log('server is running on port 3000')
})

function randomSort (a, b) {
  return Math.random() > 0.5 ? -1 : 1
}

function read (cb) {
  fs.readFile('./data.json', 'utf8', function (error, data) {
    if (error || data.length === 0) {
      cb([])
    } else {
      cb(JSON.parse(data, (key, value) => {
        if (key !== 'content') {
          return value
        }
      }))
    }
  })
}
