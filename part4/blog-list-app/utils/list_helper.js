const _ = require('lodash')

const dummy = array => {
  return 1
}

const totalLikes = array => {
  return array.reduce((sum, item) => {
    return (sum += item.likes)
  }, 0)
}

const favoriteBlog = array => {
  if (array.length === 0) {
    return 0
  }
  const maxLikes = Math.max(...array.map(blog => blog.likes))
  // A method for returning list of all items matching maxLikes
  // return array
  //   .filter(blog => blog.likes === maxLikes)
  //   .map(({ _id, url, __v, ...keepAttrs }) => keepAttrs)

  const mostLiked = array.find(blog => blog.likes === maxLikes)
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  }
}

const mostBlogs = function (blogs) {
  const most = _(blogs)
    .groupBy('author')
    .map((items, author) => {
      return { author, blogs: items.length }
    })
    // gives you full array of objs, grouped in ascending order by author
    // .value()
    .maxBy('blogs')
  return most
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
