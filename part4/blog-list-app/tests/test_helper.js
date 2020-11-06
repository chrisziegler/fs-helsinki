const Blog = require('../models/blog')

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

const newBlog = {
  title: 'This is sad',
  author: 'Bozo the Clown',
  url: 'https://www.goolge.com',
  likes: 5,
}

const missingLikesBlog = {
  title: 'Something is missing',
  author: 'Elon Musk',
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

module.exports = {
  initialBlogs,
  newBlog,
  missingLikesBlog,
  blogsInDb,
  updatedBlog,
}
