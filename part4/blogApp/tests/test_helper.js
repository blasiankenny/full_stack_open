const Blog = require("../models/blog");

const initialBlogs = [
  {
    _id: "6472b2a59e5680cdf1286931",
    title: "Example Blog",
    author: "John Doe",
    url: "https://example.com",
    likes: 5,
    __v: 0,
  },
  {
    title: "Example Blog2",
    author: "John Legend",
    url: "https://example2.com",
    likes: 200,
    __v: 0,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Will remove this soon",
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
