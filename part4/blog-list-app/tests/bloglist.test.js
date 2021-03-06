const {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 12,
    __v: 0,
  },
]

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals the sum of all likes', () => {
    expect(totalLikes(blogs)).toBe(46)
  })

  test('empty list returns 0', () => {
    expect(totalLikes([])).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog returns that object', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('when list has many blogs returns first item with most likes', () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })

  test('empty list returns 0', () => {
    expect(favoriteBlog([])).toBe(0)
  })
})

describe('most blogs', () => {
  test('when list has one blog, returns that author and number', () => {
    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })
  test('when list has many blogs, returns the author and number of blogs', () => {
    expect(mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
  test('when list is empty, returns 0', () => {
    expect(mostBlogs([])).toBe(0)
  })
})
describe('most likes', () => {
  test('when list has one blog, returns that author and likes', () => {
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
  test('when list has many blogs, returns the author and number of highest rated post', () => {
    expect(mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
  test('when list is empty, returns 0', () => {
    expect(mostLikes([])).toBe(0)
  })
})
