'use strict';

const posts = [
  {
    id: '1',
    author: 'Dung',
    title: 'Hello',
    image: 'http://placekitten.com/400/300',
    description: 'hello world',
    category_id: '2',
    style_id: '1',
    location: 'Finland',
    posted_date: '2015-12-25',
    edited_date: '2015-12-25'
  },

  {
    id: '2',
    author: 'An',
    title: 'Welcome',
    image: 'http://placekitten.com/400/300',
    description: 'welcome to the world',
    category_id: '2',
    style_id: '1',
    location: 'Vietnam',
    posted_date: '2021-12-25',
    edited_date: '2021-12-25'
  },
];

const getPost = (postId) => {
  // TODO find single post from posts-array and return it
  return posts.find(post => post.id == postId);
};

module.exports = {
  posts,
  getPost,
};