import React from 'react'

const authorStyle = {
  fontSize: '0.8rem',
  fontStyle: 'italic',
}

const Blog = ({ blog }) => (
  <div className="blog">
    {blog.title} <span style={authorStyle}>by {blog.author}</span>
  </div>
)

export default Blog
