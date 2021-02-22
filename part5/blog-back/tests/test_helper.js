const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'This is funny',
    author: 'Will Smith',
    url: 'https://www.reddit.com/r/funny',
    likes: 2,
  },
  {
    title: 'This is news',
    author: 'Wolff Blitzer',
    url: 'https://www.cnn.com',
    likes: 1,
  },
]

// const newBlog = {
//   title: 'This is sad',
//   author: 'Bozo the Clown',
//   url: 'https://www.goolge.com',
//   likes: 5,
// }

const missingLikesBlog = {
  title: 'Something is missing',
  author: 'Chris Ziegler',
  url: 'https://www.tesla.com',
}

const updatedBlog = {
  title: 'This is funny',
  author: 'Will Smith',
  url: 'https://www.reddit.com/r/funny',
  likes: 3,
}

blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  missingLikesBlog,
  blogsInDb,
  usersInDb,
  updatedBlog,
}
