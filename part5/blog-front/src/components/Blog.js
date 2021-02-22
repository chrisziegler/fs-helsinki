import React from 'react'

const authorStyle = {
  color: '#28527a',
  fontSize: '0.8rem',
}

const Blog = ({ blog }) => (
  <div>
    {blog.title} <span style={authorStyle}>by {blog.author}</span>
  </div>
)

export default Blog
